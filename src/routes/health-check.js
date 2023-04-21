const express = require('express');

const healthCheckAction = require('../controllers/health-check');

const router = express.Router();

router.get('/health-check', healthCheckAction);

module.exports = router;