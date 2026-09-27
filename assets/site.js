(() => {
  const root = document.documentElement;
  const body = document.body;
  const themeButtons = document.querySelectorAll('.theme');
  const menuButtons = document.querySelectorAll('.nav-toggle, .nav-close');

  const setTheme = (theme) => {
    root.dataset.theme = theme;
    themeButtons.forEach((button) => {
      button.querySelector('span').textContent = theme === 'light' ? 'Dark' : 'Light';
    });
  };

  const setMenu = (open) => {
    const mobile = matchMedia('(max-width: 760px)').matches;
    body.classList.toggle(mobile ? 'nav-open' : 'nav-collapsed', mobile ? open : !open);
    document.querySelectorAll('.nav-toggle').forEach((button) => button.setAttribute('aria-expanded', String(open)));
  };

  setTheme(localStorage.getItem('theme') || 'dark');
  themeButtons.forEach((button) => button.addEventListener('click', () => {
    const nextTheme = root.dataset.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', nextTheme);
    setTheme(nextTheme);
  }));

  menuButtons.forEach((button) => button.addEventListener('click', () => {
    const isMobile = matchMedia('(max-width: 760px)').matches;
    setMenu(isMobile ? !body.classList.contains('nav-open') : body.classList.contains('nav-collapsed'));
  }));
  document.querySelectorAll('nav a').forEach((link) => link.addEventListener('click', () => {
    if (matchMedia('(max-width: 760px)').matches) setMenu(false);
  }));

  const navItems = document.querySelectorAll('nav a');
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) navItems.forEach((item) => item.classList.toggle('active', item.dataset.id === entry.target.dataset.id));
  }), { rootMargin: '-38% 0px -54% 0px' });
  document.querySelectorAll('main section').forEach((section) => observer.observe(section));

  document.querySelector('#year').textContent = new Date().getFullYear();
  addEventListener('scroll', () => body.classList.toggle('scrolled', scrollY > 120), { passive: true });
})();
