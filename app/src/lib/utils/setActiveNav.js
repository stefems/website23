export const setActiveNav = (page) => {
  page = page.split('/')[1]
  const nav = document.getElementsByTagName('nav')[0];
  [].slice.call(nav.getElementsByClassName('link')).forEach((link) => {
    link.classList.remove('-active');
  });
  if (page !== '') {
    const activeLink = nav.getElementsByClassName(`-${page}`)[0];
    activeLink.classList.add("-active");
  }
}