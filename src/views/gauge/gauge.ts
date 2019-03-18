/**
 * canvas 绘制一个活动表盘
 */
import canvasUtil from "@/util/canvasUtil";

const textFont = {
    "big": '18px Microsoft yahei',
    "small": '10px Microsoft yahei',
};

const colors = {
    line:"rgba(102,158,185)",
    text:"rgba(184,221,239)",
    textActive:"rgba(239,253,255)",

    arcRingSide:"rgba(10,48,69,1)",
    arcRingMiddle:"rgba(20,59,75,1)",
    arcRingOut:"rgba(12,64,87,1)",

    arcLineSide:"rgba(31,70,99,0.7)",
    arcLineMiddle:"rgba(84,144,171,1)",
};

// 外层扇形圆环宽度
const ringArcWidth = 12;

export interface GaugeParams {
    canvasId:string;
    changeCallBack:(params:any)=>void;
    bigMarkText:string[];
    initAngle:number;
    mouseControl:boolean;
}

export default class Gauge {
    // canvas dom 属性
    private el:HTMLCanvasElement;
    private ctx:CanvasRenderingContext2D = null;
    private width:number = 0;
    private height:number = 0;

    // 表盘扇形半径，角度，指针刻度
    private thetaDegree:number = 13;
    private bigMarkNum:number = 10; // 大格子
    private bigMarkText:Array<string> = ["2009","2010","2011","2012","2013","2014","2015","2016","2017","2018"];
    private radius:number = 0;
    private thetaRad:number = 0;
    private center = {x:0,y:0};

    // 动画控制等相关、鼠标事件相关
    private v = -0.0216667;
    private currentAngle = 13;
    private eventsFlg = {
        mousePressing:false
    };
    private lastPos = {x:0,y:0};
    private pressTime = 0;
    private animation = null;
    private lastIndex = null;

    // 样式相关
    private arcLineStyle:CanvasGradient = null; // 圆弧线渐变颜色
    private arcRingStyle:CanvasGradient = null; // 圆弧环渐变颜色

    // 播放位置变化事件回调
    private changeCallBack:(params:any)=>void = null;

    constructor(params:GaugeParams){
        this.initDom(params.canvasId);
        this.initGaugeArc();
        this.initOthers(params);
        this.initStrokeStyle();
        this.draw();
    }

    /**
     * 获取canvas信息
     * @param canvasId
     */
    initDom(canvasId:string){
        this.el = document.getElementById(canvasId) as HTMLCanvasElement;
        this.width = this.el.width;
        this.height = this.el.height;
        this.ctx = this.el.getContext('2d');
    }

    /**
     * 初始化/计算表盘半径相关的
     */
    initGaugeArc(){
        this.thetaRad = this.thetaDegree / 180 * Math.PI;
        this.radius = this.width / 2 / Math.sin(this.thetaRad);
        this.center = {x:this.width / 2,y:this.height + this.width / 2 / Math.tan(this.thetaRad) - 20};
    }

    /**
     * 初始化其他东西
     */
    initOthers(params:GaugeParams){
        this.changeCallBack = params.changeCallBack;
        if(params.initAngle || params.initAngle == 0)
            this.currentAngle = params.initAngle;
        // 表盘大格
        if(params.bigMarkText){
            this.bigMarkText = params.bigMarkText;
            this.bigMarkNum = params.bigMarkText.length;
        }
        // 是否用鼠标控制
        if(params.mouseControl){
            this.initEvents();
        }
    }

