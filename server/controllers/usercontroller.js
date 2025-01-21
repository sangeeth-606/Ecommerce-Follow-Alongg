const user = require('../models/user');
const bcrypt = require('bcrypt');
const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if the user already exists
        const existingUser = await user.findOne({ email });
        if (existingUser) {
            return res.status(409).send({ error: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new user({ name, email, password: hashedPassword });
        await newUser.save();
        res.status(201).send({ message: 'User created successfully', user: newUser });
    } catch (error) {
        console.log(error)
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