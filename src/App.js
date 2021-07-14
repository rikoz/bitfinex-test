import React from "react";
import logo from "./logo.svg";
// import OrderBook from "./OrderBook";
import Todo from "./Todo";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="Bitfinex" />
      </header>
      {/* <OrderBook /> */}
      <Todo />
    </div>
  );
}

export default App;
