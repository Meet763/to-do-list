const User = require('../models/user')
const {generateToken} = require('../middleware/auth')

const signupControl = async (req, res) => {
    try{
        const data = req.body
        if (data.role === 'admin') {
            const adminExists = await User.findOne({ role: 'admin' });

            if (adminExists) {
                return res.status(400).json({ error: 'An admin account already exists. Only one admin is allowed.' });
            }
        }
        const newUser = new User(data)

        const responce = await newUser.save()
        console.log('data saved')

        const payload = {
            id: responce.id,
            username: responce.username,
            password: responce.password,
        }

        const token = generateToken(payload);
        console.log("token is:" + token);
        res.status(200).json({responce: responce, token: token})
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'internal server error'});
    }
}

const loginControl = async (req, res) => {
    try{
        const {username, password} = req.body;

        const user = await User.findOne({username: username})

        if(!user || !( await user.comparePassword(password))){
            res.status(401).json({error: 'invalis username 0r password'})
        }

        const payload = {
            id: user.id,
            username: user.username,
            password: user.password
        }

        const token = generateToken(payload);

        res.json({token});
        
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'internal server error'});
    }
}

module.exports = {signupControl, loginControl};