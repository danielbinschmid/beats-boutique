uniform float u_time;
uniform bool is_horizontal;
uniform vec3 center;
varying vec3 pos;
varying vec3 norm;
void main() {
    vec4 result;
    norm = normal;
    float scaling = 20.0;
    float pi = 3.1415926;
    float angle;
    mat4 rotationMatrix;
    if (is_horizontal) {
        angle = mod(u_time, pi * 2.0);
        rotationMatrix[0] = vec4(cos(angle), 0, - sin(angle), 0.0);
        rotationMatrix[1] = vec4(0, 1, 0, 0.0);
        rotationMatrix[2] = vec4(sin(angle), 0, cos(angle), 0.0);
        rotationMatrix[3] = vec4(0,0,0, 1.0);
    } else {
        angle = mod(u_time + pi / 2.0, pi * 2.0);
        rotationMatrix[0] = vec4(cos(angle), 0, - sin(angle), 0.0);
        rotationMatrix[1] = vec4(0, 1, 0, 0.0);
        rotationMatrix[2] = vec4(sin(angle), 0, cos(angle), 0.0);
        rotationMatrix[3] = vec4(0,0,0, 1.0);
    }
    
    vec3 rotatedPos = vec3(position.x, position.y, position.z);
    result = rotationMatrix * instanceMatrix * vec4(rotatedPos.x, sin(u_time) + rotatedPos.y, rotatedPos.z, 1.0);
    result = vec4(result.x + center.x, result.y + center.y, result.z + center.z, result.w);
    pos = vec3(result.x,  result.y, result.z);
    gl_Position = projectionMatrix * modelViewMatrix * result;
}