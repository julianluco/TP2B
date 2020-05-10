/***
 **
 ** DESAFIO 2 - DESARROLLO DE CRUD EN MONGODB
 **
 ****/

const mongoClient = require("mongodb").MongoClient;
const uriDatabase =
  "mongodb+srv://odin:nido@cluster0-awpjk.mongodb.net/test?retryWrites=true&w=majority";
const chalk = require("chalk");
const client = new mongoClient(uriDatabase, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const createInventor = "insert"; // inserto un objeto a la coleccion
const readInventors = "showCollection"; // leo los objetos de la coleccion y los muestro
const updateInventor = "update"; //actualizo un objeto de la coleccion
const deleteInventor = "delete"; // elimino un objeto de la coleccion

async function openDb() {
  return client.connect().then((result) => {
    console.log(chalk.green("Connected successfully to server"));
    return result.db("desafio2").collection("inventores");
  });
}

async function closeDb() {
    return client.close().then(() => console.log(chalk.green("Connection closed")))
}

async function crud(db, operation, object, filter) {
  switch (operation) {
    case "insert":
      // CREATE - Inserto un nuevo objeto a la coleccion
      return db.insertOne(object, (error, result) => {
        if (!error) {
          console.log(
            chalk.blue("Documento insertado OK. \n"),
            chalk.italic.blueBright("Log: ", result, "\n")
          );
        } else {
          console.log(
            chalk.red("Error en CREATE. \n"),
            chalk.italic.redBright("Log: ", error, "\n")
          );
        }
        return result;
      });

    case "showCollection":
      // READ - Muestro los objetos/documentos de la coleccion
      return db
        .find({})
        .toArray()
        .then((result) => {
          console.log(chalk.blue("\n"));
          console.log(chalk.blue("--- Coleccion de Inventores ---"));
          result.forEach((element) => {
            console.log(
              chalk.blue("Inventor: ", element.first),
              chalk.blue.bold(element.last),
              chalk.blue("(", element.year, ")")
            );
          });
          console.log(chalk.blue("\n"));
          return result;
        })
        .catch((error) => {
          console.log(
            chalk.red("Error en READ. \n"),
            chalk.italic.redBright("Log: ", error, "\n")
          );
        });

    case "update":
      // UPDATE - Modifico un objeto existente de la coleccion
      return db.updateOne(filter, object, (error, result) => {
        if (!error) {
          console.log(
            chalk.blue("Documento actualizado OK. \n"),
            chalk.italic.blueBright("Log: ", result, "\n")
          );
        } else {
          console.log(
            chalk.red("Error en el UPDATE. \n"),
            chalk.italic.redBright("Log: ", error, "\n")
          );
        }
        return result;
      });

    case "delete":
      // DELETE - Borro un nuevo objeto de la coleccion
      return db.deleteOne(object, (error, result) => {
        if (!error) {
          console.log(
            chalk.blue("Documento eliminado OK. \n"),
            chalk.italic.blueBright("Log: ", result, "\n")
          );
        } else {
          console.log(
            chalk.red("Error en el DELETE. \n"),
            chalk.italic.redBright("Log: ", error, "\n")
          );
        }
        return result;
      });

    default:
      console.log(
        chalk.red("Error DEFAULT. \n"),
        chalk.italic.redBright("Log: ", error, "\n")
      );
      return null;
  }
}

async function executeCrud() {
  console.log(chalk.yellow("Connecting..."));
  const db = await openDb();
  const read1 = await crud(db, readInventors) // READ
  const inventor = { first: "Homero", last: "Simpson", year: 1956 }; // Objeto que voy a insertar
  const create1 = await crud(db, createInventor, inventor) // CREATE
  const updateObj = { first: "Leonardo", last: "Vinci" }; // Objeto a modificar (select)
  const newData = { $set: { last: "Da Vinci", year: 1452 } }; // Datos a setear
  const update1 = await crud(db, updateInventor, newData, updateObj) // UPDATE
  const vendeHumo = { last: "Ponzi" }; // Objeto a borrar (select)
  const delete1 = await crud(db, deleteInventor, vendeHumo); // DELETE
  const read2 = await crud(db, readInventors); // READ
  const dbc = await closeDb()
}

executeCrud();


/*
 * RESTORE DE DATOS
 * Utilizar solo para restaurar a los datos iniciales para hacer el test del CRUD.
 * Una vez ejecutada la prueba anterior comentar executeCrud() y ejecutar dataRestore() para restablecer la BD
 **/

// async function dataRestore() {
//   console.log(chalk.yellow("Connecting..."));
//   const db = await openDb();
//   const ponzi = { first: "Carlo", last: "Ponzi", year: 1882 }; // Objeto ponzi
//   const create2 = await crud(db, createInventor, ponzi) // CREATE ponzi
//   const leonardo = { "first": "Leonardo" }; // select leonardo
//   const fakeData = { $set: { "last": "Vinci", "year": 1952 } }; // datos incorrectos
//   const update2 = await crud(db, updateInventor, fakeData, leonardo) // UPDATE leonardo
//   const homero = { last: "Simpson" }; // select homero
//   const delete2 = await crud(db, deleteInventor, homero); // DELETE
//   const read3 = await crud(db, readInventors); // READ
//   const dbc = await closeDb()
// }

// dataRestore();
