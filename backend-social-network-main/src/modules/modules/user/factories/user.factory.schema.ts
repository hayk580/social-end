import * as bcrypt from 'bcrypt';

import { UsersSchema, UserDocument } from '../entities/user.entity';

export const userSchemaFactory = () => {
  const schema = UsersSchema;
  schema.pre<UserDocument>(['save', 'updateOne'], function (next: () => void) {
    const user = this as UserDocument;
    if (!user.isModified('password')) return next();
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(user.password, salt);
    next();
  });
  return schema;
};
