const fs = require("fs");
const push = {
  echo(args,list,path) {
      return new Promise((resolve,reject)=>{
        args.map((item) => {
          list.push({
            taskName: item,
            done: false,
          });
        });
        const string = JSON.stringify(list);
        fs.writeFile(path, string + "\n", (error3) => {
          if (error3) return reject(error3);
          resolve("写入成功")
        }) 
      })

  },
};
module.exports=push