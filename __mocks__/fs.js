const fs = jest.genMockFromModule("fs");    //先声明要模拟的对象是fs
const _fs = jest.requireActual("fs")    //引入真正的fs
Object.assign(fs, _fs)                            //将真正的fs赋值给假的fs
const mock = {}
fs.setFile = (path, error, data) => {
    mock[path] = [error, data]
}
fs.readFile = (path, option, callback) => {
    if (callback === undefined) callback=option          //出错option=callback   callback本来就是undefined这样赋值有意义吗傻子
    if (path in mock) {
        callback(...mock[path])
    } else {
        _fs(path, option, callback)
    }


}


module.exports = fs