    /**
     * 创建渐变
     */
    initStrokeStyle(){
        this.arcLineStyle = this.ctx.createLinearGradient(0,this.height,this.width,this.height);
        this.arcLineStyle.addColorStop(0,colors.arcLineSide);
        this.arcLineStyle.addColorStop(0.3,colors.arcLineMiddle);
        this.arcLineStyle.addColorStop(0.7,colors.arcLineMiddle);
        this.arcLineStyle.addColorStop(1,colors.arcLineSide);

        this.arcRingStyle = this.ctx.createLinearGradient(0,this.height,this.width,this.height);
        this.arcRingStyle.addColorStop(0,colors.arcRingSide);
        this.arcRingStyle.addColorStop(0.3,colors.arcRingMiddle);
        this.arcRingStyle.addColorStop(0.7,colors.arcRingMiddle);
        this.arcRingStyle.addColorStop(1,colors.arcRingSide);
    }

    /**
     * 画一帧
     */
    draw(){
        this.ctx.clearRect(0,0,this.width,this.height);
        this.drawArcLine();
        this.drawMarkLine();
        this.drawMarkText();
        this.drawArcRing();
    }

    /**
     * 自动播放
     */
    autoPlay(){
        this.draw();
        if(this.currentAngle < -this.thetaDegree){
            this.toggleAutoPlay();
            return
        }
        // 动画
        this.currentAngle += this.v;
        this.animation = requestAnimationFrame(()=>this.autoPlay());
    }


    /**
     * 绘制表盘外侧弧线
     */
    drawArcLine(){
        this.ctx.save();
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.strokeStyle = this.arcLineStyle;
        this.ctx.arc(this.center.x, this.center.y, this.radius, -this.thetaDegree, this.thetaDegree, false);
        this.ctx.stroke();
        this.ctx.restore();
    }

    /**
     * 绘制刻度
     */
    drawMarkLine(){
        this.ctx.save();
        this.ctx.translate(this.center.x, this.center.y);
        // 第一次旋转至开始位置
        this.ctx.rotate((90 - this.thetaDegree + this.currentAngle) * Math.PI / 180);
        for(let i=0;i<this.bigMarkNum * 10 + 1;i++){
            this.ctx.beginPath();
            this.ctx.lineWidth = 2;
            this.ctx.strokeStyle = colors.line;
            this.ctx.moveTo(-this.radius + 3, 0);
            // 长短刻度
            this.ctx.lineTo(-this.radius + ((i - 5) % 10 == 0 ? 16 : 10), 0);
            this.ctx.stroke();
            // 下一次画时相对移动位置
            this.ctx.rotate((this.thetaDegree * 2 / (this.bigMarkNum * 10 + 1)) * Math.PI / 180);
        }
        this.ctx.restore();
    }

    /**
     * 绘制刻度文字
     */
    drawMarkText(){
        this.ctx.save();
        // 第一次文字旋转位置
        let markNums = this.bigMarkNum * 10 + 1;
        let index = this.computeActiveMark();
        if(this.lastIndex != index){
            if(this.changeCallBack && index < this.bigMarkText.length)
                this.changeCallBack(this.bigMarkText[index]);
        }
        for(let i=0;i<this.bigMarkNum;i++){
            let markTextRadius = i == index ? this.radius - 40 : this.radius - 30;
            this.ctx.save(); // 此处必须放在循环内部，查是不是translate问题
            let angle = this.currentAngle + (5 + 10 * i) / markNums * this.thetaDegree * 2 - this.thetaDegree;
            let rad = angle * Math.PI / 180;
            this.ctx.translate(this.center.x + markTextRadius * Math.sin(rad), this.center.y - markTextRadius * Math.cos(rad));
            this.ctx.rotate(rad);
            this.ctx.shadowBlur = i == index ? 20 : 3;
            this.ctx.shadowColor = "rgba(0, 0, 255, 0.5)";
            this.ctx.fillStyle = i == index ? colors.textActive : colors.text;
            this.ctx.font = i == index ? textFont.big : textFont.small;
            this.ctx.textAlign = 'center';
            this.ctx.fillText(this.bigMarkText[i], 0, 0);
            // 下一次画时相对移动位置
            this.ctx.restore();
        }
        this.lastIndex = index;
    }

