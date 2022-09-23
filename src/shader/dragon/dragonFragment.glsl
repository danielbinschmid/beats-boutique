uniform float u_time;
varying vec3 pos;
void main() {
    float offset = 0.4;
    float scale = 0.2;
    gl_FragColor = vec4(cos(pos), 1.0);

}