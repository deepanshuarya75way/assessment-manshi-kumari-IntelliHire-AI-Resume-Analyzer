const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
  {
   

    UserId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,

      },

     fileName: {
       type: string,
      required: true,
      trim:true,
     },

     extractedText{
      type:
     }

    },
      {timestamps: true}
  );
  conversationSchema.index({userId: 1, resumeId: 1},{
    unique:true
  });
  module.exports = mongoose.model("Conversation", conversationSchema);