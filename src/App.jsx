import { useEffect } from 'react';
import './App.css'
import axios from "axios";
import { useState } from 'react';


function App() {
  const [searchQuery , setSearchQuery] = useState("")
  const [products , setProducts] = useState([])
  const [loading , setLoading] = useState(false)
  const [timer , setTimer] = useState(null)


  const fetchProducts = async () => {
    const res = await axios.get(`https://demo.dataverse.org/api/search?q=${searchQuery}`)
    setProducts(res?.data?.data?.items)
    setLoading(false)
  }

  const handleInputChange = (e) => {
    setLoading(true)
    if(timer) clearTimeout(timer)
    setTimer(setTimeout(() => {
      setSearchQuery(e.target.value);
      console.log("API CALLED")
    },1000))
  }

  useEffect(() => {
    fetchProducts();
  },[searchQuery])
  return (
    <>
      <h2>Search bar with API Debouncing using react js</h2>
      <p>Enter text in the input field to see the magic. For Example : test</p>
      <input type='text' className='search-bar' placeholder='Enter search text here...' onChange={handleInputChange}/>
      {loading && <div>Loading...</div>}
      <section>
        {products.map((product,index) => <div key={index}>
          <p>{product.name}</p>
          <hr />
        </div>)}
      </section>
    </>
  )
}

export default App
