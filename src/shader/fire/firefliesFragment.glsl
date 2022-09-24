uniform float u_time;
varying vec3 pos;
varying vec3 norm;
void main() {
    gl_FragColor = vec4(sin(u_time),sin(u_time), sin(u_time), 1.0f);

}