const express = require('express');
const mongoose = require('mongoose');
const app = express();
const jwt = require('jsonwebtoken');
const middleware = require('./middleware');
const Registeruser = require('./model');
const cors = require('cors');



mongoose.connect("mongodb+srv://charanchary:charan@cluster0.elarojj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(
    () => console.log("Db connected established")
)

app.use(express.json());

app.use(cors({origin : "*"}));

app.post('/register', async (req , res) =>{
    try{
        const {username,email,password,confirmpassword} = req.body;
        let exists = await Registeruser.findOne({email});
        if(exists){
            return res.status(400).send('User Already Exist')
        }
        if(password !== confirmpassword){
            return res.status(400).send("Passwords Are Not Matching");
        }
        let newUser = new Registeruser({
            username,
            email,
            password,
            confirmpassword
        })
        await newUser.save();
        res.status(200).send("Registered Successfully")

    }catch(err){
       console.log(err);
       return res.status(500).send('Internal Server Error');
    }
})




app.post('/login', async (req , res) =>{
    try{
        const {email, password} = req.body;
        let exist = await Registeruser.findOne({email});
        if(!exist){
            return res.status(400).send("User Not Exists");

        }
        if(exist.password !== password){
            return res.status(400).send("Incorrect Password");
        }

        let payload = {
            user: {
                id: exist.id
            }
        }

        jwt.sign(payload , "jwtSecurity", {expiresIn : 3600000},
            (err , token) =>{
                if (err) throw err;
                return res.json({token})
            }
        )

    } catch (err){
        console.log(err);
        return res.status(500).send("Server Error");
    }
})

app.get('/getprofile',middleware, async(req,res) =>{
    try{
        let exist = await Registeruser.findById(req.user.id);
        if(!exist){
            return res.status(400).send("User not Found");

        }
        res.json(exist);
    }
    catch(err){
        console.log(err);
        return res.status(500).send('Server Error')
    }
})


app.listen( 5000, () =>{
    console.log('Server running...');
} )