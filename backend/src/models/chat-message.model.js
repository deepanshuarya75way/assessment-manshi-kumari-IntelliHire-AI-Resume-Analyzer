const mongoose = require("mongoose");

const chatMessageSchema = new mongoose.Schema(
  {
    conversationId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
      index: true
    },

    UserId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,

      },

      role:{
        type: String,
        enum: ["user", "assistant"],
        required: true
      },

      content:{
        type: String,
        required: true,
        trim: true,
        maxlength: 4000
      }
    },
      {timestamps: true}
  );
  chatMessageSchema.index({conversationId: 1, createdAt: 1});
  module.exports = mongoose.model("chatMeassage", chatMessageSchema);