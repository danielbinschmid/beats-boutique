uniform float u_time;
varying vec3 norm;
varying vec3 pos;
void main() {
    float lightness = 0.1;
    gl_FragColor = vec4(norm - vec3(lightness, lightness, lightness * 20.0), 0.4);

}