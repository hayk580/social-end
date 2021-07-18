import { MessageService } from './../message/message.service';
import { UserService } from './../user/user.service';
import { WsAuthStrategy } from '../../modules/auth/strategies/ws-auth.strategy';
import { UserDocument } from './../user/entities/user.entity';
import { Logger } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { getUserFromWSToken } from '../auth/utils/validate-user-ws';
import { Server, Socket } from 'socket.io';
import { CreateMessageDto } from '../message/dto/create-message.dto';

interface SocketWithUserData extends Socket {
  user: Partial<UserDocument>;
}

@WebSocketGateway(3002, { namespace: 'chat' })
export class ChatGateway {
  @WebSocketServer()
  private readonly server: Server;

  constructor(
    private readonly wsAuthStrategy: WsAuthStrategy,
    private readonly userService: UserService,
    private readonly messageService: MessageService,
  ) {}

  async handleConnection(socket: SocketWithUserData): Promise<void> {
    const logger = new Logger();
    try {
      // get user from token
      const userFromSocket = await this.wsAuthStrategy.validate(
        getUserFromWSToken(socket.handshake),
      );
      // update user online status
      const updatedUser = await this.userService.update(userFromSocket.id, {
        online: true,
      });
      // set user on socket
      socket.user = updatedUser;
      logger.verbose('Client connected to chat');
      // retrieve connected users
      const connectedUsers = await this.userService.findAll();
      // join user to a chat room (private)
      socket.join(updatedUser.id);
      this.server.emit('online-users', connectedUsers);
    } catch (e) {
      logger.error(
        'Socket disconnected within handleConnection() in AppGateway:',
        e,
      );
      socket.disconnect();
      return;
    }
  }

  async handleDisconnect(client: SocketWithUserData) {
    const logger = new Logger();
    try {
      // update user online status to false
      const user = client.user;
      await this.userService.update(user.id, {
        online: false,
      });
      // retrieve connected users
      const connectedUsers = await this.userService.findAll();
      this.server.emit('online-users', connectedUsers);
      logger.warn('Client disconnected: chat');
    } catch (error) {
      logger.error('Disconection with errors');
    }
  }

  @SubscribeMessage('private-message')
  async handleMessage(@MessageBody() message: CreateMessageDto): Promise<void> {
    const createMessage = await this.messageService.create(message);
    this.server.to(message.to).emit('private-message', createMessage);
    this.server.to(message.from).emit('private-message', createMessage);
  }
}
