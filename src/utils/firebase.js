import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  updateDoc,
  doc,
  query,
  where,
  getDocs
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const storage = getStorage(app);

console.log("app", app.options);
console.log("db", db);
console.log("auth", auth);
console.log("storage", storage);

const register = async (name, email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log("user registered", user);
    // Add a user document with a generated ID.
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      name,
      email,
    });
    console.log("Document written with ID: ", user.uid);
  } catch (error) {
    console.log("error while adding document for new user: ", error.message);
  }
};

const loginWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log("user logged in: ", user);
  } catch (error) {
    console.log("error during login: ", error.message);
  }
};

const logout = async () => {
  try {
    await signOut(auth);
    console.log("user has been logged out");
  } catch (error) {
    console.log("error during logout: ", error.message);
  }
};

const loginWithGoogle = () => {
  console.log("TODO: this functionality is not yet implemented");
};

const resetPassword = (email) => {
  try {
    console.log("TODO: this functionality is not yet implemented");
  } catch (error) {
    console.log("error while sending password reset email: ", error.message);
  }
};

const uploadImage = async (userID, file) => {
  try {
    // add a document in db for this thing
    const docRef = await addDoc(collection(db, "things"), {
      userID,
      sourceword: "",
      translatedword: "",
      languageto: "es",
      difficultyflag: "Easy",
    });
    const documentId = docRef.id;
    console.log("document written with id: ", documentId);

    // create a reference in storage & upload file
    const storageref = ref(storage, `users/${userID}/${documentId}`);
    await uploadBytes(storageref, file);
    console.log(`uploaded file to storage at path: users/${userID}/${documentId}`);

    // obtain the download url for the image
    const downloadURL = await getDownloadURL(
      ref(storage, `users/${userID}/${documentId}`)
    );
    console.log("download url:", downloadURL);

    // update the document in db with the downloadURL for the image
    await updateDoc(docRef, { downloadURL });

    // return download url for the image to caller
    return { downloadURL, documentId };
  } catch (error) {
    console.log(`error`, error);
  }
};

const getUserDictionary = async (userID) => {

  let dictionary = [];
  try {
    const q = query(collection(db, "things"), where("userID", "==", userID));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => { 
      const dataObject = doc.data();
      dictionary.push({ ...dataObject, docId: doc.id });
    });

    console.log("Dictionary:");
    console.log(dictionary);

  } catch (e) {
    console.error("Error reading documents: ", e);
  }

  return dictionary;
};


const updateWordDifficulty = async (docID, difficulty) => {  
  try {
    const wordRef = doc(db, 'things', docID);
    setDoc(wordRef, { difficultyFlag : difficulty }, { merge: true });

  } catch (e) {
    console.error("Error occured while writing document: ", e);
  } 
};


export {
  auth,
  db,
  register,
  loginWithEmail,
  logout,
  loginWithGoogle,
  resetPassword,
  storage,
  uploadImage,
  getUserDictionary,
  updateWordDifficulty
};
