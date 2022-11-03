import Yargs from "yargs";

const yargs = Yargs(process.argv.slice(2));
const args = yargs

  .alias({
    p: "puerto",
    m: "modo"
  })
  .default({
    // puerto: process.env.PORT, HABILITAR PARA HEROKU
    puerto:3000,
    modo: 'fork'
  }).argv;

 
  export default args