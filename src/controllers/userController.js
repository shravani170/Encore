const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')


const createUser = async function (req, res) {
    try{

        let body = req.body;
        if(userType=='admin'){
        let data = await userModel.create(body);
        res.status(201).send({status: true, msg: data})
        }
        else{
        res.status(401).send({ status: false, Msg:"only admin has access"}) 
        }  
    }
    catch(err){

        res.status(400).send({msg: err.message})

    }
}

const login = async function (req, res) 
{
    let useremail = req.body.email
    let userpassword = req.body.password
    if (useremail && userpassword) 
    {
        let User = await userModel.findOne({ email: useremail, password: userpassword, isDeleted: false })

        if (User) {
            const Token = jwt.sign({ userId: User._id }, "secret")
            res.header('x-api-key', Token)
            res.status(200).send({ status: true,userId:User._id,Token})
        } else {
            res.status(401).send({ status: false, Msg: "Invalid Email or Password" })
        }
    }else {
        res.status(400).send({ status: false, msg: "request body must contain  email as well as password" })
    }
}
const getUser = async function (req, res) {
    try {

        let userId = req.params.userType;
        let body=req.body.userType
        // let data = await BlogModel.find(querybody)
        if (body == 'admin'|| body == 'user') {
            let data = await userModel.find(userId)
            if (data.length == 0) {
                res.status(404).send({ status: false, msg: "no data found" })
            } else {
                res.status(200).send({ status: true, data: data })
            }
        } else {
            return res.status(404).send({ status: false, msg: "no parameters given" }) 

        }

    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message })

    }
}










module.exports.createUser = createUser;
module.exports.login = login;
module.exports.getUser =getUser ;