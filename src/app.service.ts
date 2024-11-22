import { Injectable, OnModuleInit } from '@nestjs/common';
import { Mongoose } from 'mongoose';
import { InjectConnection } from '@nestjs/mongoose';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(@InjectConnection() private readonly mongoose: Mongoose) {}

  async onModuleInit() {
    try {
      // Check if Mongoose is connected
      const connectionStatus = this.mongoose.connection.readyState;
      if (connectionStatus === 1) {
        console.log('Database connection successful');
      } else {
        console.log('Database connection failed');
      }
    } catch (error) {
      console.error('Database connection error:', error);
    }
  }
}
