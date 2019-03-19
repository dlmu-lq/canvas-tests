import webglUtils from "../../util/webglUtils";
import vertexShaderSource from "./shaders/v1.vert";
import fragmentShaderSource from "./shaders/v1.frag";

export default class FirstWebGl{

    gl:WebGLRenderingContext = null;
    program:WebGLProgram = null;

    constructor(canvasId:string){
        let el = document.getElementById(canvasId) as HTMLCanvasElement;
        const gl = el.getContext("webgl");
        this.gl = gl;
        if(!gl){
            alert("no webgl for you");
            return;
        }
        console.log(vertexShaderSource)
        console.log(fragmentShaderSource)
        let vertexShader = webglUtils.createShader(gl,gl.VERTEX_SHADER,vertexShaderSource);
        let fragmentShader = webglUtils.createShader(gl,gl.FRAGMENT_SHADER,fragmentShaderSource);
        this.program = webglUtils.createProgram(gl,vertexShader,fragmentShader);
    }

    /**
     * 初始化方法，页面加载时只运行一次
     */
    drawFirstTriangle(){
        const gl = this.gl;
        // 最好仅在初始化时查看
        let positionAttributeLocation = gl.getAttribLocation(this.program,"a_position");

        // attributes 从buffer中取数据，创建buffer
        let positionBuffer = this.gl.createBuffer();
        // 绑定点，可认为是webgl的全局变量，通过绑定点操作webgl的资源数据，绑定positionBuffer，绑定点为gl.ARRAY_BUFFER
        gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer);

        // 通过绑定点 gl.ARRAY_BUFFER 向buffer里放数据
        const positions = [
            0,0,
            0,0.5,
            0.7,0
        ];
        gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(positions),gl.STATIC_DRAW);
        // 以上做的事情
        // 数据通过js数组转为webgl需要的32位float数组，通过绑定点ARRAY_BUFFER绑定入positionBuuffer
        // gl.STATIC_DRAW是一个webgl标记，表明数据不能改变；


        // render
        // 告诉webgl，二维绘制空间 -1 - 1 x 对应着 0 - width; -1 - 1 y 对应着 - height;
        gl.viewport(0,0,gl.canvas.width,gl.canvas.height);
        // clear canvas
        gl.clearColor(0,0,0,0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        // 使用program
        gl.useProgram(this.program);

        // 开启attribute,以使webgl知道如何从buffer中取数据
        gl.enableVertexAttribArray(positionAttributeLocation);

        // 指定如何取数据
        // 绑定绑定点
        gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer);
        const size = 2; // 每次迭代取多少数据
        const type = gl.FLOAT; // 数据格式 32位float
        const normalize = false; // 不格式化数据
        const stride = 0; // 0 代表着 buffer data 移动 size * sizeof(type) 每次迭代以获取下一个位置；
        const offset = 0; // 0 代表从buffer的开始位置开始取数
        gl.vertexAttribPointer(positionAttributeLocation,size,type,normalize,stride,offset);
        // 上面这句话将当前ARRAY_BUFFER绑定到attribute
        // 在shader中 attribute a_position 是一个 vec4 默认值为 {x:0，y:0，z:0，w:1}
        // 在这里一次读取两个数，分别赋给a_position.x,a_position.y zw保持默认值；

        // 最后让webgl执行我们的glsl program
        const primitiveType = gl.TRIANGLES;
        const offset2 = 0;
        const count = 3;
        gl.drawArrays(primitiveType,offset2,count);
        // 上面count为 3，vertex shader会执行3次，分别取buffer里得第一二三组两个数，给a_position.xy，
        // 设置 primitiveType为三角形，每次vertex shader运行三次后根据三个gl_Position绘制三角形
        // webgl绘制上面说的三角形时，每个像素都会调用fragment shader，上面仅仅设置了一个颜色值，
    }

    /**
     *
     */
    render(){

    }
}
