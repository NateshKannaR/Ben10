var e=`float terrain(vec2 p) { return 0.0; }`,t={heatblast:{horizon:`#5E1606`,fog:[24,92],gloss:0,terrain:`float terrain(vec2 p) { return (fbm(p * 0.05) - 0.46) * 7.0 + pow(fbm(p * 0.021 + 9.0), 3.0) * 12.0; }`,sky:`vec3 skyColour(vec3 d, float t) {
      float up = clamp(d.y, 0.0, 1.0);
      float smoke = fbm(d.xz / (up + 0.22) * 1.3 + vec2(t * 0.04, t * 0.02));
      vec3 c = mix(vec3(1.05, 0.25, 0.04), vec3(0.09, 0.02, 0.02), pow(up * 1.7, 0.5));
      c = mix(c, vec3(0.015, 0.008, 0.008), smoothstep(0.38, 0.72, smoke) * 0.9);
      c += vec3(1.5, 0.38, 0.05) * pow(max(0.0, 1.0 - up * 5.0), 3.0) * 0.6;
      return c;
    }`,ground:`vec3 groundColour(vec3 p, vec3 n, float cel, float t) {
      vec3 v = voro(p.xz * 0.24 + fbm(p.xz * 0.1) * 1.4);
      float crack = 1.0 - smoothstep(0.0, 0.05, v.y);
      float flow = 0.72 + 0.28 * sin(t * 1.5 + v.z * 6.28);
      vec3 rock = mix(vec3(0.006, 0.005, 0.006), vec3(0.03, 0.016, 0.014), cel);
      float pool = smoothstep(0.62, 0.72, fbm(p.xz * 0.07 + 3.0)) * smoothstep(5.0, 11.0, length(p.xz));
      return rock + vec3(2.4, 0.42, 0.03) * (crack * flow + pool * (0.75 + 0.25 * fbm(p.xz * 0.6 + t * 0.25)));
    }`,props:[{shape:`spire`,count:46,size:[1.4,3.6],stretch:[2.4,7],low:`#0B0808`,high:`#2A1410`,glow:`#FF4A10`,glowLevel:.9}],particles:{count:900,size:62,colour:`#FF6A1E`,hot:`#FFD27A`,velocity:[.15,1.5,.1],box:[46,22,46],sway:.9},post:{heat:1,blur:0,glitch:0,wobble:0},camera:{pitch:.05,radius:7.4}},"four-arms":{horizon:`#7A1F12`,fog:[30,110],gloss:0,terrain:`float terrain(vec2 p) {
      float r = length(p);
      float wall = smoothstep(34.0, 70.0, r);
      float steps = floor(fbm(p * 0.03) * 7.0) / 7.0;
      return (steps - 0.4) * 3.5 + wall * 9.0 * (0.6 + fbm(p * 0.06));
    }`,sky:`vec3 skyColour(vec3 d, float t) {
      float up = clamp(d.y, 0.0, 1.0);
      vec3 c = mix(vec3(0.78, 0.16, 0.07), vec3(0.11, 0.015, 0.03), pow(up * 1.5, 0.6));
      float sun = smoothstep(0.985, 0.992, dot(d, normalize(vec3(-0.35, 0.16, -0.92))));
      c += vec3(2.2, 0.75, 0.25) * sun;
      float band = fbm(vec2(d.x * 3.0 + t * 0.02, d.y * 22.0));
      return c * (0.82 + 0.36 * band);
    }`,ground:`vec3 groundColour(vec3 p, vec3 n, float cel, float t) {
      float layers = sin(p.y * 3.2 + fbm(p.xz * 0.12) * 3.0) * 0.5 + 0.5;
      vec3 a = mix(vec3(0.16, 0.035, 0.03), vec3(0.42, 0.11, 0.06), layers);
      return a * mix(0.5, 1.0, cel) + vnoise(p.xz * 3.0) * vec3(0.03, 0.008, 0.005);
    }`,props:[{shape:`mesa`,count:26,size:[3,8],stretch:[1.2,4],low:`#2E0A08`,high:`#8E2A16`,near:20},{shape:`thorn`,count:22,size:[.6,1.5],stretch:[1,2.4],low:`#23080A`,high:`#6E1E14`,near:9}],particles:{count:500,size:44,colour:`#C9502C`,hot:`#FFB27A`,velocity:[2.4,.15,.5],box:[60,12,60],sway:.5},post:{heat:.18,blur:0,glitch:0,wobble:0},camera:{pitch:.02,radius:8.6}},xlr8:{horizon:`#0A2460`,fog:[18,100],gloss:0,terrain:e,sky:`vec3 skyColour(vec3 d, float t) {
      float up = clamp(d.y, 0.0, 1.0);
      vec3 c = mix(vec3(0.02, 0.07, 0.28), vec3(0.004, 0.006, 0.03), pow(up * 1.4, 0.6));
      float streak = pow(vnoise(vec2(atan(d.x, -d.z) * 40.0, t * 0.6)), 6.0);
      return c + vec3(0.2, 0.5, 1.6) * streak * smoothstep(0.0, 0.25, up) * smoothstep(0.7, 0.1, up);
    }`,ground:`vec3 groundColour(vec3 p, vec3 n, float cel, float t) {
      float z = p.z + t * 26.0;
      float gz = 1.0 - smoothstep(0.0, 0.07, abs(fract(z * 0.16) - 0.5));
      float gx = 1.0 - smoothstep(0.0, 0.05, abs(fract(p.x * 0.25) - 0.5));
      float edge = exp(-((abs(p.x) - 5.0) * 5.0) * ((abs(p.x) - 5.0) * 5.0));
      float dash = step(0.5, fract(z * 0.09)) * exp(-(p.x * 7.0) * (p.x * 7.0));
      return vec3(0.012, 0.02, 0.05) + vec3(0.1, 0.42, 2.4) * (gz * 0.34 + gx * 0.16 + edge * 1.6 + dash * 1.2);
    }`,props:[{shape:`arch`,count:14,size:[9,9],stretch:[1,1],low:`#061230`,high:`#123A9A`,glow:`#2E7BFF`,glowLevel:2.2,layout:`lane`},{shape:`pylon`,count:30,size:[.7,1.5],stretch:[6,22],low:`#040A1E`,high:`#10306E`,glow:`#2E7BFF`,glowLevel:1.1,near:12}],particles:{count:240,size:30,colour:`#5AA0FF`,hot:`#DCEBFF`,velocity:[0,0,18],box:[40,14,90],sway:0},streaks:!0,post:{heat:0,blur:.3,glitch:0,wobble:0},camera:{pitch:.06,radius:7.2}},diamondhead:{horizon:`#0C4A4C`,fog:[24,96],gloss:.62,terrain:`float terrain(vec2 p) { return pow(fbm(p * 0.04), 2.0) * 16.0; }`,sky:`vec3 skyColour(vec3 d, float t) {
      float up = clamp(d.y, 0.0, 1.0);
      vec3 c = mix(vec3(0.03, 0.22, 0.22), vec3(0.005, 0.02, 0.045), pow(up * 1.3, 0.55));
      float curtain = fbm(vec2(atan(d.x, d.z) * 2.2 + t * 0.03, up * 3.0));
      return c + vec3(0.1, 0.85, 0.7) * smoothstep(0.45, 0.85, curtain) * smoothstep(0.05, 0.3, up) * smoothstep(0.9, 0.35, up) * 0.6;
    }`,ground:`vec3 groundColour(vec3 p, vec3 n, float cel, float t) {
      vec3 v = voro(p.xz * 0.42);
      float edge = 1.0 - smoothstep(0.0, 0.03, v.y);
      vec3 a = mix(vec3(0.01, 0.06, 0.07), vec3(0.05, 0.24, 0.26), v.z) * mix(0.6, 1.0, cel);
      return a + vec3(0.35, 1.7, 1.5) * edge * 0.5;
    }`,props:[{shape:`crystal`,count:58,size:[1,3.4],stretch:[1.6,5],low:`#0B5A5A`,high:`#A6FFF0`,glow:`#6FF0E0`,glowLevel:.8,near:7}],particles:{count:380,size:34,colour:`#8FFFEF`,hot:`#FFFFFF`,velocity:[.1,.22,.06],box:[40,16,40],sway:.6},post:{heat:0,blur:0,glitch:0,wobble:0},camera:{pitch:.08,radius:7.8}},wildmutt:{horizon:`#8A4A12`,fog:[14,64],gloss:0,terrain:`float terrain(vec2 p) { return (fbm(p * 0.06) - 0.4) * 11.0; }`,sky:`vec3 skyColour(vec3 d, float t) {
      float up = clamp(d.y, 0.0, 1.0);
      vec3 c = mix(vec3(0.72, 0.36, 0.08), vec3(0.14, 0.06, 0.03), pow(up * 1.4, 0.7));
      float spores = fbm(d.xz / (up + 0.3) * 2.2 + t * 0.03);
      return mix(c, vec3(0.3, 0.13, 0.04), smoothstep(0.4, 0.8, spores) * 0.7);
    }`,ground:`vec3 groundColour(vec3 p, vec3 n, float cel, float t) {
      vec3 v = voro(p.xz * 0.5);
      vec3 a = mix(vec3(0.15, 0.075, 0.025), vec3(0.42, 0.22, 0.07), fbm(p.xz * 0.3));
      return a * mix(0.55, 1.0, cel) * (0.72 + 0.28 * smoothstep(0.0, 0.1, v.y));
    }`,props:[{shape:`thorn`,count:54,size:[.8,2.4],stretch:[2,6],low:`#1E0F06`,high:`#6A3A12`,near:7},{shape:`cap`,count:26,size:[.8,2.2],stretch:[.8,1.4],low:`#3A1E08`,high:`#C96A12`,glow:`#FF8A00`,glowLevel:.5,near:8}],particles:{count:700,size:52,colour:`#E8A040`,hot:`#FFE0A0`,velocity:[.35,.3,.2],box:[36,12,36],sway:1.2},post:{heat:.1,blur:0,glitch:0,wobble:0},camera:{pitch:.1,radius:6.8}},upgrade:{horizon:`#02100A`,fog:[18,80],gloss:.72,terrain:`float terrain(vec2 p) { return (fbm(p * 0.05) - 0.5) * 4.0; }`,sky:`vec3 skyColour(vec3 d, float t) {
      float up = clamp(d.y, 0.0, 1.0);
      vec3 c = mix(vec3(0.0, 0.05, 0.03), vec3(0.002, 0.006, 0.005), pow(up * 1.5, 0.5));
      vec2 cell = vec2(floor(atan(d.x, d.z) * 90.0), floor(up * 150.0));
      float bit = step(0.985, hash(cell + floor(t * 3.0)));
      return c + vec3(0.03, 1.1, 0.5) * bit * smoothstep(0.02, 0.2, up) * (1.0 - up);
    }`,bump:`vec3 bump(vec3 p, float t) {
      float e = 0.2;
      float a = fbm(p.xz * 0.4 + vec2(t * 0.22, -t * 0.15));
      float b = fbm((p.xz + vec2(e, 0.0)) * 0.4 + vec2(t * 0.22, -t * 0.15));
      float c = fbm((p.xz + vec2(0.0, e)) * 0.4 + vec2(t * 0.22, -t * 0.15));
      return vec3(a - b, 0.0, a - c) * 4.0;
    }`,ground:`vec3 groundColour(vec3 p, vec3 n, float cel, float t) {
      float w = fbm(p.xz * 0.35 + vec2(t * 0.22, -t * 0.15));
      vec3 a = vec3(0.006, 0.01, 0.01) + vec3(0.012, 0.05, 0.035) * w;
      float tx = 1.0 - smoothstep(0.0, 0.03, abs(fract((p.x + floor(p.z * 0.25) * 2.0) * 0.25) - 0.5));
      float tz = 1.0 - smoothstep(0.0, 0.03, abs(fract((p.z + floor(p.x * 0.25) * 3.0) * 0.25) - 0.5));
      float pulse = smoothstep(0.72, 1.0, sin((p.x + p.z) * 0.3 - t * 2.0) * 0.5 + 0.5);
      return a + vec3(0.03, 1.6, 0.7) * max(tx, tz) * (0.14 + pulse * 1.3);
    }`,props:[{shape:`tower`,count:34,size:[1.2,3],stretch:[3,12],low:`#020604`,high:`#0A1E14`,glow:`#0BFF9A`,glowLevel:1.6,near:11}],particles:{count:460,size:30,colour:`#0BFF9A`,hot:`#C8FFE8`,velocity:[0,.8,0],box:[40,16,40],sway:0},post:{heat:0,blur:0,glitch:1,wobble:0},camera:{pitch:.05,radius:7.2}},"grey-matter":{horizon:`#6F7F8A`,fog:[18,90],gloss:.18,terrain:e,sky:`vec3 skyColour(vec3 d, float t) {
      float up = clamp(d.y, 0.0, 1.0);
      vec3 c = mix(vec3(0.36, 0.44, 0.5), vec3(0.05, 0.08, 0.12), pow(up * 1.3, 0.6));
      float arc = abs(length(vec2(d.x, d.y - 0.5)) - 0.62);
      return c + vec3(0.5, 0.7, 0.75) * (1.0 - smoothstep(0.0, 0.004, arc)) * 0.8;
    }`,ground:`vec3 groundColour(vec3 p, vec3 n, float cel, float t) {
      vec2 g = p.xz * 0.5;
      vec2 f = abs(fract(g) - 0.5);
      float seam = 1.0 - smoothstep(0.47, 0.49, max(f.x, f.y));
      vec3 a = mix(vec3(0.1, 0.12, 0.14), vec3(0.24, 0.28, 0.31), hash(floor(g)));
      float dotLight = step(0.9, hash(floor(g) + 3.0)) * (0.5 + 0.5 * sin(t * 2.0 + hash(floor(g)) * 6.28));
      return a * mix(0.82, 1.0, seam) + vec3(0.5, 1.1, 1.0) * ((1.0 - seam) * 0.32 + dotLight * 0.3 * step(max(f.x, f.y), 0.1));
    }`,props:[{shape:`tower`,count:42,size:[2,5],stretch:[4,18],low:`#1E262C`,high:`#7D8D96`,glow:`#BFE4E8`,glowLevel:.7,near:10}],particles:{count:260,size:26,colour:`#CFE8EC`,hot:`#FFFFFF`,velocity:[.12,.08,.1],box:[28,10,28],sway:.5},post:{heat:0,blur:0,glitch:.12,wobble:0},camera:{pitch:.14,radius:4.6}},stinkfly:{horizon:`#4E5A14`,fog:[12,66],gloss:.22,terrain:`float terrain(vec2 p) { return (fbm(p * 0.05) - 0.45) * 9.0; }`,sky:`vec3 skyColour(vec3 d, float t) {
      float up = clamp(d.y, 0.0, 1.0);
      vec3 c = mix(vec3(0.42, 0.48, 0.1), vec3(0.05, 0.09, 0.04), pow(up * 1.4, 0.7));
      float mist = fbm(d.xz / (up + 0.28) * 1.7 + t * 0.02);
      return mix(c, vec3(0.2, 0.26, 0.06), smoothstep(0.42, 0.8, mist) * 0.6);
    }`,ground:`vec3 groundColour(vec3 p, vec3 n, float cel, float t) {
      float wet = smoothstep(0.46, 0.56, fbm(p.xz * 0.12 + 5.0));
      vec3 mud = mix(vec3(0.03, 0.05, 0.02), vec3(0.11, 0.15, 0.04), fbm(p.xz * 0.4));
      vec3 slime = vec3(0.2, 0.3, 0.03) * (0.8 + 0.2 * sin(t + p.x));
      return mix(mud * mix(0.55, 1.0, cel), slime, wet);
    }`,props:[{shape:`cap`,count:40,size:[1,3.4],stretch:[.9,2],low:`#2C3A10`,high:`#B5C818`,glow:`#C7E000`,glowLevel:.4,near:8},{shape:`thorn`,count:44,size:[.4,.9],stretch:[3,8],low:`#1C2A0C`,high:`#5E7A14`,near:7}],particles:{count:520,size:46,colour:`#D0EC30`,hot:`#F6FFB0`,velocity:[.1,.34,.05],box:[36,12,36],sway:1},post:{heat:.08,blur:0,glitch:0,wobble:.3},camera:{pitch:.06,radius:7.4}},ripjaws:{horizon:`#04343C`,fog:[8,46],gloss:0,terrain:`float terrain(vec2 p) { return (fbm(p * 0.07) - 0.42) * 8.0 + smoothstep(18.0, 40.0, length(p)) * 10.0 * fbm(p * 0.05); }`,sky:`vec3 skyColour(vec3 d, float t) {
      float up = clamp(d.y, 0.0, 1.0);
      vec3 c = mix(vec3(0.0, 0.1, 0.13), vec3(0.03, 0.45, 0.5), pow(up, 0.9));
      float shafts = pow(vnoise(vec2(atan(d.x, d.z) * 9.0 + t * 0.1, 1.0)), 5.0);
      return c + vec3(0.25, 0.85, 0.8) * shafts * smoothstep(0.05, 0.75, up) * 0.7;
    }`,ground:`vec3 groundColour(vec3 p, vec3 n, float cel, float t) {
      float v = voro(p.xz * 0.62 + vec2(t * 0.13, -t * 0.1)).y;
      float w = voro(p.xz * 1.04 - vec2(t * 0.1, t * 0.16)).y;
      float caustic = pow(max(1.0 - min(v, w) * 2.4, 0.0), 6.0);
      vec3 sand = mix(vec3(0.015, 0.06, 0.08), vec3(0.04, 0.14, 0.15), fbm(p.xz * 0.3));
      return sand * mix(0.6, 1.0, cel) + vec3(0.2, 0.8, 0.72) * max(caustic, 0.0) * 0.32;
    }`,props:[{shape:`coral`,count:56,size:[.8,2.6],stretch:[1,4],low:`#06282C`,high:`#1FA6A0`,glow:`#5EFFE8`,glowLevel:.9,near:7}],particles:{count:520,size:40,colour:`#7DF2E8`,hot:`#E8FFFC`,velocity:[.05,1.1,.02],box:[30,18,30],sway:.7},post:{heat:0,blur:0,glitch:0,wobble:1},camera:{pitch:.04,radius:7.6}},cannonbolt:{horizon:`#4A3F58`,fog:[26,110],gloss:.34,terrain:`float terrain(vec2 p) { return pow(fbm(p * 0.035), 2.2) * 22.0 + (vnoise(p * 0.3) - 0.5) * 0.5; }`,sky:`vec3 skyColour(vec3 d, float t) {
      float up = clamp(d.y, 0.0, 1.0);
      vec3 c = mix(vec3(0.95, 0.68, 0.34), vec3(0.06, 0.07, 0.2), pow(up * 2.0, 0.55));
      float sun = dot(d, normalize(vec3(0.5, 0.1, -0.86)));
      c += vec3(2.4, 1.5, 0.55) * smoothstep(0.994, 0.998, sun) + vec3(0.8, 0.45, 0.15) * pow(max(sun, 0.0), 40.0);
      return c;
    }`,ground:`vec3 groundColour(vec3 p, vec3 n, float cel, float t) {
      vec3 v = voro(p.xz * 0.2);
      float crack = 1.0 - smoothstep(0.0, 0.03, v.y);
      float snow = smoothstep(0.42, 0.6, fbm(p.xz * 0.16));
      vec3 ice = mix(vec3(0.16, 0.26, 0.4), vec3(0.42, 0.56, 0.68), v.z);
      vec3 a = mix(ice * 0.6, vec3(0.44, 0.46, 0.56), snow) * mix(0.62, 1.0, cel);
      return a + vec3(0.7, 0.9, 1.1) * crack * 0.3 * (1.0 - snow);
    }`,props:[{shape:`shard`,count:52,size:[1,3],stretch:[2,6],low:`#2E4560`,high:`#CFE4F2`,near:9}],particles:{count:800,size:40,colour:`#EAF3FF`,hot:`#FFFFFF`,velocity:[.9,-1.3,.3],box:[46,18,46],sway:.8},post:{heat:0,blur:0,glitch:0,wobble:0},camera:{pitch:.06,radius:7.8}}},n=`
  float hash(vec2 p) { p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
  float vnoise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1, 0)), f.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), f.x), f.y);
  }
  float fbm(vec2 p) {
    float a = 0.5, s = 0.0;
    for (int i = 0; i < 4; i++) { s += a * vnoise(p); p = p * 2.03 + 17.0; a *= 0.5; }
    return s;
  }
  // Distance to the nearest cell, distance to its edge, and a value unique to that cell.
  vec3 voro(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    float best = 8.0, second = 8.0, id = 0.0;
    for (int y = -1; y <= 1; y++) for (int x = -1; x <= 1; x++) {
      vec2 g = vec2(float(x), float(y));
      vec2 o = vec2(hash(i + g), hash(i + g + 7.1));
      float d = length(g + o - f);
      if (d < best) { second = best; best = d; id = hash(i + g + 3.3); } else if (d < second) { second = d; }
    }
    return vec3(best, second - best, id);
  }
`;export{t as n,n as t};