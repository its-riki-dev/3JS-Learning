/* uniform float uTime;

void main() {
    vec3 pos = position;
    pos.x += 0.2 * sin(pos.x * 3. * pos.y * 2. + uTime);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.);
} */

uniform float uTime;

void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    modelPosition.z += .1 * sin(modelPosition.x * 3. + modelPosition.y * 3. + uTime) * .4;
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;

    gl_Position = projectionPosition;
}
