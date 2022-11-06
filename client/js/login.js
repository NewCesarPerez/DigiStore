

const userNameTag = document.getElementById("usernameId");
const passwordTag = document.getElementById("passwordId");
const loginBtn = document.getElementById("logginButton");




loginBtn.addEventListener("click", logging);


async function  logging() {
    console.log('ejecutando funcion logging')
  event.preventDefault();
  const userNameTagValue = userNameTag.value.toLowerCase();
  const passwordTagValue = passwordTag.value;
  await checkUser(userNameTagValue, passwordTagValue);
  await renderProducts()
}

const checkUser = async (username, password) => {
  const response = await axios.post("http://localhost:3000/usuario/api/login", {
    username: username,
    password: password,
  }, { withCredentials: true });
 
  if (response.data.existence) {
    console.log('login '+response.data.admin)
    if(response.data.admin){
      
      //window.location.href = "admin.home.html"
    }else window.location.href = "home.html";
  }else{
    window.location.href = "register.html";
  } 
};
const renderProducts= async()=>{
  const response= await axios.get('http://localhost:3000/api/productos')
  console.log(response.data)
}
