export const footer = () => {
  const totalFilmsQuantity = 432262;

  return `
  <footer class="footer">
  <section class="footer__logo logo logo--smaller">Cinemaddict</section>
  <section class="footer__statistics">
    ${totalFilmsQuantity}
  </section>
</footer>`;
};
