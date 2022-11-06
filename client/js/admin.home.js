const fetchProducts=async ()=>{
    const response=await axios.get('http://localhost:3000/api/productos', {withCredentials:true})
    console.log(response.data)
}
fetchProducts()