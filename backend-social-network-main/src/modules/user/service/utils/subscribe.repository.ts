import { Injectable } from '@nestjs/common';
import { Model, ObjectId } from 'mongoose';
import { User, UserDocument } from '../../schema/User';
import { AdvancedRepositoryType } from '../user.repository';
import { InjectModel } from '@nestjs/mongoose';

export type Continues = { start: boolean; message: string[] };

@Injectable()
export default class SubscribeRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async removeAllSubscribers(id: ObjectId): Promise<User> {
    return this.userModel.findByIdAndUpdate({ _id: id }, { subscribers: [] });
  }

  async removeAllSubscriptions(id: ObjectId): Promise<User> {
    return this.userModel.findByIdAndUpdate({ _id: id }, { subscriptions: [] });
  }

  async subscribeTo(
    idSender: ObjectId,
    idRecipient: ObjectId,
  ): Promise<
    AdvancedRepositoryType<User[]> | AdvancedRepositoryType<string[]>
  > {
    const sender = await this.userModel.findById(idSender);
    const recipient = await this.userModel.findById(idRecipient);

    const continues: Continues = { start: false, message: [] };

    if (!sender) {
      continues.start = true;
      continues.message.push('follower not found');
    }
    if (!recipient) {
      continues.start = true;
      continues.message.push(
        'user not found',
      );
    }
    recipient.subscribers.forEach((sub) => {
      if (String(sub) === String(sender._id)) {
        continues.start = true;
        continues.message.push('double subscribe');
      }
    });
    if (sender._id === recipient._id) {
      continues.start = true;
      continues.message.push('wtf???');
    }
    if (!continues.start) {
      const updSender = await this.userModel.findByIdAndUpdate(
        { _id: sender._id },
        {
          subscriptions: [...sender.subscriptions, recipient._id],
        },
      );
      const updRecipient = await this.userModel.findByIdAndUpdate(
        { _id: recipient._id },
        {
          subscribers: [...recipient.subscribers, sender._id],
        },
      );

      return { errors: continues.start, message: [updSender, updRecipient] };
    }
    return { errors: continues.start, message: continues.message };
  }

  async unsubscribeTo(
    idSender: ObjectId,
    idRecipient: ObjectId,
  ): Promise<
    AdvancedRepositoryType<User[]> | AdvancedRepositoryType<string[]>
  > {
    const sender = await this.userModel.findById(idSender);
    const recipient = await this.userModel.findById(idRecipient);

    const continues: Continues = { start: false, message: [] };

    if (!sender) {
      continues.start = true;
      continues.message.push('follower not found');
    }
    if (!recipient) {
      continues.start = true;
      continues.message.push(
        'user not found',
      );
    }
    if (sender._id === recipient._id) {
      continues.start = true;
      continues.message.push('wtf???');
    }

    const updSubscriptions = sender.subscriptions.filter(
      (sub) => String(sub) !== String(recipient._id),
    );
    const updSubsribers = recipient.subscribers.filter(
      (sub) => String(sub) !== String(sender._id),
    );
    if (!continues.start) {
      const updSender = await this.userModel.findByIdAndUpdate(
        { _id: idSender },
        {
          subscriptions: updSubscriptions,
        },
      );
      const updRecipient = await this.userModel.findByIdAndUpdate(
        { _id: idRecipient },
        {
          subscribers: updSubsribers,
        },
      );

      return { errors: continues.start, message: [updRecipient, updSender] };
    }

    return { errors: continues.start, message: continues.message };
  }
}
