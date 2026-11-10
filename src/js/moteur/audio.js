/* ---------- sons (synthétisés) ---------- */
let AC=null,muted=false;try{muted=localStorage.getItem('magali_mute')==='1'}catch(e){}
function ac(){if(!AC){try{AC=new (window.AudioContext||window.webkitAudioContext)()}catch(e){return null}}if(AC.state==='suspended')AC.resume();return AC}
const NBUF={};
function noiseBuf(a,d){const k=Math.round(d*100);if(NBUF[k])return NBUF[k];return NBUF[k]=mkNoise(a,d)}
function mkNoise(a,d){const b=a.createBuffer(1,Math.max(1,a.sampleRate*d|0),a.sampleRate),c=b.getChannelData(0);for(let i=0;i<c.length;i++)c[i]=Math.random()*2-1;return b}
function noise(d,{type='lowpass',f=1000,q=1,vol=.3,at=0,a=.01,f2}={}){const x=ac();if(!x||muted)return;const t0=x.currentTime+at;const s=x.createBufferSource();s.buffer=noiseBuf(x,d);const fl=x.createBiquadFilter();fl.type=type;fl.frequency.setValueAtTime(f,t0);if(f2)fl.frequency.exponentialRampToValueAtTime(f2,t0+d);fl.Q.value=q;const g=x.createGain();g.gain.setValueAtTime(0.0001,t0);g.gain.exponentialRampToValueAtTime(vol,t0+a);g.gain.exponentialRampToValueAtTime(0.0001,t0+d);s.connect(fl).connect(g).connect(x.destination);s.start(t0);s.stop(t0+d+.05)}
function tone(f,d,{type='square',vol=.12,at=0,f2,a=.01}={}){const x=ac();if(!x||muted)return;const t0=x.currentTime+at;const o=x.createOscillator();o.type=type;o.frequency.setValueAtTime(f,t0);if(f2)o.frequency.exponentialRampToValueAtTime(f2,t0+d);const g=x.createGain();g.gain.setValueAtTime(0.0001,t0);g.gain.exponentialRampToValueAtTime(vol,t0+a);g.gain.exponentialRampToValueAtTime(0.0001,t0+d);o.connect(g).connect(x.destination);o.start(t0);o.stop(t0+d+.05)}
function meow(angry){const x=ac();if(!x||muted)return;const t0=x.currentTime,d=angry?1.0:.55;const o=x.createOscillator();o.type='sawtooth';o.frequency.setValueAtTime(angry?520:420,t0);o.frequency.linearRampToValueAtTime(angry?900:720,t0+d*.35);o.frequency.linearRampToValueAtTime(angry?380:360,t0+d);
  const fl=x.createBiquadFilter();fl.type='bandpass';fl.Q.value=4;fl.frequency.setValueAtTime(800,t0);fl.frequency.linearRampToValueAtTime(1800,t0+d*.35);fl.frequency.linearRampToValueAtTime(700,t0+d);
  const g=x.createGain();g.gain.setValueAtTime(0.0001,t0);g.gain.exponentialRampToValueAtTime(angry?.6:.35,t0+.05);g.gain.exponentialRampToValueAtTime(0.0001,t0+d);o.connect(fl).connect(g).connect(x.destination);o.start(t0);o.stop(t0+d+.05)}
let waterSrc=null;
function water(on){const x=ac();if(!x)return;if(on){if(muted||waterSrc)return;const s=x.createBufferSource();s.buffer=noiseBuf(x,2);s.loop=true;const fl=x.createBiquadFilter();fl.type='bandpass';fl.frequency.value=900;fl.Q.value=.6;const g=x.createGain();g.gain.value=.15;s.connect(fl).connect(g).connect(x.destination);s.start();waterSrc={s,g}}
  else if(waterSrc){const w=waterSrc;waterSrc=null;w.g.gain.setTargetAtTime(0.0001,x.currentTime,.3);w.s.stop(x.currentTime+1.5)}}
const SFX={
 blow:()=>noise(.6,{f:1200,f2:200,vol:.35,a:.05}),
 light:()=>{noise(.15,{type:'highpass',f:2500,vol:.3});noise(.5,{f:400,f2:900,vol:.2,at:.1,a:.1})},
 page:()=>{for(let i=0;i<3;i++)noise(.12,{type:'bandpass',f:3000,q:.8,vol:.25,at:i*.13,f2:5000})},
 pick:()=>{tone(660,.08,{vol:.08});tone(990,.12,{vol:.08,at:.07})},
 door:()=>{noise(.25,{f:300,vol:.3});tone(110,.15,{type:'triangle',vol:.2,at:.2})},
 splash:()=>{noise(.7,{f:2000,f2:300,vol:.45});noise(.4,{type:'bandpass',f:800,vol:.3,at:.25})},
 scratch:()=>{for(let i=0;i<3;i++)noise(.12,{type:'highpass',f:3000,f2:8000,vol:.45,at:.3+i*.15})},
 meow:()=>meow(false),angry:()=>meow(true),
 purr:()=>{for(let i=0;i<10;i++)noise(.08,{f:180,vol:.3,at:i*.1})},
 nibble:()=>noise(.03,{type:'highpass',f:4000,vol:.12}),
 tvOn:()=>{noise(.4,{type:'highpass',f:1500,vol:.25});[523,659,784,1046].forEach((f,i)=>tone(f,.15,{vol:.07,at:.4+i*.14}))},
 tvOff:()=>tone(1200,.1,{type:'sine',f2:80,vol:.15}),
 tv:()=>{for(let i=0;i<5;i++)tone(180+Math.random()*120,.09,{type:'sawtooth',vol:.04,at:i*.11})},
 coffee:()=>{noise(1.2,{type:'bandpass',f:600,q:2,vol:.3,a:.05});for(let i=0;i<8;i++)tone(300+Math.random()*300,.06,{type:'sine',vol:.15,at:1.3+i*.12,f2:600})},
 jump:()=>tone(300,.2,{type:'square',f2:900,vol:.08}),
 scrub:()=>{for(let i=0;i<6;i++)noise(.16,{type:'bandpass',f:1200+(i%2)*800,q:1.5,vol:.3,at:i*.2})},
 squeak:()=>{tone(2200,.06,{type:'sine',vol:.1});tone(2600,.06,{type:'sine',vol:.1,at:.08})}
};
document.addEventListener('pointerdown',()=>ac());
function updSnd(){document.getElementById('sndBtn').textContent='Son : '+(muted?'OFF':'ON')}
document.getElementById('sndBtn').onclick=()=>{muted=!muted;if(muted){water(false);stopMusic()}else if(mode==='intro'||mode==='end')playMusic('lullaby');else roomMusic();try{localStorage.setItem('magali_mute',muted?'1':'0')}catch(e){}updSnd()};updSnd();

