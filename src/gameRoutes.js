import { Router } from 'express';

const router = Router();

/**
 * GET /api/game
 */
router.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


export default router;
