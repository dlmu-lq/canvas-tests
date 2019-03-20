export default class HandleCanvas {

    public gl:WebGLRenderingContext = null;

    constructor(canvasId) {
        let el = document.getElementById(canvasId) as HTMLCanvasElement;
        const gl = el.getContext("webgl");
        this.gl = gl;
        if(!gl){
            alert("no webgl for you");
            return;
        }
    }

}
