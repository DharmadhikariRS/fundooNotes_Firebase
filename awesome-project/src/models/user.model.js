
function userSchema(data) {
  console.log("data in model:",data);
  return {
 
    id:data.id,
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    password: data.password,
      toFirestore: function () {
        console.log("dataaaa",data);
          return {
            email: data.email,
              firstName: data.firstName,
              lastName: data.lastName,
              password: data.password
          };
      }
  };
}

function getUserFromFirestore(doc) {
  
  const data = {id:doc.id, ...doc.data(),}
  console.log("data in get fn :",data);
  return userSchema(data);
}

module.exports = {
  userSchema,
  getUserFromFirestore
};

