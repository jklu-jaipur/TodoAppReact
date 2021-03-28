import React, { useEffect, useState } from "react";
import "./App.css";
import Todo from "./pages/Todo/Todo";
import SignIn from "./pages/SignIn/SignIn";
import { auth } from "./utils/firebase";

function App() {
  // State to hold the login status
  const [user, setUser] = useState(null);

  // Use the effect hook to listen for changes in authentication
  useEffect(() => {
    // Listen for auth state change
    const unsubscribe = auth().onAuthStateChanged((_user) => {
      setUser(_user);
    });
    // Cleanup
    return unsubscribe;
  });

  return <div>{user ? <Todo /> : <SignIn />}</div>;
}

export default App;
