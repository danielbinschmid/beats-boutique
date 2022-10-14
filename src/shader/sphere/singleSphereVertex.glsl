varying vec3 pos;
varying vec3 norm;
uniform float u_time;

void main() {

    mat4 rotationMatrix;
    rotationMatrix[0] = vec4(cos(u_time), 0, - sin(u_time), 0.0);
    rotationMatrix[1] = vec4(0, 1, 0, 0.0);
    rotationMatrix[2] = vec4(sin(u_time), 0, cos(u_time), 0.0);
    rotationMatrix[3] = vec4(0,0,0, 1.0);

    norm = normal;
    pos = position;
    gl_Position = projectionMatrix * modelViewMatrix * rotationMatrix * vec4(position.x, position.y, position.z, 1.0);
}