/* Menu hambúrguer */
(function () {
  var botao = document.querySelector(".menu-botao");
  var nav = document.getElementById("menu-nav");
  if (!botao || !nav) return;
  function definir(aberto) {
    nav.classList.toggle("aberto", aberto);
    botao.setAttribute("aria-expanded", String(aberto));
    botao.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
  }
  botao.addEventListener("click", function () { definir(!nav.classList.contains("aberto")); });
  nav.addEventListener("click", function (e) { if (e.target.closest("a")) definir(false); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && nav.classList.contains("aberto")) { definir(false); botao.focus(); }
  });
  window.matchMedia("(min-width: 768px)").addEventListener("change", function () { definir(false); });
})();
