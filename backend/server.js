var express = require('express');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var app = express();

var messages = [{text:'some text', name:'Tim'}, {text:'hi',name:'Bob'}];
var users = [{firstName:'a', email: 'a', password: 'a', id:0}];

app.use(bodyParser.json());

app.use((req,res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
})

let api = express.Router();
let auth = express.Router();

api.get('/messages', (req, res) => {
    res.json(messages);
})

api.get('/messages/:user', (req, res) => {
    let user = req.params.user;
    let result = messages.filter(message => message.name == user);
    res.json(result);
})

api.post('/messages', (req, res) => {
    messages.push(req.body);
    res.json(req.body);
})

api.get('/users/me', checkAuthenticated, (req,res) => {
    res.json(users[req.user]);
})

api.post('/users/me', checkAuthenticated, (req,res) => {
    let user = users[req.user];

    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;

    res.json(user);
})

auth.post('/login', (req,res) => {
    let user = users.find(user => user.email == req.body.email);

    if(!user)
        sendAuthError(res);
    
    if(user.password == req.body.password)
        sendToken(user,res);
    else
        sendAuthError(res);
});

auth.post('/register', (req,res) => {
    let index = users.push(req.body) - 1;
    var user = users[index];
    user.id = index;
    sendToken(user,res);
})

function sendToken(user, res) {
    var token = jwt.sign(user.id, '123');
    res.json({firstName: user.firstName, token: token});
}

function sendAuthError(res) {
    return res.json({success:false, message: 'Email or Password incorrect'});
}

function checkAuthenticated(req,res,next) {
    if(!req.get('authorization'))
        return res.status(401).send({message:'Unauthorized request. Missing Authentication header'});
    
    let token = req.get('authorization').split(' ')[1];

    let payload = jwt.decode(token,'123');
    if(!payload)
        return res.status(401).send({message:'Unauthorized request. The authentication header is invalid'});

    req.user = payload;

    next();
}

app.use('/api',api);
app.use('/auth',auth);

app.listen(63145);