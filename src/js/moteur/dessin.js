/* Primitives de dessin et sprites (Magali, Shaggy) */
/* ---------- pixel helpers ---------- */
const r=(x,y,w,h,c)=>{ctx.fillStyle=c;ctx.fillRect(x|0,y|0,w,h)};
function drawMap(rows,pal,x,y,s,flip){const w=rows[0].length;rows.forEach((row,i)=>{for(let j=0;j<row.length;j++){const c=pal[row[j]];if(c){ctx.fillStyle=c;ctx.fillRect(x+(flip?w-1-j:j)*s,y+i*s,s,s)}}})}

/* Magali, version affinée */
const MPAL={H:'#3a2216',h:'#6a4430',S:'#f4c9aa',s:'#e0a88e',R:'#f09090',W:'#fff',E:'#3d7bd9',L:'#2a1610',M:'#d0607a',K:'#151515',k:'#2c2c2c',P:'#2d3f6b',D:'#3a6fd8',d:'#2a52a8',F:'#0d0d0d'};
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
function drawMag(x,y,s=2,step=0,side=0){const rows=side?sideRows(step):magRows(step);const w=12*s,h=rows.length*s;const ox=Math.round(x-w/2),oy=Math.round(y-h);
  drawMap(rows,MPAL,ox,oy,s,side<0);
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
  drawMap(rr,cpal(),Math.round(cat.x-14),Math.round(cat.y-16),2,cat.face<0)}

function bonnet(ox,oy,s,side){const red='#d01828',dk='#9a0c18',W='#f6f6f6';
  r(ox+1*s,oy-1*s,10*s,2*s,W);r(ox+2*s,oy-3*s,8*s,2*s,red);r(ox+3*s,oy-5*s,6*s,2*s,red);r(ox+4*s,oy-6*s,4*s,1*s,red);
  r(ox+3*s,oy-3*s,1*s,2*s,dk);const px=side<0?ox+1*s:ox+8*s;r(px,oy-6*s,2*s,2*s,red);r(side<0?ox-1*s:ox+10*s,oy-6*s,2*s,2*s,W)}
