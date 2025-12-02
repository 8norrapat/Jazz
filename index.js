
document.addEventListener('DOMContentLoaded', ()=>{
    const animated = document.querySelectorAll('.animate-fadein, .animate-up, .animate-btn');
    const observer = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          e.target.style.animationPlayState = "running";
          observer.unobserve(e.target); 
        }
      });
    }, {threshold: 0.45});
    animated.forEach(el=>{
      el.style.animationPlayState = 'paused'; 
      observer.observe(el);
    });
  });