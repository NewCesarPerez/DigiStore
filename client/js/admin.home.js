


const hasproductsTag=document.getElementById('hasproductsId')
const noproductsTag=document.getElementById('noproductsId')
const fetchProducts=async ()=>{
    const response=await axios.get('http://localhost:3000/api/productos')
    console.log(response.data)
}
const renderProducts=()=>{

}
//fetchProducts()