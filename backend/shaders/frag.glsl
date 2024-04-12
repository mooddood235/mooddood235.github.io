varying vec3 fragPos;
varying vec3 fragNormal;
varying vec2 fragUV;

void main(){
    gl_FragColor = vec4(fragNormal, 1);
}