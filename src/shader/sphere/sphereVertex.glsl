uniform float u_time;
varying vec3 pos;
varying vec3 norm;
void main() {
    vec4 result;
    norm = normal;
    result = instanceMatrix * vec4(position.x, sin(u_time) + position.y, position.z, 1.0);
    pos = vec3(result.x,  result.y, result.z);
    gl_Position = projectionMatrix * modelViewMatrix * result;
}