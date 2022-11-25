import React, { useState } from "react";
import { Link } from "react-router-dom";
function App() {
  return (
    <div className="App" data-testid="app">
      <h1>h1 ALL</h1>
      <Link to="/component/button">Component</Link>
      <Link to="/posts">Get Posts</Link>
      <Link to="/auth">Auth Page</Link>
    </div>
  );
}

export default App;
