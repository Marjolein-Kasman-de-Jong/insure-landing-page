const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#primary-nav');
const menuIcon = menuButton.querySelector('img');
const desktop = window.matchMedia('(min-width: 1024px)');
const pageContent = [document.querySelector('main'), document.querySelector('footer')];

menuButton.hidden = false;

function setMenu(open, restoreFocus = false) {
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  menuIcon.src = `assets/images/icon-${open ? 'close' : 'hamburger'}.svg`;
  navigation.classList.toggle('is-open', open);
  document.body.classList.toggle('menu-open', open);
  pageContent.forEach(element => { element.inert = open; });
  if (restoreFocus) menuButton.focus();
}

menuButton.addEventListener('click', () => {
  setMenu(menuButton.getAttribute('aria-expanded') !== 'true');
});

document.addEventListener('keydown', event => {
  if (menuButton.getAttribute('aria-expanded') !== 'true') return;
  if (event.key === 'Escape') {
    setMenu(false, true);
    return;
  }
  if (event.key === 'Tab') {
    const controls = [menuButton, ...navigation.querySelectorAll('a')];
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
});

navigation.addEventListener('click', event => {
  const link = event.target.closest('a');
  if (link && !link.hasAttribute('data-placeholder')) setMenu(false);
});

desktop.addEventListener('change', () => setMenu(false));

// Replace these placeholder hrefs with the final destinations when available.
document.querySelectorAll('[data-placeholder]').forEach(link => {
  link.addEventListener('click', event => event.preventDefault());
});
