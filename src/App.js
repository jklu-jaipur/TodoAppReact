import React, { useState, useEffect } from 'react';
import "./App.css";
import Todo from "./pages/Todo/Todo";
import { auth } from "./utils/firebase";
import SignIn from './pages/SignIn/SignIn'

function App() {
  // State to hold the login status.
  const [user, setUser] = useState(null);

  // Using the effect hook to listen for changes in authentication state.
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((_user) => {
      setUser(_user)
    })
    return unsubscribe;
  });

  return (
    <div>
      {/* If the user is signed in, show Todo component, else, show Sign In component.*/}
      {user ? <Todo />
        :
        <SignIn />}
    </div>
  );
}

export default App;
