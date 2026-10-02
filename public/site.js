(function(){
var d=document,dlg=d.getElementById('vm'),vf=d.getElementById('vf');
function toEmbed(u){var m;
 if(m=u.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{6,})/))return '<iframe src="https://www.youtube.com/embed/'+m[1]+'?autoplay=1&rel=0" allow="autoplay;fullscreen" allowfullscreen></iframe>';
 if(m=u.match(/vimeo\.com\/(?:video\/)?(\d+)/))return '<iframe src="https://player.vimeo.com/video/'+m[1]+'?autoplay=1" allow="autoplay;fullscreen" allowfullscreen></iframe>';
 if(m=u.match(/drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?(?:export=\w+&)?id=)([\w-]+)/))return '<iframe src="https://drive.google.com/file/d/'+m[1]+'/preview" allow="autoplay;fullscreen" allowfullscreen></iframe>';
 if(m=u.match(/^(https:\/\/customer-[a-z0-9]+\.cloudflarestream\.com\/[a-f0-9]{32})/))return '<iframe src="'+m[1]+'/iframe?autoplay=true&preload=auto&letterboxColor=transparent" allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;fullscreen" allowfullscreen></iframe>';
 return '<video src="'+u+'" controls autoplay playsinline></video>';}
var PLAY='<svg width="30" height="30" viewBox="0 0 24 24" aria-hidden="true"><polygon points="8,5 19,12 8,19" fill="#FF5A1F"/></svg>';
d.querySelectorAll('.vw').forEach(function(w){if(!w.querySelector('.play')&&!/PHOTO/.test(w.textContent)){var b=document.createElement('button');b.className='play vp';b.setAttribute('aria-label','Play video');b.setAttribute('data-embed',w.getAttribute('data-embed')||'');b.innerHTML=PLAY;w.appendChild(b);}});
d.querySelectorAll('[data-embed]').forEach(function(b){b.addEventListener('click',function(){var u=b.getAttribute('data-embed');if(!u)return;var box=b.closest('.vw')||b.closest('.hero');if(!box)return;var h=box.offsetHeight;box.innerHTML=toEmbed(u);box.classList.add('playing');var f=box.querySelector('iframe,video');if(f){f.style.height=h+'px';}});});
var chips=d.querySelectorAll('[data-f]');chips.forEach(function(c){c.addEventListener('click',function(){var f=c.getAttribute('data-f');chips.forEach(function(x){x.classList.toggle('dark',x===c);});d.querySelectorAll('.niche').forEach(function(s){s.hidden=!(f==='all'||s.getAttribute('data-n')===f);});});});
var form=d.querySelector('form');
if(form)form.addEventListener('submit',function(e){if(form.action.indexOf('FORM_ENDPOINT')>-1){e.preventDefault();var f=new FormData(form);location.href='mailto:'+form.getAttribute('data-email')+'?subject='+encodeURIComponent('Brief from '+f.get('name')+' ('+f.get('brand')+')')+'&body='+encodeURIComponent('Budget: '+f.get('budget')+'\n\n'+f.get('message'));}});
var links=[].slice.call(d.querySelectorAll('nav a[href^="#"]')).filter(function(a){return !a.classList.contains('btn');});
if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;links.forEach(function(a){var on=a.getAttribute('href')==='#'+e.target.id;a.classList.toggle('on',on);if(on)a.setAttribute('aria-current','true');else a.removeAttribute('aria-current');});});},{rootMargin:'-30% 0px -60% 0px'});d.querySelectorAll('.pg').forEach(function(s){io.observe(s);});}
})();
