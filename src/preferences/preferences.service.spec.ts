import { Test, TestingModule } from '@nestjs/testing';
import { PreferencesService } from './preferences.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserPreferenceDto } from '../notifications/dto/create-user-preference.dto';

describe('PreferencesService', () => {
  let service: PreferencesService;
  let model: Model<any>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PreferencesService,
        {
          provide: getModelToken('UserPreference'),
          useValue: {
            create: jest.fn(), // Explicitly mock this as a Jest function
            findOne: jest.fn(),
            findOneAndUpdate: jest.fn(),
            deleteOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PreferencesService>(PreferencesService);
    model = module.get<Model<any>>(getModelToken('UserPreference'));
  });

  it('should create a preference', async () => {
    const dto: CreateUserPreferenceDto = {
      userId: 'user1',
      email: 'test@example.com',
      preferences: {
        marketing: true,
        newsletter: false,
        updates: true,
        frequency: 'weekly', // This is valid as per the enum definition
        channels: {
          email: true,
          sms: false,
          push: true,
        },
      },
      timezone: 'UTC',
    };

    (model.create as jest.Mock).mockResolvedValue(dto); // Explicitly cast and mock return value

    const result = await service.create(dto);
    expect(result).toEqual(dto);
    expect(model.create).toHaveBeenCalledWith(dto);
  });
});
