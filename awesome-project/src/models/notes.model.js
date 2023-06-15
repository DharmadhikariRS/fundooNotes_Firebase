
function notesSchema(data) {
  console.log("data in note model:",data);
  return {
   id:data.id,
   title:data.title,
   description:data.description,
   createdBy:data.createdBy,
   isArchieved:data.isArchieved,
   isTrash:data.isTrash,

   toFirestore: function () {
        console.log("dataaaa",data);
          return {
           id:data.id,
           title:data.title,
           description:data.description,
            createdBy:data.createdBy,
            isArchieved:data.isArchieved?data.isArchieved:false,
            isTrash:data.isTrash?data.isTrash:false,
          };
      }
  };
}

function getNoteFromFirestore(doc) {
  console.log("idddd=",doc.id);
  const data = {...doc.data(),id:doc.id}
  console.log("data in get fn :",data);
  return notesSchema(data);
}

module.exports = {
  notesSchema,
  getNoteFromFirestore
};

