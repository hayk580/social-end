import { IsEmpty, IsNotEmpty } from 'class-validator';

export class CreateMessageDto {
  @IsNotEmpty()
  to: string;

  @IsEmpty()
  from: string;

  @IsNotEmpty()
  text: string;
}
