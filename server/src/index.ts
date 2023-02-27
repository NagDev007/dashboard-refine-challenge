import express, { Request, Response, Express, NextFunction } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { defaultConfiguration } from "./configs";
import { connectDB } from "./database/";
import { Logging } from "./lib";
import errorHandlerMiddleware from "./middlewares/error-handler";
import notFoundMiddleware from "./middlewares/not-found";

const app: Express = express();
app.use(cors());
app.use((req: Request, res: Response, next: NextFunction) => {
  Logging.info(
    `Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]`
  );
  res.on("finish", () => {
    Logging.info(
      `Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`
    );
  });
  next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text({ type: "text/html" }));
app.use(bodyParser.json());

/**
 * @description set the timeout
 */
const apiTimeout = 120 * 1000;

/**
 * @description Rules of API
 */

app.use((req: Request, res: Response, next: NextFunction) => {
  // Set the timeOut for all HTTP requests
  req.setTimeout(apiTimeout, () => {
    const err: any = new Error("Request Timeout");
    err.status = 408;
    next(err);
  });
  // Set the server response timeOut for all HTTP requests
  res.setTimeout(apiTimeout, () => {
    const err: any = new Error("Service Unavailable");
    err.status = 503;
    next(err);
  });
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    res.status(200).json({});
  }
  next();
});


/**
 * @description HealthCheck
 */
app.get("/ping", (req, res) =>
  res.status(200).json({ message: "ping dashboard refine succeful" })
);

// adt.start()

app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);
const startServer = async () => {
  try {
    await connectDB({ url: defaultConfiguration.mongo.url });
    app.listen(defaultConfiguration.server.port, () => {
      Logging.info(
        `server running on ${defaultConfiguration.server.port} port`
      );
    });
  } catch (error) {
    Logging.error(`Error => ${defaultConfiguration.mongo.url}`);
  }
};

startServer();
