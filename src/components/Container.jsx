import React from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";

const Container = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer/>
    </>
  );
};

export default Container;
