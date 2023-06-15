import Notes, { notesSchema } from '../models/notes.model';
import {client} from '../config/redis'
import { notes } from '../config/database.js';
import  notesModel  from '../models/notes.model';
//create a new note
export const createNote = async (body) => {
  // await client.del('getAllData');
//   const data = await notes.add(body).then((docRef) => { console.log('Document written with ID: ', docRef); return docRef.get();  })
//   .then((doc) => { console.log('Document data:', doc.data()); return  {id:doc.id, ...doc.data(),}})
//   .catch((error) => { console.error('Error adding document: ', error); })
//   notes.doc(data.id).set({
//     isArchieved: false,
//     isTrash:false
// }, { merge: true });
const note = notesModel.notesSchema(body);

// Add user data to Firestore

const docRef = await notes.add(note.toFirestore());
// console.log('User added successfully with ID:', docRef.id);
console.log("docref:",docRef);
// Retrieve the added user data
const docSnapshot = await docRef.get();
console.log("docsnapshot:",docSnapshot);
const notesCreate = notesModel.getNoteFromFirestore(docSnapshot);

return notesCreate;

};

//get all notes
export const getAllNotes = async (body) => {
// const getNoteDetails=await Notes.find({userId:body.userId});
// await client.set('getAllData',JSON.stringify(getNoteDetails));
//   const data = await Notes.find({userId:body.userId});
//   return data;
// };
// const getNoteDetails=await Notes.find({userId:body.userId});
// await client.set('getAllData',JSON.stringify(getNoteDetails));
//   const data = await Notes.find({userId:body.userId});
//   return data;

  const response = await notes.where('id','==', body.id).get();
const data =response.docs.map((doc)=>({id:doc.id, ...doc.data(),}))
return data;
};



//get note bu ID
export const getNote = async (id,body) => {
  // const data = await Notes.findOne({_id,userId:body.userId});


  const response=await notes.doc(id).get()
  const data =response.data()
  console.log("data in get note= ",data);
  return data;
};

//update a note
export const updateNote = async (id, body) => {
  // const data = await Notes.findByIdAndUpdate(
  //   {
  //     _id,
  //     userId:body.userId
  //   },
  //   body,
  //   {
  //     new: true
  //   }
  // );
  // return data;

  // const data=body;
  // await notes.doc(id).update(data)
  // return data;  

  const note = notesModel.notesSchema(body);
  console.log("id in update=",id);
  const updated=await notes.doc(id).update(note.toFirestore())
  console.log("update response",updated);
  return updated;

};

//delete a Single note
export const deleteNote = async (id, body) => { 
  // await Notes.findByIdAndDelete({_id,userId:body.userId});
  // return '';

  const data= await notes.doc(id).delete()
console.log("del data=",data);
  return data;


};


//archieve a note
export const archiveNote = async (id,body) => {
  // const note = await Notes.findOne({ _id, userId:body.userId });
  // const isArchived = note.isArchived === false ? true : false;
  // const data = await Notes.findByIdAndUpdate(
  //   {
  //     _id
  //   },
  //   { isArchived: isArchived },
  //   {
  //     new: true
  //   }
  // );
  // return data;
  const response=await notes.doc(id).get()
  const archieve=response.data().isArchieved;
console.log("in archieve arch=",archieve);
  await notes.doc(id).update({isArchieved:!archieve})


};

//trash a note
export const trashNote = async (id,body) => {
  // const note = await Notes.findOne({ _id: _id ,userId:body.userId});
  // const isTrash = note.isTrash === false ? true : false;
  // const data = await Notes.findByIdAndUpdate(
  //   {
  //     _id
  //   },
  //   { isTrash: isTrash },
  //   {
  //     new: true
  //   }
  // );
  // return data;

  const response=await notes.doc(id).get()
  const trash=response.data().isTrash;
console.log("in archieve trash=",trash);
  await notes.doc(id).update({isTrash:!trash})
};

export const updateNoteColor = async (_id, body) => {
  const data = await Notes.findByIdAndUpdate(
    {
      _id,
      userId:body.userId
    },
    body,
    {
      new: true
    }
  );
  return data;
};