#version 300 es
precision highp float;

in vec2 v_texCoord;
out vec4 fragColor;

uniform sampler2D u_texture;
uniform mat3 u_uvTransform;

void main() {
    vec3 uv    = u_uvTransform * vec3(v_texCoord, 1.0);
    fragColor  = texture(u_texture, uv.xy);
}
