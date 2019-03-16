export default {
    getEventPosition(e:Event){
        var x, y;
        if(e instanceof MouseEvent){
            if (e.layerX || e.layerX == 0) {
                x = e.layerX;
                y = e.layerY;
            } else if (e.offsetX || e.offsetX == 0) { // Opera
                x = e.offsetX;
                y = e.offsetY;
            }
        }
        if(e instanceof TouchEvent){
            let touchPoint = e.targetTouches[0];
            let el:any = e.target;
            x = touchPoint.clientX - el.offsetLeft;
            y = touchPoint.clientY - el.offsetTop;
        }
        return {x: x, y: y};
    }
}
