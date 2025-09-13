import { Test, TestingModule } from '@nestjs/testing';
import { BucketListController } from './bucket-list.controller';

describe('BucketListController', () => {
  let controller: BucketListController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BucketListController],
    }).compile();

    controller = module.get<BucketListController>(BucketListController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
