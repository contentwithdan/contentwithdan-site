(function(){
var d=document,dlg=d.getElementById('vm'),vf=d.getElementById('vf');
function toEmbed(u){var m;
 if(m=u.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{6,})/))return '<iframe src="https://www.youtube.com/embed/'+m[1]+'?autoplay=1&rel=0" allow="autoplay;fullscreen" allowfullscreen></iframe>';
 if(m=u.match(/vimeo\.com\/(?:video\/)?(\d+)/))return '<iframe src="https://player.vimeo.com/video/'+m[1]+'?autoplay=1" allow="autoplay;fullscreen" allowfullscreen></iframe>';
 if(m=u.match(/drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?(?:export=\w+&)?id=)([\w-]+)/))return '<iframe src="https://drive.google.com/file/d/'+m[1]+'/preview" allow="autoplay;fullscreen" allowfullscreen></iframe>';
 if(m=u.match(/^(https:\/\/customer-[a-z0-9]+\.cloudflarestream\.com\/[a-f0-9]{32})/))return '<iframe src="'+m[1]+'/iframe?autoplay=true&preload=auto&letterboxColor=transparent" allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;fullscreen" allowfullscreen></iframe>';
 return '<video src="'+u+'" controls autoplay playsinline></video>';}
var PLAY='<svg width="30" height="30" viewBox="0 0 24 24" aria-hidden="true"><polygon points="8,5 19,12 8,19" fill="#2F5E40"/></svg>';
d.querySelectorAll('.vw').forEach(function(w){if(!w.querySelector('.play')&&!/PHOTO/.test(w.textContent)){var b=document.createElement('button');b.className='play vp';b.setAttribute('aria-label','Play video');b.setAttribute('data-embed',w.getAttribute('data-embed')||'');b.innerHTML=PLAY;w.appendChild(b);}});
d.querySelectorAll('[data-embed]').forEach(function(b){b.addEventListener('click',function(){var u=b.getAttribute('data-embed');if(!u)return;var box=b.closest('.vw')||b.closest('.hero');if(!box)return;var h=box.offsetHeight;box.innerHTML=toEmbed(u);box.classList.add('playing');var f=box.querySelector('iframe,video');if(f){f.style.height=h+'px';}});});
var chips=d.querySelectorAll('[data-f]');chips.forEach(function(c){c.addEventListener('click',function(){var f=c.getAttribute('data-f');chips.forEach(function(x){x.classList.toggle('dark',x===c);});d.querySelectorAll('.niche').forEach(function(s){s.hidden=!(f==='all'||s.getAttribute('data-n')===f);});});});
var form=d.querySelector('form');
if(form)form.addEventListener('submit',function(e){if(form.action.indexOf('FORM_ENDPOINT')>-1){e.preventDefault();var f=new FormData(form);location.href='mailto:'+form.getAttribute('data-email')+'?subject='+encodeURIComponent('Brief from '+f.get('name')+' ('+f.get('brand')+')')+'&body='+encodeURIComponent('Budget: '+f.get('budget')+'\n\n'+f.get('message'));}});
var links=[].slice.call(d.querySelectorAll('nav a[href^="#"]')).filter(function(a){return !a.classList.contains('btn');});
if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;links.forEach(function(a){var on=a.getAttribute('href')==='#'+e.target.id;a.classList.toggle('on',on);if(on)a.setAttribute('aria-current','true');else a.removeAttribute('aria-current');});});},{rootMargin:'-30% 0px -60% 0px'});d.querySelectorAll('.pg').forEach(function(s){io.observe(s);});}

/* Brand logos: conveyor-belt rows (alternating direction). Falls back to the static grid if reduced motion is requested. */
(function(){var g=d.querySelector('#brands .g9');if(!g)return;if(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
var cells=[].slice.call(g.children);if(cells.length<9)return;var per=Math.ceil(cells.length/3);
var wrap=d.createElement('div');wrap.className='mq';var dur=[52,46,58];
for(var r=0;r<3;r++){var row=d.createElement('div');row.className='mq-row';var tr=d.createElement('div');tr.className='mq-track '+(r%2===0?'rtl-rev':'rtl');tr.style.animationDuration=dur[r]+'s';
var part=cells.slice(r*per,(r+1)*per);part.forEach(function(c){tr.appendChild(c);});
part.forEach(function(c){var k=c.cloneNode(true);k.setAttribute('aria-hidden','true');var im=k.querySelector('img');if(im)im.setAttribute('alt','');tr.appendChild(k);});
row.appendChild(tr);wrap.appendChild(row);}
g.parentNode.replaceChild(wrap,g);})();

/* Count-up numbers (stats + featured reach badges) */
(function(){var els=[].slice.call(d.querySelectorAll('[data-count]'));if(!els.length)return;
var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;if(reduce||!('IntersectionObserver' in window))return;
function fmt(el,v){var dec=+el.getAttribute('data-dec')||0;return v.toFixed(dec)+(el.getAttribute('data-suf')||'');}
els.forEach(function(el){el.textContent=fmt(el,0);});
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;io.unobserve(e.target);var el=e.target,to=parseFloat(el.getAttribute('data-count')),t0=null,dur=1600;
function step(ts){if(t0===null)t0=ts;var k=Math.min(1,(ts-t0)/dur),ease=1-Math.pow(1-k,3);el.textContent=fmt(el,to*ease);if(k<1)requestAnimationFrame(step);else el.textContent=fmt(el,to);}
requestAnimationFrame(step);});},{threshold:0.3});
els.forEach(function(el){io.observe(el);});})();

/* Featured reach pills: drop into place when scrolled into view */
(function(){var pills=[].slice.call(d.querySelectorAll('.rb'));if(!pills.length)return;
var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;if(reduce||!('IntersectionObserver' in window))return;
pills.forEach(function(el){el.classList.add('pre');});
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;io.unobserve(e.target);e.target.classList.remove('pre');e.target.classList.add('drop');});},{threshold:0.3});
pills.forEach(function(el){io.observe(el);});})();
})();
