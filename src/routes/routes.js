import { Router } from "express";
import methodOverride from "method-override";
import rutasProductos from "./product.route.js"
import rutasApiProductos from "./product.api.route.js"
import rutasCarrito from "./carrito.api.route.js"
import rutasUsuarios from "./user.route.js"
import rutasChat from "./chat.api.route.js"

import {
  getInfo,
  getHome,
  redirectFromRoot,
} from "../controllers/otherRoutesController.js";
import checkAuth from '../middlewares/checkAuth.js'


const router = Router();

router.use(methodOverride("_method", {
  methods: ["POST", "GET"]
}));

//other endpoints
router.get("/", redirectFromRoot);

router.get("/info", getInfo);

router.get("/home", checkAuth, getHome);
router.get("/datos", checkAuth, (req, res) => {
  res.json(req.user);
});


//router products views
router.use('/productos',checkAuth, rutasProductos)

//router api/products
router.use('/api/productos', checkAuth, rutasApiProductos)

//router api/carrito
router.use('/api/carrito', checkAuth, rutasCarrito)

//router api/chat
router.use('/api/chat', checkAuth, rutasChat)

router.use("/chat", (req,res)=>{
  res.redirect("/mensajes/chat.html")
})

//router usuario
router.use("/usuario",rutasUsuarios)


export default router;
