const { Schema, model } = require('mongoose');


const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    username: {
      type: String,
      required: true,
      
    },
    reactions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Reaction',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);
ThoughtSchema.vitual('reactionCount').get(function(){
  return this.reactions.length;
});
const ReactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username:{
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;
