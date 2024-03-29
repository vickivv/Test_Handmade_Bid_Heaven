import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Products } from "./productspage/Products";
import { Overview } from "./overviewpage/Overview";
import { Orders } from './orders/Orders';
import { SellerLayout } from "./dashboard/SellerLayout";
import {ActiveLists} from "./productspage/ActiveLists";
import {SoldOutLists} from "./productspage/SoldOutLists";
import { AddNewProduct } from "./productspage/AddNewProduct";
import { Bidding } from "./biddings/Bidding";

export const SellerApp = () => {
    return (

    <Router>
        <div>
          <Routes>
            <Route path='/' element={<SellerLayout />} > 
              <Route path='overview' element={<Overview />} />
              <Route path="products" exact element={<Products />} />
              <Route path="activeproducts" element={<ActiveLists />} />
              <Route path="soldout" element={<SoldOutLists />} />
              <Route path="biddings" element={<Bidding />} /> 
              <Route path="pendingbids" element={<Bidding />} /> 
              <Route path="orders" element={<Orders />} />
              <Route path='sell' element={<AddNewProduct />} />
            </Route>
        </Routes>
      </div>
    </Router>

    )
}