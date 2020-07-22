const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const http = require('http');
const { fstat } = require('fs');

http.createServer((req, res) => {
    const file = req.url === '/' ? 'dashboard.ejs' : req.url


    fstat.readFile(
        path.join(__dirname, 'public', 'dashboard.ejs'),
        (err, contnte) => {
            if (err) throw err
            res.end(content)
        }
    )
})

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
    res.render('dashboard', {
        user: req.user
    })
);

module.exports = router;