uniform float u_time;
varying vec3 pos;
void main() { 
    if (pos.x >= 0.0) {
    gl_FragColor = vec4(abs(sin(u_time)), 0.0, 0.0, 1.0); 
    } else {
    gl_FragColor = vec4(abs(sin(u_time)), abs(sin(u_time)), 1.0, 1.0); 
    }
    
}