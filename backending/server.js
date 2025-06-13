const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let produtos = [
    { id: 1, nome: "Mouse Gamer", preco: 150.0 },
    { id: 2, nome: "Teclado Mecânico", preco: 300.0 }
];

// GET: Lista todos os produtos
app.get("/produtos", (req, res) => {
    res.json(produtos);
});

// POST: Adiciona um novo produto
app.post("/produtos", (req, res) => {
    const novoProduto = req.body;
    novoProduto.id = Date.now();
    produtos.push(novoProduto);
    res.status(201).json(novoProduto);
});

// PUT: Atualiza um produto existente
app.put("/produtos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = produtos.findIndex(p => p.id === id);
    if (index === -1)
        return res.status(404).json({ erro: "Produto não encontrado" });
    produtos[index] = { ...produtos[index], ...req.body };
    res.json(produtos[index]);
});

// DELETE: Remove um produto
app.delete("/produtos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    produtos = produtos.filter(p => p.id !== id);
    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
