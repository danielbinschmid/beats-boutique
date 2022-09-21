uniform float u_time;
varying vec3 pos;
void main() {
    vec4 result;
    pos = position;
    result = vec4(position.x, sin(position.z + u_time) + position.y, position.z, 1.0);
    gl_Position = projectionMatrix * modelViewMatrix * result;
}