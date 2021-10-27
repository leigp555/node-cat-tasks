const fs = require("fs");
const push = {
  echo(list,path,args) {
      return new Promise((resolve,reject)=>{
        if(args){
          args.map((item) => {
            list.push({
              taskName: item,
              done: false,
            })
          })
        }
        const string = JSON.stringify(list);
        fs.writeFile(path, string + "\n", (error3) => {
          if (error3) return reject(error3);
          resolve("写入成功")
        }) 
      })

  },
};
module.exports=push