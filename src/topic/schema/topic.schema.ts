import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from '../../user/schema/user.schema';

export type TopicDocument = HydratedDocument<Topic>;

enum CategoryOption {
  General = 'general',
  Showbiz = 'showbiz',
}

@Schema({ timestamps: true })
export class Topic {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: () => User,
  })
  creator: User;

  @Prop({ required: true })
  category: CategoryOption;

  @Prop()
  nonfictionPercentage: number;

  @Prop()
  votesTotal: number;

  @Prop()
  createdAt?: true;

  @Prop()
  updatedAt?: true;
}

export const TopicSchema = SchemaFactory.createForClass(Topic);
