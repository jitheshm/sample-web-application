const db=require('../database/config')
const bcrypt = require('bcrypt');
module.exports={
    login:(data)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection('admin').findOne({userId:data.userId}).then((result)=>{
                if(result!=null){
                    bcrypt.compare(data.password, result.password).then((result)=>{
                        if(result){
                            resolve({success:true})
                        }else{
                            resolve({success:false})
                        }
                    });
                }else{
                    resolve({success:false})
                }

            })
        })
    },
    getUsers:()=>{
        return new Promise(async(resolve, reject) => {
            users=await db.get().collection('user').find().toArray()
            console.log(users);
            resolve(users)
        })
    }
}