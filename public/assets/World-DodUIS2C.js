import{a as e,c as t,i as n,r}from"./vanilla-D1FEyU8v.js";import{$ as i,A as a,F as o,I as s,It as c,Lt as l,R as u,Z as d,_t as f,b as p,ct as m,h,i as g,j as _,jt as v,k as y,n as b,pt as x,r as S,t as C,vt as w,wt as T}from"./alienModel-CNgpwgoe.js";import{r as E}from"./index-odouEJXM.js";import{D,r as O}from"./fx-LpSvOo3L.js";import{a as k,i as A,n as j,o as M}from"./field-BDidAj3K.js";import{n as N,t as P}from"./worlds-Bbf7qwtg.js";var F=t(e(),1),I=n(),L={stinkfly:.75},R=`normalize(vec3(0.35, 0.75, 0.55))`;function z(e){let t=(e,t)=>new i(e.map(([e,t])=>new c(e,t)),t);switch(e){case`spire`:return new s(.5,1,5,1).translate(0,.5,0);case`thorn`:return new s(.42,1,4,1).translate(0,.5,0);case`shard`:return new s(.5,1,3,1).translate(0,.5,0);case`mesa`:return new u(.42,.5,1,6).translate(0,.5,0);case`tower`:return new y(1,1,1).translate(0,.5,0);case`pylon`:return new y(.5,1,.5).translate(0,.5,0);case`arch`:return new v(1,.03,5,28,Math.PI);case`crystal`:return t([[0,0],[.5,.02],[.4,.72],[0,1]],6);case`cap`:return t([[.07,0],[.1,.52],[.52,.58],[.44,.8],[0,.98]],8);case`coral`:return t([[.3,0],[.12,.3],[.3,.58],[.1,.8],[.16,.92],[0,1]],6)}}function B({config:e}){let t=(0,F.useMemo)(()=>new T({vertexShader:`
          varying vec3 vDir;
          void main() {
            vDir = position;
            vec4 p = projectionMatrix * mat4(mat3(viewMatrix)) * vec4(position, 1.0);
            gl_Position = p.xyww;
          }
        `,fragmentShader:`
          uniform float uTime;
          varying vec3 vDir;
          ${P}
          ${e.sky}
          void main() {
            gl_FragColor = vec4(skyColour(normalize(vDir), uTime), 1.0);
            #include <tonemapping_fragment>
            #include <colorspace_fragment>
          }
        `,uniforms:{uTime:{value:0}},side:1,depthWrite:!1}),[e]);return h(({clock:e})=>{t.uniforms.uTime.value=e.elapsedTime}),(0,I.jsx)(`mesh`,{material:t,frustumCulled:!1,renderOrder:-10,children:(0,I.jsx)(`sphereGeometry`,{args:[1,32,20]})})}function V({config:e,accent:t,segments:n}){let r=(0,F.useMemo)(()=>new f(210,210,n,n).rotateX(-Math.PI/2),[n]),i=e.gloss>0,a=(0,F.useMemo)(()=>new T({vertexShader:`
          varying vec3 vP;
          ${P}
          ${e.terrain}
          void main() {
            vec3 p = position;
            p.y = terrain(p.xz) * smoothstep(6.0, 22.0, length(p.xz));
            vP = p;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
          }
        `,fragmentShader:`
          uniform vec3 uHorizon;
          uniform vec3 uAccent;
          uniform vec2 uFog;
          uniform float uGloss;
          uniform float uTime;
          uniform float uRing;
          uniform float uShadow;
          varying vec3 vP;
          ${P}
          ${i?e.sky:``}
          ${e.ground}
          ${e.bump??`vec3 bump(vec3 p, float t) { return vec3(0.0); }`}
          void main() {
            vec3 n = normalize(cross(dFdx(vP), dFdy(vP)));
            if (n.y < 0.0) n = -n;
            float cel = dot(n, ${R}) > 0.7 ? 1.0 : 0.0;
            vec3 view = normalize(cameraPosition - vP);
            vec3 c = groundColour(vP, n, cel, uTime);
            ${i?`
            vec3 nn = normalize(n + bump(vP, uTime));
            float f = pow(clamp(1.0 - dot(view, nn), 0.0, 1.0), 3.0) * 0.85 + 0.15;
            c = mix(c, skyColour(reflect(-view, nn), uTime), uGloss * f);
            `:``}
            float r = length(vP.xz);
            c *= mix(uShadow, 1.0, smoothstep(0.25, 2.3, r));
            float ring = uRing > 0.0 ? exp(-((r - uRing * 30.0) * 0.85) * ((r - uRing * 30.0) * 0.85)) * (1.0 - uRing) : 0.0;
            c += uAccent * ring * 3.2;
            float d = length(cameraPosition - vP);
            float fog = smoothstep(uFog.x, uFog.y, d);
            c = mix(c, uHorizon, fog);
            float alpha = mix(1.0 - uGloss * 0.42, 1.0, fog);
            gl_FragColor = vec4(c, alpha);
            #include <tonemapping_fragment>
            #include <colorspace_fragment>
          }
        `,uniforms:{uHorizon:{value:new o(e.horizon)},uAccent:{value:new o(t)},uFog:{value:new c(...e.fog)},uGloss:{value:e.gloss},uTime:{value:0},uRing:{value:0},uShadow:{value:.32}},transparent:i}),[e,t,i]);return h(({clock:e})=>{a.uniforms.uTime.value=e.elapsedTime,a.uniforms.uRing.value=O.ring}),(0,I.jsx)(`mesh`,{geometry:r,material:a,frustumCulled:!1,renderOrder:2})}function H(e,t){let n=`
    ${P}
    ${t.terrain}
    vec3 placed(vec3 p) {
      vec4 origin = instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0);
      vec4 w = modelMatrix * instanceMatrix * vec4(p, 1.0);
      w.y += terrain(origin.xz) * smoothstep(6.0, 22.0, length(origin.xz)) * sign(modelMatrix[1][1]);
      return w.xyz;
    }
  `,r=`
    float d = length(cameraPosition - vW);
    c = mix(c, uHorizon, smoothstep(uFog.x, uFog.y, d));
  `,i={uHorizon:{value:new o(t.horizon)},uFog:{value:new c(...t.fog)}};return{body:new T({vertexShader:`
      varying vec3 vW;
      varying float vH;
      ${n}
      void main() {
        vH = clamp(position.y, 0.0, 1.0);
        vW = placed(position);
        gl_Position = projectionMatrix * viewMatrix * vec4(vW, 1.0);
      }
    `,fragmentShader:`
      uniform vec3 uLow;
      uniform vec3 uHigh;
      uniform vec3 uGlow;
      uniform float uGlowLevel;
      uniform vec3 uHorizon;
      uniform vec2 uFog;
      uniform float uTime;
      varying vec3 vW;
      varying float vH;
      void main() {
        vec3 n = normalize(cross(dFdx(vW), dFdy(vW)));
        float cel = dot(n, ${R}) > 0.12 ? 1.0 : 0.58;
        vec3 c = mix(uLow, uHigh, vH) * cel;
        float band = step(0.86, fract(vH * 7.0 + 0.1));
        c += uGlow * uGlowLevel * (pow(clamp(vH, 0.0, 1.0), 3.0) * 0.7 + band * 0.5) * (0.8 + 0.2 * sin(uTime * 1.3 + vW.x));
        ${r}
        gl_FragColor = vec4(c, 1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `,uniforms:{...i,uLow:{value:new o(e.low)},uHigh:{value:new o(e.high)},uGlow:{value:new o(e.glow??`#000000`)},uGlowLevel:{value:e.glowLevel??0},uTime:{value:0}}}),ink:new T({vertexShader:`
      varying vec3 vW;
      ${n}
      void main() {
        vW = placed(position + normal * 0.035);
        gl_Position = projectionMatrix * viewMatrix * vec4(vW, 1.0);
      }
    `,fragmentShader:`
      uniform vec3 uHorizon;
      uniform vec2 uFog;
      varying vec3 vW;
      void main() {
        vec3 c = vec3(0.0);
        ${r}
        gl_FragColor = vec4(c, 1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `,uniforms:{...i},side:1})}}function U({set:e,config:t,seed:n,density:r}){let i=Math.max(6,Math.round(e.count*r)),a=(0,F.useMemo)(()=>{let r=z(e.shape),{body:a,ink:o}=H(e,t),s=new d(r,a,i),c=new d(r,o,i),l=k(n);new m,new w;let u=new x;for(let t=0;t<i;t++){let n=A(e.size[0],e.size[1],l()),r=A(e.stretch[0],e.stretch[1],l());if(e.layout===`lane`)u.position.set(0,0,40-t*13),u.rotation.set(0,0,0),u.scale.setScalar(n);else{let t=e.near??12,i=l()*Math.PI*2,a=t+l()**.8*(82-t);u.position.set(Math.cos(i)*a,-.2,Math.sin(i)*a),u.rotation.set((l()-.5)*.32,l()*Math.PI*2,(l()-.5)*.32),u.scale.set(n,n*r,n)}u.updateMatrix(),s.setMatrixAt(t,u.matrix),c.setMatrixAt(t,u.matrix)}return s.frustumCulled=!1,c.frustumCulled=!1,{solid:s,outline:c,body:a}},[e,t,n,i]);return h(({clock:e})=>{a.body.uniforms.uTime.value=e.elapsedTime}),(0,I.jsxs)(I.Fragment,{children:[(0,I.jsx)(`primitive`,{object:a.solid}),(0,I.jsx)(`primitive`,{object:a.outline})]})}function W({set:e,density:t,dpr:n}){let r=(0,F.useRef)(null),{geometry:i,material:s}=(0,F.useMemo)(()=>{let n=Math.round(e.count*t),r=k(404),i=new Float32Array(n*3),s=new Float32Array(n);for(let t=0;t<n;t++)i[t*3]=(r()-.5)*e.box[0],i[t*3+1]=r()*e.box[1],i[t*3+2]=(r()-.5)*e.box[2],s[t]=r();let c=new _;return c.setAttribute(`position`,new a(i,3)),c.setAttribute(`aSeed`,new a(s,1)),{geometry:c,material:new T({vertexShader:`
        attribute float aSeed;
        uniform float uTime;
        uniform float uSize;
        uniform float uBurst;
        uniform float uSway;
        uniform vec3 uVelocity;
        uniform vec3 uBox;
        varying float vSeed;
        varying float vFade;
        void main() {
          vec3 half_box = uBox * vec3(0.5, 0.0, 0.5);
          vec3 p = position + half_box + uVelocity * uTime * (0.55 + aSeed * 0.9);
          p = mod(p, uBox) - half_box;
          float h = p.y / uBox.y;
          p.x += sin(uTime * 0.8 + aSeed * 40.0) * uSway;
          p.z += cos(uTime * 0.7 + aSeed * 70.0) * uSway;
          p += normalize(p - vec3(0.0, 1.0, 0.0) + 0.001) * uBurst * (1.5 + aSeed * 5.0);
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          vSeed = aSeed;
          vFade = smoothstep(0.0, 0.1, h) * smoothstep(1.0, 0.86, h);
          gl_PointSize = uSize * (0.5 + aSeed) / max(-mv.z, 0.6);
          gl_Position = projectionMatrix * mv;
        }
      `,fragmentShader:`
        uniform vec3 uColour;
        uniform vec3 uHot;
        varying float vSeed;
        varying float vFade;
        void main() {
          float a = smoothstep(0.5, 0.06, length(gl_PointCoord - 0.5));
          vec3 c = mix(uColour, uHot, pow(vSeed, 5.0));
          gl_FragColor = vec4(c * a * vFade * (0.55 + vSeed * 0.9), 1.0);
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
        }
      `,uniforms:{uTime:{value:0},uSize:{value:e.size},uBurst:{value:0},uSway:{value:e.sway},uVelocity:{value:new l(...e.velocity)},uBox:{value:new l(...e.box)},uColour:{value:new o(e.colour)},uHot:{value:new o(e.hot)}},transparent:!0,depthWrite:!1,blending:2})}},[e,t]);return h(({clock:t})=>{s.uniforms.uTime.value=t.elapsedTime,s.uniforms.uBurst.value=O.burst,s.uniforms.uSize.value=e.size*n}),(0,I.jsx)(`points`,{ref:r,geometry:i,material:s,frustumCulled:!1,renderOrder:4})}function G({accent:e}){let t=(0,F.useRef)(null),{geometry:n,material:r}=(0,F.useMemo)(()=>{let t=k(11),n=new Float32Array(1320),r=new Float32Array(440),i=new Float32Array(440);for(let e=0;e<220;e++){let a=(t()-.5)*34,o=t()*11,s=t()*120,c=t();n.set([a,o,s,a,o,s],e*6),r.set([0,1],e*2),i.set([c,c],e*2)}let s=new _;return s.setAttribute(`position`,new a(n,3)),s.setAttribute(`aEnd`,new a(r,1)),s.setAttribute(`aSeed`,new a(i,1)),{geometry:s,material:new T({vertexShader:`
        attribute float aEnd;
        attribute float aSeed;
        uniform float uTime;
        varying float vEnd;
        void main() {
          vec3 p = position;
          p.z = mod(p.z + uTime * (46.0 + aSeed * 54.0), 120.0) - 90.0;
          p.z -= aEnd * (2.0 + aSeed * 9.0);
          vEnd = aEnd;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,fragmentShader:`
        uniform vec3 uColour;
        varying float vEnd;
        void main() {
          gl_FragColor = vec4(uColour * 2.2 * (1.0 - vEnd), 1.0);
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
        }
      `,uniforms:{uTime:{value:0},uColour:{value:new o(e)}},transparent:!0,depthWrite:!1,blending:2})}},[e]);return h(({clock:e})=>{r.uniforms.uTime.value=e.elapsedTime}),(0,I.jsx)(`lineSegments`,{ref:t,geometry:n,material:r,frustumCulled:!1,renderOrder:4})}function K({id:e,accent:t,mirrored:n}){let{scene:r}=g(b(e)),i=(0,F.useMemo)(()=>S(r,e,.016),[r,e]),a=(0,F.useMemo)(()=>n?S(r,e,.016):null,[r,e,n]),o=L[e]??0;return(0,F.useEffect)(()=>{i.skin.uniforms.uRimColor.value.set(t),i.skin.uniforms.uRimAmount.value=.85,a&&a.skin.uniforms.uRimColor.value.set(t)},[i,a,t]),h(({clock:e})=>{let t=e.elapsedTime,n=O.reveal,r=o+Math.sin(t*2.2)*.06*(o>0)+O.leap*1.5,s=O.yaw+O.spin*Math.PI*2,c=1+Math.sin(t*1.7)*.007;i.root.position.y=r,i.root.rotation.y=s,i.root.scale.set(1,1*c,1);let l=i.skin.uniforms;l.uTime.value=t,l.uRimAmount.value=.65+(1-M(.4,1,n))*1.4+O.burst*1.2,a&&(a.root.position.y=-r,a.root.rotation.y=s,a.root.scale.set(1,-1*c,1),a.skin.uniforms.uFade.value=M(.7,1,n)*.9,a.skin.uniforms.uTime.value=t,a.outline.uniforms.uFade.value=0)}),(0,I.jsxs)(I.Fragment,{children:[(0,I.jsx)(`primitive`,{object:i.root}),a&&(0,I.jsx)(`primitive`,{object:a.root})]})}var q=new l,J=new l;function Y({id:e,config:t}){let n=C[e]??2;return h(({camera:r,clock:i,size:a,pointer:o},s)=>{if(!O.inWorld)return;let c=r,l=Math.min(s,.1),u=i.elapsedTime,d=D.getState().explore,f=a.width/a.height,p=f>1.1,m=Math.min(1,Math.max(.62,f/1.25));O.dragging||(O.yaw+=O.yawV*l,O.yawV*=Math.exp(-l*3)),O.zoom+=(O.zoomTarget-O.zoom)*(1-Math.exp(-l*8));let h=j(O.reveal),g=t.camera.radius/m*O.zoom*(d?1.8:1),_=A(g*.42,g,h),v=(1-h)*1.15+Math.sin(u*.12)*.05+o.x*.05+(d?O.yaw:0),y=t.camera.pitch+(d?.1:0)+o.y*-.02;if(q.set(0,n*(d?.9:.54)+(L[e]??0)*.8,0),J.set(Math.sin(v)*_,q.y+Math.sin(y)*_+A(-.5,0,h),Math.cos(v)*_),!d){let e=p?_*.09:0,t=Math.cos(v),n=-Math.sin(v);J.x+=t*e,J.z+=n*e,q.x+=t*e,q.z+=n*e,p||(q.y-=_*.13,J.y=Math.max(.9,J.y-_*.02))}let b=O.shake*.09+O.burst*.05;J.x+=Math.sin(u*83)*b,J.y+=Math.cos(u*71)*b,c.position.copy(J),c.lookAt(q)},-.5),null}function X({id:e}){let t=N[e],n=r.find(t=>t.id===e)?.accent??`#ffffff`,i=D(e=>e.tier),a=D(e=>e.explore),o=E[i],s=p(e=>e.viewport.dpr),c=p(e=>e.gl),l=p(e=>e.camera),u=(0,F.useRef)(null),d=i===`high`?1:i===`medium`?.8:.5,f=i===`low`?96:160,m=t.gloss>.3;return(0,F.useEffect)(()=>{u.current&&c.compileAsync(u.current,l).catch(()=>void 0)},[c,l,e]),h(()=>{if(u.current&&(u.current.visible=O.inWorld),!O.inWorld)return;let e=o.post===`none`?0:1;O.heat=t.post.heat*e,O.blur=t.post.blur*e,O.glitch=t.post.glitch*e,O.wobble=t.post.wobble*e}),(0,I.jsxs)(`group`,{ref:u,visible:!1,children:[(0,I.jsx)(B,{config:t}),(0,I.jsx)(V,{config:t,accent:n,segments:f}),t.props.map((n,r)=>(0,I.jsx)(U,{set:n,config:t,seed:e.length*97+r*13,density:d},r)),m&&(0,I.jsx)(`group`,{scale:[1,-1,1],children:t.props.map((n,r)=>(0,I.jsx)(U,{set:n,config:t,seed:e.length*97+r*13,density:d},r))}),(0,I.jsx)(W,{set:t.particles,density:d,dpr:s}),t.streaks&&(0,I.jsx)(G,{accent:n}),!a&&(0,I.jsx)(F.Suspense,{fallback:null,children:(0,I.jsx)(K,{id:e,accent:n,mirrored:m})}),(0,I.jsx)(Y,{id:e,config:t})]})}export{X as default};