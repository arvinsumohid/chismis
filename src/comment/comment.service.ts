import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment, CommentDocument } from './schema/comment.schema';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
  ) {}

  create(createCommentDto: CreateCommentDto): Promise<Comment> {
    const createdComment = new this.commentModel(createCommentDto);
    return createdComment.save();
  }

  findAll(): Promise<Comment[]> {
    return this.commentModel.find().exec();
  }

  findOne(id: number): Promise<Comment> {
    return this.commentModel.findById(id).exec();
  }

  update(
    id: number,
    updateCommentDto: UpdateCommentDto,
  ): Promise<CommentDocument> {
    return this.commentModel.findByIdAndUpdate(id, updateCommentDto).exec();
  }

  remove(id: number) {
    return this.commentModel.findByIdAndDelete(id).exec();
  }
}
