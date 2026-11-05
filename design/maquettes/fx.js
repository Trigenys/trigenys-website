/* Moteur de profondeur : parallax, rail horizontal, apparitions. Fonctionne en page entière
   ou dans un conteneur défilant (board « fenêtre » du canvas). Transforms uniquement. */
function v7fx(root){
  if(!root||root.dataset.fx) return; root.dataset.fx='1';
  if(matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  root.classList.add('js');
  var clamp=function(x){return x<0?0:x>1?1:x};
  var sc=null,e=root.parentElement;
  while(e&&e!==document.body){var o=getComputedStyle(e).overflowY;if(/(auto|scroll)/.test(o)&&e.scrollHeight>e.clientHeight+1){sc=e;break}e=e.parentElement}
  function V(){if(sc){var r=sc.getBoundingClientRect();return{top:r.top,left:r.left,w:sc.clientWidth,h:sc.clientHeight}}return{top:0,left:0,w:innerWidth,h:innerHeight}}
  var q=function(s){return root.querySelector(s)};
  var rail=q('.rail'),track=rail&&rail.querySelector('.track'),prg=rail&&rail.querySelector('.prg i'),hint=rail&&rail.querySelector('.hint');
  var hero=q('.hero'),h1=hero&&hero.querySelector('h1'),copy=h1&&h1.parentElement,stage=hero&&hero.querySelector('.stage');
  var lns=[].slice.call(root.querySelectorAll('.ln2'));
  var met=q('.met'),radios=met?[].slice.call(met.querySelectorAll('input[name=m]')):[],labels=met?[].slice.call(met.querySelectorAll('.lbl label')):[],pct=met&&met.querySelector('.pct span');
  function metTarget(i){var mr=met.getBoundingClientRect(),base=(sc?sc.scrollTop:scrollY)+(mr.top-v.top);return base+(i+.5)/radios.length*(mr.height-v.h)}
  labels.forEach(function(l,i){l.addEventListener('click',function(ev){if(mobile)return;ev.preventDefault();var y=metTarget(i);if(sc)sc.scrollTo({top:y,behavior:'smooth'});else scrollTo({top:y,behavior:'smooth'})})});
  var lys=[].slice.call(root.querySelectorAll('.ly')).map(function(el){
    var amp=parseFloat(getComputedStyle(el).getPropertyValue('--p'))||-80;
    return{el:el,s:Math.abs(amp)/80,dir:amp<0?-1:1,inRail:!!(rail&&rail.contains(el)),pnl:el.closest('.pnl')};
  });
  [].slice.call(root.querySelectorAll('.bits span:not(.ly)')).forEach(function(el,i){
    lys.push({el:el,s:.35+(i%3)*.2,dir:i%2?1:-1,inRail:!!(rail&&rail.contains(el)),pnl:el.closest('.pnl')});
  });
  var io=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}})},{root:sc,threshold:.18,rootMargin:'0px 0px -6% 0px'});
  [].slice.call(root.querySelectorAll('.rv,.rvx,.tl:not(.ly)')).forEach(function(el){io.observe(el)});
  var v=V(),mobile=false,maxX=0,ticking=false;
  function measure(){
    v=V(); root.style.setProperty('--vh',v.h+'px');
    mobile=root.clientWidth<=900; root.classList.toggle('m',mobile);
    if(track){track.style.transform='';maxX=mobile?0:Math.max(0,track.scrollWidth-v.w)}
  }
  function frame(){
    ticking=false; var vh=v.h,vw=v.w;
    if(hero){
      var y=Math.max(0,v.top-hero.getBoundingClientRect().top);
      if(copy){copy.style.transform='translateY('+(y*.22).toFixed(1)+'px)';copy.style.opacity=clamp(1-y/(vh*.9))}
      if(stage){stage.style.transform='translateY('+(y*-.08).toFixed(1)+'px) scale('+(1-Math.min(y,vh)/vh*.04).toFixed(3)+')'}
    }
    if(rail&&track&&!mobile){
      var rr=rail.getBoundingClientRect(),pr=clamp((v.top-rr.top)/(rr.height-vh));
      track.style.transform='translate3d('+(-maxX*pr).toFixed(1)+'px,0,0)';
      if(prg)prg.style.transform='scaleX('+pr.toFixed(4)+')';
      if(hint)hint.style.opacity=pr>.06?0:1;
    }
    if(met&&radios.length&&!mobile){
      var mr=met.getBoundingClientRect(),pm=clamp((v.top-mr.top)/(mr.height-vh)),n=radios.length,k=Math.min(n-1,Math.floor(pm*n));
      if(!radios[k].checked)radios[k].checked=true;
      if(pct)pct.textContent=k+1;
      for(var m=0;m<labels.length;m++)labels[m].style.setProperty('--k',clamp(pm*n-m).toFixed(3));
    }
    for(var i=0;i<lys.length;i++){
      var L=lys[i],t;
      if(L.inRail&&!mobile){
        if(!L.pnl)continue; var pq=L.pnl.getBoundingClientRect(),px=clamp((v.left+vw-pq.left)/(vw+pq.width));
        t='translate3d('+((px-.5)*vw*.22*L.s*L.dir).toFixed(1)+'px,'+((px-.5)*40*L.s).toFixed(1)+'px,0)';
      }else{
        var r=(L.el.parentElement||L.el).getBoundingClientRect(),p=clamp((v.top+vh-r.top)/(vh+r.height));
        t='translate3d(0,'+((p-.5)*vh*(mobile?.22:.38)*L.s*L.dir).toFixed(1)+'px,0)';
      }
      L.el.style.transform=t;
    }
    for(var j=0;j<lns.length;j++){
      var b=lns[j].parentElement.getBoundingClientRect();
      lns[j].style.transform='scaleX('+clamp((v.top+vh-b.top)/(vh*.6)).toFixed(4)+')';
    }
  }
  function onScroll(){if(!ticking){ticking=true;requestAnimationFrame(frame)}}
  (sc||window).addEventListener('scroll',onScroll,{passive:true});
  addEventListener('resize',function(){measure();onScroll()});
  if(window.ResizeObserver){new ResizeObserver(function(){measure();onScroll()}).observe(sc||document.documentElement)}
  [].slice.call(root.querySelectorAll('img')).forEach(function(im){if(!im.complete)im.addEventListener('load',function(){measure();onScroll()})});
  measure();frame();setTimeout(function(){measure();frame()},300);
}
function v7init(){[].slice.call(document.querySelectorAll('.t')).forEach(function(r){v7langInit(r);v7fx(r)})}
