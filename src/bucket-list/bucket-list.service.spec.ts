import { Test, TestingModule } from '@nestjs/testing';
import { BucketListService } from './bucket-list.service';

describe('BucketListService', () => {
  let service: BucketListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BucketListService],
    }).compile();

    service = module.get<BucketListService>(BucketListService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
