import { Router } from 'express';
import TeamsController from '../controller/teamsController';
import TeamsService from '../services/teamsService';

const router = Router();

const teamsService = new TeamsService();
const teamsController = new TeamsController(teamsService);

router.get('/', teamsController.getAllTeams.bind(teamsController));
router.get('/:id', teamsController.getByIdTeam.bind(teamsController));

export default router;
