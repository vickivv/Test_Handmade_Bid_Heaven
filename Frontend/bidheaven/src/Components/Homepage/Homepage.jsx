import React,{useState} from "react"
import Header from "./Header"
import Nav from "./Nav"
import Footer from "./Footer"
import Product_list from "./Product_list";

function Homepage(){
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleCategoryClick = (category) => {
      setSelectedCategory(category);
    };


    return(
        <div className ="Homepage">
        <Header/>
        <Nav onCategoryClick={handleCategoryClick} />
        <Product_list  selectedCategory={selectedCategory}     />
        <Footer/>
        </div>
       

    );
}

export default Homepage;