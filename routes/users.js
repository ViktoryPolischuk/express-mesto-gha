const express = require('express');
const {
  getUsers,
  getCurrentUser,
  getUserById,
  updateUser,
  updateUserAvatar,
} = require('../controllers/users');
const { validateUserId, validateUser, validateAvatar } = require('../utils/validators/users');

const router = express.Router();

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', validateUserId, getUserById);
router.patch('/me', validateUser, updateUser);
router.patch('/me/avatar', validateAvatar, updateUserAvatar);

module.exports = router;
