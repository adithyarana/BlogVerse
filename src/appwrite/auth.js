import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

// making the client and account instances

// this is the appwrite authcation code same in all projects to use impoetant 

export class Authservice{
     client = new Client();
     account;

     constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);

     }

     // this is singup code

     async createAccount({email, password, name}){
        try {
          const userAccount=  await this.account.create(ID.unique() ,email, password, name);

          if(userAccount){
          return this.login({email, password  });
               

          }else{
            return userAccount; 
          }
            
        } catch (error) {
            throw error;
        }

     }

     // this is login code
     async login({ email, password }) {
      try {
            return await this.account.createEmailPasswordSession(email, password);
          
      } catch (error) {
          throw error;
      }
  }
  

     // this is getting current user code
     async getcurrentUser() {
      try {
        return await this.account.get();
      } catch (error) {
         console.log("Appwrite service :: get currentUser error :: ", error);
         
      }

      return null;
    }

     // this is logout code
    async logout() {
      try {
         await this.account.deleteSessions();
      } catch (error) {
        console.log("Appwrite serive :: getCurrentUser :: error", error);
      }
    }

    
}




const authservice = new Authservice();

export default  authservice