const express = require("express");

const app = express();

const sqlite3 = require("sqlite3");


// Conexão com o banco de dados
const db = new sqlite3.Database("users.db");

db.serialize(() => {
    db.run(
        "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT)"
    )
})

app.set("view engine", "ejs");


app.use('/static', express.static(__dirname + '/static'));

// Configuração do Express para processar requisições POST com BODY PARAMETERS
app.use(express.urlencoded({ extended: true })); // versão EXPRESS >= 5.x.x



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

//Rota /login para processamento dos dados do formulário do LOGIN no cliente
app.post("/login", (req, res) => {
    //res.render("pages/sobre");
    console.log(JSON.stringify(req.body));
    const { username, password } = req.body;

    // 1. Verificar se o usuário existe
    const query = "SELECT * FROM users WHERE username=? AND password=?"
    db.get(query, [username, password], (err) => {
        if (err) throw err;

        res.redirect("/dashboard")
    })


    console.log("POST / login");
});

app.get("/dashboard", (req, res) => {
    res.render("pages/dashboard");
    console.log("GET / dashboard");
});

app.listen(4000, () => {
    console.log(`Servidor NODEjs ativo na porta 4000`);
});

app.post("/cadastro", (req, res) => {

    console.log("POST /cadastro")
    console.log(JSON.stringify(req.body));
    const { username, password } = req.body;

    const query1 = "SELECT * FROM users WHERE username=?";
    const query2 = "INSERT INTO users (username, password) VALUES (? , ?)";

    db.get(query1, [username], (err, row) => {
        if (err) throw err;

        //1. VErificar se o usuário existe

        console.log(JSON.stringify(row))
        if (row) {

            // 2. Se o usuário existir, negar cadastro
            console.log(`Usuários: ${username} já cadastrado`)
            res.send("Usuário já cadastrado");
        } else {
            // 3. Se não, fazer o insert
            db.get(query2, [username, password], (err, row) => {

                if (err) throw err;

                //1. Verificar se o usuário existe
                console.log(JSON.stringify(row))
                console.log(`Usuários: ${username} cadastrado com sucesso.`)
                res.redirect("/login");
            })
        }
    })
});
