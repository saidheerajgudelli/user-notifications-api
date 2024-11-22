import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotificationLog } from './interfaces/notification-log.interface';
import { SendNotificationDto } from './dto/send-notification.dto';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel('NotificationLog') private notificationLogModel: Model<NotificationLog>,
  ) {}

  async sendNotification(sendNotificationDto: SendNotificationDto): Promise<NotificationLog> {
    const { userId, type, channel, content } = sendNotificationDto;

    // Simulate notification sending
    const notification = new this.notificationLogModel({
      userId,
      type,
      channel,
      status: 'sent', // You can simulate failure by changing this to 'failed'
      sentAt: new Date(),
      metadata: content,
    });

    return notification.save();
  }

  async getUserLogs(userId: string): Promise<NotificationLog[]> {
    return this.notificationLogModel.find({ userId });
  }

  async getStatistics(): Promise<any> {
    return this.notificationLogModel.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);
  }
}
