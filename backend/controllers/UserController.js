const UserModel = require("../models/User");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class UserController {

    static register = async(req,res) => {
        try{
            // console.log(req.body);
            const {name, fatherName, email, mobile, password} = req.body

            if (name == '' || fatherName == '' || email == '' || mobile == '' || password == '') {
                res
                .status(401)
                .json({ 'status': 201, 'message': 'All Fields are Required.' })
            } else {

                const isUserEmailExist = await UserModel.findOne({ email: email })

                if (isUserEmailExist) {
                    res
                    .status(401)
                    .json({ 'status': 201, 'message': 'Email Already Registered.' })
                } else {
                    const isUserMobileExist = await UserModel.findOne({ mobile: mobile })

                    if (isUserMobileExist) {
                        res
                        .status(401)
                        .json({ 'status': 201, 'message': 'Mobile Already Registered.' })
                    } else {         
                        const salt = await bcrypt.genSalt(10)
                        const hashPassword = await bcrypt.hash(password, salt)
        
                        const data = new UserModel({
                            name: name,
                            fatherName: fatherName,
                            email: email,
                            mobile: mobile,
                            password: hashPassword,
                        })
        
                        const isDataSaved = data.save()
        
                        if (isDataSaved) {
                            res
                            .status(201)
                            .json({ 'status': 201, 'message': 'You are Registered Successfully.' })
                        } else {
                            res
                            .status(401)
                            .json({ 'status': 201, 'message': 'Error Try Again.' })
                        }
                    }
                }
            }
        }catch(err){
            res
            .status(401)
            .json({ 'status': 201, 'message': err })
        }
    }

    static login = async(req,res) => {
        try{
            const { email, password } = req.body

            if (email && password) {
                const user = await UserModel.findOne({ $or: [{ email: email }, { mobile: email }] }) 

                if (user != null) {
                    const isMatched = await bcrypt.compare(password, user.password)

                    if ((user.email === email || user.mobile === email) && isMatched) {
                        const token = jwt.sign({ userId: user._id}, process.env.JWT_SECRET_KEY)

                        res
                        .status(201)
                        .json({ 'status': 201, 'message': 'Login Successful.', token, user })
                    } else {
                        
                    }
                } else {
                    res
                    .status(401)
                    .json({ 'status': 201, 'message': 'User not Found.' }) 
                }
            } else {
                res
                .status(401)
                .json({ 'status': 201, 'message': 'All Fields are Required.' }) 
            }
        }catch(err) {
            res
            .status(401)
            .json({ 'status': 201, 'message': err })
        }
    }

}

module.exports = UserController