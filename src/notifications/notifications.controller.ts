import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { SendNotificationDto } from './dto/send-notification.dto';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post('send')  //     Ensure this is a POST request, not GET
  async sendNotification(@Body() sendNotificationDto: SendNotificationDto) {
    console.log('Received Notification:', sendNotificationDto);
    return this.notificationsService.sendNotification(sendNotificationDto);
  }

  @Get(':userId/logs')
  async getUserLogs(@Param('userId') userId: string) {
    return this.notificationsService.getUserLogs(userId);
  }

  @Get('stats')
  async getStatistics() {
    return this.notificationsService.getStatistics();
  }
}
