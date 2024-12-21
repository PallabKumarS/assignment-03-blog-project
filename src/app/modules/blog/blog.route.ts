import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { blogValidations } from './blog.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import { BlogController } from './blog.controller';

const router = express.Router();

router.get('', BlogController.getAllBlogs);

router.post(
  '',
  validateRequest(blogValidations.blogCreateValidationSchema),
  auth(USER_ROLE.user),
  BlogController.createBlog,
);

router.patch(
  '/:id',
  auth(USER_ROLE.user),
  validateRequest(blogValidations.blogUpdateValidationSchema),
  BlogController.updateBlog,
);

router.delete('/:id', auth(USER_ROLE.user), BlogController.deleteBlog);

export const BlogRoutes = router;
