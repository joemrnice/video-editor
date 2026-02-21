#version 300 es
precision highp float;

in vec2 v_texCoord;
out vec4 fragColor;

uniform sampler2D u_texture;
uniform vec2 u_resolution;
uniform float u_strength;

void main() {
    vec2 t = 1.0 / u_resolution;
    vec4 center = texture(u_texture, v_texCoord);
    vec4 top    = texture(u_texture, v_texCoord + vec2(0.0,  t.y));
    vec4 bottom = texture(u_texture, v_texCoord + vec2(0.0, -t.y));
    vec4 left   = texture(u_texture, v_texCoord + vec2(-t.x, 0.0));
    vec4 right  = texture(u_texture, v_texCoord + vec2( t.x, 0.0));
    vec4 sharpened = center * (1.0 + 4.0 * u_strength) - (top + bottom + left + right) * u_strength;
    fragColor = clamp(sharpened, 0.0, 1.0);
}
