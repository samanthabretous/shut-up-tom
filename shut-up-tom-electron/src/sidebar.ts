const sidebar = (() => {
  const activeLinkListener = (event: any) => {
    const currentPage:string = window.location.pathname.substr(1);
    console.log(`link__${currentPage}`)
    const navLink = document.querySelector(`.link__${currentPage}`);
    navLink.classList.add('link__active');
  };

  return {
    init() {
      activeLinkListener();
    }
  }
})();

export default sidebar;
