/* ---------- boucle ---------- */
function update(){t++;
  if(P.walk){const dx=P.tx-P.x,dy=P.ty-P.y,d=Math.hypot(dx,dy);if(d<1.2){P.x=P.tx;P.y=P.ty;P.walk=false;if(P.res){const f=P.res;P.res=null;f()}}else{P.x+=dx/d*2.4;P.y+=dy/d*1.7;if(Math.abs(dx)>0.5)P.face=dx>0?1:-1}}
  if(mode==='play'&&S.room==='couloir'&&!S.f.cat&&!cat.freeze){
   if(cat.mode==='walk'||cat.mode==='chase'){const sp=cat.mode==='chase'?3:0.4;const dx=cat.tx-cat.x;
     if(Math.abs(dx)<2){if(cat.mode==='chase')cat.tx=60+Math.random()*170;else{const r0=Math.random();if(r0<.45){cat.mode='lick';cat.timer=160+Math.random()*200}else if(r0<.6){cat.mode='sit';cat.timer=100}else cat.tx=60+Math.random()*170}}
     else{cat.x+=Math.sign(dx)*sp;cat.face=Math.sign(dx)}
     if(cat.mode==='chase'){laserDot=[cat.x+cat.face*16,cat.y-1];if(--cat.chase<=0){cat.mode='walk';laserDot=null}}}
   else if(--cat.timer<=0){cat.mode='walk';cat.tx=60+Math.random()*170}}
  if(mode==='play'&&S.room==='salon'&&!S.f.mouseGone&&t%20===0&&Math.random()<.6)SFX.nibble();
  if(speech)placeSpeech();
}
function render(){
  r(0,0,W,H,'#000');
  if(mode==='menu'){drawMag(160,130,3);return}
  if(mode==='intro'||mode==='end')return;
  ROOMS[S.room].draw();
  const showCat=S.room==='couloir'&&!S.f.cat;
  const step=P.walk?1+((t>>3)%2):0;
  const drawP=()=>{if(!bathing){ombre(P.x,P.y,13);drawMag(P.x,P.y,2,step,P.walk?P.face:0)}
    if(juggle)drawJongle(t);if(cafeAnim)drawCafe(t)};
  if(showCat)ombre(cat.x,cat.y,11);
  if(showCat&&cat.y<P.y){drawCat();drawP()}else{drawP();if(showCat)drawCat()}
  if(laserDot){r(laserDot[0],laserDot[1],2,2,'#ff1010');glow(laserDot[0]+1,laserDot[1]+1,5,'rgba(255,0,0,.5)')}
  if(S.room==='chambre'&&S.f.dark){ctx.fillStyle='rgba(4,2,10,0.93)';ctx.fillRect(0,0,W,H);
    const fl=(t>>4)%2;glow(116,54,7+fl,'rgba(255,90,20,0.55)');r(116,53,1,2,fl?'#ff6020':'#ff9a40');r(116,52,1,1,'#ffd080')}
  if(HD&&!(S.room==='chambre'&&S.f.dark))ambiance();
}
/* Upgrade graphique : ombres portées, lumière chaude et vignettage (esprit Low Kanta) */
function ombre(x,y,w){if(!HD)return;ctx.fillStyle='rgba(0,0,0,.28)';ctx.beginPath();ctx.ellipse(x|0,(y|0)+1,w,3,0,0,7);ctx.fill()}
let _amb=null;
function ambiance(){if(!_amb){const c=document.createElement('canvas');c.width=W;c.height=H;const g=c.getContext('2d');
  let l=g.createLinearGradient(0,0,0,H);l.addColorStop(0,'rgba(255,200,120,.10)');l.addColorStop(.6,'rgba(255,170,90,0)');l.addColorStop(1,'rgba(40,10,30,.22)');g.fillStyle=l;g.fillRect(0,0,W,H);
  const v=g.createRadialGradient(W/2,H/2,H*.45,W/2,H/2,W*.62);v.addColorStop(0,'rgba(0,0,0,0)');v.addColorStop(1,'rgba(10,4,0,.55)');g.fillStyle=v;g.fillRect(0,0,W,H);
  _amb=c}
  ctx.drawImage(_amb,0,0)}

/* Jonglage : cascade à trois clémentines, mains qui montent et descendent */
const PEAU='#f0c49c';
function clem(x,y,rot){const R=HD?rh:r;R(x-2,y-1.5,4,3,'#e8650c');R(x-1.5,y-2,3,4,'#e8650c');R(x-1.5,y-1.5,3,3,'#ff8a1a');if(HD){rh(x-1,y-1.5,1,1,'#ffc070');rh(x+.5,y+1,1.5,.5,'#b84a06')}R(x-.5+rot,y-2.5,1,1,'#3c9a3c')}
function drawJongle(t){const T=54,hy=P.y-31,xs=[P.x-9,P.x+9];
  for(let k=0;k<2;k++){const b=Math.sin((t/T*2+k)*Math.PI)*2;r(xs[k]-1,hy-3+b,3,5,PEAU);r(xs[k]-1.5,hy+b-4,4,2,PEAU)}
  for(let i=0;i<3;i++){const ph=((t/T)+i/3)%1,half=ph<.5,q=(half?ph:ph-.5)*2,a=half?0:1,x=xs[a]+(xs[1-a]-xs[a])*q,y=hy-4-Math.sin(q*Math.PI)*(half?48:40);clem(x,y,(i+(t>>3))%2?.5:-.5)}}
/* Café : tasse en main, portée aux lèvres, vapeur */
function drawCafe(t){const e=(performance.now()-cafeAnim.t0)/1000,f=P.face||-1;let lev=0;
  if(e>0.5&&e<3.9){const s=((e-0.5)%1.15)/1.15;lev=s<.25?s*4:s<.65?1:Math.max(0,1-(s-.65)*2.9)}
  const cx=P.x+f*7-2,cy=P.y-30-lev*14,R=HD?rh:r;
  R(cx+(f>0?-1:3),cy+2,2,3,PEAU);R(cx,cy,5,5,'#f4f1ea');R(cx,cy,5,1,'#5a3418');R(cx+(f>0?5:-1.5),cy+1,1.5,2.5,'#f4f1ea');if(HD){rh(cx+.5,cy+1,1,3.5,'#fff');rh(cx+3.5,cy+1,1.5,4,'#d8d2c6')}
  if(lev<.5)for(let k=0;k<3;k++){const v=((t/3+k*11)%30)/30;ctx.globalAlpha=.55*(1-v);R(cx+1+k*1.5+Math.sin(v*6+k)*1.2,cy-2-v*12,1,1.5,'#fff');ctx.globalAlpha=1}}
