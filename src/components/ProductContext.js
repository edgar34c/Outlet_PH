import React, { createContext, useState, useContext } from "react";

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [produtos, setProdutos] = useState([]);

  return (
    <ProductContext.Provider value={{ produtos, setProdutos }}>
      {children}
    </ProductContext.Provider>
  );
};

const useProd = () => {
  const prod = useContext(ProductContext);
  return prod;
};

export { ProductProvider, useProd };
