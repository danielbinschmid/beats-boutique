uniform float u_time;
varying vec3 pos;
varying vec3 norm;
float sigmoid(float a) {
    return (1.0) / (1.0 + exp(a));
}

void main() {
    float a = 1.0;
    float darkness = sigmoid(pos.y * 0.2) - 0.5;
    vec4 baseColor = vec4( darkness,darkness + 0.6, 0.6, 0.5f);
    baseColor = baseColor * a; 
    gl_FragColor = baseColor;

}