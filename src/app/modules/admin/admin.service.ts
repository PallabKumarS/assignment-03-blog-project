import httpStatus from 'http-status';
import { AppError } from '../../errors/AppError';
import { BlogModel } from '../blog/blog.model';
import { UserModel } from '../user/user.model';

// update user block status into db here
const updateBlockStatusIntoDB = async (userId: string) => {
  const isUserExists = UserModel.findOne({ _id: userId });

  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  const result = await UserModel.findOneAndUpdate(
    { _id: userId },
    { isBlocked: true },
  );

  return result;
};

// delete any blog from db here
const deleteAnyBlogFromDB = async (id: string) => {
  const isBlogExists = await BlogModel.isBlogExistsById(id);

  if (!isBlogExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Blog not found');
  }

  const result = await BlogModel.findOneAndDelete({ _id: id });

  return result;
};

export const AdminService = {
  deleteAnyBlogFromDB,
  updateBlockStatusIntoDB,
};
