const userModel = require('../models/user_model');
const bcrypt = require('bcrypt');
const asyncHandler = require("express-async-handler");

const hashPassword = (password) => {
    let hashedPassword;
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, (err, hash) => {
            if (!err) {
                hashedPassword = hash;
                resolve(hashedPassword);
            } else {
                reject(null);
            }
        });
    });
}
const addUser = asyncHandler(async (req, res) => {
    try {
        const {name, email, password} = req.body;
        if (!name || !email || !password) {
            res.status(400).json({message: 'insufficient params'});
        } else {
            const hashedPassword = await hashPassword(password);
            if (!hashedPassword) {
                res.status(400).json({message: 'unacceptable password'});
            } else {
                const user = await userModel.create({
                    name,
                    email,
                    password: hashedPassword,
                });
                if (!user) {
                    res.status(500).json({message: 'Cannot create user'});
                } else {
                    console.log(user);
                    res.json(user);
                }
            }
        }
    } catch (e) {
        console.log(e);
        throw new Error('Cannot create user');
    }
});

module.exports = {addUser};
