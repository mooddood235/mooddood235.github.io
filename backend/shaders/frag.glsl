varying vec3 fragPos;
varying vec3 fragNormal;
varying vec2 fragUV;

void main(){
    gl_FragColor = vec4(fragNormal, 1);
}

// Used as initial seed to the PRNG.
uint pcg_hash(uint seed)
{
  uint state = seed * 747796405u + 2891336453u;
  uint word = ((state >> ((state >> 28u) + 4u)) ^ state) * 277803737u;
  return (word >> 22u) ^ word;
}

// Used to advance the PCG state.
uint rand_pcg(inout uint rng_state)
{
  uint state = rng_state;
  rng_state = rng_state * 747796405u + 2891336453u;
  uint word = ((state >> ((state >> 28u) + 4u)) ^ state) * 277803737u;
  return (word >> 22u) ^ word;
}

// Advances the prng state and returns the corresponding random float.
// Range is [0, 1)
float rand(inout uint state)
{
  uint x = rand_pcg(state);
  state = x;
  return float(x) / (2.0 * float(0x80000000u));
}