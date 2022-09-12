const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv').config();


// Create connection
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : process.env.passport,
    database : 'nodemysql'
});

// connection
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('Mysql Connected');
})

const app = express();

app.use(express.json());

// Create DB
app.get('/creatdb', (req, res) => {
    let sql = 'CREATE DATABASE nodemysql';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Database created')
    })
})

// Creat table
app.get('/creatpoststable', (req, res) => {
    let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY (id))'
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Posts table created');
    })
})


// Insert Post 
app.post('/addpost', (req, res) => {
    let post = {title: req.body.title , body: req.body.body};
    console.log(req.body.title);
    let sql = 'INSERT INTO posts SET ?';   // ?means the db.query second param
    let query = db.query(sql, post, (err, result) => {
        if(err) throw err;
        //console.log(result);
        res.send(result)
    })
})

// Show all post
app.get('/getposts', (req, res) => {
    let sql = 'SELECT * FROM posts';   
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        console.log(results);
        res.send(results)
    })
})

// Show single post
app.get('/getpost/:id', (req, res) => {
    let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;   
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        if(result.length == 0){
            res.send('No that post')
        }else{
        res.send(result)}
    })
})

app.get('/getpost/:id', (req, res) => {
    let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;   
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Post fetched...')
    })
})

// Update the post
app.put('/getpost/:id', (req, res) => {
    let sql = `UPDATE posts SET title = '${req.body.title}', body = '${req.body.body}'  WHERE id = ${req.params.id}`;   
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send(result)
    })
})

app.delete('/getpost/:id', (req, res) => {
    let sql = `DELETE FROM posts WHERE id = ${req.params.id}`;   
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send(result)
    })
})


app.listen('3000', () => {
    console.log('server start on 3000')
})