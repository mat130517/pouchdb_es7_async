
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

let db = new PouchDB('kittens')

async function start_program(doc) {
  try {
    if (db.info().doc_count === 0)
      {
        let result = await db.put(doc)
        let document = await db.get(result.id)

        display.innerHTML= document.name
        console.log(document.name)
      }
    } 
    
    catch (err) {
      console.log(err);
    }
}


async function update_data(identif,newnumber) {
  try {
    let document = await db.get(identif)
    document.age = newnumber
    await db.put(document)
  }
  catch (err) {
    console.log(err);
  }
}


async function show_data(identif) {
  let document = await db.get(identif)
  display.innerHTML= `The id ${identif}: named ${document.name} and the age is ${document.age}`
  console.log(document)
}


start_program(doc)
update_data('mittens',28)
show_data('mittens')





