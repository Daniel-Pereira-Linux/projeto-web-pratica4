/* Limites de idade (18 a 100 anos) calculados a partir da data atual */
(function () {
  function formatar(d) { return d.toISOString().slice(0, 10); }
  function anos(nascimento, hoje) {
    var a = hoje.getFullYear() - nascimento.getFullYear();
    var m = hoje.getMonth() - nascimento.getMonth();
    if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) a--;
    return a;
  }
  function iniciarDatas() {
    var campo = document.getElementById("nascimento");
    if (!campo || campo.dataset.datas) return;
    campo.dataset.datas = "true";
    var hoje = new Date();
    var max = new Date(hoje.getFullYear() - 18, hoje.getMonth(), hoje.getDate());
    var min = new Date(hoje.getFullYear() - 100, hoje.getMonth(), hoje.getDate());
    campo.max = formatar(max);
    campo.min = formatar(min);
    campo.addEventListener("input", function () {
      var info = document.getElementById("idade-info");
      if (!info || !campo.value) { if (info) info.textContent = ""; return; }
      info.textContent = "Idade: " + anos(new Date(campo.value + "T00:00:00"), new Date()) + " anos";
    });
  }
  document.addEventListener("DOMContentLoaded", iniciarDatas);
  document.addEventListener("spa:pagina", iniciarDatas);
})();
