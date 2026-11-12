/* Primitives de dessin et sprites (Magali, Shaggy) */
/* ---------- pixel helpers ---------- */
const r=(x,y,w,h,c)=>{ctx.fillStyle=c;ctx.fillRect(x|0,y|0,w,h)};
function drawMap(rows,pal,x,y,s,flip){const w=rows[0].length;rows.forEach((row,i)=>{for(let j=0;j<row.length;j++){const c=pal[row[j]];if(c){ctx.fillStyle=c;ctx.fillRect(x+(flip?w-1-j:j)*s,y+i*s,s,s)}}})}

/* Magali, version affinée */
const MPAL={H:'#3a2216',h:'#7a5034',g:'#a06a40',S:'#f6cdb0',s:'#e2a88e',R:'#f29a90',W:'#fff',E:'#5a9ad8',e:'#1e2a50',L:'#2a1610',M:'#c8607a',K:'#151515',k:'#2c2c2c',P:'#2d3f6b',D:'#3a6fd8',d:'#2a52a8',F:'#0d0d0d'};
const MAG_TOP=["...HHHHHH...","..HhhhhhHH..",".HHhHHHHHHH.",".HHSSSSSSHH.",".HSLLSSLLSH.",".HSWESSEWSH.",".HSSSssSSSH.",".HRSSSSSSRH.",".HHSSMMSSHH.",".HHHSSSSHHH.","HHHHHSSHHHHH","HHKKKKKKKKHH","HSKKKKKKKKSH","HSKkKKKKkKSH",".SKKKKKKKKS.",".SKKKKKKKKS."];
const MAG_DRESS_TOP=MAG_TOP.map((row,i)=>i>=11?row.replace(/K/g,'D').replace(/k/g,'d'):row);
function magRows(step){const dressed=S.f.dressed;let top=dressed?MAG_DRESS_TOP:MAG_TOP;
  const leg=step===1?".PPP...PPP..":step===2?"..PPP.PPP...":"..PPP..PPP..";
  let bot;
  if(dressed){const sl=leg.replace(/P/g,'S');bot=[".SDDDDDDDDS.",".DDDDDDDDDD.",".DDdDDDDdDD.",".DDDDDDDDDD.","DDDDDDDDDDDD",sl,sl,sl,sl,sl,sl,sl.replace(/S/g,'F')]}
  else bot=[".SPPPPPPPPS.","..PPPPPPPP..",leg,leg,leg,leg,leg,leg,leg,leg,leg.replace(/P/g,'F')];
  if(!dressed)bot.splice(2,0,leg);
  return top.concat(bot)}
const MAG_SIDE_TOP=["...HHHHHH...","..HhhhhhHH..",".HHhHHHHHHH.",".HHHHHSSSSH.",".HHHHSSLLS..",".HHHHSSWES..",".HHHHSSSSSS.",".HHHHSRSSS..",".HHHHSSSMS..",".HHHHHSSS...",".HHHHHSS....","..HHKKKKKK..","..HHKKKKKK..","..HKKKSKKKK.","..KKKSKKKK..","..KKKSKKKK.."];
function sideRows(step){const dressed=S.f.dressed;const top=dressed?MAG_SIDE_TOP.map((r,i)=>i>=11?r.replace(/K/g,'D'):r):MAG_SIDE_TOP;
  const leg=step===1?"..PPPPPP....":step===2?".PPP...PPP..":"...PPPP.....";let bot;
  if(dressed){const sl=leg.replace(/P/g,'S');bot=["..DDSDDDD...","..DDDDDDD...",".DDDDDDDDD..",".DDDDDDDDD..","DDDDDDDDDDD.",sl,sl,sl,sl,sl,sl,sl.replace(/S/g,'F')]}
  else bot=["..PPSPPPP...","..PPPPPPP...",leg,leg,leg,leg,leg,leg,leg,leg,leg,leg.replace(/P/g,'F')];
  return top.concat(bot)}
