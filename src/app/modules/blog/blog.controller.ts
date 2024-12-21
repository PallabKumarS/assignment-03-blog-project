import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BlogServices } from './blog.service';
import { AppError } from '../../errors/AppError';

// getting all blogs here
const getAllBlogs = catchAsync(async (req, res) => {
  const result = await BlogServices.getAllBlogsFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blogs retrieved successfully',
    data: result,
  });
});

// creating blogs here
const createBlog = catchAsync(async (req, res) => {
  const { _id, title, content, author } = await BlogServices.createBlogIntoDB(
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Blog created successfully',
    data: { _id: _id, title: title, content: content, author: author },
  });
});

// updating blogs here
const updateBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  if (!title && !content) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Title or content cannot be empty',
    );
  }

  const result = await BlogServices.updateBlogIntoDB(
    id,
    {
      title,
      content,
    },
    req?.body?.author,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog updated successfully',
    data: result,
  });
});

// delete blog here
const deleteBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  await BlogServices.deleteBlogFromDB(id, req?.body?.author);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog deleted successfully',
  });
});

export const BlogController = {
  createBlog,
  updateBlog,
  deleteBlog,
  getAllBlogs,
};