    /**
     * 绘制外圈圆弧环
     */
    drawArcRing(){
        this.ctx.save();
        this.ctx.strokeStyle = this.arcRingStyle;
        this.ctx.lineWidth = ringArcWidth;
        this.ctx.beginPath();
        this.ctx.arc(this.center.x, this.center.y, this.radius + ringArcWidth / 2 + 1, -this.thetaDegree, this.thetaDegree, false);
        this.ctx.stroke();
        this.ctx.restore();

        this.ctx.save();
        this.ctx.strokeStyle = colors.arcRingOut;
        this.ctx.lineWidth = 1.5;
        this.ctx.beginPath();
        this.ctx.arc(this.center.x, this.center.y, this.radius + ringArcWidth - 0.75, -this.thetaDegree, this.thetaDegree, false);
        this.ctx.stroke();
        this.ctx.restore();
    }

    computeActiveMark(){
        let offsetPercent = this.currentAngle / this.thetaDegree / 2;
        let activeMark = this.bigMarkNum / 2 - offsetPercent * this.bigMarkNum;
        return Math.round(activeMark);
    }

    /**
     * 添加鼠标事件
     */
    initEvents(){
        this.el.addEventListener("mousedown",(e)=>this.mouseDown(e));
        this.el.addEventListener("touchstart",(e:any)=>this.mouseDown(e));
        this.el.addEventListener("mousemove",(e)=>this.mouseMove(e));
        this.el.addEventListener("touchmove",(e:any)=>this.mouseMove(e));
        this.el.addEventListener("mouseup",(e)=>this.mouseUp(e));
        this.el.addEventListener("mouseout",(e)=>this.mouseOut());
    }

    /**
     * 移除鼠标事件
     */
    removeEvents(){
        this.el.removeEventListener("mousedown",(e)=>this.mouseDown(e));
        this.el.removeEventListener("touchstart",(e:any)=>this.mouseDown(e));
        this.el.removeEventListener("mousemove",(e)=>this.mouseMove(e));
        this.el.removeEventListener("touchmove",(e:any)=>this.mouseMove(e));
        this.el.removeEventListener("mouseup",(e)=>this.mouseUp(e));
        this.el.removeEventListener("mouseout",(e)=>this.mouseOut());
    }

    toggleAutoPlay(){
        if(this.animation == null){
            this.autoPlay();
        }else{
            this.stopPlay();
        }
    }

    stopPlay(){
        cancelAnimationFrame(this.animation);
        this.animation = null;
    }

    mouseDown(e:MouseEvent){
        this.eventsFlg.mousePressing = true;
        this.lastPos = canvasUtil.getEventPosition(e);
        // console.log(this.lastPos);
        this.pressTime = new Date().getTime();
    }

    mouseMove(e:MouseEvent){
        if(this.eventsFlg.mousePressing){
            let currentPos = canvasUtil.getEventPosition(e);
            let angle1 = Math.atan((this.lastPos.x - this.center.x) / Math.abs(this.lastPos.y - this.center.y));
            let angle2 = Math.atan((currentPos.x - this.center.x) / Math.abs(currentPos.y - this.center.y));
            this.currentAngle += (angle2 - angle1) * 180 / Math.PI;
            if(this.currentAngle < - this.thetaDegree ){ // 不让全出canvas
                this.currentAngle = - this.thetaDegree
            }
            if(this.currentAngle > this.thetaDegree){
                this.currentAngle = this.thetaDegree
            }
            this.lastPos = currentPos;
            this.draw();
        }

    }

    mouseUp(e?:MouseEvent){
        this.eventsFlg.mousePressing = false;

        // let upPos = canvasUtil.getEventPosition(e);
        // let dir = upPos.x - this.lastPos.x >= 0 ? 1 : -1;

        // 单击
        let gap = new Date().getTime() - this.pressTime;
        if(gap < 200){
            this.toggleAutoPlay();
        }
    }

    mouseOut(){
        this.eventsFlg.mousePressing = false;
    }
}
