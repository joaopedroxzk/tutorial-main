const express = require("express");

const app = express();

app.set("view engine", "ejs");

app.use('/static', express.static(__dirname + '/static'));

const sqlite3 = require("sqlite3");

app.set('view engine', 'ejs');

app.get("/index", (req, res) => {
    res.render("pages/index");
    console.log("GET / index");
});

//Exercício, criar uma rota para a página Sobre
app.get("/sobre", (req, res) => {
    res.render("pages/sobre");
    console.log("GET / sobre");
});

app.get("/cadastro", (req, res) => {
    res.render("pages/cadastro");
    console.log("GET / cadastro");
});

app.get("/login", (req, res) => {
    res.render("pages/login");
    console.log("GET / login");
});

app.get("/dashboard", (req, res) => {
    res.render("pages/dashboard");
    console.log("GET / dashboard");
});

app.listen(4000, () => {
    console.log(`Servidor NODEjs ativo na porta 4000`);
});
