import React from "react";
import { signInWithGoogle } from "../../utils/firebaseUtils";
function SignIn() {
  return (
    <div className="signIn">
      <button onClick={signInWithGoogle}>SignIn with Google</button>
    </div>
  );
}

export default SignIn;
