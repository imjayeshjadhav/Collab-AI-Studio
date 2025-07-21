import express from "express";
import {
  createSession,
  getUserSessions,
  joinSession
} from "../controllers/sessionController.js";
const router = express.Router();

router.post("/create", createSession);
router.get("/user/:userId", getUserSessions);
router.post("/join", joinSession);

export const sessionRoutes = router;
