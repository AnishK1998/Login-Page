var db = require('./db/conn')
var passwordHash = require('password-hash');
//var passwd = passwordHash.generate(password);
var express = require('express');
const { response } = require('express');
var app = express();

app.set('views','views')
app.set('view engine','ejs')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

app.get('/signup', (req , res)=>{
    res.render('signup');
})

app.post('/signup', async(req, res)=>{
    const database = db.db('data')
    const movies = database.collection("user")
    // const check = movies.findOne({email: req.body.email}).then((response)=>{
    //     console.log(response)
    // })
    const check =await movies.findOne({email: req.body.email})
    if(check != null){
        res.send('user already exsist')
    }
    else{
        var crytpted = passwordHash.generate(req.body.password)
        console.log('data: ', req.body.email, crytpted)
        
        movies.insert({
            email : req.body.email , 
            password : crytpted,
            contactno: req.body.number,
            username: req.body.username
        })
        res.send("Signup Successfully")
    }  
})

app.get('/login', (req, res)=>{
    res.render('login')
})

app.get('/error', (req, res)=>{
    res.render('loginerror')
})

app.get('/home', (req, res)=>{
    res.render('welcome')
})
app.post('/login', async(req, res)=>{
    const DataBase = db.db('data')
    const movies = DataBase.collection('user')
    const check = await movies.findOne({ email: req.body.email})
    // const Uname = movies.findOne({username: req.body.username})
    if(check != null && check.username == req.body.username){
        console.log('data base ke andar :',check)
        
            // if(Uname != false){
                const paswd = passwordHash.verify(req.body.password, check.password)
                    if(paswd != false){
                        console.log('paswd is correct')
                        //res.send('you are logged in')
                        setTimeout(()=>{
                            res.redirect('/home');
                        },4000)
                    // res.redirect('/home')
                    // } 
                    // else{
                    //     console.log('password is incorrect')
                    //     res.send('incorrect paswd')
                    //  }  
        }
        else{
            console.log("Entered Username is not found");
            res.send("Entered Username is not found")
        }
        
    }
    else{
        //res.send('email id is incorrect')
        if(check){
            console.log('Userid is incorrect')
        }
        else{ 
        console.log('email id is incorrect')
        }
        setTimeout(()=>{
            res.redirect('/error')
        },3000)
    
    }
})


app.get('/temp', (req, res)=>{
    res.render('temp',{
        email: 'anishsingh.199804@gmail.com'
    })
})

// app.get('/employee', (req, res)=>{
//     //res.render('employee')
//     console.log("date of employee");
// })
app.set('views','views')
app.set('view engine','ejs')

app.get('/signin', (req , res)=>{
    res.render('signin');
    //res.redirect('temp')
})




// app.post('/temp', (req, res)=>{
//     console.log('response is :', req.body);
//     res.end()
// })

app.listen(3000, (req, res)=>{
    console.log("server is connnected");
})

// 1234567890