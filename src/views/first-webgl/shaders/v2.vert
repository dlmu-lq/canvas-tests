//#version 120

// attribute 从buffer中获取数据
attribute vec2 a_position; // 此处从buffer读取像素位置
uniform vec2 u_resolution; // 读取width,height 分辨率数据

// 所有的shaders 都有一个main 函数
void main(){
    // 将像素位置数据转换为 0 -- 1
    vec2 zeroToOne = a_position / u_resolution;
    // 将0 -- 1数据转换为 -1 -- 1
    // (-1,-1)为左下角的点 ，为了使 0 0 点对应左上角,乘以 vec2(1,-1)
    vec2 clipSpace = (zeroToOne * 2.0 - 1.0) * vec2(1,-1);

    gl_Position = vec4(clipSpace.x,clipSpace.y,0,1);
}
