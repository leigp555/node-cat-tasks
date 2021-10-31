const db=require("../readFile")
const fs = require("fs");
//模拟fs
jest.mock("fs")

fs.setFile("/xxx",null,{name:"lgp"})
let list
fs.readFile("/xxx",(error,data)=>{
    list=data
})



describe("xx",()=>{
    it('xx',()=>{
        expect(list).toStrictEqual({name:"lgp"})
    })
})






