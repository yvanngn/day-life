#!/usr/bin/env python3
"""Tests de scénario : rejoue le jeu dans un vrai navigateur (Chromium via Playwright).
Usage : python3 tests/scenarios.py [groupe…]   (après python3 build.py ; sans groupe : tout)
Groupes : menu chambre couloir bain salon complet. Code de sortie 0 si tout passe, 1 sinon."""
import asyncio, os, sys
from playwright.async_api import async_playwright

PAGE='file://'+os.path.abspath(os.path.join(os.path.dirname(__file__),'..','dist','index.html'))

# Aides injectées dans la page : passent les bulles, attendent la fin des actions, visent les objets par leur id.
AIDES=r"""
window.T={
  async settle(max){ const t0=performance.now();
    while(performance.now()-t0<(max||60000)){
      if(skipFn) skipFn();
      if(mode==='end') return 'fin';
      if(mode==='play'&&!busy&&!P.walk&&!speech){ await wait(120); if(!busy&&!speech) return 'ok'; }
      await wait(20); }
    return 'delai'; },
  spot(id){ const h=spotsNow().find(h=>h.id===id); if(!h) throw new Error('objet absent : '+id+' dans '+S.room); return h; },
  async act(v,id,item){ verb=v||null; pending=item||null; const h=this.spot(id); if(h.isCat) cat.freeze=true;
    const wt=(pending&&h.wWith)?h.wWith:h.w; run(async()=>{await walkTo(...wt); await act(h)}); await wait(30); return this.settle(); },
  async inv(v,id){ verb=v; pending=null; clickItem(id); await wait(30); return this.settle(); },
  async code(c){ applyCode(c); startPlay(); return this.settle(); },
  etat(){ return {salle:S.room,inv:S.inv.join(','),f:S.f}; }
};"""

RESULTATS=[]
def verif(nom,cond,detail=''):
    RESULTATS.append((nom,bool(cond))); print(('  OK   ' if cond else '  ÉCHEC')+' '+nom+(' — '+str(detail) if detail and not cond else ''))

async def nouvelle_page(nav, code=None):
    pg=await nav.new_page(viewport={'width':900,'height':700}); pg.erreurs=[]
    pg.on('pageerror',lambda e: pg.erreurs.append(str(e)))
    await pg.goto(PAGE); await pg.wait_for_timeout(200)
    await pg.evaluate('localStorage.clear()'); await pg.evaluate(AIDES)
    if code: await pg.evaluate(f"T.code('{code}')")
    return pg

async def fin(pg):
    verif('Aucune erreur JavaScript',not pg.erreurs,pg.erreurs); await pg.close()

async def scenario_menu(nav):
    print('\n▶ Menu, intro et mots de passe')
    pg=await nouvelle_page(nav); E=pg.evaluate
    verif('Menu affiché au lancement',await E("menuEl.style.display")=='flex')
    verif('Clic droit : jamais le menu du navigateur',await E("(()=>{ const els=[...document.querySelectorAll('#app, #app button, #app div')].slice(0,60); return els.length>1&&els.every(el=>{ const e=new MouseEvent('contextmenu',{bubbles:true,cancelable:true}); el.dispatchEvent(e); return e.defaultPrevented; }); })()"))
    verif('Version affichée',await E("/Version \\d+\\.\\d+\\.\\d+/.test(menuBox.textContent)"))
    await pg.fill('#pwIn','faux'); await pg.press('#pwIn','Enter')
    verif('Mot de passe inconnu refusé',await E("document.getElementById('pwMsg').textContent")=='Mot de passe inconnu.')
    await pg.fill('#pwIn','kimono'); await pg.press('#pwIn','Enter'); await E('T.settle()')
    verif('Code KIMONO : couloir avec laser et robe',await E("S.room==='couloir'&&S.inv.join(',')==='laser,robe'"),await E('T.etat()'))
    await pg.click('#menuBtn'); await pg.click('#mNew'); r=await E('T.settle()')
    verif('Nouvelle partie : intro puis chambre',r=='ok' and await E("S.room==='chambre'&&S.inv.length===0"))
    await pg.click('#menuBtn'); await pg.click('#mNew'); await pg.wait_for_timeout(1500)
    verif('Bouton Passer visible pendant l\'intro',await E("skipBtn.style.display")=='block')
    await pg.click('#skipBtn'); await pg.wait_for_timeout(4500)
    verif('Passer : saute l\'intro jusqu\'à la chambre',await E("mode==='play'&&S.room==='chambre'"),await E('mode'))
    await E('T.settle()')
    await E("T.act(null,'porte')"); await pg.reload(); await pg.wait_for_timeout(300); await pg.evaluate(AIDES)
    await pg.click('#mCont'); await E('T.settle()')
    verif('Sauvegarde : « Continuer » reprend dans le couloir',await E("S.room")=='couloir')
    await fin(pg)

