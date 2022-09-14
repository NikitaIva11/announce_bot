const fs = require('fs')

class userDataService{
     constructor(dirname){
          this.dirname = dirname
          this.allUsers = this.getAllUsers();
     }

     async postUser(userId){
          let allUsers = await this.allUsers
          if(allUsers.some(el=>el.id===userId)) return 'user exist';
          else{
               allUsers.push({id:userId})
               fs.writeFile(this.dirname,JSON.stringify(allUsers),function(err){if(err)throw err;})
               this.allUsers = this.getAllUsers();
               return 'user create'
          }
          
     }
     async getAllUsers(){
          let users = await new Promise((resolve, reject) => {
               fs.readFile(this.dirname,'utf-8',function(err,data){
                    if(err)throw err;
                    resolve(data)
               });
          })
          if(!users){
               users =  []
               fs.writeFile(this.dirname,JSON.stringify(users),function(err){if(err)throw err;})
               return users
          }
          else{
               return JSON.parse(users)
          }
     }
}


module.exports = new userDataService('./data/user-data.json')