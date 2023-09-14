
const  express = require('express');
var cors = require('cors');
var multer = require('multer');


const Book = require('./server/model/BookModel');
const User = require('./server/model/UserModel');

const mongoose = require('mongoose');
// const upload = require('express-fileupload');


// const upload = multer({ dest: 'uploads/' })

var app = express();
app.use(cors());
app.use(express.json());
app.use('/',express.static('uploads'))

// Then you can set a middleware for express-fileupload
// app.use(upload());

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        let extArray = file.mimetype.split("/");
        let extension = extArray[extArray.length - 1];
      cb(null, Date.now() + '.' + extension) //Appending .jpg
    }
  })
  
  let upload = multer({ storage: storage });


app.post('/upload',upload.single('image'), async (req,res) => {
    console.log(req);
    try {
        var userdata = await User.create({
            name: req.body.name,
            email: req.body.email,
            imageurl: req.file.filename,
            gender: req.body.gender,
            status: req.body.status
        })
        var user = await User.findOne({}, {}, { sort: { 'createdAt' : -1 } }).select(['-createdAt']);  
        res.status(201).json({user, status: 201})

    } catch (error) {
        res.status(201).json({error: err, status: 404})
    }
   
})
app.get('/', (req,res) => {
res.json(200, {
    message:  'home page'
})
})
app.get('/user', async (req,res) => {
    try {
        var user = await User.findOne({}, {}, { sort: { 'createdAt' : -1 } }).select(['-createdAt']);    
       
        res.status(201).json({user, status: 201})
    } catch (error) {
        res.status(201).json({error: err, status: 404})
    }
   
})

app.get('/books', async (req,res) => {

    try {
        var books = await Book.find({});
        
        res.status(201).json({books, status: 201})
    }catch(err){
        res.status(201).json({error: err, status: 404})
    }
   

    
})

// app.post('/user', async (req,res) => {

//     console.log('test');

//     console.log(req.body);

//      var userdata = await User.create(req.body);

//      res.status(201).json({message: "Successfully Created", users: userdata, status: 201})

// })

app.post('/book', async (req,res) => {
    try {
        console.log(req.body);
        var bookdata = await Book.create(req.body);
        
        var books = await Book.find({});
        res.status(201).json({message: "Successfully Registered", books, status: 201})
    
        
    } catch (err) {
        res.status(201).json({error: err, status: 404})
    }
    
})




mongoose.connect('mongodb://localhost:27017/task', { useNewUrlParser: true }).then(() => {
    console.log('DB connected');
    app.listen(3001, () => {
        console.log('app started');
    })
})