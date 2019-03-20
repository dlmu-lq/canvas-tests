//#version 120
// 使用了偏移旋转缩放矩阵

attribute vec2 a_position;
uniform mat3 u_matrix;

void main() {
    gl_Position = vec4((u_matrix * vec3(a_position,0)).xy,0,1);
}
