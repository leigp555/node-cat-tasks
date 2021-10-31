const fs = require("fs");
jest.mock("fs")
const db={
     read(path){
        return new Promise((resolve,reject)=>{
            fs.open(path, "a+", () => {
                fs.readFile(path, "utf8", (error, data) => {
                  if (error) {
                    reject(error)
                  } else {
                    let list;
                    try {
                      list = JSON.parse(data.toString());
                    } catch (error2) {
                      list = [];
                    }
                    resolve(list)
                  }
                });
              });
           })
    
       }
}
module.exports=db