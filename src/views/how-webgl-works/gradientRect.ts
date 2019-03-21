import HandleCanvas from "@/components/handleCanvas";
import vertexShaderSource from "./v1.vert";
import fragmentShaderSource from "./v1.frag";
import webglUtils from "@/util/webglUtils";

export default class GradientRect extends HandleCanvas{

    constructor(canvasId:string){
        super(canvasId);
        if(!this.gl)
            return;
    }

    public show(){

    }

    /**
     *
     */
    public create(){
        const gl = this.gl;
        // 基本的程序
        const vertexShader = webglUtils.createShader(gl,gl.VERTEX_SHADER,vertexShaderSource);
        const fragmentShader = webglUtils.createShader(gl,gl.FRAGMENT_SHADER,fragmentShaderSource);
        this.program = webglUtils.createProgram(gl,vertexShader,fragmentShader);
        // 清空canvas
        this.clearCanvas();
        // 使用程序
        gl.useProgram(this.program);
        // 获取location
        let positionAttribLocation = gl.getAttribLocation(this.program,"a_position");
        let colorAttribLocation = gl.getAttribLocation(this.program,"a_color");
        let matrixUniformLocation = gl.getUniformLocation(this.program,"u_matrix");
        // 创建position buffer绑定
        let positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([
            -0.5,0.5,
            -0.5,-0.5,
            0.5,-0.5,
            0.5,-0.5,
            -0.5,0.5,
            0.5,0.5
        ]),gl.STATIC_DRAW);
        // 指定location如何获取数据
        gl.enableVertexAttribArray(positionAttribLocation);
        gl.vertexAttribPointer(positionAttribLocation,2,gl.FLOAT,false,0,0);

        // 创建color buffer
        let colorBuffer = gl.createBuffer();
        // 绑定color
        gl.bindBuffer(gl.ARRAY_BUFFER,colorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([
            1,1,1,
            1,1,0,
            1,1,0,
            1,1,0,
            1,1,1,
            1,1,1,
        ]),gl.STATIC_DRAW);
        // 指定location如何获取数据
        gl.enableVertexAttribArray(colorAttribLocation);
        gl.vertexAttribPointer(colorAttribLocation,3,gl.FLOAT,false,0,0);

        //
        gl.uniformMatrix3fv(matrixUniformLocation,false,new Float32Array([
            1,0,0,
            0,1,0,
            0,0,1
        ]));

        // 绘制
        gl.drawArrays(gl.TRIANGLES,0,6);
    }
}
