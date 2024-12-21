/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export type TUser = {
  name: string;
  email: string;
  password: string;
  passwordChangedAt?: Date;
  role: 'admin' | 'user';
  isBlocked: boolean;
};

export type TLoginUser = {
  email: string;
  password: string;
};

export interface IUser extends Model<TUser> {
  isUserExists(email: string): Promise<TUser>;

  isPasswordMatched(
    myPlaintextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;

  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
  ): boolean;
}

export type TUserRole = keyof typeof USER_ROLE;
