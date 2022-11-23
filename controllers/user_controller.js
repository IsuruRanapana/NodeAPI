const userModel = require('../models/user_model');
const bcrypt = require('bcrypt');
const webToken = require('jsonwebtoken');
const asyncHandler = require("express-async-handler");
const {compare} = require("bcrypt");

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

const comparePassword = (password, hashedPassword) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hashedPassword, (err, result) => {
            if (!err) {
                resolve(result);
            } else {
                reject(null);
            }
        })
    });
}

const login = asyncHandler(async (req, res) => {
    try {
        const {email, password} = req.body;
        if (!email || !password) {
            res.status(400).json({message: 'email and password are required'});
        } else {
            const user = await userModel.findOne({email});
            if(!user){
                res.status(401).json({message: 'user not found'});
            }else{
                const validation = await comparePassword(password,user.password);
                if(!validation){
                    res.status(401).json({message: 'unauthorized'});
                }else{
                    const token =
                    res.json({
                        message:"authorized"
                    })
                }
            }
        }
    } catch (e) {
        console.log(e);
        throw new Error('Cannot login');
    }
});

module.exports = {addUser,login};
