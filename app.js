const express = require('express');
const mysql = require('mysql')
const app = express();

const hostname = '127.0.0.1';
const port = 3000;

const conn = require('./db/connection')

app.use(express.json())

app.listen(port, () => {
    console.log('start to listen')
});

app.get('/', (req, res) => {
    console.log('check')
    conn.query('select * from user', (err, rows, fields) => {
        if (!err)
            rows.forEach(row => {
                console.log(row)
                msleep(0.2)
            });
        else 
            console.log(err)
        console.log('aa')
        res.json(rows)
    });
});

app.get('/create', (req, res) => {
    console.log('is work?')
    conn.query('CREATE TABLE user (userid int, username varchar(255));', function(err) {
        if(err) console.log(err)
        console.log('ct')
        res.send('created table')
    });
});

app.post('/insert', (req, res) => {
    const id = req.body.id || 0;
    const name = String(req.body.name) || '';

    var userModel = {
        userid: id,
        username: name
    }

    if(userModel.userid == 0) console.log('userid is null')
    if(!userModel.username) console.log('username is null')

    conn.query(`Insert Into user (userid, username) value (${mysql.escape(userModel.userid)},${mysql.escape(userModel.username)});`, (err) => {
        if(err) console.log(err)
        console.log('it')
        res.send('insert table')
    })
});

app.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id) 

    console.log('delete table ready')
    conn.query(`Delete from user where userid = ${mysql.escape(id)}`, (err) => {
        if(err) console.log(err)
        console.log('dt')
        console.log('delete table')
        res.send(`data ${id} deleted`)
    })
});

function msleep(n) {
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, (n * 1000));
}

//CURL 명령어

/*

curl -i -X POST -H "Content-Type: application/json" -d "{\"id\": 20, \"name\": \"chankim\"}" http://localhost:3000/insert

curl -X GET '127.0.0.1:3000' -v

curl -X DELETE '127.0.0.1:3000/12' -v

*/