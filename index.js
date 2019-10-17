const express = require('express');

const app = express();

app.use(express.json());

const projetcs = [];
let qrtResquests = 0;

function checkIdProject(req, res, next){
    const { id } = req.params;
    const project = projetcs.find(p => p.id == id); 

    if(!project) {
        return res.status(400).json({ error : "Projeto não existe." });
    }

    return next();
}

function requisicao(req, res, next) {
    qrtResquest++;
    console.log(`Quantidade de requisições ${qrtResquests}`);
    return next();
}

app.use(requisicao);

app.post('/projects/', (req, res) => {
    const { id,title } = req.body;    

    const project = { id, title, task: [] };    
    projetcs.push(project);

    return res.json(projetcs);
});

app.post('/projects/:id/tasks', checkIdProject, (req,res) => {
    const { title } = req.body;
    const { id } = req.params;

    const project = projetcs.find(p => p.id == id);
    projetcs.task.push(title);

    return res.json(projetcs);
})

app.get('/projects', (req, res) => {
    return res.json(projetcs);    
});

app.put('/projects/:id', checkIdProject, (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    
    const project = projetcs.find(p => p.id == id);
    project.title = title;

    return res.json(project);
});

app.delete('/projects/:id', checkIdProject, (req, res) => {
    const { id } = req.params;
    const index = projetcs.findIndex(p => p.id == id);

    projetcs.splice(index, 1);

    return res.send();
});

app.listen('3000');