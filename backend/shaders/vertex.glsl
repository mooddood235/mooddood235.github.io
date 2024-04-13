#include <common>

varying vec3 fragPos;
varying vec3 fragNormal;
varying vec2 fragUV;

vec2 GetGradient(vec2 p);
float PerlinNoise(vec2 pos);

void main(){
    vec3 displacedPosition = position + normal * PerlinNoise(uv * 100.0) * 0.3;
    fragPos = position;
    fragNormal = normal;
    fragUV = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(displacedPosition, 1.0);
}

float PerlinNoise(vec2 pos){
    vec2 i = floor(pos);
    vec2 f = fract(pos);
    vec2 blend = f * f * (3.0 - 2.0 * f);
    float noiseVal = 
        mix(
            mix(
                dot(GetGradient(i + vec2(0, 0)), f - vec2(0, 0)),
                dot(GetGradient(i + vec2(1, 0)), f - vec2(1, 0)),
                blend.x),
            mix(
                dot(GetGradient(i + vec2(0, 1)), f - vec2(0, 1)),
                dot(GetGradient(i + vec2(1, 1)), f - vec2(1, 1)),
                blend.x),
        blend.y
    );
    return noiseVal * 0.5 + 0.5;
}
vec2 GetGradient(vec2 p){
    float rand = rand(p);
    float angle = 6.283185 * rand + 4.0 * rand;
    return vec2(cos(angle), sin(angle));
}
