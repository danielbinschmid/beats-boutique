uniform float u_time;
varying vec3 norm;
varying vec3 pos;
void main() {
    float lightness = 0.1;
    float offset = 0.2;
    float scale = 0.3;

    vec3 f = vec3(norm.x * scale + offset, norm.y * scale + offset, 0);
    gl_FragColor = vec4(f, 0.4);

}