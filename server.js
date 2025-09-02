// Importar pacotes/bibliotecas
import express from "express";
import dotenv from "dotenv";

// Importar Lista de Array
import dados from "./src/data/dados.js";
const { bruxos, varinhas, pocoes, animais } = dados;

// Criar aplicação com Express e configurar para aceitar JSON
const app = express();
app.use(express.json());

// Carregar variáveis de ambiente e definir constante para porta do servidor
dotenv.config();
const serverPort = process.env.PORT || 3001;

// Rota principal GET para "/"
app.get("/", (req, res) => {
    res.send("🚀 Servidor funcionando...");
});

app.get("/bruxos", (req, res) => {
    const { casa, ano, especialidade, nome } = req.query;
    let resultado = bruxos;

    if (casa) {
        resultado = resultado.filter((b) => b.casa.toLowerCase().includes(casa.toLowerCase()));
    }

    if (ano) {
        resultado = resultado.filter((b) => b.ano == ano);
    }

    if (especialidade) {
        resultado = resultado.filter((b) => b.especialidade.toLowerCase().includes(especialidade.toLowerCase()));
    }

    if (nome) {
        resultado = resultado.filter((b) => b.nome.toLowerCase().includes(nome.toLowerCase()));
    }

    res.status(200).json({
        total: resultado.length,
        data: resultado,
    });
});

//Adicionar o bruxo na minha lista 
//é usar o BODY para capturar info
//mudar o nodemon para node no package
//Verbo: POST

app.post("/bruxos", (req, res) => {
    const { nome, casa, ano, varinha, mascote, patrono, especialidade, vivo } = req.body;

    //Quais itens seriam obrigatorios?
    if (!nome || !casa) {
        return res.status(400).json({
            success: false,
            message: "Nome e casa são obrigatórios para um bruxo!"
        });
    }
    //Criar novo bruxo
    const novoBruxo = {
        id : bruxos.length + 1,
        nome,
        casa,
        ano: parseInt(ano),
        varinha,
        mascote,
        patrono,
        especialidade,
        vivo: vivo
    }

    //Adiconar na lista
    bruxos.push(novoBruxo);

    res.status(201).json({
        sucess: true,
        message: "Novo bruxo adicionada a Hogwarts",
        data: novoBruxo,
    });
});

app.get("/varinhas", (req, res) => {
    const { material, nucleo } = req.query;
    let varinhasFiltro = varinhas;
    if (material) {
        varinhasFiltro = varinhasFiltro.filter((m) => m.material.toLowerCase().includes(material.toLowerCase()));
    }
    if (nucleo) {
        varinhasFiltro = varinhasFiltro.filter((n) => n.nucleo.toLowerCase().includes(nucleo.toLowerCase()));
    }

    res.status(200).json({
        total: varinhasFiltro.length,
        data: varinhasFiltro,
    });
});
app.get("/pocoes", (req, res) => {
    const { nome, efeito } = req.query;
    let pocoesFiltros = pocoes;
    if (nome) {
        pocoesFiltros = pocoesFiltros.filter((n) => n.nome.toLowerCase().includes(nome.toLowerCase()));
    }
    if (efeito) {
        pocoesFiltros = pocoesFiltros.filter((e) => e.efeito.toLowerCase().includes(efeito.toLowerCase()));
    }

    res.status(200).json({
        total: pocoesFiltros.length,
        data: pocoesFiltros,
    });
});
app.get("/animais", (req, res) => {
    const { tipo, nome } = req.query;
    let animaisFiltros = animais;
    if (tipo) {
        animaisFiltros = animaisFiltros.filter((t) => t.tipo.toLowerCase().includes(tipo.toLowerCase()));
    }
    if (nome) {
        animaisFiltros = animaisFiltros.filter((n) => n.nome.toLowerCase().includes(nome.toLowerCase()));
    }

    res.status(200).json({
        total: animaisFiltros.length,
        data: animaisFiltros,
    });
});

app.post("/varinhas", (req, res) => {
    const { material, nucleo, comprimento } = req.body;

    //Quais itens seriam obrigatorios?
    if (!material || !nucleo || !comprimento) {
        return res.status(400).json({
            success: false,
            message: "Material, nucleo e comprimento são obrigatórios para varinha!"
        });
    }
    //Criar nova varinha
    const novaVarinha = {
        id : varinhas.length + 1,
        material,
        nucleo,
        comprimento
    }

    //Adiconar na lista
    varinhas.push(novaVarinha);

    res.status(201).json({
        success: true,
        message: "Nova varinha adicionada",
        data: novaVarinha,
    });
});


// Iniciar servidor escutando na porta definida
app.listen(serverPort, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${serverPort} 🚀`);
});
