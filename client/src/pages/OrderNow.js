import React from "react";
import ProductList from "../components/shopping/ProductList";
import CategoryMenu from "../components/shopping/CategoryMenu";
import ChooseARescue from "./shopping/ChooseRescue";

const OrderNow = () => {
  return (
    <div>
      <div className="w-full">
        <ChooseARescue />
        <CategoryMenu />
        <ProductList />

      </div>
    </div>
  );
};

export default OrderNow;
