// src/preferences/interfaces/user-preference.interface.ts

export interface UserPreference {
    userId: string;
    preferences: {
      [key: string]: any; // Define more specific types depending on your use case
    };
  }
  