import React from "react"
import Header from "./Header"
import Nav from "./Nav"
import Footer from "./Footer"
import Product_list from "./Product_list";

function Homepage(){

    return(
        <div className ="Homepage">
        <Header/>
        <Nav/>
        <Product_list/>
        <Footer/>
        </div>
       

    );
}

export default Homepage;