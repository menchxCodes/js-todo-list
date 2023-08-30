const dom = (function () {
  /**
   *
   * @param {*} parent
   * @param {HTMLElement} tag
   * @param {string} identifier
   * @param {string} text
   * @returns HTMLDivElement
   */
  const create = function (parent, tag, identifier, text = "") {
    const element = document.createElement(tag);

    if (identifier != "") {
      if (identifier[0] == ".") {
        element.classList.add(identifier.slice(1));
      }

      if (identifier[0] == "#") {
        element.id = identifier.slice(1);
      }
    }

    if (text != "") {
      element.textContent = text;
    }

    if (parent != "") {
      parent.appendChild(element);
    }

    return element;
  };
  /**
   *
   * @param {string} type
   * @param {string} className
   * @param {string} labelName
   * @param {string} inputValue
   * @returns {{div: HTMLDivElement,input:HTMLInputElement,label:HTMLLabelElement}}
   */
  const createInputLabel = function (
    type,
    className,
    labelName,
    inputValue = ""
  ) {
    let div = document.createElement("div");

    if (className != "") div.classList.add(className);

    let label = create(div, "label", "");
    label.textContent = labelName;

    let input = create(div, "input", "");
    input.type = type;
    if (inputValue != "") input.value = inputValue;

    return { div: div, input: input, label: label };
  };
  /**
   *
   * @param {string} className
   * @param {string} labelName
   * @param {string} text
   *  @returns {{div: HTMLDivElement,input:HTMLInputElement,label:HTMLLabelElement}}
   */
  const createTextAreaLabel = function (className, labelName, text = "") {
    let div = document.createElement("div");

    if (className != "") div.classList.add(className);

    let label = create(div, "label", "");
    label.textContent = labelName;

    let input = create(div, "textarea", "");
    if (text != "") input.value = text;

    return { div: div, input: input, label: label };
  };

  const appendChildren = function (parent, childrenArray) {
    childrenArray.forEach((child) => {
      parent.appendChild(child);
    });
  };
  /**
   *
   * @returns {{div:HTMLDivElement,select:HTMLSelectElement,label:HTMLLabelElement}}
   */
  const createSelect = function (labelName, optionsArray) {
    let select = document.createElement("select");

    let label = document.createElement("label");
    label.textContent = labelName;

    let div = document.createElement("div");

    div.appendChild(label);
    div.appendChild(select);

    optionsArray.forEach((option) => {
      let element = document.createElement("option");
      element.value = option;
      element.textContent = option;
      select.appendChild(element);
    });

    return { div: div, select: select, label: label };
  };
  /**
   *
   * @param {HTMLElement} element
   * @param {string} identifier
   * @returns HTMLDivElement
   */
  const wrapInDiv = function (element, identifier) {
    let div = create("", "div", identifier);
    div.appendChild(element);
    return div;
  };

  return {
    create,
    createInputLabel,
    appendChildren,
    createSelect,
    wrapInDiv,
    createTextAreaLabel,
  };
})();

export { dom };
