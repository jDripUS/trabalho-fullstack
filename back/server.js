const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Configuração do MySQL
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root', // mesmo usuário do Workbench
    password: '#Heitor988', // mesma senha do Workbench
    database: 'tecstore',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Teste de conexão:
pool.getConnection()
  .then(conn => {
    console.log("Conexão MySQL OK!");
    conn.release();
  })
  .catch(err => {
    console.error("Erro ao conectar no MySQL:", err);
  });

// CRUD de Usuários

/**
 * @route   GET /usuarios
 * @desc    Lista todos os usuários
 */
app.get("/usuarios", async (req, res) => {
    try {
        // Inclua o campo senha para o front-end conseguir validar login
        const [rows] = await pool.query("SELECT id, nome, email, senha FROM usuarios ORDER BY id");
        res.json(rows);
    } catch (err) {
        res.status(500).json({ erro: "Erro ao buscar usuários" });
    }
});

/**
 * @route   POST /usuarios
 * @desc    Cria um novo usuário
 * @body    { nome, email, senha }
 */
app.post("/usuarios", async (req, res) => {
    const { nome, email, senha } = req.body;
    console.log("Recebido:", req.body);
    if (!nome || !email || !senha)
        return res.status(400).json({ erro: "Nome, email e senha são obrigatórios" });
    try {
        console.log("Tentando inserir no banco...");
        const [result] = await pool.query(
            "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)",
            [nome, email, senha]
        );
        console.log("Usuário cadastrado, insertId:", result.insertId, "Rows affected:", result.affectedRows);
        res.status(201).json({ id: result.insertId, nome, email });
    } catch (err) {
        console.error("Erro MySQL:", err); // Mostra o erro completo
        res.status(400).json({ erro: "Erro ao criar usuário", detalhes: err.message });
    }
});

/**
 * @route   PUT /usuarios/:id
 * @desc    Atualiza um usuário
 */
app.put("/usuarios/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const { nome, email, senha } = req.body;
    try {
        const [result] = await pool.query(
            "UPDATE usuarios SET nome = COALESCE(?, nome), email = COALESCE(?, email), senha = COALESCE(?, senha) WHERE id = ?",
            [nome, email, senha, id]
        );
        if (result.affectedRows === 0)
            return res.status(404).json({ erro: "Usuário não encontrado" });
        // Retorna o usuário atualizado
        const [rows] = await pool.query("SELECT id, nome, email FROM usuarios WHERE id = ?", [id]);
        res.json(rows[0]);
    } catch (err) {
        res.status(400).json({ erro: "Erro ao atualizar usuário" });
    }
});

/**
 * @route   DELETE /usuarios/:id
 * @desc    Remove um usuário
 */
app.delete("/usuarios/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const [result] = await pool.query("DELETE FROM usuarios WHERE id = ?", [id]);
        if (result.affectedRows === 0)
            return res.status(404).json({ erro: "Usuário não encontrado" });
        res.status(204).send();
    } catch (err) {
        res.status(400).json({ erro: "Erro ao remover usuário" });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
