export default class NodeMailerTemplates{
    
    static getUserRegTemplate(newUser){
        this.userRegTemplate=`
        <p  text-primary" for="firstNameId">Nombre: ${newUser.firstName}  </p>    
        <p  text-primary" for="lastNameId">Apellido: ${newUser.lastName} </p> 
        <p  text-primary" for="emailInputId">Email: ${newUser.email}</p>
        <p  text-primary" for="addressInputId"><i class="fa fa-home" aria-hidden="true"></i> Dirección: ${newUser.address}</p>
        <p  text-primary" for="ageInputId"><i class="fa fa-home" aria-hidden="true"></i> <i class="fa fa-angellist" aria-hidden="true"></i>Edad: ${newUser.age}</p>
        <p  text-primary" for="userNameId">UserName: ${newUser.username}</p>
        <p  text-primary" for="userNameId">Contraseña: ${newUser.password}</p>
        <p  text-primary" for="userNameId">Contraseña: ${newUser.telephone}</p>
        <p  text-primary" for="userNameId">Contraseña: ${newUser.avatar}</p>
    
         `
         return this.userRegTemplate
    }


}