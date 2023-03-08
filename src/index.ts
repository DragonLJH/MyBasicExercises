// class 类 , 继承 , 以及 svg 示例



// class Selector {
//     name: string;
//     _$: Element;
//     constructor(name: string) {
//         this.name = name
//         this._$ = this.$()
//     }

//     private $() {
//         return document.querySelector(this.name)
//     }
// }



function Selector(name: string) {
    this.name = name
    this._$ = document.querySelector(name);
}
Selector.prototype.sayHello = function () {
    console.log("Hello:%s", this.name)
}

// 组合继承
function Svg(...arge: string[]) {
    // 继承属性
    Selector.call(this, ...arge)
    this.svg;
}

// 继承方法
Svg.prototype = new (Selector as any)()
Svg.prototype.constructor = Selector

Svg.prototype.appendSvg = function (tag: string, attr: { [k: string]: string | number }) {
    let ns = "http://www.w3.org/2000/svg"
    let item = document.createElementNS(ns, tag)
    Object.keys(attr).forEach((val: string) => {
        item.setAttribute(val, attr[val].toString())
    })
    if (tag === "svg") return item
    this.svg.appendChild(item)
}
Svg.prototype.intiSvg = function (width: number = 100, height: number = 100) {
    let svg = this.appendSvg("svg", { width, height })
    this._$.appendChild(svg)
    this.svg = svg
}

const mySvg = new (Svg as any)(".app")
mySvg.intiSvg()
console.log(mySvg)
mySvg.sayHello()

// class Svg extends Selector {
//     svg: any;
//     constructor(name: string) {
//         super(name);
//         this.svg;
//     }
//     intiSvg(width: number = 100, height: number = 100) {
//         let svg = this.appendSvg("svg", { width, height })
//         this._$.appendChild(svg)
//         this.svg = svg
//     }
//     appendSvg(tag: string, attr: { [k: string]: string | number }) {
//         let ns = "http://www.w3.org/2000/svg"
//         let item = document.createElementNS(ns, tag)
//         Object.keys(attr).forEach((val: string) => {
//             item.setAttribute(val, attr[val].toString())
//         })
//         if (tag === "svg") return item
//         this.svg.appendChild(item)
//     }
// }


// const mySvg = new Svg(".app")
// mySvg.intiSvg()

// // fill : 对于形状元素和文本，fill属性是外观属性，填充图形颜色
// // stroke : 图形元素的外轮廓的颜色。
// // stroke-width : 轮廓的宽度。

// rect 矩形
// 专有属性, x : x 轴坐标 , y : y 轴坐标 , width : 水平长度 , height : 垂直长度 , rx : x 轴向的圆角半径尺寸 , ry : y 轴向的圆角半径尺寸
mySvg.appendSvg("rect", { x: "25", y: "25", width: "50", height: "50", fill: "#f00", stroke: "#000" })

// circle 圆形
// 专有属性, cx : x 轴坐标 , cx : y 轴坐标 , r : 半径
mySvg.appendSvg("circle", { cx: "50", cy: "50", r: "25", fill: "#0f0", stroke: "#000" })

// ellipse 椭圆
// 专有属性, cx : x 轴坐标 , cx : y 轴坐标 , rx : x轴半径 , ry : y轴半径
mySvg.appendSvg("ellipse", { cx: "50", cy: "50", rx: "25", ry: "15", fill: "#00f", stroke: "#000" })

// polyline 折线 是一组连接在一起的直线
// 专有属性, points 每个点必须包含 2 个数字
mySvg.appendSvg("polyline", { points: ["25 50", "35 40", "65 60", "75 50",].join(","), stroke: "#fff" })

// line 椭圆 连接两个点的线
// 专有属性, x1: x 轴坐标, y1: y 轴坐标, x2: x 轴坐标, y2: y 轴坐标
mySvg.appendSvg("line", { x1: "25", x2: "75", y1: "50", y2: "50", fill: "#000", stroke: "#fff" })



// const pathySvg = new Svg(".path-app")
// pathySvg.intiSvg(200, 200)

// // path 路径
// // 专有属性, d : “命令 + 参数” , 命令大写为绝对定位,小写为相对定位

// // 直线命令
// // M x y 。 M (Move to) , M 命令需要两个参数 , 参数分别是 x 轴坐标 , y 轴坐标 , M 命令仅仅是移动画笔，但不画线。所以 M 命令经常出现在路径的开始处，用来指明从何处开始画。
// // L x y 。 L (Line to) , L 命令需要两个参数 , 参数分别是 x 轴坐标 , y 轴坐标 , L 命令画线。另外还有两个简写命令，用来绘制水平线和垂直线。
// // H x , V y 。 H，绘制水平线。V，绘制垂直线。H 和 V 只带一个参数 , H 参数是 x 轴坐标, V 参数是 y 轴坐标。
// // Z 闭合路径命令
// // pathySvg.appendSvg("path", { d: "M 10 10 l 50 0 l 0 50", stroke: "#000", fill: "transparent" })
// pathySvg.appendSvg("path", { d: "M 10 10 H 50 V 50 H 10 Z", stroke: "#000", fill: "transparent" })
// pathySvg.appendSvg("circle", { cx: "10", cy: "10", r: "2", fill: "#f00" })
// pathySvg.appendSvg("circle", { cx: "50", cy: "10", r: "2", fill: "#f00" })
// pathySvg.appendSvg("circle", { cx: "50", cy: "50", r: "2", fill: "#f00" })
// pathySvg.appendSvg("circle", { cx: "10", cy: "50", r: "2", fill: "#f00" })


