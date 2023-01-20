import mongoose from 'mongoose';

export class Topic {
  title: string;
  content: string;
  creator: mongoose.Schema.Types.ObjectId;
  category: string;
  nonFictionPercentage: number;
  votesCount: number;
}
