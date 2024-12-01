import React from "react";
import InfiniteNestedJsonCreator from "./components/InfiniteNestedJsonCreator/InfiniteNestedJsonCreator";
                        
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Infinite Nested JSON Creator</h1>
      </header>
      <main className="App-main">
        <InfiniteNestedJsonCreator />
      </main>
    </div>
  );
}

export default App;
