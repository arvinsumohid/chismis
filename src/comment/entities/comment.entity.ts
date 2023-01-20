import mongoose from 'mongoose';

export class Comment {
  commentator: mongoose.Schema.Types.ObjectId;
  content: string;
  repliedCommentId: mongoose.Schema.Types.ObjectId;
}
