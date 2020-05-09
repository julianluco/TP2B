const mongoClient = require('mongodb').MongoClient;
const uriDatabase = "mongodb+srv://admin:betp2@cluster0-3bm3a.azure.mongodb.net/test?retryWrites=true&w=majority";
const chalk = require('chalk'); 

const client = new mongoClient(uriDatabase, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect((error, result) => {
    if(!error){
        console.log(chalk.green("Conexión exitosa"));
        const collectionInventors = result.db('sample_betp2').collection('inventors');
        const inventors = collectionInventors.find().toArray((error, result)=>{
            console.log(result);
            // insertar un nuevo inventor
            const inventor = {
                first : "Claudio",
                last : "Fernandez",
                year : 2009
            }
            collectionInventors.insertOne(inventor, (error, result) => {
                if(!error){
                    console.log(chalk.green("Iventor insertado correctamente", result));
                }
            });
        });
        console.log(inventors);
    } else {
        console.log(chalk.red(error));
    }
});

