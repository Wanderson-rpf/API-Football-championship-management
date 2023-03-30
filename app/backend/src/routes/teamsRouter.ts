import { Router } from 'express';
import TeamsController from '../controller/teamsController';
import TeamsService from '../services/teamsService';

const router = Router();

const teamsService = new TeamsService();
const teamsController = new TeamsController(teamsService);

router.get('/teams', teamsController.getAllTeams.bind(teamsController));
router.get('/teams/:id', teamsController.getByIdTeam.bind(teamsController));

export default router;
