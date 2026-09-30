/* Navegação SPA com History API (progressive enhancement) */
(function () {
  if (location.protocol === "file:") return;
  var app = document.getElementById("app");
  var cache = new Map();
  function buscar(url) {
    if (cache.has(url)) return Promise.resolve(cache.get(url));
    return fetch(url).then(function (r) {
      if (!r.ok) throw new Error(r.status);
      return r.text();
    }).then(function (html) {
      var doc = new DOMParser().parseFromString(html, "text/html");
      var main = doc.getElementById("app");
      var pagina = { nos: Array.from(main.childNodes), classe: main.className, titulo: doc.title };
      cache.set(url, pagina);
      return pagina;
    });
  }
  function renderizar(pagina, url) {
    var fragmento = document.createDocumentFragment();
    pagina.nos.forEach(function (no) { fragmento.appendChild(document.importNode(no, true)); });
    app.replaceChildren(fragmento);
    app.className = pagina.classe;
    document.title = pagina.titulo;
    var atual = new URL(url, location.href).pathname.split("/").pop();
    document.querySelectorAll(".menu a").forEach(function (a) {
      var dest = a.getAttribute("href").split("#")[0];
      if (dest === atual) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
    });
    var h1 = app.querySelector("h1");
    if (h1) { h1.setAttribute("tabindex", "-1"); h1.focus(); }
    document.dispatchEvent(new CustomEvent("spa:pagina"));
  }
  function navegar(url, empilhar) {
    app.setAttribute("aria-busy", "true");
    buscar(url).then(function (pagina) {
      if (empilhar) history.pushState({}, "", url);
      renderizar(pagina, url);
    }).catch(function () { location.href = url; })
      .finally(function () { app.removeAttribute("aria-busy"); });
  }
  document.addEventListener("click", function (e) {
    if (e.ctrlKey || e.metaKey || e.shiftKey || e.button !== 0) return;
    var a = e.target.closest("a[href]");
    if (!a || a.target) return;
    var href = a.getAttribute("href");
    if (!/\.html$/.test(href.split("#")[0]) || href.charAt(0) === "#") return;
    if (href.indexOf("#") > -1) return;
    e.preventDefault();
    navegar(a.href, true);
  });
  window.addEventListener("popstate", function () { navegar(location.href, false); });
})();
