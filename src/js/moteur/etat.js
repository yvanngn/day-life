/* Canvas, état du jeu, sauvegarde, tâches et mots de passe */
const cv=document.getElementById('cv'),ctx=cv.getContext('2d');ctx.imageSmoothingEnabled=false;
const W=320,H=144,KEY='magali_dotl_save_v2';
const $=id=>document.getElementById(id);
const stage=$('stage'),speechEl=$('speech'),titleEl=$('title'),fadeEl=$('fade'),sentEl=$('sentence'),invEl=$('inv'),menuEl=$('menu'),menuBox=$('menuBox'),checkEl=$('check');

/* ---------- état ---------- */
function defF(){return{armoire:false,kimono:false,robe:false,laser:false,cat:false,catWhite:false,catOnBar:false,mouseGone:false,
  dark:false,bath:false,dressed:false,serviette:false,cushion:false,phone:false,tvOn:false,tv:0,book:0,catTalk:0,scratch:false,used:{},
  tShaggy:false,tCouloir:false,bust:false,litter:false,cheese:false,tCafe:false,tHabit:false,tPhone:false,tWork:false,tMatou:false,cheeseIn:false,theme:0}}
function defState(){return{room:'chambre',x:205,y:130,inv:[],started:false,f:defF()}}
let S=defState();
function save(){S.x=Math.round(P.x);S.y=Math.round(P.y);try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}}
function loadSave(){try{const d=JSON.parse(localStorage.getItem(KEY));if(d&&d.started)return d}catch(e){}return null}

const ITEMS={kimono:'kimono',laser:'laser',chat:'Shaggy',robe:'robe bleue',serviette:'serviette',coussin:'coussin',telephone:'téléphone',fromage:'fromage',clems:'clémentines'};
const TASKS=[['tShaggy','Faire prendre un bain à Shaggy'],['tCafe','Prendre un café'],['tHabit',"S'habiller"],['tPhone','Trouver son téléphone'],['tCouloir','Nettoyer le couloir'],['tMatou','Distraire le matou squatteur qui dort dans le salon'],['tWork','Aller au travail']];
const CODES={
  REVEIL:{room:'chambre',label:'Chambre',inv:[],f:{}},
  KIMONO:{room:'couloir',label:'Couloir',inv:['laser','robe'],f:{laser:true,robe:true,armoire:true}},
  PACHA:{room:'bain',label:'Salle de bain',inv:['laser','robe','chat'],f:{laser:true,robe:true,armoire:true,cat:true}},
  CAFE:{room:'salon',label:'Salon / cuisine',inv:['laser','chat','serviette'],f:{laser:true,robe:true,armoire:true,cat:true,catWhite:true,tShaggy:true,bath:true,dressed:true,tHabit:true,serviette:true}}
};
const ROOMCODE={chambre:'REVEIL',couloir:'KIMONO',bain:'PACHA',salon:'CAFE'};
const START={chambre:[205,130],couloir:[40,128],bain:[280,128],salon:[34,130]};

let mode='menu',busy=false,verb=null,pending=null,hover='',bathing=false,skipFn=null,t=0,laserDot=null;
const P={face:1,x:205,y:130,tx:205,ty:130,walk:false,res:null};
const cat={x:150,y:130,tx:150,mode:'walk',timer:0,face:1,freeze:false,chase:0};
const mouse={x:80,flee:false};const mt={x:160,y:132,state:'sleep',face:-1};let vitreOpen=false,juggle=false;const cMouse={on:false,x:0};const barCat={x:104,y:78,jump:0};

