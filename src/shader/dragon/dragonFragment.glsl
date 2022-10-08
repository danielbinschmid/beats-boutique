uniform float u_time;
varying vec3 pos;
void main() {
    float offset = 0.3;
    float scale = 0.4;
    gl_FragColor = vec4(cos(pos) * scale + offset, 1.0);

}