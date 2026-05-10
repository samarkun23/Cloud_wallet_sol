import { Router } from "express";
import { authRouter } from "./auth/auth";
import { calanderRouter } from "./calander/calander";
import { authMiddleware } from "../middleware/authMiddleware";

const featureRouter = Router();

featureRouter.use("/auth", authRouter)
featureRouter.use("/calander", authMiddleware, calanderRouter)


export {featureRouter}