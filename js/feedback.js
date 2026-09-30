/* Toasts, modais e alertas (delegação de eventos) */
function mostrarToast(mensagem, tipo) {
  var area = document.getElementById("toasts");
  if (!area) return;
  var toast = document.createElement("div");
  toast.className = "toast toast-" + (tipo || "info");
  var texto = document.createElement("span");
  texto.textContent = mensagem;
  var fechar = document.createElement("button");
  fechar.type = "button";
  fechar.setAttribute("aria-label", "Fechar notificação");
  fechar.textContent = "×";
  toast.append(texto, fechar);
  area.append(toast);
  var tempo;
  function agendar() { tempo = setTimeout(remover, 5000); }
  function remover() { clearTimeout(tempo); toast.remove(); }
  fechar.addEventListener("click", remover);
  toast.addEventListener("mouseenter", function () { clearTimeout(tempo); });
  toast.addEventListener("focusin", function () { clearTimeout(tempo); });
  toast.addEventListener("mouseleave", agendar);
  toast.addEventListener("focusout", agendar);
  agendar();
}
(function () {
  document.addEventListener("click", function (e) {
    var abrir = e.target.closest("[data-abrir-modal]");
    if (abrir) { var m = document.getElementById(abrir.dataset.abrirModal); if (m && m.showModal) m.showModal(); return; }
    if (e.target.closest("[data-fechar-modal]")) { var d = e.target.closest("dialog"); if (d) d.close(); return; }
    var alerta = e.target.closest("[data-fechar-alerta]");
    if (alerta) { var a = alerta.closest(".alerta"); if (a) a.remove(); return; }
    var t = e.target.closest("[data-toast]");
    if (t) mostrarToast(t.dataset.mensagem || "Pronto!", t.dataset.toast);
  });
})();
