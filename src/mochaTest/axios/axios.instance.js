import axios from "axios";
import { wrapper } from "axios-cookiejar-support";
import { CookieJar } from "tough-cookie";

const jar = new CookieJar();
const instance = wrapper(axios.create({ jar, baseURL: "http://localhost:3000"}));

instance.defaults.withCredentials = true;

export default instance;
