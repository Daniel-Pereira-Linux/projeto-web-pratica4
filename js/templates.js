/* Cartões de animais a partir de <template> (sem innerHTML) */
(function () {
  function criarEtiqueta(et) {
    var li = document.getElementById("modelo-etiqueta").content.cloneNode(true).querySelector("li");
    li.textContent = et.texto;
    li.classList.add("variante-" + et.variante);
    return li;
  }
  function criarCartao(animal) {
    var frag = document.getElementById("modelo-cartao-animal").content.cloneNode(true);
    var fem = animal.genero === "f";
    frag.querySelector("h3").textContent = animal.nome;
    frag.querySelector("p").textContent = animal.descricao;
    var img = frag.querySelector("img");
    img.src = "../img/" + animal.imagem + ".jpg";
    img.alt = animal.alt;
    frag.querySelector("source").srcset = "../img/" + animal.imagem + ".webp";
    var lista = frag.querySelector("ul");
    lista.setAttribute("aria-label", "Características de " + animal.nome);
    lista.append.apply(lista, animal.etiquetas.map(criarEtiqueta));
    frag.querySelector("a").textContent = "Quero adotar " + (fem ? "a " : "o ") + animal.nome;
    return frag;
  }
  function renderizarAnimais(filtro) {
    var alvo = document.getElementById("grade-animais");
    if (!alvo) return;
    var visiveis = ANIMAIS.filter(function (a) { return filtro === "todos" || a.especie === filtro; });
    alvo.replaceChildren.apply(alvo, visiveis.map(criarCartao));
    var c = document.getElementById("contagem");
    if (c) c.textContent = visiveis.length + " animal(is) exibido(s)";
    document.querySelectorAll("[data-filtro]").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.dataset.filtro === filtro));
    });
    gravar(CHAVES.filtro, filtro);
  }
  function iniciar() {
    if (!document.getElementById("grade-animais")) return;
    var salvo = ler(CHAVES.filtro, "todos");
    var valido = document.querySelector('[data-filtro="' + salvo + '"]');
    renderizarAnimais(valido ? salvo : "todos");
  }
  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-filtro]");
    if (b) renderizarAnimais(b.dataset.filtro);
  });
  document.addEventListener("DOMContentLoaded", iniciar);
  document.addEventListener("spa:pagina", iniciar);
})();
