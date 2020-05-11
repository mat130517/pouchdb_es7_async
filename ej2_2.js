import * as comprueba from './src/verifica.js'
import * as render from './src/renderiza.js'

'use strict'

const db = new PouchDB('datosUsuarios')
const remoteCouch = 'http://matias:1234@127.0.0.1:5984/datosusuarios';

db.changes({
  since: 'now',
  live: true
}).on('change', show_Datos);

function sync() {
  let opts = {live: true};
  db.replicate.to(remoteCouch, opts, syncError);
  db.replicate.from(remoteCouch, opts, syncError);
}

function syncError() {
  console.log('error enlazando con bases de datos')
}

if (remoteCouch) {
  sync();
}

const add_Dato = (text1, text2, text3) => {
  
  let newdato = { 
    _id: new Date().toISOString(),
    name: {
      first: text1,
      last: "example"
    },
    email: text2,
    picture: {
      thumbnail: text3
    }
  }

  async function createNewDoc(dato) {
    try { 
        let response = await db.put(dato); // post a new doc
        let leido = await db.get(response.id)
        show_Dato_solo(leido)
        console.log("identif es: ", leido._id)
      } catch (err) {
        console.log("error ", err, " saving data")
      }
  }

createNewDoc(newdato) 
}

async function show_Dato_solo(dato) {
  mensaje.innerHTML += `El id ${dato._id} es ${dato.name.first} el email es ${dato.email} </br>`
  console.log(dato)
}

async function show_Datos() {
  try {
    await db.allDocs({include_docs: true, descending: true}, function(err, doc) {
      if (err=! 'null') console.log(err)
      console.log(doc.rows)
      show_TodosUI(doc.rows)
    });
  } catch (error){
    console.log(`error ${err} reading data`)
  }
}

function show_TodosUI(todos) {
  mensaje.innerHTML = '';
  todos.forEach(function(todo) {
    mensaje.innerHTML += render.renderFicha(todo.doc)
  });
}

async function update_Dato(identif,nuevo) {
  try {
    let doc = await db.get(identif)
    doc.name.first = nuevo
    await db.put(doc)
  }
  catch (err) {
    console.log(`error ${err} updating data`)
  }
}

async function delete_Dato(identif) {
  let doc = await db.get(identif)
  await db.remove(doc)
  mensaje.innerHTML += `El documento con id ${identif} se ha eliminado`
  console.log(doc)  
}

function agregar() {
  let name = txt_name.value
  let email = txt_email.value
  let image = txt_image.value
  let validacion = comprueba.validar(name,email,image)
  validacion === 'ok' ?  add_Dato(name,email,image)
  :(  
    validacion === 'invalid' ?
          mensaje.innerHTML = "Entrada no valida.":
          mensaje.innerHTML = "Introduce datos"
    )
  txt_name.value = ""
}

bot_add.addEventListener('click', agregar, false)
bot_show_DB.addEventListener('click', show_Datos, false)


export {delete_Dato}


