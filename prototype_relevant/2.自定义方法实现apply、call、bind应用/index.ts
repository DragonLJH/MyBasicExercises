// 自定义方法实现apply、call、bind应用



export { }
const x = "windowX", y = "windowY"

const newXyObj = {
    x: "objNewX",
    y: "objNewY",
}

const applyObj = {
    x: "applyX",
    y: "applyY",
}
const callObj = {
    x: "callX",
    y: "callY",
}
const bindObj = {
    x: "bindX",
    y: "bindY",
}

const xyObj = {
    x: "objX",
    y: "objY",
    changeXY: function (x: string, y: string) {
        this.x = x
        this.y = y
        try {
            this.getXY()
        } catch (error) {
            console.log("对象不存在该方法", error)
        }
    },
    getXY: function () {
        let x = this.x, y = this.y
        console.log(this, { x, y })
        return {
            x, y
        }
    }
}

// 对象立即调用方法 ， this 指向对象自身
xyObj.getXY()
xyObj.changeXY("xyObjX", "xyObjY")
console.log("******xyObj******", xyObj.x, xyObj.y)

// 提取对象方法 ，全局调用方法 ， this 指向全局（window）
const { getXY, changeXY } = xyObj
getXY()
changeXY("wX", "wY")
console.log("******window******", x, y)


// apply 改变 getXY方法this指向，this 指向 applyObj
// apply 传参，只能传一个参数，数组类型
// apply 会立即执行函数
const myApply = function (fun: Function, obj?: { [ket: string]: string | Function }, params?: Array<string>) {
    if (obj === null || obj === undefined) {
        return
    }
    obj["temp"] = fun
    const result = params ? obj.temp(...params) : obj.temp()
    delete obj.temp
    return result
}
myApply(getXY, applyObj)
myApply(changeXY, applyObj, ["new-myApplyX", "new-myApplyY"])
console.log("******myApply-applyObj******", applyObj.x, applyObj.y)
// getXY.apply(applyObj)
// changeXY.apply(applyObj, ["new-applyX", "new-applyY"])
// console.log("******applyObj******", applyObj.x, applyObj.y)


// call 改变 getXY方法this指向，this 指向 callObj
// call 传参，可以传多个参数
// call 会立即执行函数


const myCall = function (fun: Function, obj?: { [ket: string]: string | Function }, ...params: Array<string>) {
    if (obj === null || obj === undefined) {
        return
    }
    obj["temp"] = fun
    const result = obj.temp(...params)
    delete obj.temp
    return result
}
myCall(getXY, callObj)
myCall(changeXY, callObj, "new-myCallX", "new-myCallY")
console.log("******myCall-callObj******", callObj.x, callObj.y)

// getXY.call(callObj)
// changeXY.call(callObj, "new-callX", "new-callY")
// console.log("******callObj******", callObj.x, callObj.y)



// bind 改变 getXY方法this指向，this 指向 bindObj
// bind 传参，可以传多个参数
// bind 不会立即执行函数


const myBind = function (fun: Function, obj?: { [ket: string]: string | Function }, ...params: Array<string>) {
    return function () {
        if (obj === null || obj === undefined) {
            return
        }
        obj.temp = fun
        const result = obj.temp(...params)
        delete obj.temp
        return result
    }
}
const mybindGetXY = myBind(getXY, bindObj)
const mybindChangeXY = myBind(changeXY, bindObj, "new-myBindX", "new-myBindY")
mybindGetXY()
mybindChangeXY()
console.log("******myBind-bindObj******", bindObj.x, bindObj.y)

// const bindGetXY = getXY.bind(bindObj)
// const bindChangeXY = changeXY.bind(bindObj, "new-bindX", "new-bindY")
// bindGetXY()
// bindChangeXY()
// console.log("******bindObj******", bindObj.x, bindObj.y)


