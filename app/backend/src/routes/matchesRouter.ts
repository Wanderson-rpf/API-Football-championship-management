import { Router } from 'express';
import MatchesService from '../services/matchesService';
import MatchesController from '../controller/matchesController';
import validateToken from '../middleware/validateToken';
import TeamValidations from '../validations/team/teamValidations';

const router = Router();

const teamValidations = new TeamValidations();
const matcherService = new MatchesService(teamValidations);
const matchesController = new MatchesController(matcherService);

router.get(
  '/',
  matchesController.getAllMatches.bind(matchesController),
)
  .patch(
    '/:id/finish',
    validateToken,
    matchesController.updateStatusMatches.bind(matchesController),
  )
  .patch(
    '/:id',
    validateToken,
    matchesController.updateScoreBoardMatches.bind(matchesController),
  )
  .post(
    '/',
    validateToken,
    matchesController.addNewMatch.bind(matchesController),
  );

export default router;
