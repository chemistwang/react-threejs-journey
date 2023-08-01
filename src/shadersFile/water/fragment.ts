const fragment = `
    uniform vec3 uDepthColor;
    uniform vec3 uSurfaceColor;
    
    varying float vElevation;
    uniform float uColorOffset;
    uniform float uColorMultiplier;

    void main() {
        // gl_FragColor = vec4(0.5, 0.8, 1.0, 1.0);
        // gl_FragColor = vec4(uDepthColor, 1.0);

        float mixStrength = (vElevation + uColorOffset) * uColorMultiplier;
        vec3 color = mix(uDepthColor, uSurfaceColor, mixStrength);

        gl_FragColor = vec4(color, 1.0);
    }
`;

export default fragment;
