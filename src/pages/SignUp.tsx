
import { SignUp as ClerkSignUp } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="mb-8 flex items-center gap-2">
        <div className="bg-primary text-primary-foreground rounded-md w-10 h-10 flex items-center justify-center font-bold">
          S
        </div>
        <h1 className="text-3xl font-bold">StudyZen</h1>
      </div>
      <div className="w-full max-w-md">
        <ClerkSignUp 
          routing="path" 
          path="/sign-up" 
          signInUrl="/sign-in"
          afterSignUpUrl="/"
        />
      </div>
      <button 
        onClick={() => navigate("/")}
        className="mt-8 text-sm text-muted-foreground hover:text-foreground"
      >
        Back to home
      </button>
    </div>
  );
};

export default SignUp;
