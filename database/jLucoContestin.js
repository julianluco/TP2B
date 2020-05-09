/*** 
 ** 
 ** DESAFIO 2 - DESARROLLO DE CRUD EN MONGODB
 ** 
 ****/

const mongoClient = require('mongodb').MongoClient; 
const uriDatabase = "mongodb+srv://odin:nido@cluster0-awpjk.mongodb.net/test?retryWrites=true&w=majority";
const chalk = require('chalk');
const client = new mongoClient(uriDatabase, { useNewUrlParser: true, useUnifiedTopology: true });

const createInventor = "insert" // inserto un objeto a la coleccion
const readInventors = "showCollection" // leo los objetos de la coleccion y los muestro
const updateInventor = "update" //actualizo un objeto de la coleccion
const deleteInventor = "delete"; // elimino un objeto de la coleccion

async function crud(operation, object, filter) {
    return new Promise(() => {
        client.connect((error, result) => {
            if (!error) {
                console.log(chalk.green("Connected correctly to server"));
                const collectionInventors = result.db('desafio2').collection('inventores');

                switch (operation) {

                    case "insert":
                        // CREATE - Inserto un nuevo objeto a la coleccion
                        collectionInventors.insertOne(object, (error, result) => {
                            if (!error) {
                                console.log(chalk.blue("Documento insertado OK. \n"),chalk.italic.blueBright("Log: ",result,"\n"));
                            } else {
                                console.log(chalk.red("Error en CREATE. \n"),chalk.italic.redBright("Log: ",error,"\n"));
                            }
                        });
                        break;

                    case "showCollection":
                        // READ - Muestro los objetos/documentos de la coleccion
                        collectionInventors.find({}).toArray((err, res)=> {
                            if (!error) {
                                    console.log(chalk.blue("\n"))
                                    res.forEach(element => {
                                        console.log(chalk.blue("Inventor: ",element.first),chalk.blue.bold(element.last),chalk.blue("(",element.year,")"))
                                    });
                                    console.log(chalk.blue("\n"))
                            } else {
                                console.log(chalk.red("Error en READ. \n"),chalk.italic.redBright("Log: ",error,"\n"));

                            }
                        });
                        break;

                    case "update":
                        // UPDATE - Modifico un objeto existente de la coleccion
                        collectionInventors.updateOne(filter, object, (error, result) => {
                            if (!error) {
                                console.log(chalk.blue("Documento actualizado OK. \n"),chalk.italic.blueBright("Log: ",result,"\n"));
                            } else {
                                console.log(chalk.red("Error en el UPDATE. \n"),chalk.italic.redBright("Log: ",error,"\n"));
                            }
                        });
                        break;

                    case "delete":
                        // DELETE - Borro un nuevo objeto de la coleccion
                        collectionInventors.deleteOne(object, (error, result) => {
                            if (!error) {
                                console.log(chalk.blue("Documento eliminado OK. \n"),chalk.italic.blueBright("Log: ",result,"\n"));
                            } else {
                                console.log(chalk.red("Error en el DELETE. \n"),chalk.italic.redBright("Log: ",error,"\n"));
                            }
                        });
                        break;

                    default:
                        console.log(chalk.red("Error DEFAULT. \n"),chalk.italic.redBright("Log: ",error,"\n"));
                        break;
                }

            } else {
                console.log(chalk.red.bgWhite("\n",error,"\n"));
            }
        });
    client.close()
    })
}

async function executeCrud(operation, object, filter) {
    console.log(chalk.yellow("Connecting..."))
    const resultado = await crud(operation, object, filter)
    console.log(resultado)
    client.close()
}

/**
**
** SET DE PRUEBAS | SET DE PRUEBAS | SET DE PRUEBAS | SET DE PRUEBAS --->
**
***/


/* 
* PASO 1 - MUESTRO LOS DATOS EN LA COLECCION 
**/

    //-> decomentar siguiente linea para probar
    //  executeCrud(readInventors);


/* 
* PASO 2 - INSERTO UN OBJETO 
**/

    const inventor = { first: "Homero", last: "Simpson", year: 1956 }; // Objeto que voy a insertar

    //-> decomentar siguiente linea para probar
    // executeCrud(createInventor, inventor);


/*
* PASO 3 - MODIFICO UN OBJETO 
**/

    const updateObj = { "first": "Leonardo", "last": "La Vinci" }; // Objeto a modificar (select)
    const newData = { $set: { "last": "Da Vinci", "year": 1452 } }; // Datos a setear

    //-> decomentar siguiente linea para probar
    // executeCrud(updateInventor, newData, updateObj);


/* 
* PASO 4 - BORRO UN OBJETO 
**/

    const deleteVendeHumo = { "first": "Marcelo", "last": "Tinelli",};

    //-> decomentar siguiente linea para probar
    // executeCrud(deleteInventor, deleteVendeHumo);


/* 
* PASO 5 - MUESTRO LOS DATOS DE LA COLECCION DESPUES DE EJECUTAR CREATE/UPDATE/DELETE 
**/

    //-> decomentar siguiente linea para probar
    //  executeCrud(readInventors);

