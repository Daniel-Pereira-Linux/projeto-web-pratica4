# Patas do Bem

Site da ONG fictícia **Patas do Bem**, voltada à adoção responsável de cães e gatos. Projeto acadêmico da disciplina Desenvolvimento Front-End para Web (Cruzeiro do Sul Virtual).

**Site publicado:** https://daniel-pereira-linux.github.io/projeto-web-pratica4/html/index.html

## Funcionalidades

- Páginas: início (lista de animais), sobre nós, cadastro de adotante e guia de componentes.
- Design system com variáveis CSS, layout em CSS Grid de 12 colunas e Flexbox nos componentes.
- Navegação SPA com History API (`js/router.js`), com fallback para navegação comum.
- Cartões de animais gerados a partir de `<template>` e de dados em JavaScript.
- Formulário com validação nativa, máscaras (CPF, telefone, CEP) e rascunho no `localStorage`.
- Componentes de feedback: badges, alertas, toasts e modal com `<dialog>`.

## Estrutura

```
html/  páginas
css/   estilos modulares (variáveis, base, menu, layout, formulários, rodapé, feedback, responsivo)
js/    scripts, um por responsabilidade
img/   imagens em AVIF, WebP, JPG e PNG
```

## Como executar

As páginas usam `fetch`, então é preciso um servidor HTTP local:

```bash
python3 -m http.server 8000
# abra http://localhost:8000/html/index.html
```

Abrindo direto do disco (`file://`) o site funciona, mas sem a navegação SPA.

## Fluxo de trabalho (GitFlow)

- `main`: versões estáveis, marcadas com tag semântica (`v1.0.0`).
- `develop`: integração; recebe as branches `feature/*` por pull request (merge `--no-ff`).
- `release/x.y.z` e `hotfix/*` seguem o GitFlow padrão.
- Commits no padrão Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`).

## Licença

Projeto acadêmico, sem fins comerciais.