/* Magali haute définition : tête et buste dessinés à 24×32, jambes doublées depuis les anciennes lignes */
const MAG_HD=["........HHHHHHHH........", "......HHhhhhhhHHHH......", ".....HHhhHHHHHHhHHH.....", "....HHhHHHHHHHHHHgHH....", "....HhHHHHHHHHHHHHgHH...", "...HHHHSSSSSSSHHHHHHH...", "...HHHSSSSSSSSSSSSHHHH..", "...HHSLLLLSSSSLLLLSSHH..", "...HHSSSSSSSSSSSSSSSHH..", "...HHSWEeWSSSSWEeWSSHH..", "...HHSSEESSSSSSEESSSHH..", "...HHSSSSSSssSSSSSSSHH..", "...HHSRRSSSSsSSSSRRSHH..", "..HHHSRRSSSSSSSSSRRSHHH.", "..HHHSSSSSSSSSSMSSSSHHH.", "..HHHHSSSSMMMMMSSSSHHHH.", "..HHHHHSSSSSSSSSSSHHHHH.", "..HHHHHHsSSSSSSSsHHHHHH.", "..HHHHHHHHSSSSSHHHHHHHH.", ".HHHHHHHHHSSSSSHHHHHHHHH", ".HHHHHHHHHSSSSHHHHHHHHHH", ".HHHHKKKKKKKKKKKKKKHHHHH", ".HHKKKKKKKKKKKKKKKKKKHH.", ".HSKKKKKKKKKKKKKKKKKKSH.", ".HSKKKkKKKKKKKKKKkKKKSH.", ".SSKKKkKKKKKKKKKKkKKKSS.", ".SSKKKKKKKKKKKKKKKKKKSS.", ".SSKKKKKKKKKKKKKKKKKKSS.", "..SKKKKKKKKKKKKKKKKKKS..", "..SKKKKKKKKKKKKKKKKKKS..", "..sSKKKKKKKKKKKKKKKKSs..", "...KKKKKKKKKKKKKKKKKK..."];
/* Magali de profil, tête et buste redessinés à la main (24×32) */
const MAG_SIDE_HD=["........HHHHHHHH........", "......HHhhhhhhhHHH......", ".....HHhhHHHHHHhhHH.....", "....HHhHHHHHHHHHHhHH....", "....HhHHHHHHHHHHHHSHH...", "...HHHHHHHHHHHSSSSSHH...", "...HHHHHHHHHSSSSSSSSH...", "...HHHHHHHHSSSSLLLLSS...", "...HHHHHHHSSSSSSSSSSS...", "...HHHHHHHSSSSSWEeWSS...", "...HHHHHHHSSSSSSEESSSS..", "...HHHHHHHSsSSSSSSSSSS..", "...HHHHHHHSSSSRRSSSsSS..", "...HHHHHHHHSSSRRSSSSS...", "...HHHHHHHHSSSSSSSMSS...", "...HHHHHHHHHSSSSMMMS....", "...HHHHHHHHHSSSSSSS.....", "...HHHHHHHHHHsSSSS......", "...HHHHHHHHHHSSSS.......", "....HHHHHHHHSSSS........", "....HHHHHHHHSSSS........", "....HHHHKKKKKKKKKKKK....", "....HHHKKKKKKKKKKKKK....", "....HHKKKKKKKKKKKKKKK...", "....HKKKKKKSSKKKKKKKK...", "....KKKKKKKSSKKKKKKK....", "....KKKKKKSSSKKKKKKK....", "....KKKKKKSSKKKKKKKK....", "....KKKKKKSSKKKKKKKK....", "....KKKKKkSSKKKKKKKK....", "....KKKKKKSsKKKKKKKK....", "....KKKKKKKKKKKKKKKK...."];
/* Shaggy debout, redessiné à la main (28×16) */
const CAT_W_HD=["......................OO..OO", ".....................OOOOOOO", "OO..................OOkWOOkW", "OO..................OOOOOPOO", "..O.OOOOOOOOOOOOOOOOOOOOOOO.", "..OOOOOOOOOOOOOOOOOOOOOOOO..", "..OOOoOOoOOoOOoOOOOOOOOOO...", "...OOoOOoOOoOOoOOOOOOOOO....", "...OOOOOOOOOOOOOOOOOOOOO....", "....OOOOOOOOOOOOOOOOOOOO....", "....OOOOOOOOOOOOOOOOOOO.....", "....OOOO.OOOO....OOOO.OOOO..", "....OOOO.OOOO....OOOO.OOOO..", "....OOOO.OOOO....OOOO.OOOO..", "....WWWW.WWWW....WWWW.WWWW..", "....WWWW.WWWW....WWWW.WWWW.."];
const dbl=rows=>rows.flatMap(r=>{const x=r.replace(/./g,c=>c+c);return[x,x]});
function magHD(step,side){const old=side?sideRows(step):magRows(step);let top=side?MAG_SIDE_HD:MAG_HD;
  if(S.f.dressed)top=top.map((r,i)=>i>=21?r.replace(/K/g,'D').replace(/k/g,'d'):r);
  return top.concat(dbl(old.slice(16)))}
