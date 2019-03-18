export default {
    /**
     * 创建shader
     * @param {WebGLRenderingContext} gl
     * @param {number} type
     * @param {string} source
     * @returns {WebGLShader | null}
     */
    createShader(gl:WebGLRenderingContext,type:number,source:string):WebGLShader{
        let shader = gl.createShader(type);
        gl.shaderSource(shader,source);
        gl.compileShader(shader);
        let success = gl.getShaderParameter(shader,gl.COMPILE_STATUS);
        if(success){
            return shader;
        }
        console.warn(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
    },

    /**
     * 创建program
     * @param {WebGLRenderingContext} gl
     * @param {WebGLShader} vertexShader
     * @param {WebGLShader} fragmentShader
     * @returns {WebGLProgram | null}
     */
    createProgram(gl:WebGLRenderingContext,vertexShader:WebGLShader,fragmentShader:WebGLShader):WebGLProgram{
        let program = gl.createProgram();
        gl.attachShader(program,vertexShader);
        gl.attachShader(program,fragmentShader);
        gl.linkProgram(program);
        let success = gl.getProgramParameter(program,gl.LINK_STATUS);
        if(success){
            return program;
        }
        console.warn(gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
    }
}