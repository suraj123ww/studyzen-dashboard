
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ClerkProvider } from "@clerk/clerk-react"

// Get the publishable key if available
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || '';

// Create a wrapper component that conditionally uses ClerkProvider
const AppWithAuth = () => {
  // If publishable key is available, use ClerkProvider
  if (PUBLISHABLE_KEY) {
    return (
      <ClerkProvider 
        publishableKey={PUBLISHABLE_KEY}
        clerkJSVersion="5.56.0-snapshot.v20250312225817"
        signInUrl="/sign-in"
        signUpUrl="/sign-up"
        signInFallbackRedirectUrl="/dashboard"
        signUpFallbackRedirectUrl="/dashboard"
        afterSignOutUrl="/">
        <App />
      </ClerkProvider>
    );
  }
  
  // Otherwise, just render the App directly without authentication
  return <App />;
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppWithAuth />
  </React.StrictMode>,
)
