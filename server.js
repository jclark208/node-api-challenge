const express= require("express");
const morgan = require("morgan");
const helmet = require("helmet")
const projectRouter= require("./data/Routers/projectRouter")
const actionRouter= require("./data/Routers/actionRouter");
const server = express();
server.use(morgan("short"));
server.use(helmet());
server.use(express.json());
server.use("/api/projects", projectRouter)
server.use('/api/actions', actionRouter)

server.get('/', (req, res)=>{
    res.send(`<h2>Server is Running</h2>`)
})

module.exports = server; 