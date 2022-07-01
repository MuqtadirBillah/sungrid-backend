require('dotenv').config()
const express = require('express');
const app = express();
const mysql = require('mysql');
var cors = require('cors');

app.use(express.json())

var whitelist = ['http://localhost:3000', 'http://sun-grid.com']
var corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
        callback(null, true)
        }
        else {
        callback(new Error('Not allowed by CORS'))
        }
    }
}

app.use(cors(corsOptions));

const pool = mysql.createPool({
    connectionLimit : 100, //important
    host     : process.env.MYSQL_HOST,
    user     : process.env.MYSQL_USER,
    password : process.env.MYSQL_PASSWORD,
    database : process.env.MYSQL_DATABASE,
    debug    :  false
});

app.get('/', (req, res) =>{
    res.send('Root route working!');
});

app.post('/contact', (req, res)=>{
    console.log(req.body);
    let date_ob = new Date();
    // current date
    let date = ("0" + date_ob.getDate()).slice(-2);
    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    // current year
    let year = date_ob.getFullYear();
    // current hours
    let hours = date_ob.getHours();
    
    // current minutes
    let minutes = date_ob.getMinutes();
    
    // current seconds
    let seconds = date_ob.getSeconds();
    pool.query(`insert into message(username, email, message, creation_date, creation_time) values('${req.body.name}', '${req.body.email}', '${req.body.message}', '${date + "-" + month + "-" + year}', '${hours + ":" + minutes + ":" + seconds}')`,(err, data) => {
        if(err) {
            console.error(err);
            return;
        }
        else{
            res.send('sent!')
        }
        // rows fetch
        console.log(data);
    });
})

app.listen(process.env.PORT || 5000, ()=>{
    console.log('Server is running on port 5000');
})