const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const{
  getConversation ,
  sendMessage,
} = require("../controllers/chat.controller");

const router = express.Router();

router.use(authMiddleware);

router.get("/:resumeId", getConversation);

router.post("/:resumeId/messages", sendMessage);

module.exports = router;