async def scenario_chambre(nav):
    print('\n▶ Chambre')
    pg=await nouvelle_page(nav,'REVEIL'); E=pg.evaluate
    await E("T.act('prendre','armoire')"); verif('Armoire fermée : rien à prendre',not await E("S.inv.includes('robe')"))
    await E("T.act('ouvrir','armoire')"); verif('Armoire ouverte',await E("S.f.armoire"))
    await E("T.act('prendre','robe')"); verif('Robe bleue prise',await E("S.inv.includes('robe')"))
    await E("T.act('prendre','kimono')"); verif('Le kimono reste dans l’armoire',not await E("S.inv.includes('kimono')"))
    await E("T.act('prendre','laser')"); verif('Laser pris',await E("S.inv.includes('laser')"))
    await E("T.act('examiner','livre')"); await E("T.act('examiner','livre')"); verif('Livre lu deux fois',await E("S.f.book")==2)
    await E("T.act('utiliser','bougie')"); verif('Bougie soufflée : noir',await E("S.f.dark"))
    await E("T.act('ouvrir','table')"); await E("T.act('utiliser','bougie')"); verif('Bougie rallumée',not await E("S.f.dark"))
    await E("T.inv('examiner','robe')"); verif('Examiner un objet de l’inventaire',await E("!busy"))
    await E("T.act(null,'porte')"); verif('Porte → couloir',await E("S.room")=='couloir')
    await fin(pg)

async def scenario_couloir(nav):
    print('\n▶ Couloir')
    pg=await nouvelle_page(nav,'KIMONO'); E=pg.evaluate
    await E("T.act('utiliser','shaggy','laser')"); verif('Laser sur Shaggy sans erreur',await E("!S.f.cat&&!busy"))
    await E("T.act('examiner','shaggy')"); verif('Shaggy examiné',await E("S.f.catTalk")==1)
    await E("T.act('prendre','shaggy')"); verif('Shaggy dans les bras',await E("S.inv.includes('chat')"))
    await E("T.act('prendre','litiere')"); verif('Litière refusée à la main',not await E("S.f.litter"))
    await E("T.act(null,'pbain')"); verif('Porte → salle de bain',await E("S.room")=='bain')
    await E("T.act(null,'porte')"); await E("T.act(null,'esc')"); verif('Escalier → salon',await E("S.room")=='salon')
    await fin(pg)

async def scenario_bain(nav):
    print('\n▶ Salle de bain')
    pg=await nouvelle_page(nav,'PACHA'); E=pg.evaluate
    await E("T.act('utiliser','baignoire')"); verif('Bain pris et habillée',await E("S.f.bath&&S.f.dressed&&S.f.tHabit&&!S.inv.includes('robe')"))
    await E("T.act('utiliser','baignoire','chat')"); verif('Shaggy lavé : blanc',await E("S.f.catWhite&&S.f.tShaggy&&S.f.scratch"))
    await E("T.act('prendre','serviette')"); verif('Serviette prise',await E("S.inv.includes('serviette')"))
    await E("T.act(null,'porte')"); verif('Griffure effacée en sortant',not await E("S.f.scratch"))
    await E("T.act('utiliser','buste','serviette')"); verif('Buste nettoyé',await E("S.f.bust&&S.f.used.serviette"))
    await fin(pg)

