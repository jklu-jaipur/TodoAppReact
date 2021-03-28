import { auth, firestore } from "./firebase";

/*
collection      documents       subcollection       documents
USERS ->        userId      ->  TODOS   ->          todoId      -> fields: createdAt, todo, todoId, started, finished
                                fields: {
                                displayName: 'Name'
                                
                                }
*/

// Firestore database ref
const userDataRef = firestore().collection("USERS");

// Function to handle sign in with Google
export async function handleSignIn() {
  // Set the provider
  const provider = new auth.GoogleAuthProvider();
  // Sign in
  await auth()
    .signInWithPopup(provider)
    .then(
      (result) => {
        console.log("Signed in");
        // Get the user name from the result
        const userName = result.user.displayName;
        // Get the user uid from the result
        const userId = result.user.uid;
        addNewUser(userName, userId);
      },
      (error) => {
        console.log(error.message);
      }
    );
  // const userName = result.user.displayName;
}

// Function to add new user data to firestore when the user sign's in.
export async function addNewUser(name, id) {
  // Add the todos to firebase
  await userDataRef
    .doc(id)
    .set(
      {
        name,
      },
      { merge: true }
    )
    .then(
      () => console.log("User data added"),
      (error) => console.log(error.message)
    );
}

// Function to handle Sign out
export function handleSignOut() {
  return auth().signOut();
}

// function to add todo
export async function addTodo(todo, uid) {
  const todoDoc = userDataRef.doc(uid).collection("TODO").doc();

  // Todo id
  const todoId = todoDoc.id;
  // Server timestamp
  const SERVER_TIMESTAMP = firestore.FieldValue.serverTimestamp();
  console.log(SERVER_TIMESTAMP);
  // Add todo
  await todoDoc
    .set({
      ...todo,
      todoId,
      createdAt: SERVER_TIMESTAMP,
    })
    .then(
      () => alert("Todo added"),
      (error) => alert(error.message)
    );
}

// Get the user id of currently signed in User
export function getUserID() {
  let uid = auth().currentUser.uid;
  if (uid) {
    return uid;
  }
}

// Delete a todo
export async function deleteTodo(todoId, uid) {
  await userDataRef.doc(uid).collection("TODO").doc(todoId).delete();
}

// Update the started value in our todos.
export async function handleUpdateStart(todoId, uid) {
  await userDataRef.doc(uid).collection("TODO").doc(todoId).update({
    started: true,
  });
}

// Update the finished value in our todos.
export async function handleUpdateFinished(todoId, uid) {
  await userDataRef.doc(uid).collection("TODO").doc(todoId).update({
    finished: true,
  });
}
