//#version 120

// attribute 从buffer中获取数据
attribute vec4 a_position;

// 所有的shaders 都有一个main 函数
void main(){
    // gl_Position是一个 vertex shader 负责赋值的特殊变量
    gl_Position = a_position;
}
