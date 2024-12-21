import { model, Schema } from 'mongoose';
import { IBlog, TBlog } from './blog.interface';
import { AppError } from '../../errors/AppError';
import httpStatus from 'http-status';

const blogSchema = new Schema<TBlog, IBlog>(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

blogSchema.pre('findOneAndDelete', async function (next) {
  const query = this.getQuery();

  const isBlogExists = await BlogModel.findOne(query);
  if (!isBlogExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Blog does not exist');
  }

  next();
});

blogSchema.statics.isBlogExists = async function (
  title: string,
  author: Schema.Types.ObjectId,
) {
  return await BlogModel.findOne({ title, author });
};

blogSchema.statics.isBlogExistsById = async function (
  id: Schema.Types.ObjectId,
) {
  return await BlogModel.findOne({ _id: id });
};

export const BlogModel = model<TBlog, IBlog>('Blog', blogSchema);
