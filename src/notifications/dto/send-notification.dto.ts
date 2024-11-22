// src/notifications/dto/send-notification.dto.ts
import { IsNotEmpty, IsString, IsEnum } from 'class-validator';

export class SendNotificationDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsEnum(['marketing', 'newsletter', 'updates'])
  type: 'marketing' | 'newsletter' | 'updates';

  @IsNotEmpty()
  @IsEnum(['email', 'sms', 'push'])
  channel: 'email' | 'sms' | 'push';

  @IsNotEmpty()
  content: {
    subject: string;
    body: string;
  };
}
