console.log(process.env.NODE_ENV)

require('dotenv').config({
    path: process.env.NODE_ENV === "development" ? ".env.development" : ".env"
})

console.log(process.env.APP_NAME);


const express = require('express');
const cors = require('cors');
const sync = require('./infra/postgres').sincronizar 
const app = express();

app.use(cors())

app.use(express.urlencoded({
    extended: true
}))
app.use(express.json());


const port = process.env.APP_PORT;
const hostname = process.env.APP_HOSTNAME;

const defaultRoutes = require('./routes/default-routes')

const pessoasRoutes = require('./routes/pessoas-router');
const unidadesRoutes = require('./routes/unidades-router');
const agendamentoRoutes = require('./routes/agendamento-router');

const pessoasRoutesPg = require('./routes/pessoas-routes-pg');
const unidadesRoutesPg = require('./routes/unidades-router-pg');
const agendaRoutesPg = require('./routes/agendamento-router-pg');


(async()=>{
    await sync()
})()

 
app.use('/',defaultRoutes);
app.use('/api/pessoas/', pessoasRoutes);
app.use('/api/unidades/', unidadesRoutes);
app.use('/api/agendamento/', agendamentoRoutes);

app.use('/api/pessoaspg/', pessoasRoutesPg);
app.use('/api/unidadespg/', unidadesRoutesPg);
app.use('/api/agendamentopg/', agendaRoutesPg);
 
app.listen(port, hostname, () => {
    console.log(`servidor rodano na porta:: https://${hostname}:${port}`);
}); 
    