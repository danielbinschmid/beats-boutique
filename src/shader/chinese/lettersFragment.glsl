uniform float u_time;
varying vec3 pos;
varying vec3 norm;
void main() {
    float offset = 0.4;
    float scale = 0.2;
    gl_FragColor = vec4(sin(pos), 1.0);
    float lightness = -0.2;
    vec4 color = vec4(norm + norm  - vec3(lightness, lightness, lightness), 1.0);
    color.g = 0.0;
    color.b += 0.4;

    float lightness_ = 0.5;
    color.r = color.r + lightness_;
    color.g = color.g + lightness_;
    color.b = color.b + lightness_;
    gl_FragColor = color;

}