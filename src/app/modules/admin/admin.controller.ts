import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AdminService } from './admin.service';

// update block status here
const updateBlockStatus = catchAsync(async (req, res) => {
  const { userId } = req.params;
  await AdminService.updateBlockStatusIntoDB(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User blocked successfully',
  });
});

// delete any blog here
const deleteAnyBlog = catchAsync(async (req, res) => {
  const { id } = req.params;

  await AdminService.deleteAnyBlogFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog deleted successfully',
  });
});

export const AdminController = {
  deleteAnyBlog,
  updateBlockStatus,
};
