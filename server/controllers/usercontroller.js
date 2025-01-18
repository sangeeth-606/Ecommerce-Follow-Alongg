const user = require('../models/user');

const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const newUser = new user({ name, email, password });
        await newUser.save();
        res.status(201).send({ message: 'User created successfully', user: newUser });
    } catch (error) {
        res.status(500).send({ error: 'Error creating user' });
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await user.find();
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send({ error: 'Error fetching users' });
    }
};

module.exports = { createUser, getUsers };
