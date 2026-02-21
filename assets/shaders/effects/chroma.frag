#version 300 es
precision highp float;

in vec2 v_texCoord;
out vec4 fragColor;

uniform sampler2D u_texture;
uniform vec3 u_keyColor;
uniform float u_threshold;
uniform float u_softness;

void main() {
    vec4 color = texture(u_texture, v_texCoord);
    float dist = length(color.rgb - u_keyColor);
    float mask = smoothstep(u_threshold, u_threshold + u_softness, dist);
    fragColor  = vec4(color.rgb, color.a * mask);
}
