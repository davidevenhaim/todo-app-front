// @@ React and navigation
import React from "react";

// @@ Context
import { AuthProvider } from "./src/context/AuthContext";

// @@ Index of app logic
import Index from "./src/Index";

const App = () => {
  return (
    <AuthProvider>
      <Index />
    </AuthProvider>
  );
};

export default App;
