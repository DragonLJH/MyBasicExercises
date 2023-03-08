// 原型,原型链


export { }
class People {
    [x: string]: any
    constructor(name: string, age: number) {
        this.name = name
        this.age = age
    }
}

const people = new People("zs", 18)


console.log("people", people) // people  Object { name: "zs", age: 18 }
console.log("people.constructor", people.constructor) // people.constructor  function People(name, age)
console.log("people.prototype", people.prototype) // people.prototype undefined
console.log("people.__proto__", people.__proto__) // people.__proto__  Object { … } 
console.log("people.constructor === People", people.constructor === People) // true
console.log("people.__proto__ === People.prototype", people.__proto__ === People.prototype) // true
console.log("-------------------------------------------------------------------------")

// 原型对象 ：构造函数的prototype和其实例的__proto__

// Person ：构造函数
function Person(name: string, age: number) {
    this.name = name
    this.age = age
}
// const p1 = new Person("ls", 18) //其目标缺少构造签名的 "new" 表达式隐式具有 "any" 类型。ts(7009)
// p1、p2 ： 实例对象
// 实例对象的 prototype 为undefined
// 实例对象的 __proto__ 指向 构造函数的 prototype
// 实例对象的 constructor 指向 构造函数自身
const p1 = new (Person as any)("ls", 18)
const p2 = new (Person as any)("ww", 19)


console.log("p1:%o,p2:%o", p1, p2) // p1:  Object { name: "ls", age: 18 } ,p2:  Object { name: "ww", age: 19 }
console.log("p1.prototype:%o,p2.prototype:%o", p1.prototype, p2.prototype) // p1.prototype: undefined ,p2.prototype: undefined
console.log("p1.prototype === Person", p1.constructor === Person) // true
console.log("p1.__proto__ === Person.prototype", p1.__proto__ === Person.prototype) // true
console.log("p2.prototype === Person", p2.constructor === Person) // true
console.log("p2.__proto__ === Person.prototype", p2.__proto__ === Person.prototype) // true

console.log(Person, Person.prototype)

Person.prototype.getName = function () {
    return this.name
}

console.log("p1.getName()", p1.getName())
console.log("p2.getName()", p2.getName())

// 函数

// 普通函数
function f1(name: string) {
    console.log("我是:%s", name)
}
f1("f1")

// 匿名函数
const f2 = function (name: string) {
    console.log("我是:%s", name)
}
f2("f2")

// 箭头函数
const f3 = (name: string) => {
    console.log("我是:%s", name)
}
f3("f3")

// new Function("name", 'console.log("我是:%s", name)')


// 对象

// 构造函数创建对象
const o1 = new People("zs", 18)

// {} 创建对象
const o2 = { name: "zs", age: 18 }

// new Object 创建对象
const o3 = new Object() as { name: string, age: number }
o3.name = "zs"
o3.age = 18

// Object.create() 方法创建对象
const o4 = Object.create({}) as { name: string, age: number }
o4.name = "zs"
o4.age = 18

console.log("o1:%o,o2:%o,o3:%o,o4:%o", o1, o2, o3, o4)


// Person.prototype 是原型对象
// 原型对象是 构造函数Object 的实例
// 所以 Person.prototype.__proto__ === Object.prototype 
console.log("Person.prototype.__proto__ === Object.prototype", Person.prototype.__proto__ === Object.prototype)

// __proto__的路径就叫原型链
// 原型链的终点 Object.prototype.__proto__ 指向 null



