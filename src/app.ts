import * as dotenv from "dotenv";

dotenv.config();
import express from 'express';
import routes from './routes';


class App {
  private app: express.Application

  constructor(){
    this.app = express();
    this.middlewares();
  }

  private middlewares(){
    this.app.use(express.json());
    this.app.use(routes);
  }

  public init(){
    const port: number = Number(process.env.PORT) || 3031;
    this.app.listen(port);
  }

}


export default App;