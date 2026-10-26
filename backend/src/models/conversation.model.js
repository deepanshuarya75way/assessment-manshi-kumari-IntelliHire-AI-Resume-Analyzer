const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
  {
   

    UserId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,

      },

     resumeId: {
       type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
      required: true,
      index: true,

     }
    },
      {timestamps: true}
  );
  conversationSchema.index({userId: 1, resumeId: 1},{
    unique:true
  });
  module.exports = mongoose.model("Conversation", conversationSchema);