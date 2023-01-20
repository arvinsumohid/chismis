import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { Topic, TopicDocument } from './schema/topic.schema';

@Injectable()
export class TopicService {
  constructor(
    @InjectModel(Topic.name) private topicModel: Model<TopicDocument>,
  ) {}

  create(createTopicDto: CreateTopicDto): Promise<Topic> {
    const createdTopic = new this.topicModel(createTopicDto);
    return createdTopic.save();
  }

  findAll(): Promise<Topic[]> {
    return this.topicModel.find().exec();
  }

  findOne(id: string): Promise<Topic> {
    return this.topicModel.findById(id).exec();
  }

  update(id: string, updateTopicDto: UpdateTopicDto): Promise<TopicDocument> {
    return this.topicModel.findByIdAndUpdate(id, updateTopicDto).exec();
  }

  remove(id: string) {
    return this.topicModel.findByIdAndDelete(id).exec();
  }
}
