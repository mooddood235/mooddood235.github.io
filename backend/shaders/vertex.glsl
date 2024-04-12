varying vec3 fragPos;
varying vec3 fragNormal;
varying vec2 fragUV;

void main(){
    fragPos = position;
    fragNormal = normal;
    fragUV = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}