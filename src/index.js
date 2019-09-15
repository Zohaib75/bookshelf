const express = require('express');
const router = express.Router();
const auth = require('./authentication/auth');
const jwt = require('jsonwebtoken');
const {secret} = require("./config");

let table = [
    {
        isbn: "122-312312-3134",
        title: "Richie Rich",
        seller: "Shaheer Bhai BookStore",
        price: 0,
        addr: "Peshawar",
        contact: "0333-3413414",
        img: "/path-to-image"
    }
];

router.post('/admin/login', function(req, res){

    let username = req.body.username;
    let password = req.body.password;

    if(username === "admin" && password === "admin"){
        res.send("success");
    }
    else{
        res.status(404).send("Username or password was not correct.");
    }
});

router.post('/admin/logout', function(req, res){
    res.send("success");
});


router.get('/book', function(req, res){

    res.send(table);

});

router.get('/book/title/:title', function(req, res){

   let book = table.filter(book => {
        return book.title === req.params.title;
    });

    if(book.length == 1)
        res.send(book[0]);
    else
        res.status(404).send("Not found");
});

router.get('/book/isbn/:isbn', function(req, res){

    let book = table.filter(book => {
        return book.isbn === req.params.isbn;
    });

    if(book.length == 1)
        res.send(book[0]);
    else
        res.status(404).send("Not found");
});


router.post('/book', function(req, res){
    let book = {
        isbn: null,
        title: null,
        seller: null,
        price: 0,
        addr: null,
        contact: null,
        img: null
    };
    
    book.isbn = req.body.isbn;
    book.title = req.body.title;
    book.seller = req.body.seller;
    book.price = req.body.price;
    book.addr = req.body.addr;
    book.contact = req.body.contact;
    book.img = req.body.img;
    
    table.push(book);
    res.send("success");
});

router.put('/book/:isbn', function(req, res){

    let bookIndex = table.findIndex(book => {
        return book.isbn === req.params.isbn;
    });

    if (bookIndex == -1){
        res.status(404).send("Not found");
    }
    else
    {
        let book = {
            isbn: null,
            title: null,
            seller: null,
            price: 0,
            addr: null,
            contact: null,
            img: null
        };
        
        book.isbn = req.body.isbn;
        book.title = req.body.title;
        book.seller = req.body.seller;
        book.price = req.body.price;
        book.addr = req.body.addr;
        book.contact = req.body.contact;
        book.img = req.body.img;
        

        table[bookIndex] = book;    

        res.send("success");
    }
});

router.delete('/book/:isbn', function(req, res){
//Baad mai krygy
    // let len = table.length
    // table = table.filter(book => {
    //     return book.isbn !== req.params.isbn;
    // });

    // res.send("success");
});






module.exports = router;