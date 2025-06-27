// Topic 1 --> Mix & Gradient Function

varying vec2 vUv;
uniform float uTime;

/* void main() {
    vec4 color = mix(vec4(1., .0, .0, 1.), vec4(.0, .0, .0, 1.), vUv.x);
    gl_FragColor = color;
} */

/* void main() {
    vec4 color1 = vec4(1.0, 0.0, 0.0, 1.0); // Red
    vec4 color2 = vec4(0.0, 1.0, 0.0, 1.0); // Green
    vec4 color3 = vec4(0.0, 0.0, 1.0, 1.0); // Blue
    vec4 color4 = vec4(1.0, 1.0, 0.0, 1.0); // Yellow

    vec4 color12 = mix(color1, color2, vUv.x + sin(.2 * uTime));
    vec4 color34 = mix(color3, color4, vUv.x + sin(.2 * uTime));

    vec4 finalColor = mix(color12, color34, vUv.y - cos(.2 * uTime));

    gl_FragColor = finalColor;
} */



// Topic 2 --> Step Function

/* void main() {
    vec4 c1 = vec4(1.0, 1.0, 0.0, 1.0);
    vec4 c2 = vec4(0.0, 0.0, 1.0, 1.0);

    float s = step(.5, vUv.y);

    vec4 color = mix(c1, c2, s);

    gl_FragColor = color;
} */




// Topic 3 --> Smoothstep Function

/* void main() {
    vec4 c1 = vec4(1.0, 1.0, 0.0, 1.0);
    vec4 c2 = vec4(0.0, 0.0, 1.0, 1.0);

    float s = smoothstep(.7, .7, 3.14 * vUv.y);

    vec4 color = mix(c1, c2, s);

    gl_FragColor = color;
} */




// Topic 4 --> Clamp Function

void main() {
    vec4 c1 = vec4(1.0, 1.0, 0.0, 1.0);
    vec4 c2 = vec4(0.0, 0.0, 1.0, 1.0);

    float s = clamp(-1., 1., vUv.x * 2.);

    vec4 color = mix(c1, c2, s);

    gl_FragColor = color;
}