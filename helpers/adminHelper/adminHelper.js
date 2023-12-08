const { ObjectId } = require('mongodb');
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
    },
    findUser:(id)=>{
        return new Promise((resolve, reject) => {
            console.log(new ObjectId(id));
            id=new ObjectId(id)
            db.get().collection('user').findOne({_id:id}).then((result)=>{
                console.log(result);
                resolve(result)
            })
        })
    },

    updateUser:(data)=>{
        return new Promise((resolve, reject) => {
            db.get().collection('user').updateOne({_id:new ObjectId(data.id)},{$set:{
                name:data.name,
                email:data.email
            }}).then((res)=>{
                console.log(res);
                resolve()
            })
        })
    }
}