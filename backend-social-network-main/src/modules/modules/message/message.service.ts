import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message, MessageDocument } from './entities/message.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name)
    private readonly messageModel: Model<MessageDocument>,
  ) {}

  create(createMessageDto: CreateMessageDto): Promise<MessageDocument> {
    const createdMessage = new this.messageModel(createMessageDto);
    return createdMessage.save();
  }

  findAll(
    params: FilterQuery<MessageDocument> = {},
  ): Promise<MessageDocument[]> {
    return this.messageModel
      .find({
        ...params,
      })
      .exec();
  }

  findOne(id: string): Promise<MessageDocument> {
    return this.messageModel.findById(id).exec();
  }

  update(
    id: string,
    updateMessageDto: UpdateMessageDto,
  ): Promise<MessageDocument> {
    return this.messageModel
      .findByIdAndUpdate(id, updateMessageDto, { upsert: false, new: true })
      .exec();
  }

  remove(id: string): Promise<MessageDocument> {
    return this.messageModel.findByIdAndDelete(id).exec();
  }
}
