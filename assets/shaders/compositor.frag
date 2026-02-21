#version 300 es
precision highp float;

in vec2 v_texCoord;
out vec4 fragColor;

uniform sampler2D u_texture;
uniform float u_opacity;

void main() {
    vec4 color = texture(u_texture, v_texCoord);
    fragColor  = vec4(color.rgb, color.a * u_opacity);
}