// // 曲线命令
// // C x1 y1, x2 y2, x y 。 C 命令, 三次贝塞尔曲线 C 。最后一个坐标 (x,y) 表示的是曲线的终点，另外两个坐标是控制点，(x1,y1) 是起点的控制点，(x2,y2) 是终点的控制点。

// pathySvg.appendSvg("path", { d: "M 10 80 C 20 100, 40 100, 50 80", stroke: "#000", fill: "transparent" })
// pathySvg.appendSvg("circle", { cx: "10", cy: "80", r: "2", fill: "#f00" })
// pathySvg.appendSvg("circle", { cx: "20", cy: "100", r: "2", fill: "#f00" })
// pathySvg.appendSvg("line", { x1: "10", x2: "20", y1: "80", y2: "100", fill: "#f00", stroke: "#f00" })
// pathySvg.appendSvg("circle", { cx: "40", cy: "100", r: "2", fill: "#f00" })
// pathySvg.appendSvg("circle", { cx: "50", cy: "80", r: "2", fill: "#f00" })
// pathySvg.appendSvg("line", { x1: "40", x2: "50", y1: "100", y2: "80", fill: "#f00", stroke: "#f00" })

// pathySvg.appendSvg("path", { d: "M 10 110 C 10 130, 50 130, 50 110", stroke: "#000", fill: "transparent" })
// pathySvg.appendSvg("circle", { cx: "10", cy: "110", r: "2", fill: "#f00" })
// pathySvg.appendSvg("circle", { cx: "10", cy: "130", r: "2", fill: "#f00" })
// pathySvg.appendSvg("line", { x1: "10", x2: "10", y1: "110", y2: "130", fill: "#f00", stroke: "#f00" })
// pathySvg.appendSvg("circle", { cx: "50", cy: "130", r: "2", fill: "#f00" })
// pathySvg.appendSvg("circle", { cx: "50", cy: "110", r: "2", fill: "#f00" })
// pathySvg.appendSvg("line", { x1: "50", x2: "50", y1: "130", y2: "110", fill: "#f00", stroke: "#f00" })

// // S x2 y2, x y  。将若干个贝塞尔曲线连起来
// // x1 y1 相当于 C x2 y2 的对称点
// pathySvg.appendSvg("path", { d: "M 100 100 C 100 50, 120 50, 120 100 S 140 150 140 100", stroke: "#000", fill: "transparent" })
// pathySvg.appendSvg("circle", { cx: "100", cy: "100", r: "2", fill: "#f00" })
// pathySvg.appendSvg("circle", { cx: "100", cy: "50", r: "2", fill: "#f00" })
// pathySvg.appendSvg("line", { x1: "100", x2: "100", y1: "100", y2: "50", fill: "#f00", stroke: "#f00" })
// pathySvg.appendSvg("circle", { cx: "120", cy: "50", r: "2", fill: "#f00" })
// pathySvg.appendSvg("circle", { cx: "120", cy: "100", r: "2", fill: "#f00" })
// pathySvg.appendSvg("line", { x1: "120", x2: "120", y1: "50", y2: "100", fill: "#f00", stroke: "#f00" })
// pathySvg.appendSvg("circle", { cx: "120", cy: "150", r: "2", fill: "#f00" })
// pathySvg.appendSvg("circle", { cx: "120", cy: "100", r: "2", fill: "#f00" })
// pathySvg.appendSvg("line", { x1: "120", x2: "120", y1: "150", y2: "100", fill: "#f00", stroke: "#f00" })
// pathySvg.appendSvg("circle", { cx: "140", cy: "150", r: "2", fill: "#f00" })
// pathySvg.appendSvg("circle", { cx: "140", cy: "100", r: "2", fill: "#f00" })
// pathySvg.appendSvg("line", { x1: "140", x2: "140", y1: "150", y2: "100", fill: "#f00", stroke: "#f00" })

// // Q x1 y1, x y 。 Q 命令, 二次贝塞尔曲线 Q 。(x1 , y1)只需要一个控制点，用来确定起点和终点的曲线斜率

// pathySvg.appendSvg("path", { d: "M 10 150 Q 35 180, 60 150 ", stroke: "#000", fill: "transparent" })
// pathySvg.appendSvg("circle", { cx: "10", cy: "150", r: "2", fill: "#f00" })
// pathySvg.appendSvg("circle", { cx: "35", cy: "180", r: "2", fill: "#f00" })
// pathySvg.appendSvg("circle", { cx: "60", cy: "150", r: "2", fill: "#f00" })
// pathySvg.appendSvg("line", { x1: "10", x2: "35", y1: "150", y2: "180", fill: "#f00", stroke: "#f00" })
// pathySvg.appendSvg("line", { x1: "35", x2: "60", y1: "180", y2: "150", fill: "#f00", stroke: "#f00" })





