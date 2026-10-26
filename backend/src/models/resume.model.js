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

     extractedText :{
      type: string,
      required: true,
     }

    },
      {timestamps: true}
  );
  
  module.exports = mongoose.model("Resume", resumeSchema);