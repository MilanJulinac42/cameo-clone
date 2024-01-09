import express, { Request, Response } from "express";
import http from "http";
import mongoose from "mongoose";
import { config } from "./config/config";
import Logging from "./library/Loggin";

const app = express();

mongoose
    .connect(config.mongo.url, config.mongo.options)
    .then(() => {
        Logging.info(`Connected to MongoDB.`);
        StartServer();
    })
    .catch((error) => {
        Logging.error("Failed to connect");
        Logging.error(error);
    });

const StartServer = () => {
    app.use((req, res, next) => {
        Logging.info(
            `Incoming -> Method: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`
        );

        res.on("finish", () => {
            Logging.info(
                `Incoming -> Method: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status [${res.statusCode}]`
            );
        });

        next();
    });

    // app.use(cors({ origin: "http://localhost:3000", credentials: true }));
    // app.use(express.urlencoded({ extended: true }));
    // app.use(express.json());
    // app.use(cookieParser());

    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "http://localhost:3000");
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept, Authorization"
        );

        if (req.method == "OPTIONS") {
            res.header(
                "Access-Control-Allow-Methods",
                "PUT, POST, PATCH, DELETE, GET"
            );
            return res.status(200).json({});
        }

        next();
    });

    app.get("/ping", (req, res, next) =>
        res.status(200).json({ message: "ping" })
    );

    app.use((req, res, next) => {
        const error = new Error("not-found");
        Logging.error(error);

        return res.status(404).json({ message: error.message });
    });

    http.createServer(app).listen(config.server.port, () =>
        Logging.info(`Server is running on port ${config.server.port}.`)
    );
};
