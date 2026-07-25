const express = require('express');
const router = express.Router();
const { performAudit } = require('../controllers/auditController');

// POST /api/audit
router.post('/audit', performAudit);

module.exports = router;
