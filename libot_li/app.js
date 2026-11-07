(() => {
  const nav = [...document.querySelectorAll('nav a')];
  const sections = nav.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        nav.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id));
      }
    });
  }, {rootMargin:'-35% 0px -55% 0px'});
  sections.forEach(s => io.observe(s));
})();