function drawMag(x,y,s=2,step=0,side=0){const rows=HD?magHD(step,side):(side?sideRows(step):magRows(step));const k=HD?2:1;const w=12*s,h=rows.length*s/k;const ox=Math.round(x-w/2),oy=Math.round(y-h);
  drawMap(rows,MPAL,ox,oy,s/k,side<0);
  if(S.f.theme===2)bonnet(ox,oy,s,side);
  if(S.f.scratch){ctx.fillStyle='#d01020';for(let i=0;i<3;i++)for(let k=0;k<4;k++)ctx.fillRect(ox+(3+i*2)*s+k,oy+(4+k)*s,s,1)}}

const CPAL_R={O:'#e0782a',o:'#a8521a',W:'#fff5e0',k:'#1a1a1a',P:'#ff8aa0'};
const CPAL_W={O:'#f6f2ea',o:'#d6cdbf',W:'#ffffff',k:'#1a1a1a',P:'#ff8aa0'};
const cpal=()=>S.f.catWhite?CPAL_W:CPAL_R;
const CAT_W=["...........O.O","..........OOOO","O.........OkOk","O.OOOOOOOOOOPO",".OOoOoOoOOOOO.","..OOOOOOOOOO..","..OO.OO..OO.OO","..WW.WW..WW.WW"];
const CAT_L=["..............","..............","O.............","O.OOOOOOOOO...",".OOoOoOOOOOO..","..OOOOOOOOOkOk","..OO.OO..OOPOO","..WW.WW..WW.WW"];
const CAT_L2=["..............","..............","O.............","O.OOOOOOOOO...",".OOoOoOOOOOO..","..OOOOOOOOOkOk","..OO.OO..OOOOO","..WW.WW..WW.WW"];
function drawCat(){const rows=cat.mode==='lick'?((t>>3)%2?CAT_L:CAT_L2):CAT_W;let rr=rows;
  if(cat.mode==='walk'||cat.mode==='chase'){if((t>>3)%2)rr=rows.map((x,i)=>i===6?"..O.O.O..O.O.O":i===7?"..W.W.W..W.W.W":x)}
  const hd=dbl(rr).map((l,i)=>i===5||i===11?l.replace(/kk/g,'kW').replace(/kW$/,'kW'):i===9?l.replace(/oo/g,'oO'):l);
  drawCatRows(rr,cpal(),Math.round(cat.x-14),Math.round(cat.y-16),cat.face<0)}

function bonnet(ox,oy,s,side){const red='#d01828',dk='#9a0c18',W='#f6f6f6';
  r(ox+1*s,oy-1*s,10*s,2*s,W);r(ox+2*s,oy-3*s,8*s,2*s,red);r(ox+3*s,oy-5*s,6*s,2*s,red);r(ox+4*s,oy-6*s,4*s,1*s,red);
  r(ox+3*s,oy-3*s,1*s,2*s,dk);const px=side<0?ox+1*s:ox+8*s;r(px,oy-6*s,2*s,2*s,red);r(side<0?ox-1*s:ox+10*s,oy-6*s,2*s,2*s,W)}

