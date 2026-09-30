/* Regras do cadastro: termo, aviso de erro único e envio */
function iniciarFormulario() {
  var form = document.querySelector(".formulario");
  if (!form || form.dataset.pronto) return;
  form.dataset.pronto = "true";
  var envio = document.getElementById("envio");
  var termos = document.getElementById("termos");
  var avisouErro = false;
  termos.addEventListener("change", function () { envio.disabled = !termos.checked; });
  form.addEventListener("invalid", function () {
    if (avisouErro) return;
    avisouErro = true;
    if (window.mostrarToast) mostrarToast("Revise os campos destacados em vermelho", "erro");
    setTimeout(function () { avisouErro = false; }, 0);
  }, true);
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var nome = document.getElementById("nome").value.trim().split(" ")[0];
    document.getElementById("nome-sucesso").textContent = nome;
    document.getElementById("modal-sucesso").showModal();
    if (window.mostrarToast) mostrarToast("Cadastro enviado!", "sucesso");
    form.reset();
    envio.disabled = true;
    apagar(CHAVES.rascunho);
  });
}
document.addEventListener("DOMContentLoaded", iniciarFormulario);
document.addEventListener("spa:pagina", iniciarFormulario);
