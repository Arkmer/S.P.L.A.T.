const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

router.post('/', (req, res) => {
    if (req.isAuthenticated()) {
        pool.query('INSERT INTO vehicle (vehicle_model, bumper, status, location, unit_id) VALUES ($1, $2, $3, $4, $5);',
        [req.body.vehicle_model, req.body.bumper, req.body.status, req.body.location, req.body.unit], (err, result) => {
        if (err) {
            res.sendStatus(500);
        } else {
            res.sendStatus(201);
        }
        })
    }else{
        res.sendStatus(403);
    }
});

router.get('/:unit', (req, res)=>{
    if (req.isAuthenticated()) {
        let search = req.params.unit;
        pool.query(`select * from vehicle where unit_id = ${search};`)
        .then(function(result) {
            res.send(result.rows);
        }).catch(function(error) {
            res.sendStatus(500);
        })
    }else{
        res.sendStatus(403);
    }
});

router.post('/doc', (req, res)=>{
    if (req.isAuthenticated()) {
        let newDoc = req.body;
        pool.query('INSERT INTO doc (handle, mimetype, original_path, url, upload_id, name) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id;',
        [req.body.handle, req.body.mimetype, req.body.originalPath, req.body.url, req.body.uploadId, req.body.originalFile.name]
        ).then(function(result){
            res.send(result.rows);
        }).catch(function(error) {
            res.sendStatus(201);
        })
    }else{
        res.sendStatus(403);
    }
});

router.post('/doc/join', (req, res)=>{
    if (req.isAuthenticated()) {
        let vehicle_id = req.body.vehicle_id;
        let doc_id = req.body.doc_id;
        console.log('vehicle_id', vehicle_id, 'doc_id', doc_id);
        pool.query('INSERT INTO vehicle_doc (vehicle_id, doc_id) VALUES ($1, $2);',
        [vehicle_id, doc_id]
        ).then(function(res){
            res.sendStatus(500);
        }).catch(function(error) {
            res.sendStatus(201);
        })
    }else{
        res.sendStatus(403);
    }
});

router.get('/docs/:vehicle_id', (req, res)=>{
    if (req.isAuthenticated()) {
        let search = req.params.vehicle_id;
        pool.query(`select * from vehicle_doc join doc on doc.id = vehicle_doc.doc_id where vehicle_id = $1;`,
        [search]
        ).then(function(result) {
            res.send(result.rows);
        }).catch(function(error) {
            res.sendStatus(500);
        })
    }else{
        res.sendStatus(403);
    }
});

router.delete('/:id', (req, res)=>{
    if (req.isAuthenticated()) {
        let id = req.params.id;
        pool.query(`delete from vehicle where id = ${id};`)
        .then(function(result) {
            res.send(result.rows);
        }).catch(function(error) {
            res.sendStatus(500);
        })
    }else{
        res.sendStatus(403);
    }
});

router.delete('/doc/delete/:doc_id', (req, res)=>{
    if (req.isAuthenticated()) {
        let id = req.params.doc_id;
        pool.query(`delete from doc where id = $1;`, [id])
        pool.query(`delete from vehicle_doc where doc_id = $1;`, [id])
        .then(function(result) {
            res.send(result.rows);
        }).catch(function(error) {
            res.sendStatus(500);
        })
    }else{
        res.sendStatus(403);
    }
});

router.put('/edit', (req, res)=>{
    pool.query('update vehicle set vehicle_model = $1, bumper = $2, status = $3, location = $4 where id = $5',
    [req.body.vehicle_model, req.body.bumper, req.body.status, req.body.location, req.body.id])
    .then(function(result){
  
    }).catch(function(){
      res.sendStatus(500);
    })
  })

module.exports = router;