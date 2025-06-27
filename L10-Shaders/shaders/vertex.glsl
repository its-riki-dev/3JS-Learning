uniform float uTime;

varying vec2 vUv;
varying vec3 vPosition;

void main (){
    vUv = uv;

    vPosition = position;

    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    // Transform the vertex position from local (object) space to world space.
    // The modelMatrix moves the vertex from its local coordinates to its position in the world.

    vec4 viewPosition = viewMatrix * modelPosition; 
    // Transform the vertex position from world space to camera (view) space.
    // The viewMatrix moves the vertex from its position in the world to its position relative to the camera.

    
    vec4 projectionPosition = projectionMatrix * viewPosition;
    // Multiply the view-space position by the projection matrix to get the final clip-space position.
    // This transforms the vertex from camera (view) space into clip space, which is used for rendering.

    gl_Position = projectionPosition;
    // Set the final position of the vertex in clip space.
    // 'gl_Position' is a special built-in variable in GLSL that determines where the vertex will appear on the screen.
    // Here, we assign 'projectionPosition', which is the vertex position after being transformed by the model, view, and projection matrices.
}



 
/* void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
} */