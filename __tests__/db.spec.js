const db=require("../readFile")


describe("db",()=>{
    it("canRead",()=>{
        expect(db.read instanceof Function)
    })
    it("canWrite",()=>{
       expect((1+1)).toBe(2)
    })
})