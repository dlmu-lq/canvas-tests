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

    public create(){
        const gl = this.gl;
        const vertexShader = webglUtils.createShader(gl,gl.VERTEX_SHADER,vertexShaderSource);

    }
}
