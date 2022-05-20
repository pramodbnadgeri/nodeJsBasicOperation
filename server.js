const express = require('express');
const app = express();

// in order to work on post request this shold be added
app.use(express.json());

//CONNECTION CREATION AND NEW DATABASE
const mongoose = require('mongoose');
mongoose.connect("mongodb://0.0.0.0:27017/pramodDb", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("connection successful....."))
    .catch((err) => console.log(err));


app.listen(3000, () => { console.log('connection on 5000'); })

// const profileSchema = new mongoose.Schema({
//     name: String,
//     age: Number
// });

// const userModel = new mongoose.model(
//     "userDb", //collection name
//     profileSchema // pass schema 
// )/;// usermodel  creates a model of profileschema

// const data = new userModel({ name: 'pramod', age: 23 });// create a data
// data.save();// save data.


app.get('/getAll', (req, res) => {
    res.json([
        { "message": "/get1 is working" },
        { "message": "/get2 is working" },
        { "message": "/get3 is working" },
        { "message": "/get4 is working" },
    ])
})

app.get('/getById/:getId', (req, res) => {
    const id = req.params.getId
    res.json({ "message": `/get${id} is working` })
})


// crud

// create user
// will use post method
const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    number: Number,
    email: String
});

const userCreateModel = new mongoose.model(
    "userDb", //collection name
    userSchema // pass schema 
)

app.post('/createUser', (req, res) => {
    const user = new userCreateModel({
        name: req.body.name,
        age: req.body.dob,
        number: req.body.phone,
        email: req.body.email
    })

    user.save()
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            console.log(err, 'err');
            res.status(500).send({
                errorMessage: err.message || "Some error occurred while creating the user."
            });
        })
})
// app.post('/createUser',(req,res) =>{}),

// delete user
// deleet method
app.delete('/deleteUser/:userId', (req, res) => {
    userCreateModel.findByIdAndRemove(req.params.userId)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            console.log(err, 'err');
            res.status(500).send({
                errorMessage: err.message || "Some error occurred while creating the user."
            });
        })

}
)
// update user
// put method
app.put('/updateUser', (req, res) => {
    console.log(req.body.userId, "path working");
    userCreateModel.findByIdAndUpdate(req.body.userId, {
        name: req.body.name,
        age: req.body.dob,
        number: req.body.phone,
        email: req.body.email
    }, { new: true })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            console.log(err, 'err');
            res.status(500).send({
                errorMessage: err.message || "Some error occurred while creating the user."
            });
        })
})

// get user
// get method(')

app.get('/v1/getUserById/:userId', (req, res) => {
    const id = req.params.userId
    userCreateModel.findById(req.params.userId)
        .then(user => {
            console.log(user, "res");
            if (user)
                res.send(user)
            else
                res.send({
                    'error': "no user found"
                })

        })
        .catch(err => {
            console.log(err, 'err');
            res.status(500).send({
                errorMessage: "Some error occurred while fetching the user."
            });
        })
})


// get all 
app.get('/getAllUsere', (req, res) => {
    userCreateModel.find()
        .then(users => {
            console.log(users, 'users');
            res.send(users)
        })
        .catch(err => {
            res.send({ "err": "no users or some error" })
        })
})







