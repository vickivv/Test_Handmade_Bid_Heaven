import react,{useState,useEffect} from'react';
import Header from '../Homepage/Header';
import Footer from '../Homepage/Footer';



function Ceramics (){
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        const fetchCategories = async () => {
          const response = await fetch('http://localhost:8000/category');
          const data = await response.json();
          setCategories(data);
        };
    
        fetchCategories();
      }, []);



return (
    <div className="catergory-content">
     <Header/>
    <div>

    {categories.map((category) => (
        <button key={category.id} onClick={() => {/* Set selected category and fetch products */}}>
          {category.name}
        </button>
      ))}
    </div>


     <Footer />


    </div>
);

}

export default Ceramics;