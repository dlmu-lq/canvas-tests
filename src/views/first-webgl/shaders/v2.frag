//#version 120

// fragment shader没有默认精度，在这里选择 mediump 做为默认
precision mediump float;

uniform vec3 u_color;

void main(){
    // gl_FragColor是 fragment shader 负责赋值的特殊变量
    gl_FragColor = vec4(u_color,1); //
}
