const userNameTag = document.getElementById("usernameId");
const passwordTag = document.getElementById("passwordId");
const loginBtn = document.getElementById("logginButton");
loginBtn.addEventListener("click", logging);

function logging() {
    console.log('ejecutando funcion logging')
  event.preventDefault();
  const userNameTagValue = userNameTag.value.toLowerCase();
  const passwordTagValue = passwordTag.value;
  checkUser(userNameTagValue, passwordTagValue);
}

const checkUser = async (username, password) => {
  const response = await axios.post("http://localhost:3000/usuario/api/login", {
    username: username,
    password: password,
  });

  if (response.data.existence) {
    console.log('login '+response.data.admin)
    if(response.data.admin) window.location.href = "admin.home.html";
    else window.location.href = "home.html";
  }else{
    window.location.href = "register.html";
  } 
};
