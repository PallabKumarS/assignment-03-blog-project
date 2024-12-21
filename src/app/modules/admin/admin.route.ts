import express from 'express';
import { AdminController } from './admin.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.patch(
  '/users/:userId/block',
  auth(USER_ROLE.admin),
  AdminController.updateBlockStatus,
);

router.delete(
  '/blogs/:id',
  auth(USER_ROLE.admin),
  AdminController.deleteAnyBlog,
);

export const AdminRoutes = router;
