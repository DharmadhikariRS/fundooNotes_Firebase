// import mongoose from 'mongoose';
// import logger from './logger';

// const database = async () => {
//   try {
//     // Replace database value in the .env file with your database config url
//     const DATABASE =
//       process.env.NODE_ENV === 'test'
//         ? process.env.DATABASE_TEST 
//         : process.env.DATABASE;

//     await mongoose.connect(DATABASE, {
//       useFindAndModify: false,
//       useCreateIndex: true,
//       useNewUrlParser: true,
//       useUnifiedTopology: true
//     });
//     logger.info('Connected to the database.');
//   } catch (error) {
//     logger.error('Could not connect to the database.', error);
//   }
// };
// export default database;
import firebase from 'firebase'
const firebaseConfig = {
  apiKey: "AIzaSyBr9u4AbFz_Vn4znGVM9zhArN_aeHNMALA",
  authDomain: "fundoonotes-47ae3.firebaseapp.com",
  projectId: "fundoonotes-47ae3",
  storageBucket: "fundoonotes-47ae3.appspot.com",
  messagingSenderId: "917371682489",
  appId: "1:917371682489:web:261493753c55fe1458e568"
};

firebase.initializeApp(firebaseConfig);

const db=firebase.firestore();
const users=db.collection('users');
export const notes=db.collection('notes')
 export default users;