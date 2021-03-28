import React from "react";
import { handleSignIn } from "../../utils/firebaseUtils";

function SignIn() {
  return (
    <div>
      <button onClick={handleSignIn}>Sign In with google</button>
    </div>
  );
}
export default SignIn;
