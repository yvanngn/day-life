/* ---------- musique (synthétisée) ---------- */
const NOTE={C:0,D:2,E:4,F:5,G:7,A:9,B:11};
function midi(n){const m=n.match(/^([A-G])([#b]?)(-?\d)$/);return 12*(+m[3]+1)+NOTE[m[1]]+(m[2]==='#'?1:m[2]==='b'?-1:0)}
function seq(str,start=0){const out=[];let st=start;str.trim().split(/\s+/).forEach(tok=>{if(tok==='|')return;const [n,d]=tok.split(':');const du=+(d||1);if(n!=='-')out.push([st,midi(n),du]);st+=du});return out}
function mf(m){return 440*Math.pow(2,(m-69)/12)}
function inst(kind,m,t0,d,out){const x=AC;const g=x.createGain();g.connect(out);const f=mf(m);
  const osc=(type,fr,v)=>{const o=x.createOscillator();o.type=type;o.frequency.value=fr;const gg=x.createGain();gg.gain.value=v;o.connect(gg).connect(g);o.start(t0);o.stop(t0+d+1.2)};
  if(kind==='box'){osc('sine',f,1);osc('sine',f*2,.35);osc('sine',f*4,.08);g.gain.setValueAtTime(.0001,t0);g.gain.exponentialRampToValueAtTime(.5,t0+.01);g.gain.exponentialRampToValueAtTime(.0001,t0+d+1)}
  else if(kind==='ep'){osc('sine',f,1);osc('triangle',f*2,.12);g.gain.setValueAtTime(.0001,t0);g.gain.exponentialRampToValueAtTime(.35,t0+.02);g.gain.exponentialRampToValueAtTime(.0001,t0+d+.4)}
  else if(kind==='flute'){osc('triangle',f,1);g.gain.setValueAtTime(.0001,t0);g.gain.exponentialRampToValueAtTime(.3,t0+.08);g.gain.setValueAtTime(.3,t0+d*.8);g.gain.exponentialRampToValueAtTime(.0001,t0+d+.15)}
  else if(kind==='bass'){osc('triangle',f,1);osc('sine',f*2,.2);g.gain.setValueAtTime(.0001,t0);g.gain.exponentialRampToValueAtTime(.55,t0+.01);g.gain.exponentialRampToValueAtTime(.0001,t0+d+.1)}
  else if(kind==='horn'){const lp=x.createBiquadFilter();lp.type='lowpass';lp.frequency.value=1400;lp.connect(out);g.disconnect();g.connect(lp);osc('sawtooth',f,1);g.gain.setValueAtTime(.0001,t0);g.gain.exponentialRampToValueAtTime(.18,t0+.05);g.gain.setValueAtTime(.18,t0+d*.7);g.gain.exponentialRampToValueAtTime(.0001,t0+d+.1)}
  else if(kind==='harp'){const lp=x.createBiquadFilter();lp.type='lowpass';lp.frequency.value=2600;lp.connect(out);g.disconnect();g.connect(lp);osc('sawtooth',f,.6);osc('square',f*2,.15);g.gain.setValueAtTime(.0001,t0);g.gain.exponentialRampToValueAtTime(.3,t0+.005);g.gain.exponentialRampToValueAtTime(.0001,t0+Math.min(d,.5)+.25)}
  else if(kind==='brush'){const s=x.createBufferSource();s.buffer=noiseBuf(x,.2);const hp=x.createBiquadFilter();hp.type='highpass';hp.frequency.value=5000;s.connect(hp).connect(g);g.gain.setValueAtTime(.25,t0);g.gain.exponentialRampToValueAtTime(.0001,t0+.15);s.start(t0);s.stop(t0+.2)}}
function chordVoice(chords,len,pattern,kind,oct=0){const n=[];chords.forEach((c,ci)=>pattern.forEach(([st,idx,du])=>n.push([ci*len+st,c[idx%c.length]+oct,du])));return{kind,notes:n}}
const TRACKS={
 lullaby:{spb:.32,len:48,vol:.5,voices:[
  {kind:'box',notes:seq("E5:1 E5:1 G5:4 E5:1 E5:1 G5:4 E5:1 G5:1 C6:2 B5:3 A5:1 A5:2 G5:2 D5:1 E5:1 F5:2 D5:2 D5:1 E5:1 F5:4 D5:1 F5:1 B5:1 A5:1 G5:2 B5:2 C6:6")},
  {kind:'box',notes:seq("C4:6 G3:6 C4:6 F3:6 G3:6 G3:6 G3:6 C4:6").map(([a,b,c])=>[a,b,c])}]},
 elevator:{spb:.24,len:64,vol:.45,voices:[
  chordVoice([[60,64,67,71],[57,60,64,67],[62,65,69,72],[55,59,62,65],[60,64,67,71],[57,60,64,67],[62,65,69,72],[55,59,62,65]],8,[[0,0,2],[2,1,1],[3,2,2],[5,3,1],[6,1,2]],'ep'),
  {kind:'bass',notes:seq("C3:3 G2:5 A2:3 E2:5 D3:3 A2:5 G2:3 D3:5 C3:3 G2:5 A2:3 E2:5 D3:3 A2:5 G2:3 B2:5")},
  {kind:'flute',notes:seq("E5:4 D5:2 C5:2 C5:4 B4:2 A4:2 A4:3 F5:1 E5:2 D5:2 D5:6 -:2 G5:4 E5:2 C5:2 E5:4 C5:2 A4:2 F5:3 E5:1 D5:2 C5:2 B4:6 -:2")}]},
 jazz:{spb:.2,swing:.06,len:64,vol:.5,voices:[
  {kind:'bass',notes:seq("G2:2 A2:2 Bb2:2 B2:2 C3:2 E3:2 G3:2 Bb2:2 F2:2 A2:2 C3:2 E3:2 D3:2 F#3:2 A3:2 F#3:2 G2:2 Bb2:2 D3:2 Bb2:2 C3:2 G2:2 E2:2 C3:2 F2:2 C3:2 A2:2 F2:2 D3:2 C3:2 A2:2 F#2:2")},
  chordVoice([[58,62,65],[58,64,67],[57,60,64],[54,57,60],[58,62,65],[58,64,67],[57,60,64],[54,57,60]],8,[[3,0,1],[3,1,1],[3,2,1],[7,0,1],[7,1,1],[7,2,1]],'ep'),
  {kind:'brush',notes:Array.from({length:16},(_,i)=>[i*4+2,60,1])},
  {kind:'horn',notes:seq("D5:3 C5:1 Bb4:2 G4:2 E5:3 D5:1 C5:2 Bb4:2 A4:4 C5:2 F5:2 F#5:3 E5:1 D5:4 -:8 -:8 Bb4:2 D5:2 F5:3 E5:1 -:4 C5:2 A4:2 G4:8")}]},
 classic:{spb:.26,len:48,vol:.5,voices:[
  {kind:'harp',notes:seq("D5:2 G4:1 A4:1 B4:1 C5:1 D5:2 G4:2 G4:2 E5:2 C5:1 D5:1 E5:1 F#5:1 G5:2 G4:2 G4:2 C5:2 D5:1 C5:1 B4:1 A4:1 B4:2 C5:1 B4:1 A4:1 G4:1 F#4:2 G4:1 A4:1 B4:1 G4:1 A4:6")},
  {kind:'harp',notes:seq("G3:6 B3:6 C4:6 B3:6 A3:6 G3:6 D4:2 B3:2 G3:2 D3:6")}]}
};
const ROOMMUS={chambre:'elevator',couloir:'elevator',bain:'jazz',salon:'classic'};
let MUS={name:null,out:null,timer:null,next:0,loop:0};
function playMusic(name){if(MUS.name===name&&MUS.out)return;stopMusic();if(muted||!name)return;const x=ac();if(!x)return;const tr=TRACKS[name];
  const out=x.createGain();out.gain.value=0;out.gain.linearRampToValueAtTime(.16*tr.vol,x.currentTime+1);out.connect(x.destination);
  MUS={name,out,next:x.currentTime+.15,timer:null};const dur=tr.len*tr.spb;
  const sched=()=>{if(MUS.out!==out)return;while(MUS.next<x.currentTime+.6){const base=MUS.next;
     tr.voices.forEach(v=>v.notes.forEach(([st,m,du])=>{let tt=base+st*tr.spb;if(tr.swing&&st%2===1)tt+=tr.swing;inst(v.kind,m,tt,du*tr.spb,out)}));MUS.next+=dur}};
  sched();MUS.timer=setInterval(sched,200)}
function stopMusic(){if(MUS.timer)clearInterval(MUS.timer);if(MUS.out&&AC){const o=MUS.out;o.gain.cancelScheduledValues(AC.currentTime);o.gain.setTargetAtTime(0,AC.currentTime,.25);setTimeout(()=>o.disconnect(),1500)}MUS={name:null,out:null,timer:null}}
function roomMusic(){if(mode==='play')playMusic(ROOMMUS[S.room])}

function loop(){update();render();requestAnimationFrame(loop)}

