/**
 * js的一些dom操作
 */

export default {
    // createCanvas(width?:number,height?:number){
    //     let el:HTMLCanvasElement = document.createElement("canvas");
    //     el.width = width |
    // }
    getWidthHeight(elId:string):{width:number,height:number}{
        let re = {
            width: null,
            height: null
        };
        let el = document.getElementById(elId);
        if(el){
            re.width = el.style.width;
            re.height = el.style.height;
        }
        return re;
    }
}
