const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

router.post('/', (req, res) => {
    if (req.isAuthenticated()) {
        pool.query('INSERT INTO soldier (first, last, rank, eval, ets, position, unit_id) VALUES ($1, $2, $3, $4, $5, $6, $7);',
        [req.body.first, req.body.last, req.body.rank, req.body.eval, req.body.ets, req.body.position, req.body.unit], (err, result) => {
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
        pool.query(`select * from soldier where unit_id = ${search} order by id;`)
        .then(function(result) {
            res.send(result.rows);
        }).catch(function(error) {
            res.sendStatus(500);
        })
    }else{
        res.sendStatus(403);
    }
});

router.get('/docs/:soldier_id', (req, res)=>{
    if (req.isAuthenticated()) {
        let search = req.params.soldier_id;
        pool.query(`select * from soldier_doc join doc on doc.id = soldier_doc.doc_id where soldier_id = $1 order by id;`,
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

router.post('/doc', (req, res)=>{
    if (req.isAuthenticated()) {
        let newDoc = req.body;
        pool.query('INSERT INTO doc (handle, mimetype, original_path, url, upload_id, name) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id;',
        [req.body.handle, req.body.mimetype, req.body.originalPath, req.body.url, req.body.uploadId, req.body.originalFile.name]
        ).then(function(res){
            res.send(result.rows);
            res.sendStatus(500);
        }).catch(function(error) {
            res.sendStatus(201);
        })
    }else{
        res.sendStatus(403);
    }
});

router.get('/doc/id/:doc_id', (req, res)=>{
    if (req.isAuthenticated()) {
        let search = req.params.doc_id;
        pool.query(`select * from doc where upload_id = $1  order by id;`,
        [search]
        ).then(function(result) {
            res.send(result);
        }).catch(function(error) {
            res.sendStatus(500);
        })
    }else{
        res.sendStatus(403);
    }
});

router.post('/doc/join', (req, res)=>{
    if (req.isAuthenticated()) {
        let soldier_id = req.body.soldier_id;
        let doc_id = req.body.doc_id;
        pool.query('INSERT INTO soldier_doc (soldier_id, doc_id) VALUES ($1, $2);',
        [soldier_id, doc_id]
        ).then(function(res){
            res.sendStatus(500);
        }).catch(function(error) {
            res.sendStatus(201);
        })
    }else{
        res.sendStatus(403);
    }
});

router.delete('/:id', (req, res)=>{
    if (req.isAuthenticated()) {
        let id = req.params.id;
        pool.query(`delete from soldier where id = ${id};`)
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
        pool.query(`delete from soldier_doc where doc_id = $1;`, [id])
        .then(function(result) {
            res.send(result.rows);
        }).catch(function(error) {
            res.sendStatus(500);
        })
    }else{
        res.sendStatus(403);
    }
})


module.exports = router;