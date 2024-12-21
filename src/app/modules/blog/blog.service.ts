import httpStatus from 'http-status';
import { AppError } from '../../errors/AppError';
import { TBlog } from './blog.interface';
import { BlogModel } from './blog.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { Types } from 'mongoose';

// get all blogs from db here
const getAllBlogsFromDB = async (query: Record<string, unknown>) => {
  const searchableFields = ['title', 'content'];

  const blogQuery = new QueryBuilder(BlogModel.find(), query)
    .search(searchableFields)
    .filter()
    .sort()
    .populate(['author']);

  const result = await blogQuery.modelQuery;

  if (result.length === 0) {
    throw new AppError(httpStatus.NOT_FOUND, 'Blogs not found');
  }

  return result;
};

// create blog into db here
const createBlogIntoDB = async (payload: TBlog) => {
  const isBlogExists = await BlogModel.isBlogExists(
    payload.title,
    payload.author,
  );
  if (isBlogExists) {
    throw new AppError(httpStatus.CONFLICT, 'Blog already exists');
  }

  const result = (await BlogModel.create(payload)).populate('author');

  return result;
};

// update blog into db here
const updateBlogIntoDB = async (id: string, payload: Partial<TBlog>) => {
  const result = await BlogModel.findOneAndUpdate({ _id: id }, payload, {
    new: true,
    runValidators: true,
  }).populate('author');

  return result;
};

// delete blog from db here
const deleteBlogFromDB = async (id: string, authorId: Types.ObjectId) => {
  // checking if blog exists or not
  const isBlogExists = await BlogModel.isBlogExistsById(id);

  if (!isBlogExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Blog not found');
  }

  // checking if blog author is same as user id
  if (isBlogExists?.author.toString() !== authorId.toString()) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'You are not authorized to delete this blog',
    );
  }

  const result = await BlogModel.findOneAndDelete({ _id: id });
  return result;
};

export const BlogServices = {
  createBlogIntoDB,
  updateBlogIntoDB,
  deleteBlogFromDB,
  getAllBlogsFromDB,
};
