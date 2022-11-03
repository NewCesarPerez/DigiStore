import dotenv from "dotenv";
dotenv.config();
export let ProductoDao;
export let CarritoDao;
export let UserDao

switch (process.env.DATABASE) {
  case "firebase":
    const { default: ProductoDaoFirebase } = await import  (
      "./productos/productoDaoFB.js"
    );
    const { default: CarritoDaoFirebase } = await import(
      "./carritos/carritoDaoFB.js"
    );
    ProductoDao = new ProductoDaoFirebase();
    CarritoDao = new CarritoDaoFirebase();
    break;

  case "mongo":
    const { default: ProductoDaoMongo } = await import(
      "./productos/productoDaoMDB.js"
    );
    const { default: CarritoDaoMongo } = await import(
      "./carritos/carritoDaoMDB.js"
    );

    const { default: UserDaoMongo } = await import(
      "./usuario/user.dao.MDB.js"
    )
    // ProductoDao = new ProductoDaoMongo();
    // CarritoDao = new CarritoDaoMongo();
    // UserDao= new UserDaoMongo();
    break;

  default:
    break;
}

