const dom = (function () {
  const create = function (parent, element, identifier, text = "") {
    const el = document.createElement(element);

    if (identifier != "") {
      if (identifier[0] == ".") {
        el.classList.add(identifier.slice(1));
      }

      if (identifier[0] == "#") {
        el.id = identifier.slice(1);
      }
    }

    if (text != "") {
      el.textContent = text;
    }

    if (parent != "") {
      parent.appendChild(el);
    }

    return el;
  };
  return {
    create,
  };
})();

export { dom };
