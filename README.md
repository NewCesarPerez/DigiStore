# Digistore
PROYECTO FINAL - Backend - Coderhouse 2022
Aclaraciones:
Se combina la idea de API RESTful con vistas creadas con motores de plantillas (ejs).
Listado de rutas y su retorno:

//RUTA BASE
http://localhost:3000: 
  get - Redirige a través de un middleware a la vista de inicio si el usuario esta autenticado, o a la vista de login si no esta autenticado.
  
// RUTA DE USUARIOS
http://localhost:3000/usuario/login: 
  get - Vista de login donde el usuario puede iniciar sesion.  
  post - Si supera el login strategy de passport, redirige a través de un middleware a la vista de inicio para admin si el usuario tiene este role, o a la vista de productos si el usuario tiene role de 'user'.
http://localhost:3000/usuario/signup: 
  get - Vista donde el usuario puede registrarse.
  post - Si supera el register strategy de passport, crea el usuario y redirigide a la vista de login. Por defecto se crea como admin false por seguridad. Para otorgar role de admin debe ser cambiada la propiedad en mongoAtlas
http://localhost:3000/usuario/failsignup: 
  get - Cuando hay hay un error en el register strategy, renderiza un aviso en el navegador.
http://localhost:3000/usuario/faillogin: 
  get - Cuando hay hay un error en el lgin strategy, renderiza un aviso en el navegador.
http://localhost:3000/usuario/logout: 
  get - Acaba la session del usuario y redirige a http://localhost:3000
  
// RUTA DE PRODUCTOS QUE DEVUELVEN VISTAS
http://localhost:3000/productos: 
  get - Trae y renderiza los productos almacenados en la base de datos
http://localhost:3000/productos/gestionar:
  get - Trae y renderiza una vista exclusiva para usuarios con roles de administrador (middleware) donde podran cargar y eliminar productos.

//RUTA DE API PRODUCTOS
http://localhost:3000/api/productos: 
  get - devuelve un json con los productos almacenados en la base de datos
  post - crea un producto nuevo en la base de datos y redirecciona nuevamente a /gestionar
http://localhost:3000/api/productos/categoria/:category:
  get - devuelve un json con un arreglo de productos que coincidan con la categoria (resolucion) pasada por parametro (4k, 8k, FHD, HD)
http://localhost:3000/api/productos/:id:
  get - devuelve un json con el producto cuyo ID coincida con el informado por parametros.
  put - permite modificar el producto cuyo id coincida con el informado por parametros. Devuelve un json con ese producto
  delete - Elimina el producto cuyo id coincida con el informado por parametros. Devuelve un mensaje json confirmando la eliminación del producto
  
  // RUTAS API CARRITO
 http://localhost:3000/api/carrito/:id:
  get - devuelve un json con el carrito cuyo id coincida con el id informado por parametros.
 http://localhost:3000/api/carrito/user/:id
  get - devuelve un json con el carrito cuyo userid coincida con el userid informado por parametros.
 http://localhost:3000/api/carrito/:id_prod/producto/
  post - Carga al carrito el producto cuyo id coincida con el param id_product. Devuelve el carrito actualizado
  delete - Elimina del carrito el producto cuyo id coincida con el param id_product. Devuelve el carrito actualizado
 http://localhost:3000/api/carrito/comprar/
  post - Convierte al carrito en una orden y la almacena en la base de datos. Devuelve un json con la orden creada.
  
  //RUTAS API CHAT
  http://localhost:3000/api/chat:
    get - Devuelve un json con los mensajes almacenados en la base de datos.
    post - Inserta mensajes a la base datos. Devuelve un json con la informacion insertada.
  http://localhost:3000/api/chat/:email:
    get - Devuelve un json con los mensajes almacenados en la base de datos, usando el email de usuario como filtro.
    
  // OTRAS RUTAS
  http://localhost:3000/info
    get - Devuelve una vista con información referente a procesos
            - Puerto
            - Email de nodemailer
            - Tiempo de sesion
            - Mongo atlas uri
            - Sistema operativo
            - Version de node
            - Memoria
            - Process ID
            - Numero de procesadores
            
  http://localhost:3000/datos
    get - Devuelve un json con la información del usuario autenticado.
  
    
Tecnologias mas relevantes utilizadas para el proyecto
  - Node.js
  - Express
  - Express-Session
  - Passport
  - Cokie parser
  - Bcrypt
  - Mongoose
  - log4js
  - EJS
  - Websocket

Arquitectura utiliza
- MVC
- DAOS y DTOS

Los archivos correspondientes a la implementación de "firebase" siguen presentes pero no se recomienda su uso porque la segunda parte del proyecto se realizo enteramente con mongoose.
