import { NotificationPool } from './notification-pool.interface';
export class CreateNotificationPoolDto implements NotificationPool {
  userId: number;
  notificationType: string;
  messageFrom: string;
  message: string;
}