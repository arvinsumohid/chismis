import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { Topic, TopicDocument } from './schema/topic.schema';
import { TopicService } from './topic.service';

describe('TopicService', () => {
  let service: TopicService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TopicService,
        {
          provide: getModelToken(Topic.name),
          useValue: Model<TopicDocument>,
        },
      ],
    }).compile();

    service = module.get<TopicService>(TopicService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
