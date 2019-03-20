import webglUtils from "../../util/webglUtils";
import vertexShaderSource1 from "./shaders/v1.vert";
import fragmentShaderSource1 from "./shaders/v1.frag";
import vertexShaderSource2 from "./shaders/v2.vert";
import fragmentShaderSource2 from "./shaders/v2.frag";
import HandleCanvas from "@/components/handleCanvas";

export default class FirstWebGl extends HandleCanvas{

    constructor(canvasId:string){
        super(canvasId);
        if(!this.gl)
            return;
    }

    /**
     * 最基本的创建，读取数据，绘制
     */
    drawFirst(){
        const gl = this.gl;
        let vertexShader = webglUtils.createShader(gl,gl.VERTEX_SHADER,vertexShaderSource1);
        let fragmentShader = webglUtils.createShader(gl,gl.FRAGMENT_SHADER,fragmentShaderSource1);
        const program = webglUtils.createProgram(gl,vertexShader,fragmentShader);
        // 最好仅在初始化时查看
        let positionAttributeLocation = gl.getAttribLocation(program,"a_position");

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
        gl.useProgram(program);

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

    drawSecond(){
        const gl = this.gl;
        const vertexShader = webglUtils.createShader(gl,gl.VERTEX_SHADER,vertexShaderSource2);
        const fragmentShader = webglUtils.createShader(gl,gl.FRAGMENT_SHADER,fragmentShaderSource1);
        const program = webglUtils.createProgram(gl,vertexShader,fragmentShader);

        const positionAttribLocation = gl.getAttribLocation(program,"a_position");
        const resolutionUniformLocation = gl.getUniformLocation(program,"u_resolution");

        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer);
        const positions = [
            50,50,
            50,150,
            150,150,
            150,150,
            50,50,
            150,50
        ];
        gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(positions),gl.STATIC_DRAW);

        gl.viewport(0,0,gl.canvas.width,gl.canvas.height);
        gl.clearColor(0,0,0,0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.useProgram(program);

        gl.enableVertexAttribArray(positionAttribLocation);
        gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer);
        gl.vertexAttribPointer(positionAttribLocation,2,gl.FLOAT,false,0,0);
        gl.uniform2f(resolutionUniformLocation,gl.canvas.width,gl.canvas.height);
        gl.drawArrays(gl.TRIANGLES,0,6);
    }

    drawMore(){
        const gl = this.gl;
        const vertexShader = webglUtils.createShader(gl,gl.VERTEX_SHADER,vertexShaderSource2);
        const fragmentShader = webglUtils.createShader(gl,gl.FRAGMENT_SHADER,fragmentShaderSource2);
        const program = webglUtils.createProgram(gl,vertexShader,fragmentShader);
        // 创建完成后建立shader中数据的location，下面传入数据时用
        const positionAttribLocation = gl.getAttribLocation(program,"a_position");
        const resolutionUniformLocation = gl.getUniformLocation(program,"u_resolution");
        const colorUniformLocation = gl.getUniformLocation(program,"u_color");
        // 创建buffer及绑定点
        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer);
        // 视图清理
        gl.viewport(0,0,gl.canvas.width,gl.canvas.height);
        gl.clearColor(0,0,0,0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.useProgram(program);
        // 设置attribute position读取方式
        gl.enableVertexAttribArray(positionAttribLocation);
        gl.vertexAttribPointer(positionAttribLocation,2,gl.FLOAT,false,0,0);
        // 设置全局变量
        gl.uniform2f(resolutionUniformLocation,gl.canvas.width,gl.canvas.height);
        for(let i=0;i<10;i++){
            // 设置attribute用的 buffer data
            this.setTriangle(gl,this.randomInt(400),this.randomInt(400),this.randomInt(400),this.randomInt(400));
            // 设置全局变量
            gl.uniform3f(colorUniformLocation,Math.random(),Math.random(),Math.random());
            // 绘制
            gl.drawArrays(gl.TRIANGLES,0,6);
        }
    }

    private setTriangle(gl:WebGLRenderingContext, x, y, width, height){
        gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(
            [
                x,y,
                x+width,y,
                x+width,y+height,
                x+width,y+height,
                x,y+height,
                x,y
            ]
        ),gl.STATIC_DRAW);
    }

    private randomInt(num){
        return Math.round(Math.random() * num);
    }

}
