const express = require('express');
const Paciente = require('./models/paciente');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(express.json());

app.use(cors());

app.get('/pacientes', async (req, res) => {
    try {
        const pacientes = await Paciente.find();
        res.status(200).json(pacientes);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

app.post('/pacientes', async (req, res) => {
    const { nome, planoSaude, idade } = req.body;

    const paciente = {
        nome, planoSaude, idade
    }

    try {
        await Paciente.create(paciente);
        res.status(201).json(paciente);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

app.get('/pacientes/:id', async (req, res) => {
    try {
        const paciente = await Paciente.findOne({ _id: req.params.id });
        if (!paciente) {
            res.status(422).json({ mensagem: "paciente não encontrado" });
            return
        }
        res.status(200).json(paciente);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

app.patch('/pacientes/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { nome, planoSaude, idade } = req.body;

        const paciente = {
            nome, planoSaude, idade
        }

        const updatePac = await Paciente.updateOne({ _id: id }, paciente);

        if (updatePac.matchedCount === 0) {
            res.status(422).json({ mensagem: "Paciente não encontrado" });
            return
        }
        res.status(200).json(paciente);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

app.delete('/pacientes/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const paciente = await Paciente.findOne({ _id: id });
        if (!paciente) {
            res.status(422).json({ mensagem: "Paciente não encontrado" });
            return;
        }
        await Paciente.deleteOne({ _id: id });
        res.status(200).json({ mensagem: "Excluído com sucesso!" });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});



mongoose.connect('mongodb://127.0.0.1:27017/AF').then(() => {
app.listen(27017, () => {
console.log('Conectado ao mongoDB');
console.log('Servidor iniciado na porta 27017');
})
})
.catch((err) => {
console.log(err);
});


app.listen(3000, () => console.log('Servidor rodando na porta: 3000'))