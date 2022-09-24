uniform float u_time;
varying vec3 pos;
varying vec3 norm;
void main() {
    vec4 result;
    norm = normal;
    mat4 transform;
    float scaling = 15.0;
    transform[0] = vec4(scaling, 0.0, 0.0, 0.0);
    transform[1] = vec4(0.0, scaling, 0.0, 0.0);
    transform[2] = vec4(0.0, 0.0, scaling, 0.0);
    transform[3] = vec4(0.0, 0.0, 0.0, 1);

    mat4 rotation;
    float pi = 3.1415926;
    float angle = 3.0 * pi / 2.0 ;
    rotation[0] = vec4(1, 0, 0, 0.0);
    rotation[1] = vec4(0, cos(angle), - sin(angle), 0.0);
    rotation[2] = vec4(0, sin(angle), cos(angle), 0.0);
    rotation[3] = vec4(0,0,0, 1.0);
    vec4 transformedPos = rotation * scaling * vec4(position.x, position.y * 5.0, position.z, 1.0);
    pos =  vec3(transformedPos.x, transformedPos.y, transformedPos.z);

    result = vec4(pos.x, sin((pos.z * 0.2) + u_time) * 5.0 + pos.y, pos.z, 1.0);
    gl_Position = projectionMatrix * modelViewMatrix * result;
}