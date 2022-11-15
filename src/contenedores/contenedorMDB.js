import config from "../config/config.js";
import mongoose from "mongoose";
import { loggerErrorFile } from "../loggerConfig.js";

//await mongoose.connect("mongodb+srv://CesarPerezMora:Jumpforce_2022@chproject.fgyalnv.mongodb.net/?retryWrites=true&w=majority");
export class ContenedorMongo {
  constructor(nombreColeccion, esquema) {
    this.Schema = new mongoose.Schema(esquema);
    this.coleccion = mongoose.model(nombreColeccion, this.Schema);
  }

  async create(element) {
    try {
      if (!element) {
        return null;
      } else {
        const inserted = await this.coleccion.create(element);
        return inserted;
      }
    } catch (error) {
      loggerErrorFile.error(`Saving error: ${error}`);
      throw error;
    }
  }
  async readAll() {
    try {
      const data = await this.coleccion.find({}, { __v: 0 });
      if (data === undefined) return null;
      else return data;
    } catch (error) {
      loggerErrorFile(error);
    }
  }
  async update(id, obj) {
    try {
      //Obtenemos los datos
      await this.coleccion.updateOne(
        { _id: id },
        {
          $set: obj,
        }
      );
      const updatedProduct = await this.coleccion.findOne(
        { _id: id },
        { __v: 0 }
      );
      return updatedProduct;
    } catch (error) {
      loggerErrorFile.error(`Saving error: ${error}`);
      throw error;
    }
  }

  async deleteAll() {
    try {
      await this.coleccion.deleteMany({});
    } catch (error) {
      loggerErrorFile.error(error);
    }
  }
  async readById(number) {
    try {
      const data = await this.coleccion.findOne({ _id: number }, { __v: 0 });
      if (data === undefined) return null;
      else return data;
    } catch (error) {
      loggerErrorFile.error(error);
    }
  }

  async readByEmail(email){
    try {
      const data = await this.coleccion.find({ email: email }, { __v: 0 });
      if (data === undefined) return null;
      else return data;
    } catch (error) {
      loggerErrorFile.error(error);
    }
  
  }

  async readCartByUserId(id){
    try{
      const data = await this.coleccion.findOne({ userId: id }, { __v: 0 });
      if (data === undefined) return null;
      else return data;
    }catch(error){
      loggerErrorFile(error)
    }
  }

  async findProductsByCat(category) {
    const data = await this.coleccion.find({resolucion:category});
    if (data === undefined) return null;
    else return data;
  }

  async findUser(username) {
    try {
      const data = await this.coleccion.findOne(username, { __v: 0 });
      if (data === undefined) return null;
      else return data;
    } catch (error) {
      loggerErrorFile(error);
    }
  }
  async findUserById(id) {
    try {
      const data = await this.coleccion.findById(id);
      if (data === undefined) return null;
      else return data;
    } catch (error) {
      loggerErrorFile(error);
    }
  }

  
  async deleteById(number) {
    try {
      await this.coleccion.deleteOne({ _id: number });
    } catch (error) {
      loggerErrorFile(error);
    }
  }
}

//export default ContenedorMongo
