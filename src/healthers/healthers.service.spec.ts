import { Test, TestingModule } from '@nestjs/testing';
import { HealthersService } from './healthers.service';

describe('HealthersService', () => {
  let service: HealthersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HealthersService],
    }).compile();

    service = module.get<HealthersService>(HealthersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
