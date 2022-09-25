uniform float u_time;
varying vec3 pos;
varying vec3 norm;
varying float rain_pos;
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

void main() {
    norm = normal;
    float widening_factor = min(0.0, position.y - 2.0);
    widening_factor = (-1.0 * widening_factor);
    float movement = max(0.0, position.y) * 1.0;
    movement = movement * 20.0;
    vec3 r = vec3(0.0, random(vec4(u_time, position)) * movement, 0.0);
    float m = sin(u_time * position.x * 2.5) * .8;
    float scaling = 0.5;
    float stretch = 10.0;
    vec4 intermediate1 = vec4((position.x + m) * widening_factor, (position.y) * stretch, (position.z + sin(position.y * position.z)), 1.0);
    intermediate1 = intermediate1 + vec4(r.x, r.y, r.z, 0.0);
    intermediate1 = intermediate1 * scaling;

    pos = vec3(intermediate1.x, intermediate1.y, intermediate1.z);
    vec4 result = instanceMatrix * intermediate1;
    gl_Position = projectionMatrix * modelViewMatrix * result;
}