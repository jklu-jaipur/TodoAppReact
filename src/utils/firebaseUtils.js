import { auth, firestore } from "./firebase";

// Function to handle sign in.
export async function signInWithGoogle() {
  // Use the google provider.
  const provider = new auth.GoogleAuthProvider();
  // sign in with google by creating a popup.
  const result = await auth().signInWithPopup(provider);
  // Get the user name and uid.
  const userName = result.user.displayName;
  const userId = result.user.uid;
  // Add the user to database.
  addUser(userName, userId);
}

// function to sign out
export function signOut() {
  return auth().signOut();
}

// Add todos
export async function addTodos(todos, uid) {
  // Create a document ref to generate id
  const todoDocRef = firestore()
    .collection("USERS")
    .doc(uid)
    .collection("TODOS")
    .doc();
  // Get the document id
  const todoId = todoDocRef.id;
  // Get the server timestamp
  const SERVER_TIMESTAMP = firestore.FieldValue.serverTimestamp();
  // Add the document to firestore.
  await todoDocRef.set({ ...todos, todoId, timeStamp: SERVER_TIMESTAMP });
}

// Delete todos
export async function deleteTodo(todoId, uid) {
  // Delete the todo
  await firestore()
    .collection("USERS")
    .doc(uid)
    .collection("TODOS")
    .doc(todoId)
    .delete();
}

// Update started status
export async function updateStarted(todoId, uid) {
  await firestore()
    .collection("USERS")
    .doc(uid)
    .collection("TODOS")
    .doc(todoId)
    .update({
      started: true,
    });
}

// Update finished status
export async function updateFinished(todoId, uid) {
  await firestore()
    .collection("USERS")
    .doc(uid)
    .collection("TODOS")
    .doc(todoId)
    .update({
      finished: true,
    });
}

// Get user uid
export function getUserId() {
  return auth().currentUser.uid;
}

// Add user data when the user signs in.
async function addUser(name, uid) {
  // User user uid as the document id
  await firestore().collection("USERS").doc(uid).set(
    {
      name,
    },
    { merge: true }
  );
}