/* ---- V2 : aides haute définition ---- */
const rh=(x,y,w,h,c)=>{ctx.fillStyle=c;ctx.fillRect(x,y,w,h)};
/* chat V2 : doublé, reflet dans l'œil, ventre et rayures nuancés */
function catHD(rows){if(rows===CAT_W)return CAT_W_HD;return dbl(rows).map((l,i)=>i===5||i===11?l.replace(/kk/g,'kW'):i===9?l.replace(/oo/g,'oO'):i===7||i===8?l.replace(/OOOO/g,'OOoO'):l)}
function drawCatRows(rows,pal,x,y,flip){HD?drawMap(catHD(rows),pal,x,y,1,flip):drawMap(rows,pal,x,y,2,flip)}
/* souris V2 (salon : dy=0, couloir : dy=26) */
function mouseHD(mx,dy,b){rh(mx-6,dy+73.5-b,7,3.5,'#8a8a90');rh(mx-5.5,dy+73-b,5,1,'#9a9aa4');rh(mx-5,dy+76-b,5,.5,'#6a6a72');rh(mx+1,dy+74-b,3,2.5,'#9a9aa0');rh(mx+3.5,dy+75-b,1,1,'#b0b0b8');rh(mx,dy+72-b,2,2,'#d08a9a');rh(mx+.5,dy+72.5-b,1,1,'#f0b0c0');rh(mx+2.5,dy+74.5-b,1,1,'#111');rh(mx+2.5,dy+74.5-b,.5,.5,'#fff');rh(mx+4,dy+75.5-b,.5,.5,'#ff9ab0');rh(mx+3,dy+76-b,2.5,.5,'#ddd');rh(mx-9.5,dy+75.5,3.5,.5,'#d08a9a');rh(mx-11,dy+75,1.5,.5,'#d08a9a');rh(mx-4,dy+77-b,1,.5,'#d08a9a');rh(mx-1,dy+77-b,1,.5,'#d08a9a')}

/* ---------- V2 : personnages avec contour sombre et lumière douce (calque hors écran, comme Low Kanta) ---------- */
const SPR=document.createElement('canvas'),SPO=document.createElement('canvas');SPR.width=SPO.width=640;SPR.height=SPO.height=288;
const sg=SPR.getContext('2d'),so=SPO.getContext('2d');sg.imageSmoothingEnabled=so.imageSmoothingEnabled=false;
function contour(f){return function(...a){if(!HD)return f(...a);const dst=ctx,T=dst.getTransform();
  sg.setTransform(1,0,0,1,0,0);sg.globalCompositeOperation='source-over';sg.clearRect(0,0,640,288);sg.setTransform(T);sg.globalAlpha=dst.globalAlpha;ctx=sg;let res;try{res=f(...a)}finally{ctx=dst}
  sg.setTransform(1,0,0,1,0,0);sg.globalAlpha=1;sg.globalCompositeOperation='source-atop';const g=sg.createLinearGradient(0,0,0,288);g.addColorStop(0,'rgba(255,236,190,.14)');g.addColorStop(1,'rgba(40,10,50,.20)');sg.fillStyle=g;sg.fillRect(0,0,640,288);sg.globalCompositeOperation='source-over';
  so.setTransform(1,0,0,1,0,0);so.globalCompositeOperation='source-over';so.clearRect(0,0,640,288);[[1,0],[-1,0],[0,1],[0,-1]].forEach(([x,y])=>so.drawImage(SPR,x,y));
  so.globalCompositeOperation='source-in';so.fillStyle='#120804';so.fillRect(0,0,640,288);so.globalCompositeOperation='source-over';so.drawImage(SPR,0,0);
  dst.save();dst.setTransform(1,0,0,1,0,0);dst.drawImage(SPO,0,0);dst.restore();return res}}
drawMag=contour(drawMag);drawCatRows=contour(drawCatRows);mouseHD=contour(mouseHD);
