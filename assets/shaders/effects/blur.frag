#version 300 es
precision highp float;

in vec2 v_texCoord;
out vec4 fragColor;

uniform sampler2D u_texture;
uniform vec2 u_resolution;
uniform float u_radius;

void main() {
    vec2 texel = 1.0 / u_resolution;
    vec4 sum   = vec4(0.0);
    float total = 0.0;
    int r = int(u_radius);
    for (int x = -r; x <= r; x++) {
        float w = float(r + 1) - abs(float(x));
        sum   += texture(u_texture, v_texCoord + vec2(float(x), 0.0) * texel) * w;
        total += w;
    }
    fragColor = sum / total;
}
