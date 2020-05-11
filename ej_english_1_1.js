


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


async function start_program(doc) {
  try {
    await PouchDB('kittens').destroy()
    let db = await new PouchDB('kittens')

    let result = await db.put(doc)
    let document = await db.get(result.id)

    display.innerHTML= document.name
    console.log(document);
    } 
    
    catch (err) {
      console.log(err);
    }
}

start_program(doc)



