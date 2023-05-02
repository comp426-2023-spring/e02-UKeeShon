#!/usr/bin/env node

const { rps, rpsls } = require("./lib/rpsls.js");
const express = require("express")
const minimist = require("minimist")

const app = express();
const argv = minimist(process.argv.slice(2))
const port = argv.port || 5000;

// 允许跨域
app.all("*", function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "*");
	next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
})

app.get('/app', (req, res) => {
	res.status(200).send('200 OK');
})

app.get('/app/rps', (req, res) => {
	res.status(200).send(rps());
})

app.get('/app/rpsls', (req, res) => {
	res.status(200).send(rpsls());
})

app.get('/app/rps/play', (req, res) => {
	res.status(200).send(rps(req.query.shot));
})

app.get('/app/rpsls/play', (req, res) => {
	res.status(200).send(rpsls(req.query.shot));
})

app.post('/app/rps/play', (req, res) => {
	res.status(200).send(rps(req.body.shot));
})

app.post('/app/rpsls/play', (req, res) => {
	res.status(200).send(rpsls(req.body.shot));
})

app.get('/app/rps/play/:shot', (req, res) => {
	res.status(200).send(rps(req.params.shot));
})

app.get('/app/rpsls/play/:shot', (req, res) => {
	res.status(200).send(rpsls(req.params.shot));
})

app.get('*', (req, res) => {
	res.status(404).send('404 NOT FOUND');
})
