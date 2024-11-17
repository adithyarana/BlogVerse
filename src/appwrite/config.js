import conf from "../conf/conf";
import { Client, ID , Databases, Storage , Query } from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);

    }

    async createpost({title , slug, content, featuredimage, status, userid}){
        try {
            return await this.databases.createDocument(conf.appwriteDataBaseId, conf.appwriteCollectionId , slug,{
                title,
                content,
                featuredimage,
                status,
                userid,
            } )
        } catch (error) {
            console.log("appwrite service :: createpost:: error ", error);
            
        }
    }

    async updatepost(slug ,{title , content, featuredimage, status}){

         try {
            return await this.databases.updateDocument(conf.appwriteDataBaseId, conf.appwriteCollectionId, slug,{
                title,
                content,
                featuredimage,
                status,

            })
            
         } catch (error) {
            console.log("appwrite service :: updatepost:: error ", error);
            
         }
    }

    async deletepost(slug){

         try {
             await this.databases.deleteDocument(conf.appwriteDataBaseId, conf.appwriteCollectionId, slug)  

             return true;
            
         } catch (error) {
            console.log("appwrite service :: deletepost:: error ", error);
            return false;
            
         }

    }

    async getpost(slug){
         try {
             return await this.databases.getDocument(conf.appwriteDataBaseId, conf.appwriteCollectionId, slug)
            
         } catch (error) {
            console.log("appwrite service :: getpost:: error ", error);
            return false;
            
         }
    }

    async getposts(queries =[Query.equal("status", "active")]){
         try {
             return await this.databases.listDocuments(conf.appwriteDataBaseId, 
                conf.appwriteCollectionId,
                 queries,)
            
         } catch (error) {
            console.log("appwrite service :: getposts:: error ", error);
            return false;
            
         }
        
    }

    // files upload services 

    async uploadfile(file ){
        try {
            return await this.bucket.createFile(conf.appwriteBuckedId, ID.unique(), file)
            
            
        } catch (error) {
            console.log("appwrite service :: uploadfile:: error ", error);
            return false;
            
        }
    }

    async deletefile(fileId){
        try {
             await this.bucket.deleteFile(conf.appwriteBuckedId, fileId)
            
             return true;
            
        } catch (error) {
            console.log("appwrite service :: deletefile:: error ", error);
            return false;
            
        }


    }

    getfilepreview(fileId){
        return this.bucket.getFilePreview(conf.appwriteBuckedId, fileId);
    }
}


const service = new Service();

export default  service