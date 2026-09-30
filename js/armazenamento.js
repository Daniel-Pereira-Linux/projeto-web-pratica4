/* Web Storage: rascunho do cadastro e filtro da lista de animais */
var CHAVES = { rascunho: "patas:rascunho-cadastro", filtro: "patas:filtro-animais" };
function gravar(chave, valor) {
  try { localStorage.setItem(chave, JSON.stringify(valor)); } catch (e) { /* cota cheia ou bloqueado */ }
}
function ler(chave, padrao) {
  try {
    var texto = localStorage.getItem(chave);
    return texto === null ? padrao : JSON.parse(texto);
  } catch (e) { return padrao; }
}
function apagar(chave) {
  try { localStorage.removeItem(chave); } catch (e) { /* ignora */ }
}
(function () {
  function salvarRascunho(form) {
    var dados = {};
    form.querySelectorAll("input, select, textarea").forEach(function (c) {
      if (!c.name || c.type === "checkbox") return;
      if (c.type === "radio") { if (c.checked) dados[c.name] = c.value; return; }
      dados[c.name] = c.value;
    });
    gravar(CHAVES.rascunho, dados);
  }
  function restaurarRascunho() {
    var form = document.querySelector(".formulario");
    if (!form) return;
    var dados = ler(CHAVES.rascunho, null);
    if (!dados || typeof dados !== "object" || !Object.keys(dados).length) return;
    Object.keys(dados).forEach(function (nome) {
      var campos = form.querySelectorAll('[name="' + nome + '"]');
      campos.forEach(function (c) {
        if (c.type === "radio") c.checked = c.value === dados[nome];
        else c.value = dados[nome];
      });
    });
    if (window.mostrarToast) mostrarToast("Rascunho restaurado", "info");
  }
  document.addEventListener("input", function (e) {
    var form = e.target.closest && e.target.closest(".formulario");
    if (form) salvarRascunho(form);
  });
  document.addEventListener("DOMContentLoaded", restaurarRascunho);
  document.addEventListener("spa:pagina", restaurarRascunho);
})();
