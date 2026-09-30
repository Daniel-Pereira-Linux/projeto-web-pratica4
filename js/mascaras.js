/* Máscaras de CPF, telefone e CEP por delegação de eventos */
function mascaras(id, valor) {
  var n = valor.replace(/\D/g, "");
  if (id === "cpf") {
    n = n.slice(0, 11);
    return n.replace(/^(\d{3})(\d)/, "$1.$2").replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3").replace(/\.(\d{3})(\d)/, ".$1-$2");
  }
  if (id === "telefone") {
    n = n.slice(0, 11);
    if (n.length > 10) return n.replace(/^(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
    return n.replace(/^(\d{2})(\d{0,4})(\d{0,4})/, function (_, a, b, c) { return "(" + a + ")" + (b ? " " + b : "") + (c ? "-" + c : ""); });
  }
  if (id === "cep") {
    n = n.slice(0, 8);
    return n.replace(/^(\d{5})(\d)/, "$1-$2");
  }
  return valor;
}
document.addEventListener("input", function (e) {
  var id = e.target.id;
  if (id === "cpf" || id === "telefone" || id === "cep") e.target.value = mascaras(id, e.target.value);
});