async def scenario_salon(nav):
    print('\n▶ Salon / cuisine')
    pg=await nouvelle_page(nav,'CAFE'); E=pg.evaluate
    await E("run(()=>say('mag','Un texte assez long pour vérifier qu’il s’écrit petit à petit.')); 0"); await pg.wait_for_timeout(80)
    verif('Le texte s’écrit petit à petit',await E("speech.n<speech.text.length"))
    await pg.click('#stage'); verif('Clic : le texte est fini d’un coup, bulle toujours là',await E("!!speech&&speech.n===speech.text.length"))
    await pg.click('#stage'); await pg.wait_for_timeout(50); verif('Clic suivant : la bulle se ferme',await E("!speech")); await E('T.settle()')
    await pg.click('#aideBtn'); verif('Aide : indice vague d’abord',await E("speech.text.startsWith('Indice : ')"),await E("speech&&speech.text")); await E('T.settle()')
    await pg.click('#aideBtn'); verif('Aide : indice précis si on redemande',await E("speech.text.startsWith('Indice précis : ')")); await E('T.settle()')
    await E("T.act('utiliser','cafe')"); verif('Café refusé tant que la souris est là',not await E("S.f.tCafe"))
    await E("T.act(null,'entree')"); verif('Départ refusé, liste incomplète',await E("mode")=='play')
    await E("T.act('utiliser','souris','chat')"); verif('Shaggy posé sur le bar',await E("S.f.catOnBar"))
    await E("T.act('utiliser','shaggyBar','laser')"); verif('Souris chassée',await E("S.f.mouseGone&&!S.f.catOnBar"))
    await E("T.act('utiliser','cafe')"); verif('Café pris',await E("S.f.tCafe"))
    await E("T.act('prendre','fromage')"); verif('Fromage pris',await E("S.inv.includes('fromage')"))
    await E("T.act('prendre','coussin')"); await E("T.act('prendre','telephone')"); verif('Téléphone trouvé',await E("S.f.tPhone"))
    await E("T.act('prendre','clem')"); await E("T.act('utiliser','matou','clems')"); verif('Matou parti après le jonglage',await E("S.f.tMatou"))
    async def survol(x,y):
        b=await pg.locator('#cv').bounding_box(); await pg.mouse.move(b['x']+x/320*b['width'],b['y']+y/144*b['height']); return await E("curEl.className")
    verif('Curseur normal hors objet',await survol(250,138)=='')
    verif('Curseur qui pulse sur un objet',await survol(200,48)=='hot')
    verif('Curseur vert sur une sortie',await survol(305,60)=='hot exit')
    await E("pending='laser';verb='utiliser'"); await survol(200,48); verif('Icône de l’objet choisi sous le curseur',await E("!!curEl.querySelector('canvas')"))
    await E("pending=null;verb=null")
    for th in ['Halloween','Noël','Nouvel An','Saint-Valentin','classique']:
        await E("T.act('utiliser','inter')"); verif('Interrupteur magique : thème '+th,await E("THEMES[S.f.theme]")==th)
    await E("T.act('utiliser','tv')"); verif('Télé allumée',await E("S.f.tvOn"))
    await E("T.act('utiliser','tv')"); verif('Télé éteinte',not await E("S.f.tvOn"))
    await fin(pg)

async def scenario_complet(nav):
    print('\n▶ Partie complète (chambre → travail)')
    pg=await nouvelle_page(nav,'REVEIL'); E=pg.evaluate
    for a in ["'ouvrir','armoire'","'prendre','robe'","'prendre','laser'","null,'porte'","'prendre','shaggy'","null,'pbain'",
              "'utiliser','baignoire'","'utiliser','baignoire','chat'","'prendre','serviette'","null,'porte'",
              "'utiliser','buste','serviette'","null,'esc'","'utiliser','souris','chat'","'utiliser','shaggyBar','laser'",
              "'utiliser','cafe'","'prendre','fromage'","'prendre','coussin'","'prendre','telephone'","'prendre','clem'",
              "'utiliser','matou','clems'","null,'esc'","'utiliser','litiere','fromage'"]:
        await E(f"T.act({a})")
    verif('Couloir nettoyé',await E("S.f.tCouloir"))
    await E("T.act(null,'esc')"); r=await E("T.act(null,'entree')")
    verif('Toutes les tâches faites, fin du chapitre',r=='fin' and await E("S.f.tWork&&mode==='end'"),await E('T.etat()'))
    await fin(pg)

GROUPES={'menu':['scenario_menu'],'chambre':['scenario_chambre'],'couloir':['scenario_couloir'],'bain':['scenario_bain'],
  'salon':['scenario_salon'],'complet':['scenario_complet']}

async def main():
    demandes=sys.argv[1:] or list(GROUPES)
    inconnus=[g for g in demandes if g not in GROUPES]
    if inconnus: sys.exit('Groupe inconnu : '+', '.join(inconnus)+' (groupes : '+' '.join(GROUPES)+')')
    async with async_playwright() as p:
        nav=await p.chromium.launch()
        for g in demandes:
            for s in GROUPES[g]: await globals()[s](nav)
        await nav.close()
    ok=sum(1 for _,c in RESULTATS if c)
    print(f'\n{ok}/{len(RESULTATS)} vérifications réussies')
    sys.exit(0 if ok==len(RESULTATS) else 1)

asyncio.run(main())
