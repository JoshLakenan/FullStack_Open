const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2] //gets password from the CLI running the file

// const url =
//   `mongodb+srv://fullstack:${password}@cluster0.o1opl.mongodb.net/?retryWrites=true&w=majority`

const url =
  `mongodb+srv://j2lakenan:${password}@cluster0.cobpejd.mongodb.net/testNoteApp?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)

mongoose.connect(url) //opens connection with mongoose

const noteSchema = new mongoose.Schema({ //Creates a schema
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema) //creates a constructor function that is used to create
//notes of the note schema type.

// Creates a new neote and saves it
const note = new Note({  //Creates a note
  content: 'CSS is Easy',
  important: true,
})

note.save().then(result => {   //Saves the note
  console.log('note saved!')
  mongoose.connection.close() // closes connection with mongoose
})

// // gets all the Note's and logs them out

// Note.find({}).then(result => {
//   /*
//   The objects are retrieved from the database with the find method of the Note model.
//   The parameter of the method is an object expressing search conditions.
//   Since the parameter is an empty object{}, we get all of the notes stored
//   in the notes collection.
//   */
//   result.forEach(note => {
//     console.log(note)
//   })
//   mongoose.connection.close()
// })