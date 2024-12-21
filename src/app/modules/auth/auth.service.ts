import httpStatus from 'http-status';
import { AppError } from '../../errors/AppError';
import { TLoginUser, TUser } from '../user/user.interface';
import { UserModel } from '../user/user.model';
import config from '../../config';
import { createToken } from './auth.utils';

// user register service here
const registerUserIntoDB = async (payload: TUser) => {
  const result = await UserModel.create(payload);

  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user!');
  }
  return result;
};

// user login service here
const loginUserIntoDB = async (payload: TLoginUser) => {
  // checking if the user is exist
  const user = await UserModel.isUserExists(payload.email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }
  // checking if the user is blocked

  const isDeleted = user?.isBlocked;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked !');
  }

  //checking if the password is correct

  if (!(await UserModel.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');
  }

  //create token and sent to the  client
  const jwtPayload = {
    userEmail: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const AuthServices = {
  registerUserIntoDB,
  loginUserIntoDB,
};
