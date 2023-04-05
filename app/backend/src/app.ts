import * as express from 'express';
import errorMiddleware from './middleware/error-middleware';
import teamsRouter from './routes/teamsRouter';
import loginRouter from './routes/loginRouter';
import matchesRouter from './routes/matchesRouter';
// import leaderBoardRouter from './routes/leaderBoardRouter';
import LeaderBoardController from './controller/leaderboardController';
import LeaderBoardService from './services/leaderboardService';

const leaderBoardService = new LeaderBoardService();
const leaderBoardController = new LeaderBoardController(leaderBoardService);

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.config();
    this.app.get('/', (req, res) => res.json({ ok: true }));
    this.app.get(
      '/leaderboard',
      leaderBoardController.generalReport.bind(leaderBoardController),
    );
    this.app.get(
      '/leaderboard/home',
      leaderBoardController.report.bind(leaderBoardController),
    );
    this.app.get(
      '/leaderboard/away',
      leaderBoardController.report.bind(leaderBoardController),
    );
    this.routes();
  }

  private config(): void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };
    this.app.use(express.json());
    this.app.use(accessControl);
  }

  private routes(): void {
    this.app.use('/teams', teamsRouter);
    this.app.use('/login', loginRouter);
    this.app.use('/matches', matchesRouter);
    // this.app.use('/leaderboard', leaderBoardRouter);
    this.app.use(errorMiddleware);
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

export const { app } = new App();
