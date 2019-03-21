export default class HandleCanvas {

    public gl:WebGLRenderingContext = null;
    public program:WebGLProgram = null;

    constructor(canvasId) {
        let el = document.getElementById(canvasId) as HTMLCanvasElement;
        const gl = el.getContext("webgl");
        this.gl = gl;
        if(!gl){
            alert("no webgl for you");
            return;
        }
    }

    public clearCanvas(){
        const gl = this.gl;
        gl.clearColor(0,0,0,0);
        gl.clear(gl.COLOR_BUFFER_BIT);
    }

}
