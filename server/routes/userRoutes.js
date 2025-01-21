const express = require('express');
const { createUser, getUsers } = require('../controllers/usercontroller');

const router = express.Router();

router.post('/signup', createUser);
router.get('/users', getUsers);

module.exports = router;
