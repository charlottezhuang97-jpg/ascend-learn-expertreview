(() => {
 const header=document.querySelector('.october-nav');if(!header)return;
 header.classList.add('home-glass-nav');
 let scheduled=false;
 const update=()=>{header.classList.toggle('is-glass',window.scrollY>96);scheduled=false;};
 addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(update);}},{passive:true});
 addEventListener('pageshow',update);update();
})();
