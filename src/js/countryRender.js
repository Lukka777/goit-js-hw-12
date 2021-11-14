export function createElemWithClasses(elemName, classList) {
    const elem = document.createElement(elemName);
    elem.classList.add(...classList);
    return elem;
  }
