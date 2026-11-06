'use strict';
const publications = [
{year:2026,type:'journal',status:'Accepted for publication',title:'NoiseNet: A CNN-Based Regression Framework for Gaussian Noise-Level Prediction in Color Images',authors:'Bithi, N. I., Mahamud, M. R., & Miah, M. J.',venue:'IET Image Processing'},
{year:2025,type:'conference',title:'SigmaFusionNet: A Residual-Enhanced Hybrid CNN for Accurate Gaussian Noise Prediction in Medical X-ray Images',authors:'Bithi, N. I., Miah, M. J., & Mahamud, M. R.',venue:'International Conference on Quantum Photonics, Artificial Intelligence, and Networking (QPAIN), Saidpur'},
{year:2025,type:'conference',title:'Effective super-resolution through multi-order degradation simulation and efficient training strategies',authors:'Mahamud, M. R., Miah, M. J., & Bithi, N. I.',venue:'International Conference on Quantum Photonics, Artificial Intelligence, and Networking (QPAIN), Saidpur'},
{year:2025,type:'conference',status:'Best Paper Award',title:'Controllable Image Enhancement Using Adaptive Scaling in Deep Super-Resolution Networks',authors:'Mahamud, M. R., Miah, M. J., & Bithi, N. I.',venue:'International Conference on Quantum Photonics, Artificial Intelligence, and Networking (QPAIN), Saidpur'},
{year:2022,type:'journal',title:'Intelligent waste management system using deep learning with IoT',authors:'Rahman, M. W., Islam, R., Hasan, A., Bithi, N. I., Hasan, M. M., & Rahman, M. M.',venue:'Journal of King Saud University – Computer and Information Sciences, 34(5), 2072–2087'},
{year:2022,type:'conference',title:'Real time detection and localization of colorectal polyps from colonoscopy images: A deep learning approach',authors:'Al Amin, M., Paul, B. K., & Bithi, N. I.',venue:'IEEE WIECON-ECE 2022, pp. 58–61'},
{year:2022,type:'conference',title:'A bioinformatics and system biology technique to identify candidate biomarkers and functional pathways among stress and depression',authors:'Basar, M. A., Hosen, M. F., Al Amin, M., Bithi, N. I., & Paul, B. K.',venue:'IEEE WIECON-ECE 2022, pp. 143–146'},
{year:2021,type:'preprint',title:'Covidmulti-net: A parallel-dilated multi-scale feature fusion architecture for the identification of COVID-19 cases from chest X-ray images',authors:'Khan, I., Rahman, A., Karim, M. R., Bithi, N. I., Band, S. S., Dehzangi, A., & Alinejad-Rokny, H.',venue:'medRxiv preprint'}
];
const pages = [...document.querySelectorAll('.page')];
const links = [...document.querySelectorAll('[data-target]')];
const menu = document.getElementById('main-nav');
function showPage(id,{updateHash=true}={}){
  if(!document.getElementById(id)?.classList.contains('page')) id='home';
  pages.forEach(p=>{const active=p.id===id;p.classList.toggle('active',active);p.setAttribute('aria-hidden',String(!active));});
  document.querySelectorAll('.nav-link').forEach(n=>{const active=n.dataset.target===id;n.classList.toggle('active',active);if(active)n.setAttribute('aria-current','page');else n.removeAttribute('aria-current');});
  if(updateHash && location.hash!=='#'+id) history.pushState(null,'','#'+id);
  menu.classList.remove('open');document.getElementById('menu-toggle').setAttribute('aria-expanded','false');window.scrollTo({top:0,behavior:'instant'});
  document.title = `${id==='home'?'Research Portfolio':id.charAt(0).toUpperCase()+id.slice(1)} | Nasima Islam Bithi`;
}
links.forEach(el=>el.addEventListener('click',()=>showPage(el.dataset.target)));
window.addEventListener('hashchange',()=>showPage(location.hash.slice(1)||'home',{updateHash:false}));
window.addEventListener('popstate',()=>showPage(location.hash.slice(1)||'home',{updateHash:false}));
document.getElementById('menu-toggle').addEventListener('click',()=>{const opened=menu.classList.toggle('open');document.getElementById('menu-toggle').setAttribute('aria-expanded',String(opened));});
const themeButton=document.getElementById('theme-toggle');
function applyTheme(theme){document.body.classList.toggle('light',theme==='light');themeButton.textContent=theme==='light'?'☾':'☀';themeButton.setAttribute('aria-label',theme==='light'?'Switch to dark theme':'Switch to light theme');try{localStorage.setItem('bithi-theme',theme);}catch(e){}}
let savedTheme='dark';try{savedTheme=localStorage.getItem('bithi-theme')||'dark';}catch(e){}applyTheme(savedTheme);themeButton.addEventListener('click',()=>applyTheme(document.body.classList.contains('light')?'dark':'light'));
const pubList=document.getElementById('pub-list'),search=document.getElementById('pub-search'),sort=document.getElementById('pub-sort'),filters=[...document.querySelectorAll('.filter')];let activeFilter='all';
const escapeHtml=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function renderPublications(){const q=search.value.trim().toLowerCase();let data=publications.filter(p=>(activeFilter==='all'||p.type===activeFilter)&&`${p.title} ${p.authors} ${p.venue} ${p.year} ${p.status||''}`.toLowerCase().includes(q));data.sort((a,b)=>sort.value==='title'?a.title.localeCompare(b.title):sort.value==='oldest'?a.year-b.year:a.year===b.year?publications.indexOf(a)-publications.indexOf(b):b.year-a.year);pubList.innerHTML=data.map(p=>`<article class="pub-card"><div class="pub-year">${p.year}</div><div><div class="pub-top"><span class="pub-type">${escapeHtml(p.type)}</span>${p.status?`<span class="pub-status">${escapeHtml(p.status)}</span>`:''}</div><h3>${escapeHtml(p.title)}</h3><p>${escapeHtml(p.authors)}</p><p><em>${escapeHtml(p.venue)}</em></p><a class="pub-link" target="_blank" rel="noopener noreferrer" href="https://scholar.google.com/scholar?q=${encodeURIComponent(p.title)}">Find this paper on Google Scholar ↗</a></div></article>`).join('');document.getElementById('visible-count').textContent=data.length;document.getElementById('pub-empty').hidden=data.length!==0;}
filters.forEach(f=>f.addEventListener('click',()=>{activeFilter=f.dataset.filter;filters.forEach(b=>{const active=b===f;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});renderPublications();}));search.addEventListener('input',renderPublications);sort.addEventListener('change',renderPublications);renderPublications();
document.getElementById('current-year').textContent=new Date().getFullYear();showPage(location.hash.slice(1)||'home',{updateHash:false});
