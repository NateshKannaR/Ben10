import{a as e,c as t,i as n,r}from"./vanilla-D1FEyU8v.js";import{A as i,Et as a,F as o,Lt as s,Z as c,b as l,h as u,i as d,j as f,n as p,pt as m,r as h,t as g,ut as _,wt as v}from"./alienModel-CNgpwgoe.js";import{m as y}from"./index-odouEJXM.js";import{a as b,o as x}from"./field-BDidAj3K.js";import{t as S}from"./worlds-Bbf7qwtg.js";import{n as C,t as w}from"./modeState-_r1WIydb.js";var T=t(e(),1),E=n(),D=new o,O=new s,k=new s;function A(e){u(({camera:t,size:n,clock:r,pointer:i})=>{let a=t;e(O,k,n.width/n.height,r.elapsedTime),O.x+=i.x*.12,O.y+=i.y*.06,a.position.copy(O),a.lookAt(k)},-.5)}function j({accent:e}){let t=(0,T.useMemo)(()=>new v({vertexShader:`
          varying vec3 vDir;
          void main() {
            vDir = position;
            vec4 p = projectionMatrix * mat4(mat3(viewMatrix)) * vec4(position, 1.0);
            gl_Position = p.xyww;
          }
        `,fragmentShader:`
          uniform vec3 uTint;
          uniform vec3 uDeep;
          varying vec3 vDir;
          void main() {
            vec3 d = normalize(vDir);
            float glow = pow(max(0.0, 1.0 - abs(d.y) * 1.3), 3.0);
            vec3 c = uDeep * 0.45 + uTint * glow * 0.1;
            gl_FragColor = vec4(c, 1.0);
            #include <tonemapping_fragment>
            #include <colorspace_fragment>
          }
        `,uniforms:{uTint:{value:new o(y.omni)},uDeep:{value:new o(y.abyss)}},side:1,depthWrite:!1}),[]);return u((n,r)=>{t.uniforms.uTint.value.lerp(D.set(e()),1-Math.exp(-Math.min(r,.1)*6))}),(0,E.jsx)(`mesh`,{material:t,frustumCulled:!1,renderOrder:-10,children:(0,E.jsx)(`sphereGeometry`,{args:[1,24,16]})})}function M({x:e=0,accent:t}){let n=(0,T.useMemo)(()=>new v({vertexShader:`
          varying vec2 vP;
          void main() {
            vP = position.xy;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,fragmentShader:`
          uniform vec3 uTint;
          uniform float uTime;
          varying vec2 vP;
          void main() {
            float r = length(vP);
            float rings = pow(0.5 + 0.5 * sin(r * 18.0 - uTime * 1.4), 10.0);
            float edge = exp(-((r - 1.25) * 11.0) * ((r - 1.25) * 11.0)) * 1.6;
            float fade = smoothstep(4.2, 0.6, r);
            gl_FragColor = vec4(uTint * (rings * 0.24 + edge) * fade, 1.0);
            #include <tonemapping_fragment>
            #include <colorspace_fragment>
          }
        `,uniforms:{uTint:{value:new o(y.omni)},uTime:{value:0}},transparent:!0,blending:2,depthWrite:!1}),[]);return u(({clock:e},r)=>{n.uniforms.uTime.value=e.elapsedTime,n.uniforms.uTint.value.lerp(D.set(t()),1-Math.exp(-Math.min(r,.1)*6))}),(0,E.jsx)(`mesh`,{rotation:[-Math.PI/2,0,0],position:[e,0,0],material:n,children:(0,E.jsx)(`circleGeometry`,{args:[4.4,64]})})}function N({id:e,x:t=0,facing:n=0,spin:r=0,solid:i,cut:a,accent:o}){let{scene:s}=d(p(e)),c=(0,T.useMemo)(()=>h(s,e,.014),[s,e]),l=(0,T.useRef)(0);return(0,T.useEffect)(()=>{c.skin.uniforms.uRimColor.value.set(o),c.skin.uniforms.uRimAmount.value=.7,c.skin.uniforms.uCutTop.value=(g[e]??2)+.2},[c,o,e]),u(({clock:e},o)=>{let s=e.elapsedTime;l.current=Math.min(1,l.current+Math.min(o,.1)*2.4);let u=x(0,1,l.current);c.root.position.x=t,c.root.rotation.y=n+s*r+(1-u)*.9;let d=c.skin.uniforms;d.uTime.value=s,d.uSolid.value=i?i():u,d.uCut.value=a?a():u,d.uFade.value=1,c.outline.uniforms.uFade.value=(i?i():1)*x(.7,1,u)}),(0,E.jsx)(`primitive`,{object:c.root})}function P(){let e=C(e=>e.pick),t=r[e],n=()=>r[C.getState().pick].accent;return A((e,t,n)=>{let i=n>1.1,a=g[r[C.getState().pick].id]??2;t.set(i?-.35:0,a*.52+(i?0:-1.05),0),e.set(t.x,t.y+.3,i?6.4:9)}),(0,E.jsxs)(E.Fragment,{children:[(0,E.jsx)(j,{accent:n}),(0,E.jsx)(M,{accent:n}),(0,E.jsx)(T.Suspense,{fallback:null,children:(0,E.jsx)(N,{id:t.id,spin:.35,accent:t.accent},t.id)})]})}function F(){let e=r[C(e=>e.left)],t=r[C(e=>e.right)],n=()=>r[C.getState().left].accent,i=()=>r[C.getState().right].accent,a=l(e=>e.size.width/e.size.height>1.1)?3.5:1.55;return A((e,t,n)=>{t.set(0,n>1.1?1.25:.1,0),e.set(0,t.y+.5,n>1.1?8.8:13)}),(0,E.jsxs)(E.Fragment,{children:[(0,E.jsx)(j,{accent:n}),(0,E.jsx)(M,{x:-a,accent:n}),(0,E.jsx)(M,{x:a,accent:i}),(0,E.jsx)(T.Suspense,{fallback:null,children:(0,E.jsx)(N,{id:e.id,x:-a,facing:.6,accent:e.accent},`l-${e.id}`)}),(0,E.jsx)(T.Suspense,{fallback:null,children:(0,E.jsx)(N,{id:t.id,x:a,facing:-.6,accent:t.accent},`r-${t.id}`)})]})}var I=44;function L({accent:e}){let t=(0,T.useRef)(null),{strands:n,rungs:r,material:i}=(0,T.useMemo)(()=>{let e=new _({color:y.omni}),t=new c(new a(.055,10,8),e,88),n=new c(new a(.018,6,4),e,308),r=new m;for(let e=0;e<I;e++){let i=e/43,a=i*3.3,o=i*Math.PI*5,s=1.22;for(let n=0;n<2;n++){let i=o+n*Math.PI;r.position.set(Math.cos(i)*s,a,Math.sin(i)*s),r.updateMatrix(),t.setMatrixAt(e*2+n,r.matrix)}for(let t=0;t<7;t++){let i=(t+1)/8*2-1;r.position.set(Math.cos(o)*s*i,a,Math.sin(o)*s*i),r.updateMatrix(),n.setMatrixAt(e*7+t,r.matrix)}}return t.frustumCulled=!1,n.frustumCulled=!1,{strands:t,rungs:n,material:e}},[]);return u(({clock:n},r)=>{t.current&&(t.current.rotation.y=n.elapsedTime*(.3+w.progress*2.6));let a=D.set(y.omni).lerp(new o(e()),w.progress);i.color.lerp(a,1-Math.exp(-Math.min(r,.1)*8))}),(0,E.jsxs)(`group`,{ref:t,children:[(0,E.jsx)(`primitive`,{object:n}),(0,E.jsx)(`primitive`,{object:r})]})}function R(){let e=C(e=>e.sample),t=r[e],n=()=>r[C.getState().sample].accent;return A((e,t,n)=>{let r=n>1.1;t.set(0,r?1.3:.45,0),e.set(0,t.y+.55,r?7.2:10.5)}),(0,E.jsxs)(E.Fragment,{children:[(0,E.jsx)(j,{accent:n}),(0,E.jsx)(M,{accent:n}),(0,E.jsx)(L,{accent:n}),(0,E.jsx)(T.Suspense,{fallback:null,children:(0,E.jsx)(N,{id:t.id,spin:.5,accent:t.accent,cut:()=>Math.max(.001,w.progress),solid:()=>x(.82,1,w.progress)},t.id)})]})}var z=`
  uniform vec3 uTone;
  uniform vec3 uDark;
  uniform float uSeed;
  uniform float uTime;
  varying vec3 vN;
  varying vec3 vP;
  ${S}
  void main() {
    vec3 n = normalize(vN);
    vec2 q = vec2(atan(vP.z, vP.x) * 1.6 + uTime * 0.04, vP.y * 2.4);
    float bands = fbm(q * 1.6 + uSeed * 7.0);
    float cracks = 1.0 - smoothstep(0.0, 0.06, voro(q * 2.2 + uSeed).y);
    vec3 surface = mix(uDark, uTone, smoothstep(0.32, 0.68, bands));
    surface += uTone * cracks * 0.5;
    float light = dot(n, normalize(vec3(-0.5, 0.45, 0.72)));
    float cel = light > 0.12 ? 1.0 : 0.3;
    float rim = pow(clamp(1.0 - n.z, 0.0, 1.0), 3.0);
    gl_FragColor = vec4(surface * cel + uTone * rim * 0.9, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;function B({index:e,orbit:t}){let n=r[e],i=(0,T.useRef)(null),a=(0,T.useMemo)(()=>new v({vertexShader:`
          varying vec3 vN;
          varying vec3 vP;
          void main() {
            vP = position;
            vN = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,fragmentShader:z,uniforms:{uTone:{value:new o(n.accent)},uDark:{value:new o(n.accent).multiplyScalar(.16)},uSeed:{value:e*1.7+.4},uTime:{value:0}}}),[n.accent,e]);return u(({clock:n})=>{let o=i.current;if(!o)return;let s=(e-t.current)/r.length*Math.PI*2,c=(Math.cos(s)+1)/2;o.position.set(Math.sin(s)*7.6,-.5+(1-c)*1.15,Math.cos(s)*5.4-5.4),o.scale.setScalar(.6+c**12*1.15),o.rotation.y=n.elapsedTime*.1+e,a.uniforms.uTime.value=n.elapsedTime}),(0,E.jsxs)(`mesh`,{ref:i,material:a,onClick:t=>{t.stopPropagation(),C.getState().setPlanet(e)},onPointerOver:()=>void(document.body.style.cursor=`pointer`),onPointerOut:()=>void(document.body.style.cursor=``),children:[(0,E.jsx)(`sphereGeometry`,{args:[1,40,28]}),(0,E.jsxs)(`mesh`,{scale:1.035,children:[(0,E.jsx)(`sphereGeometry`,{args:[1,28,20]}),(0,E.jsx)(`meshBasicMaterial`,{color:`#000000`,side:1})]})]})}function V(){let e=(0,T.useRef)(null),t=(0,T.useMemo)(()=>{let e=b(7),t=new Float32Array(2700);for(let n=0;n<900;n++){let r=e()*Math.PI*2,i=Math.acos(e()*2-1),a=40+e()*40;t.set([Math.sin(i)*Math.cos(r)*a,Math.cos(i)*a,Math.sin(i)*Math.sin(r)*a],n*3)}let n=new f;return n.setAttribute(`position`,new i(t,3)),n},[]);return(0,E.jsx)(`points`,{ref:e,geometry:t,frustumCulled:!1,children:(0,E.jsx)(`pointsMaterial`,{color:`#cfeee0`,size:.16,sizeAttenuation:!0,transparent:!0,opacity:.8,depthWrite:!1})})}function H(){let e=(0,T.useRef)(C.getState().planet);return A((e,t,n)=>{let r=n>1.1;e.set(r?2.1:0,r?.2:-1.3,r?7.6:12),t.set(r?2.1:0,r?-.2:-1.4,0)}),u((t,n)=>{let i=C.getState().planet,a=r.length,o=(i-e.current)%a;o>a/2&&(o-=a),o<-a/2&&(o+=a),e.current+=o*(1-Math.exp(-Math.min(n,.1)*5))}),(0,T.useEffect)(()=>{let e=null,t=0,n=n=>{n.target.closest(`button`)||(e=n.clientX,t=0)},i=n=>{if(e!==null&&(t+=n.clientX-e,e=n.clientX,Math.abs(t)>90)){let e=C.getState(),n=t>0?-1:1;e.setPlanet((e.planet+n+r.length)%r.length),t=0}},a=()=>void(e=null);return window.addEventListener(`pointerdown`,n),window.addEventListener(`pointermove`,i),window.addEventListener(`pointerup`,a),window.addEventListener(`pointercancel`,a),()=>{window.removeEventListener(`pointerdown`,n),window.removeEventListener(`pointermove`,i),window.removeEventListener(`pointerup`,a),window.removeEventListener(`pointercancel`,a)}},[]),(0,E.jsxs)(E.Fragment,{children:[(0,E.jsx)(j,{accent:()=>r[C.getState().planet].accent}),(0,E.jsx)(V,{}),r.map((t,n)=>(0,E.jsx)(B,{index:n,orbit:e},t.id))]})}function U({mode:e}){return e===`archive`?(0,E.jsx)(P,{}):e===`compare`?(0,E.jsx)(F,{}):e===`scanner`?(0,E.jsx)(R,{}):e===`planets`?(0,E.jsx)(H,{}):null}export{U as default};