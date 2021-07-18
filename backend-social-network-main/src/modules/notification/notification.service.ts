import { Injectable } from "@nestjs/common";
import { NotificationPool } from "./notification-pool.interface";
@Injectable()
export class NotificationService {

    private readonly notifications: NotificationPool[] = [];
    
    create(data: NotificationPool) {
        this.notifications.push(data)
    }

    findAll(): NotificationPool[] {
        return this.notifications
    }
}