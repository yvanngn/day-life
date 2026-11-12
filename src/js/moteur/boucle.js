/* ---------- boucle ---------- */
function update(){t++;
  if(P.walk){const dx=P.tx-P.x,dy=P.ty-P.y,d=Math.hypot(dx,dy);if(d<1.2){P.x=P.tx;P.y=P.ty;P.walk=false;if(P.res){const f=P.res;P.res=null;f()}}else{P.x+=dx/d*2;P.y+=dy/d*1.4;if(Math.abs(dx)>0.5)P.face=dx>0?1:-1}}
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
    if(juggle)for(let i=0;i<3;i++){const a=t/9+i*2.09;r(P.x+Math.cos(a)*12-2,P.y-66+Math.sin(a)*8-Math.abs(Math.cos(a))*6,4,4,'#ff8a1a')}};
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
