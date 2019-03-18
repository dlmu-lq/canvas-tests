import webglUtil from "@/util/webgl/webglUtils";

const vertexShaderSource = `    
    // attribute 从buffer中获取数据
    attribute vec4 a_position;
    
    // 所有的shaders 都有一个main 函数
    void main(){
        // gl_Position是一个 vertex shader 负责赋值的特殊变量
        gl_Position = a_position;
    }
`; // 实际上

const fragmentShaderSource = `
    // fragment shader没有默认精度，在这里选择 mediump 做为默认
    precision mediump float;
    
    void main(){
        // gl_FragColor是 fragment shader 负责赋值的特殊变量
        gl_FragColor = vec4(1,0,0.5,1); // 
    }
`;

export default {

    gl:null as WebGLRenderingContext,
    program:null as WebGLProgram,

    start(canvasId:string){
        let el = document.getElementById(canvasId) as HTMLCanvasElement;
        const gl = el.getContext("webgl");
        this.gl = gl;
        if(!gl){
            alert("no webgl for you");
            return;
        }
        let vertexShader = webglUtil.createShader(gl,gl.VERTEX_SHADER,vertexShaderSource);
        let fragmentShader = webglUtil.createShader(gl,gl.FRAGMENT_SHADER,vertexShaderSource);
        this.program = webglUtil.createProgram(gl,vertexShader,fragmentShader);
        this.drawOnce();
    },

    /**
     * 初始化方法，页面加载时只运行一次
     */
    drawOnce(){
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

    },

    /**
     *
     */
    render(){

    }
}
