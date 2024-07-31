import { Test, TestingModule } from '@nestjs/testing';
import { HealthersController } from './healthers.controller';

describe('HealthersController', () => {
  let controller: HealthersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthersController],
    }).compile();

    controller = module.get<HealthersController>(HealthersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
