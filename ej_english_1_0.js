//Local Databases: https://pouchdb.com/guides/databases.html
// Asycn: https://pouchdb.com/2015/03/05/taming-the-async-beast-with-es7.html

const db = new PouchDB('kittens')

const doc = {
  "_id": "mittens",
  "name": "Minnie",
  "occupation": "kitten",
  "age": 3,
  "hobbies": [
    "playing with balls of yarn",
    "chasing laser pointers",
    "lookin' hella cute"
  ]
}

// Version 1
/* 

db.put(doc)

db.get('mittens').then(function (doc) {
  console.log(doc)
  display.innerHTML= doc.name
});
*/


//Version 2
/*

async function empezar(doc) {
    let result = await db.put(doc)
    let documento = await db.get('mittens')
    console.log(documento)
    display.innerHTML= documento.name
}
empezar(doc)

*/




// Version 3

async function empezar(doc) {
  try {
    let result = await db.put(doc)
    let documento = await db.get(result.id)  //lee el id que acaba de guardar
    display.innerHTML= documento.name
    console.log(documento)
  } catch (err) {
    console.log(err)
  }
}

empezar(doc)






