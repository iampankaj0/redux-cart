import React from "react";
import Header from "./components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import CardDetails from "./components/CardDetails";
import Cards from "./components/Cards";

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route exact path="/redux-cart/" element={<Cards />} />
        <Route path="/cart/:id" element={<CardDetails />} />
      </Routes>
    </div>
  );
};

export default App;
