import express from 'express';

import healthCheckAction from '../controllers/health-check.js';

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

export default router;