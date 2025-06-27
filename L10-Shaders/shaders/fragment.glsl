varying vec2 vUv;

void main() {
    // gl_FragColor = vec4(vUv.y, vUv.x, 0, 1.0);
    gl_FragColor = vec4(vUv.rg, 1., 1.);
}
