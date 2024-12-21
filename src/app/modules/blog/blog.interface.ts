/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';

export type TBlog = {
  title: string;
  content: string;
  author: Types.ObjectId;
  isPublished: boolean;
};

export interface IBlog extends Model<TBlog> {
  isBlogExists(title: string, author: Types.ObjectId): Promise<TBlog>;
  isBlogExistsById(id: string): Promise<TBlog>;
}
