const fs=require('fs')
class Contenedor{
    constructor(fileName){
        this.fileName=fileName;
        if(!fs.existSync(this.fileName)) this.createFile([]).then(console.log('Created'))
    }
    async createFile(content){
        try{
            await fs.promises.writeFile(this.fileName,content,'utf-8')
        }catch(error){
            console.log(`Error creando el archivo: ${error}`)
        }
    }

    
    async save(element) {
        try {
          //Obtenemos los datos
          const data = await this.getAll()
          //Si existe data se asigna el ultimo id + 1, de caso contrario es 1
          const id = data.length !== 0 ? data[data.length - 1].id + 1 : 1
     
          //Asingamos id y timnestamps
          element.id = id
          element.timestamps = Date.now()
 
          //Agregamos el nuevo elemento
          data.push(element)
          //guardamos los datos
          await this.createFile(JSON.stringify(data, null, 2))
          //Retornamos el elemento guardado
          return element.id
        } catch (error) {
          console.log(`Saving error: ${error}`)
          throw error
        }
      }

      async update(obj) {
        try {
          //Obtenemos los datos
          const data = await this.getAll()
          //actualizamos el elemento deseado
          const index = data.findIndex((element) => element.id === obj.id)
          data[index]=obj
          //guardamos los datos
          await this.createFile(JSON.stringify(data, null, 2))
          //Retornamos el elemento guardado
          return obj
        } catch (error) {
          console.log(`Saving error: ${error}`)
          throw error
        }
      }
     
    async deleteAll(){
        
    try{
        await this.createFile('[]')
    }catch(error){
        console.log(`Deleting error: ${error}`)
    }
    
}
    async getById(number){
        try{
            const data=await fs.promises.readFile(this.fileName,'utf-8')
            this.dataParse=JSON.parse(data)
            const dataById=this.dataParse.find(element=>element.id===number)
            if(dataById===undefined)return null
            else return dataById
        }catch(error){console.log(error)}
    }
    
    async getAll(){
        try{
            let data=await fs.promises.readFile(this.fileName,'utf-8')
            const dataParse=JSON.parse(data)
            return dataParse
        }catch(error){
            console.log(error)}
    }
    async deleteById(number){
        try{
        const data=await fs.promises.readFile(this.fileName,'utf-8')
        this.dataParse=JSON.parse(data)
        this.dataParse=this.dataParse.filter(customElements=>customElements.id!==number)
        console.log(JSON.stringify(this.dataParse))
        this.createFile(JSON.stringify(this.dataParse,null,2))
            }catch(error){
                console.log(`Error desde deleteById: ${error}`)
            }
        }
    }

    module.export=Contenedor