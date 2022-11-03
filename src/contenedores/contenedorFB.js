import admin from "firebase-admin";
import config from "../dbConfig/dbConfig.js";

admin.initializeApp({
  credential: admin.credential.cert(config.firebase),
});
const db = admin.firestore();

class ContenedorFirebase {
  constructor(nombreColeccion) {
    this.coleccion = db.collection(nombreColeccion);
  }

  async create(element) {
    try {
  
      const newRecord = await this.coleccion.add(element)
      return newRecord.id
    } catch (error) {
      console.log(`Saving error: ${error}`);
      throw error;
    }
  }

  async update(id, obj) {
    try {
      const record = this.coleccion.doc(id);
      const recordUpdated = await record.update(obj);
      return recordUpdated;
    } catch (error) {
      console.log(`Updating error: ${error}`);
      throw error;
    }
  }

  async readById(number) {
    try {
      const record = await this.coleccion.doc(number);
      const recordDoc = await record.get();
      return {id:recordDoc.id, ...recordDoc.data()};
    } catch (error) {
      console.log(error);
    }
  }

  async readAll() {
    try {
      const recordsSnapshot = await this.coleccion.get();
      const records = recordsSnapshot.docs.map((doc)=>{
        return {id:doc.id, ...doc.data()}});
      if (records === undefined) return null;
      else return records;
    } catch (error) {
      console.log(error);
    }
  }
  
  async deleteById(number) {
    try {
      const record= await this.coleccion.doc(number)
      await record.delete()
      console.log(`Record delete: ${record.data().id}`)
    } catch (error) {
      console.log(`Error desde deleteById: ${error}`);
    }
  }
}

export default ContenedorFirebase;
