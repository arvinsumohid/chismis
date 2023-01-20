import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from '../../user/schema/user.schema';

export type CommentDocument = HydratedDocument<Comment>;

@Schema({ timestamps: true })
export class Comment {
  @Prop({ required: true })
  content: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: () => User,
  })
  creator: User;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: () => Comment,
  })
  repliedCommentId: Comment;

  @Prop()
  createdAt?: true;

  @Prop()
  updatedAt?: true;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
