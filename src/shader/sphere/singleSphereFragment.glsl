uniform float u_time;
varying vec3 norm;
varying vec3 pos;
void main() {
    float lightness = 0.1;
    float offset = 0.0;
    float scale = 0.5;

    vec3 f = vec3(norm.x * scale + offset, norm.y * scale + offset, u_time);
    gl_FragColor = vec4(f, 0.5);

}