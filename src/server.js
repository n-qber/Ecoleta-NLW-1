const express = require('express');
const server = express();

const db = require('./database/db');

server.use(express.static('public'));

server.use(express.urlencoded({ extended: true }))

const nunjucks = require('nunjucks');
nunjucks.configure('src/views', {
    express: server,
    noCache: true
})

server.get('/', (req, res) => {
    return res.render('index.html');
})

server.get('/create-point', (req, res) => {
    return res.render('create-point.html');
})

server.post('/savepoint', (req, res) => {

    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `

    const { image, name, address, address2, state, city, items } = req.body

    const values = [
        image,
        name,
        address,
        address2,
        state,
        city,
        items
    ];

    function afterInsertData(err) {
        if (err) {
            console.log(err);

            return res.send(`Erro no cadastro!\n${err}`);
        }

        return res.render("create-point.html", { saved: true });

    }

    db.run(query, values, afterInsertData);

})

server.get('/search', (req, res) => {

    const search = req.query.search;

    if (search === ""){
        return res.render('search-results.html', { places: [] });
    }

    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
        if (err) {
            return console.log(err);
        }

        return res.render('search-results.html', { places: rows });

    })
})


server.listen(process.env.PORT || 3000);
