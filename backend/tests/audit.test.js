const request = require('supertest');
const nock = require('nock');
const app = require('../app');

describe('POST /api/audit Endpoint Tests', () => {
  beforeEach(() => {
    nock.cleanAll();
  });

  afterAll(() => {
    nock.restore();
  });

  test('1. Happy Path - Should successfully audit HTML webpage and return metrics', async () => {
    const mockHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Test Page Title</title>
          <meta name="description" content="This is a test meta description." />
        </head>
        <body>
          <h1>First Main Heading</h1>
          <h1>Second Main Heading</h1>
          <p>Hello world page pulse testing word count here.</p>
          <img src="valid.png" alt="Valid Alt Text" />
          <img src="missing.png" />
          <img src="empty.png" alt="" />
        </body>
      </html>
    `;

    nock('https://testsite.com')
      .get('/sample')
      .reply(200, mockHtml, { 'content-type': 'text/html; charset=utf-8' });

    const response = await request(app)
      .post('/api/audit')
      .send({ url: 'https://testsite.com/sample' });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toBeDefined();
    expect(response.body.data.url).toBe('https://testsite.com/sample');
    expect(response.body.data.status).toBe(200);
    expect(response.body.data.responseTime).toMatch(/\d+ms/);
    expect(response.body.data.pageTitle).toBe('Test Page Title');
    expect(response.body.data.metaDescription).toBe('This is a test meta description.');
    expect(response.body.data.h1Count).toBe(2);
    expect(response.body.data.missingAltImages).toBe(2); // 1 missing alt, 1 empty alt
    expect(response.body.data.wordCount).toBeGreaterThan(0);
  });

  test('2. Invalid URL - Should return 400 when invalid URL is provided', async () => {
    const response = await request(app)
      .post('/api/audit')
      .send({ url: 'not-a-valid-url' });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Invalid URL');
  });

  test('3. Invalid URL - Should return 400 when URL is missing', async () => {
    const response = await request(app)
      .post('/api/audit')
      .send({});

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Invalid URL');
  });

  test('4. Non HTML Response - Should return 415 when target URL serves non-HTML content', async () => {
    nock('https://testsite.com')
      .get('/image.png')
      .reply(200, Buffer.from('fake image content'), { 'content-type': 'image/png' });

    const response = await request(app)
      .post('/api/audit')
      .send({ url: 'https://testsite.com/image.png' });

    expect(response.status).toBe(415);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('URL does not contain HTML');
  });

  test('5. Timeout - Should return 504 when target URL request times out', async () => {
    nock('https://testsite.com')
      .get('/timeout')
      .delayConnection(6000)
      .reply(200, '<html><body>Late response</body></html>', { 'content-type': 'text/html' });

    const response = await request(app)
      .post('/api/audit')
      .send({ url: 'https://testsite.com/timeout' });

    expect(response.status).toBe(504);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Request timed out');
  });

  test('6. Website Unavailable - Should return 500 when remote website returns 5xx error', async () => {
    nock('https://testsite.com')
      .get('/down')
      .reply(500, 'Server Error', { 'content-type': 'text/html' });

    const response = await request(app)
      .post('/api/audit')
      .send({ url: 'https://testsite.com/down' });

    expect(response.status).toBe(500);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toContain('Website unavailable');
  });
});
