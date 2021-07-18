import { CreateNotificationPoolDto } from './notification-pool.dto';
import { NotificationService } from './notification.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { NotificationPool } from './notification-pool.interface';
@Controller('notification')
export class NotificationController {
  constructor(private notificationService: NotificationService) {}
@Post()
  async create(@Body() createNotificationPoolDto: CreateNotificationPoolDto) {
    this.notificationService.create(createNotificationPoolDto);
  }
@Get()
  async findAll(): Promise<NotificationPool[]> {
    return this.notificationService.findAll();
  }
}
