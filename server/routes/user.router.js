const express = require('express');
const encryptLib = require('../modules/encryption');
const Person = require('../models/Person');
const userStrategy = require('../strategies/sql.localstrategy');
const pool = require('../modules/pool.js');
const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', (req, res) => {
  // check if logged in
  if (req.isAuthenticated()) {
    // send back user object from database
    res.send(req.user);
  } else {
    // failure best handled on the server. do redirect here.
    res.sendStatus(403);
  }
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);

  var saveUser = {
    username: req.body.username,
    password: encryptLib.encryptPassword(req.body.password),
    first: req.body.first,
    last: req.body.last,
    rank: req.body.rank,
    unit: req.body.unit
  };
  pool.query('INSERT INTO users (username, password, first, last, rank, unit_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
    [saveUser.username, saveUser.password, saveUser.first, saveUser.last, saveUser.rank, saveUser.unit], (err, result) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.sendStatus(201);
      }
    });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.get('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

router.get('/units', (req, res) => {
    pool.query(`select * from unit;`)
    .then(function(result) {
        res.send(result.rows);
    }).catch(function(error) {
        res.sendStatus(500);
    })
});

router.get('/leaders/:unit_id', (req, res) => {
    let unit_id = req.params.unit_id;
    pool.query(`select * from users where unit_id = $1;`, [unit_id])
    .then(function(result) {
        res.send(result.rows);
    }).catch(function(error) {
        res.sendStatus(500);
    })
});

router.put('/leader/transfer', (req, res)=>{
  let unit_id = req.body.unit_id;
  let id = req.body.id;
  pool.query('update users set unit_id = $1 where id = $2', [unit_id, id])
  .then(function(result){

  }).catch(function(){
    res.sendStatus(500);
  })
})

module.exports = router;
