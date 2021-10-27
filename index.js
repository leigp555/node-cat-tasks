const os = require("os");
const userHomeDir = os.homedir();
const homedir = process.env.HOME || userHomeDir;
const p = require("path");
const dbPath = p.join(homedir, ".todo");
const push=require("./writeFile")
const db=require("./readFile")




module.exports.add =async(args) => {
  const list =await db.read(dbPath)
   await push.echo(args,list,dbPath)
};

module.exports.clear =async() => {
    const args=[]
    await push.echo(args,[],dbPath)
};

module.exports.showAll =async() => {
    const list =await db.read(dbPath)
    list.forEach((item,index)=>{
        console.log(`${item.done?"[√]":"[_]"} ${index} - ${item.taskName}`)
    })
};






















// module.exports.add =async(args) => {
//   const list =await db.read(dbPath)



//   fs.open(dbPath, "a+", (err, fd) => {
//     fs.readFile(dbPath, "utf8", (error, data) => {
//       if (error) {
//         console.log(error);
//       } else {
//         let list;
//         try {
//           list = JSON.parse(data.toString());
//         } catch (error2) {
//           list = [];
//         }
//         console.log(list);
//         let task
//         args.map(item=>{
//           list.push({
//             taskName:item,
//             done:false
//           })
//         })
//         const string=JSON.stringify(list)
//         fs.writeFile(dbPath,string+'\n', (error3)=>{
//            if(error3)console.log(error3)
//         })
//       }
//     });
//   });
// };
