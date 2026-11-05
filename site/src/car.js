/* Carrousel du hero : diapos empilées (.sl), points (.dots), défilement automatique
   mis en pause au survol, au focus et hors écran ; aucun défilement automatique si
   l'utilisateur préfère réduire les animations. Fonctionne sans le moteur fx. */
function v7car(root){
  [].slice.call(root.querySelectorAll('[data-car]')).forEach(function(car){
    if(car.dataset.ready) return; car.dataset.ready='1';
    var slides=[].slice.call(car.querySelectorAll('.sl')),dots=car.parentElement.querySelector('.dots');
    if(slides.length<2||!dots) return;
    var i=0,timer=null,hold=false,seen=true,delay=parseInt(car.dataset.delay,10)||5200;
    var still=matchMedia('(prefers-reduced-motion: reduce)').matches;
    var btns=slides.map(function(s,k){
      var b=document.createElement('button');b.type='button';b.setAttribute('role','tab');
      b.setAttribute('aria-label',s.dataset.name||('Diapositive '+(k+1)));b.appendChild(document.createElement('i'));
      b.addEventListener('click',function(){go(k);restart()});dots.appendChild(b);return b;
    });
    /* Images des diapos cachées : chargées à l'affichage de la diapo (ou juste avant la rotation),
       pas pendant le premier rendu : elles ne concurrencent plus le titre (LCP). */
    function wake(s){[].slice.call(s.querySelectorAll('img[data-src]')).forEach(function(im){im.src=im.getAttribute('data-src');im.removeAttribute('data-src')})}
    function go(k){
      i=(k+slides.length)%slides.length;
      wake(slides[i]);wake(slides[(i+1)%slides.length]);
      slides.forEach(function(s,n){var on=n===i;s.classList.toggle('on',on);s.setAttribute('aria-hidden',on?'false':'true');
        [].slice.call(s.querySelectorAll('a,button')).forEach(function(a){a.tabIndex=on?0:-1})});
      btns.forEach(function(b,n){b.setAttribute('aria-selected',n===i?'true':'false');b.tabIndex=n===i?0:-1});
    }
    function stop(){if(timer){clearInterval(timer);timer=null}}
    function start(){stop();if(still||hold||!seen||document.hidden) return;timer=setInterval(function(){go(i+1)},delay)}
    function restart(){stop();start()}
    var stage=car.parentElement;
    stage.addEventListener('mouseenter',function(){hold=true;stop()});
    stage.addEventListener('mouseleave',function(){hold=false;start()});
    stage.addEventListener('focusin',function(){hold=true;stop()});
    stage.addEventListener('focusout',function(){hold=false;start()});
    dots.addEventListener('keydown',function(e){
      if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();go(i+(e.key==='ArrowRight'?1:-1));btns[i].focus()}
    });
    var x0=null;
    stage.addEventListener('touchstart',function(e){x0=e.touches[0].clientX},{passive:true});
    stage.addEventListener('touchend',function(e){if(x0===null)return;var dx=e.changedTouches[0].clientX-x0;x0=null;if(Math.abs(dx)>40){go(i+(dx<0?1:-1));restart()}},{passive:true});
    if('IntersectionObserver' in window){new IntersectionObserver(function(es){seen=es[0].isIntersecting;start()},{threshold:.2}).observe(stage)}
    document.addEventListener('visibilitychange',start);
    i=0;slides[0].classList.add('on');btns[0].setAttribute('aria-selected','true');btns[0].tabIndex=0;start();
    addEventListener('load',function(){setTimeout(function(){wake(slides[1%slides.length])},1500)});
  });
}
