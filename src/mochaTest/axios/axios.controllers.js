import axios from "./axios.instance.js";

/* Leemos los productos */

const login = async () => {
  try {
      const response = await axios.post(`/usuario/login`, {
          username: 'newcesarperez',
          password: '123456',
      });
      console.log(response.status)
  } catch (err) {
      console.log(err)
  }
}
const getAllProducts = async () => {
  try {
    const response = await axios.get("api/productos");
    console.log(response.data);
  } catch (error) {
    console.log("Hubo un error", error);
  }
};

const postProduct = async () => {
  try {
    const response = await axios.post("http://localhost:3000/api/productos", {
      nombre: "Mock TV",
      descripcion: "old tv",
      codigo: "oldTV1000",
      precio: 10000,
      foto: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F001%2F271%2F009%2Foriginal%2Fvintage-old-television-vector.jpg&imgrefurl=https%3A%2F%2Fes.vecteezy.com%2Fvectores-gratis%2Fold-tv&tbnid=9VoVt183KZyXRM&vet=12ahUKEwiem8n95YD7AhWSuJUCHQcaBrEQMygAegUIARDNAQ..i&docid=aNK_IUJr1cVBXM&w=7000&h=5000&q=old%20tv&ved=2ahUKEwiem8n95YD7AhWSuJUCHQcaBrEQMygAegUIARDNAQ",
      stock: 1,
    });
    console.log("product added", response.data);
  } catch (error) {
    console.log("Error", error);
  }
};

const updateProduct = async (_id) => {
  try {
    const response = await axios.put(
      `http://localhost:3000/api/productos/${_id}`,
      {
        nombre: "Mock TV",
        descripcion: "really old tv",
        codigo: "oldTV1000",
        precio: 8000,
        foto: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F001%2F271%2F009%2Foriginal%2Fvintage-old-television-vector.jpg&imgrefurl=https%3A%2F%2Fes.vecteezy.com%2Fvectores-gratis%2Fold-tv&tbnid=9VoVt183KZyXRM&vet=12ahUKEwiem8n95YD7AhWSuJUCHQcaBrEQMygAegUIARDNAQ..i&docid=aNK_IUJr1cVBXM&w=7000&h=5000&q=old%20tv&ved=2ahUKEwiem8n95YD7AhWSuJUCHQcaBrEQMygAegUIARDNAQ",
        stock: 1,
      }
    );
    console.log("updated product", response.data);
  } catch (error) {
    console.log("Error", error);
  }
};

const deleteProduct = async (_id) => {
  try {
    const response = await axios.delete(
      `http://localhost:3000/api/productos/${_id}`
    );
    console.log("Product has been eliminate", response.data);
  } catch (error) {
    console.log("Error", error);
  }
};

export default {
  login,
  getAllProducts,
  postProduct,
  updateProduct,
  deleteProduct,
};
