/* Bascule FR / EN : dictionnaire sur les nœuds texte, drapeaux dans la nav, choix mémorisé. */
function v7lang(root,lang){
  var I=(typeof I18N!=='undefined')?I18N:{};
  var w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode:function(n){var p=n.parentNode&&n.parentNode.nodeName;return (p==='SCRIPT'||p==='STYLE'||n.parentNode.closest('svg'))?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT}});
  var n;while(n=w.nextNode()){
    if(n.__fr===undefined){var k=n.nodeValue.replace(/\s+/g,' ').trim();if(!k)continue;var en=I[k];
      if(!en){for(var key in I){if(key.length>12&&k.indexOf(key)>=0){en=k.split(key).join(I[key]);break}}}
      if(!en)continue;n.__fr=n.nodeValue;n.__en=n.nodeValue.replace(k,en)}
    n.nodeValue=lang==='en'?n.__en:n.__fr;
  }
  root.setAttribute('lang',lang);document.documentElement.lang=lang;
  [].slice.call(root.querySelectorAll('.lng')).forEach(function(b){b.setAttribute('data-lang',lang);b.setAttribute('aria-label',lang==='en'?'Switch to French':'Passer en anglais')});
  try{localStorage.setItem('tg-lang',lang)}catch(e){}
}
function v7langInit(root){
  var cur='fr';try{cur=localStorage.getItem('tg-lang')||'fr'}catch(e){}
  if(cur==='en')v7lang(root,'en');else root.setAttribute('lang','fr');
  [].slice.call(root.querySelectorAll('.lng')).forEach(function(b){b.setAttribute('data-lang',root.getAttribute('lang'));b.addEventListener('click',function(){v7lang(root,root.getAttribute('lang')==='en'?'fr':'en')})});
}
