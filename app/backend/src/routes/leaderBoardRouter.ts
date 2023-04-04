import { Router } from 'express';
import LeaderBoardService from '../services/leaderboardService';
import LeaderBoardController from '../controller/leaderboardController';

const router = Router();

const leaderBoardService = new LeaderBoardService();
const leaderBoardController = new LeaderBoardController(leaderBoardService);

router.get(
  '/home',
  leaderBoardController.report.bind(leaderBoardController),
)
  .get(
    '/away',
    leaderBoardController.report.bind(leaderBoardController),
  );

export default router;
