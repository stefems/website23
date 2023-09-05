export const setActiveNav = (page) => {
  page = page.split('/')[1]
  const nav = document.getElementsByTagName('nav')[0];
  if (page !== '') {
    const activeLink = nav.getElementsByClassName(`-${page}`)[0];
    activeLink.classList.add("-active");
  } else {
    [].slice.call(nav.getElementsByClassName('link')).forEach((link) => {
      link.classList.remove('-active');
    });
  }
}