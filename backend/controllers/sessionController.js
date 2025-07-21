import Session from "../models/Session.js";

export const createSession = async (req, res) => {
  try {
    const { sessionName, createdBy } = req.body;
    const session = new Session({
      sessionName,
      createdBy,
      participants: [createdBy]
    });
    const savedSession = await session.save();
    res.status(201).json(savedSession);
  } catch (error) {
    console.error("❌ Error creating session:", error);
    res.status(500).json({ error: 'Failed to create session' });
  }
};

export const getUserSessions = async (req, res) => {
  try {
    const userId = req.params.userId;
    const sessions = await Session.find({ participants: userId });
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch sessions' });
  }
};

export const joinSession = async (req, res) => {
  try {
    const { sessionId, userId } = req.body;
    const session = await Session.findById(sessionId);
    if (session && !session.participants.includes(userId)) {
      session.participants.push(userId);
      await session.save();
    }
    res.json(session);
  } catch (error) {
    res.status(500).json({ error: 'Failed to join session' });
  }
};
