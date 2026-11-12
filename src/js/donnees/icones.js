/* Icônes de l'inventaire (12×12) */
/* ---------- icônes ---------- */
const ICONS={
 kimono:{p:{W:'#f4f4f4',k:'#111',g:'#bbb'},m:["...WW..WW...","..WWWWWWWW..",".WWWWggWWWW.","WWWWW..WWWWW","WW.WW..WW.WW","...WWggWW...","...kkkkkk...","...WWkkWW...","...WWWWWW...","...WWggWW...","...WWWWWW...","............"]},
 laser:{p:{g:'#9aa0a8',R:'#ff2020',r:'#ff9090'},m:["............","..........r.",".........R..","........gg..",".......ggg..","......ggg...",".....ggg....","....ggg.....","...ggg......","..gg........",".g..........","............"]},
 chat:{p:null,m:[".O........O.",".OO......OO.",".OOO....OOO.",".OOOOOOOOOO.",".OkOOOOOOkO.",".OOOOPPOOOO.",".OOOOOOOOOO.","..OWWWWWWO..","...OOOOOO...","............","............","............"]},
 robe:{p:{D:'#3a6fd8',d:'#2a52a8',g:'#888'},m:[".....gg.....","....g..g....","...DD..DD...","...DDDDDD...","....DDDD....","....DddD....","...DDDDDD...","..DDDDDDDD..","..DDdDDdDD..",".DDDDDDDDDD.",".DDDDDDDDDD.","............"]},
 serviette:{p:{w:'#ffffff',p:'#f0a0b0',g:'#888'},m:["............","gggggggggggg","..pppppppp..","..wwwwwwww..","..wwwwwwww..","..wwwwwwww..","..wwwwwwww..","..wwwwwwww..","..wwwwwwww..","..pppppppp..","............","............"]},
 telephone:{p:{k:'#20202a',b:'#4a6aaa',w:'#cfe0ff'},m:["....kkkk....","....kbbk....","....kbwk....","....kbbk....","....kbbk....","....kbwk....","....kbbk....","....kbbk....","....kkkk....","............","............","............"]},
 clems:{p:{o:'#ff8a1a',O:'#e06a0a',g:'#3a8a40'},m:["............","...g........","..ooo..g....",".oOooo.ooo..",".ooooooOooo.","..ooo.ooooo.","....g..ooo..","...ooo......","..oOooo.....","..ooooo.....","...ooo......","............"]},
 fromage:{p:{y:'#f2c832',d:'#d8a820',o:'#c89818'},m:["............","............","..........y.","........yyy.","......yyyyy.","....yyydyyy.","..yyyyyyyyy.",".yydyyyyydy.",".yyyyyydyyy.",".oooooooooo.","............","............"]},
 coussin:{p:{c:'#d0507a',d:'#9a2a50'},m:["............",".cccccccccc.","cccccccccccc","ccdcccccdccc","cccccccccccc","ccccccdccccc","cccccccccccc","ccdcccccdccc","cccccccccccc",".cccccccccc.","............","............"]}
};
function iconCanvas(id){if(HD)return iconHD(id);const c=document.createElement('canvas');c.width=12;c.height=12;const x=c.getContext('2d');const ic=ICONS[id];const pal=id==='chat'?cpal():ic.p;
  ic.m.forEach((row,i)=>{for(let j=0;j<12;j++){const col=pal[row[j]];if(col){x.fillStyle=col;x.fillRect(j,i,1,1)}}});return c}


/* V2 : icône 24×24, contour sombre, ombre en bas à droite et reflet en haut à gauche */
function teinte(hex,f){const n=parseInt(hex.slice(1).padEnd(6,hex.slice(1)),16);let R=n>>16,G=n>>8&255,B=n&255;const m=v=>Math.max(0,Math.min(255,Math.round(f>1?v+(255-v)*(f-1):v*f)));return `rgb(${m(R)},${m(G)},${m(B)})`}
function iconHD(id){const c=document.createElement('canvas');c.width=24;c.height=24;const x=c.getContext('2d');const ic=ICONS[id];const pal=id==='chat'?cpal():ic.p;
  const col=(i,j)=>i>=0&&i<12&&j>=0&&j<12?pal[ic.m[i][j]]:null;
  x.fillStyle='rgba(0,0,0,.35)';for(let i=0;i<12;i++)for(let j=0;j<12;j++)if(col(i,j))x.fillRect(j*2+1,i*2+1,2,2);
  for(let i=0;i<12;i++)for(let j=0;j<12;j++){const k=col(i,j);if(!k)continue;const hx=k.length===4?'#'+[...k.slice(1)].map(a=>a+a).join(''):k;
    x.fillStyle=hx;x.fillRect(j*2,i*2,2,2);
    if(!col(i-1,j)||!col(i,j-1)){x.fillStyle=teinte(hx,1.35);x.fillRect(j*2,i*2,1,1)}
    if(!col(i+1,j)){x.fillStyle=teinte(hx,.62);x.fillRect(j*2,i*2+1,2,1)}
    if(!col(i,j+1)){x.fillStyle=teinte(hx,.7);x.fillRect(j*2+1,i*2,1,2)}}
  return c}
