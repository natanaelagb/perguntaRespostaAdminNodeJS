const Sequelize = require("sequelize");
const connection = new Sequelize("projeto03","root","natan9618",{
    host: "localhost",
    dialect: "mysql",
    timezone: "-03:00"
})

connection
    .authenticate()
    .then(()=>{
        console.log("Conexão estabelecida com o banco de dados!");
    })
    .catch((erro)=>{
        console.log("Ocorreu um erro ao conectar com o banco de dados: "+erro);
    });

module.exports = connection;