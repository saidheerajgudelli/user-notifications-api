import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // Import the ConfigModule to handle environment variables
import { MongooseModule } from '@nestjs/mongoose'; // Import the MongooseModule to connect to MongoDB
import { PreferencesModule } from './preferences/preferences.module'; // Custom module for user preferences
import { NotificationsModule } from './notifications/notifications.module'; // Custom module for notifications
import { AppController } from './app.controller'; // Main controller of the app
import { AppService } from './app.service'; // Main service of the app

@Module({
  imports: [
    // ConfigModule is used to load .env variables into the app
    ConfigModule.forRoot({
      isGlobal: true, // Makes the config globally available throughout the application
      envFilePath: '.env', // Path to the .env file containing environment variables
    }),

    // MongooseModule is used to connect to MongoDB, with the URI fetched from the .env file
    MongooseModule.forRootAsync({
      useFactory: async () => ({
        uri: 'mongodb+srv://saidheerajgudelli:dheeraj11@cluster0.g3nmk.mongodb.net/', // Fetch MongoDB URI from environment variable
      }),
    }),

    // Import custom modules for managing user preferences and notifications
    PreferencesModule, // Module for managing user preferences
    NotificationsModule, // Module for handling notifications
  ],
  controllers: [AppController], // Main controller for handling requests
  providers: [AppService], // Main service for handling business logic
})
export class AppModule {
  constructor() {
    console.log('MONGO_URI:', process.env.MONGO_URI); // Log MONGO_URI for debugging (be cautious in production)
  }
}
