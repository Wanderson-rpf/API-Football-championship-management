import { Router } from 'express';
import MatchesService from '../services/matchesService';
import MatchesController from '../controller/matchesController';

const router = Router();

const matcherService = new MatchesService();
const matchesController = new MatchesController(matcherService);

router.get('/', matchesController.getAllMatches.bind(matchesController));

export default router;
