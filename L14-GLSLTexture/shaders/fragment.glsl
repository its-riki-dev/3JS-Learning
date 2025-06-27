varying vec2 vUv;
varying float noise;
uniform float uTime;
uniform sampler2D uTexture;

// Simple random function
float random (in vec2 st) {
    return fract(sin(dot(st.xy,vec2(12.9898,78.233)))*43758.5453123);
}

// 2D noise function
float noise2D (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}

#define OCTAVES 5
float fbm (in vec2 st) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 0.0;
    for (int i = 0; i < OCTAVES; i++) {
        value += amplitude * noise2D(st);
        st *= 2.0;
        amplitude *= 0.5;
    }
    return value;
}

void main() {
    // Sample the texture
    vec4 color = texture2D(uTexture, vUv);

    // Add noise from vertex shader
    color.rgb += noise;

    // Add fbm-based effect (for example, modulate brightness)
    float f = fbm(vUv * 3.0 + uTime * 0.05);
    color.rgb *= 0.7 + 0.3 * f;

    gl_FragColor = color;
}