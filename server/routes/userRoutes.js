const express = require('express');
const { createUser, getUsers,loginUser } = require('../controllers/usercontroller');
const router = express.Router();

router.post('/signup', createUser);
router.post('/login', loginUser);
router.get('/users', getUsers);

module.exports = router;
