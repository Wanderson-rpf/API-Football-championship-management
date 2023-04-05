import { Router } from 'express';
import LeaderBoardService from '../services/leaderboardService';
import LeaderBoardController from '../controller/leaderboardController';

const router = Router();

const leaderBoardService = new LeaderBoardService();
const leaderBoardController = new LeaderBoardController(leaderBoardService);

router.get(
  '/home',
  leaderBoardController.reportHome.bind(leaderBoardController),
);

router.get(
  '/away',
  leaderBoardController.reportAway.bind(leaderBoardController),
);

// router.get(
//   '/',
//   leaderBoardController.generalReport.bind(leaderBoardController),
// );

export default router;
