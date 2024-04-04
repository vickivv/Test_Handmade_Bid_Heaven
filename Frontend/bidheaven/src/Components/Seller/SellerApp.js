import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Products } from "./productspage/Products";
import { Overview } from "./overviewpage/Overview";
import { Orders } from './orders/Orders';
import { SellerLayout } from "./dashboard/SellerLayout";
import {ActiveLists} from "./productspage/ActiveLists";
import {SoldOutLists} from "./productspage/SoldOutLists";
import { AddNewProduct } from "./productspage/AddNewProduct";
import { Bidding } from "./biddings/Bidding";
import {OrderDetail} from "./orders/OrderDetail";
import { CompareBids } from "./biddings/CompareBids";

export const SellerApp = () => {
    return (
      // 确认二级路由的写法
    <Router>
        <div>
          <Routes>
            <Route path='/' element={<SellerLayout />} > 
              <Route path='/overview' element={<Overview />} />
              <Route path="/products" exact element={<Products />} />
              <Route path="/activeproducts" element={<ActiveLists />} />
              <Route path="/soldout" element={<SoldOutLists />} />
              <Route path="/biddings" element={<Bidding />} /> 
              <Route path='/comparebids/:productId' element={<CompareBids />} />
              <Route path="/pendingbids" element={<Bidding />} /> 
              <Route path="/orders" element={<Orders />} />
              <Route path="/orderdetail/:orderId" element={<OrderDetail/>} />
              <Route path="/sell" element={<AddNewProduct />} />
            </Route>
        </Routes>
      </div>
    </Router>

    )
}