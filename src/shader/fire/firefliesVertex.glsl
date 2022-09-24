uniform float u_time;
varying vec3 pos;
varying vec3 norm;

// A single iteration of Bob Jenkins' One-At-A-Time hashing algorithm.
uint hash(uint x) {
    x += (x << 10u);
    x ^= (x >> 6u);
    x += (x << 3u);
    x ^= (x >> 11u);
    x += (x << 15u);
    return x;
}

// Compound versions of the hashing algorithm I whipped together.
uint hash(uvec2 v) {
    return hash(v.x ^ hash(v.y));
}
uint hash(uvec3 v) {
    return hash(v.x ^ hash(v.y) ^ hash(v.z));
}
uint hash(uvec4 v) {
    return hash(v.x ^ hash(v.y) ^ hash(v.z) ^ hash(v.w));
}

// Construct a float with half-open range [0:1] using low 23 bits.
// All zeroes yields 0.0, all ones yields the next smallest representable value below 1.0.
float floatConstruct(uint m) {
    const uint ieeeMantissa = 0x007FFFFFu; // binary32 mantissa bitmask
    const uint ieeeOne = 0x3F800000u; // 1.0 in IEEE binary32

    m &= ieeeMantissa;                     // Keep only mantissa bits (fractional part)
    m |= ieeeOne;                          // Add fractional part to 1.0

    float f = uintBitsToFloat(m);       // Range [1:2]
    return f - 1.0;                        // Range [0:1]
}

// Pseudo-random value in half-open range [0:1].
float random(float x) {
    return floatConstruct(hash(floatBitsToUint(x)));
}
float random(vec2 v) {
    return floatConstruct(hash(floatBitsToUint(v)));
}
float random(vec3 v) {
    return floatConstruct(hash(floatBitsToUint(v)));
}
float random(vec4 v) {
    return floatConstruct(hash(floatBitsToUint(v)));
}

// TODO: unten breiter, oben dünner
// unten mehr dunkel, oben mehr hell
// plus implemtiere Farbvariationen abhängig von randomness
void main() {
    norm = normal;
    pos = position;
    float movement = 0.0;
    vec3 r = vec3(random(u_time), random(u_time - 1.0), random(u_time - 2.0)) * movement;
    float m = sin(u_time * position.y* 5.0) * 10.0;
    vec4 result = instanceMatrix * vec4(position.x + m, position.y * 20.0, position.z, 1.0) + vec4(r.x, r.y, r.z, 0.0); 
    gl_Position = projectionMatrix * modelViewMatrix * result;
}