const express = require('express');

const healthCheckAction = require('../controllers/health-check');

const router = express.Router();
/**
 * @openapi
 * /health-check:
 *   get:
 *     tags:
 *       - Health Check
 *     description: Health check endpoint
 *     responses:
 *       200:
 *         description: Returns an ok status
 */
router.get('/health-check', healthCheckAction);

module.exports = router;