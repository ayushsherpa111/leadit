import * as React from "react";
import "./App.css";
import AuthProvider from "src/AuthProvider";

function App() {
  return (
    <div className="app">
      <AuthProvider></AuthProvider>
    </div>
  );
}

export default App;
