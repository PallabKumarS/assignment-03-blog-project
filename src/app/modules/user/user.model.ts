import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../config';
import { IUser, TUser } from './user.interface';
import { optional } from 'zod';

const userSchema = new Schema<TUser, IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    passwordChangedAt: {
      type: Date,
      optional,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  // hashing password and save into DB
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds) || 10,
  );
  next();
});

// set '' after saving password
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

userSchema.statics.isUserExists = async function (email: string) {
  return await UserModel.findOne({ email }).select('+password');
};

userSchema.statics.isPasswordMatched = async function (
  myPlaintextPassword,
  hashedPassword,
) {
  return bcrypt.compare(myPlaintextPassword, hashedPassword);
};

userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
  passwordChangedTimestamp: Date,
  jwtIssuedTimestamp: number,
) {
  return (
    new Date(passwordChangedTimestamp).getTime() / 1000 > jwtIssuedTimestamp
  );
};

export const UserModel = model<TUser, IUser>('User', userSchema);
