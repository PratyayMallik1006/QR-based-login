const express=require('express');
const bodyParser =require('body-parser');
const ejs =require('ejs');
const _ = require('lodash');
const { post } = require('request');
var QRCode = require('qrcode');

const app = express();

app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public/css"));
app.use("/js", express.static(__dirname + "public/js"));

app.set('views', './views');
app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended: true}));


let users = [{
    name: 'Pratyay',
    email: 'p@p',
    height: '180',
    weight: '80',
    blood: 'o+',
    medical: 'normal',
    password: 'p'
  },
  {
    name: 'chinmay',
    email: 'c@c',
    height: '185',
    weight: '55',
    blood: 'B-',
    medical: 'Asthama',
    password: 'c'
  }
];

app.get("/", function(req,res){
    res.render("register.ejs");
});

app.get('/users/:userId/books/:bookId', function (req, res) {
    //res.send(req.params.userId)
    QRCode.toString('I am a pony!',{type:'utf8'}, function (err, url) {
        console.log(url)
        qr =QRCode.toDataURL('http://asyncawait.net');
        res.send(qr);

      });
  })

app.get("/user/:userName",function(req,res){
    //console.log(req.params.userName);
    //const requestedName = _.lowerCase(req.params.userName);
    const requestedName = req.params.userName; 
    console.log("requestedName: "+requestedName)
    users.forEach(function(user){
        //console.log(user.name);
        const storedName = _.lowerCase(user.name);
        console.log("storedName: "+storedName);
        if(storedName === requestedName){
            //return res.render("index",{
            res.render("index.ejs",{
                name: user.name ,
                height: user.height ,
                weight: user.weight ,
                blood: user.blood  ,
                medical: user.medical
            });
            
        } 
        //else{res.send(req.params+"not in db")}
        //else{res.redirect("/");}

    });

});

app.post("/register", function(req,res){
    const user={
        name: req.body.name,
        email: req.body.email,
        height: req.body.height,
        weight: req.body.weight,
        blood: req.body.blood,
        medical: req.body.medical,
        password: req.body.password
    };
    
    users.push(user);
    console.log(users);

    res.redirect("/login")
});

app.get("/login",function(req,res){
    const n = users.length
    console.log(n);
    const userQr = users[n-1].name;

    url = "https://gentle-island-72371.herokuapp.com/user/"+ userQr;

     if(url.length === 0) res.send("Empty data");
     QRCode.toDataURL(url,(err,src)=>{
         if(err) res.send("Error");

         res.render("qr",{ src });
     });
});




app.listen(process.env.PORT || 3000);
