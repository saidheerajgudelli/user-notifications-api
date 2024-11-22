import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserPreference } from './interfaces/user-preference.interface';
import { CreateUserPreferenceDto } from '../notifications/dto/create-user-preference.dto';
import { UpdateUserPreferenceDto } from '../notifications/dto/update-preference.dto';

@Injectable()
export class PreferencesService {
  constructor(
    @InjectModel('UserPreference') private userPreferenceModel: Model<UserPreference>,
  ) {}

  async create(createUserPreferenceDto: CreateUserPreferenceDto): Promise<UserPreference> {
    const createdPreference = new this.userPreferenceModel(createUserPreferenceDto);
    return createdPreference.save();
  }

  async findOne(userId: string): Promise<UserPreference> {
    const preference = await this.userPreferenceModel.findOne({ userId });
    if (!preference) {
      throw new NotFoundException(`Preference for user ${userId} not found`);
    }
    return preference;
  }

  async update(userId: string, updateUserPreferenceDto: UpdateUserPreferenceDto): Promise<UserPreference> {
    const updatedPreference = await this.userPreferenceModel.findOneAndUpdate(
      { userId },
      { ...updateUserPreferenceDto, lastUpdated: new Date() },
      { new: true },
    );
    if (!updatedPreference) {
      throw new NotFoundException(`Preference for user ${userId} not found`);
    }
    return updatedPreference;
  }

  async delete(userId: string): Promise<void> {
    const result = await this.userPreferenceModel.deleteOne({ userId });
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Preference for user ${userId} not found`);
    }
  }
  async findAll(): Promise<UserPreference[]> {
    return this.userPreferenceModel.find().exec();
  }
  
}
