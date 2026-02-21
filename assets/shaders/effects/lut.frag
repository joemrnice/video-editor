#version 300 es
precision highp float;

in vec2 v_texCoord;
out vec4 fragColor;

uniform sampler2D u_texture;
uniform sampler2D u_lut;
uniform float u_intensity;

vec3 applyLUT(vec3 color) {
    float lutSize = 16.0;
    float sliceH  = 1.0 / lutSize;
    float b = color.b * (lutSize - 1.0);
    float bFloor = floor(b);
    float bCeil  = ceil(b);
    float bFrac  = fract(b);
    vec2 uv0 = vec2((color.r + bFloor) / lutSize, color.g);
    vec2 uv1 = vec2((color.r + bCeil)  / lutSize, color.g);
    vec3 c0 = texture(u_lut, uv0).rgb;
    vec3 c1 = texture(u_lut, uv1).rgb;
    return mix(c0, c1, bFrac);
}

void main() {
    vec4 color  = texture(u_texture, v_texCoord);
    vec3 graded = applyLUT(color.rgb);
    fragColor   = vec4(mix(color.rgb, graded, u_intensity), color.a);
}
