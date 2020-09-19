import AbstractClass from "../view/abstract-class";

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  AFTER: `after`
};

export const renderTemplate = (container, template, place) => {
  if (container instanceof AbstractClass) {
    container = container.getElement();
  }
  container.insertAdjacentHTML(place, template);
};

export const render = (container, child, place) => {
  if (container instanceof AbstractClass) {
    container = container.getElement();
  }

  if (child instanceof AbstractClass) {
    child = child.getElement();
  }

  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(child);
      break;
    case RenderPosition.BEFOREEND:
      container.append(child);
      break;
    case RenderPosition.AFTER:
      container.after(child);
      break;
  }
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const replace = (newChild, oldChild) => {
  if (oldChild instanceof AbstractClass) {
    oldChild = oldChild.getElement();
  }

  if (newChild instanceof AbstractClass) {
    newChild = newChild.getElement();
  }
  const parent = oldChild.parentElement;

  if (parent === null || oldChild === null || newChild === null) {
    throw new Error(`Can't replace unexisting elements`);
  }

  parent.replaceChild(newChild, oldChild);
};

export const remove = (component) => {
  if (component === null) {
    return;
  }

  if (!(component instanceof AbstractClass)) {
    throw new Error(`Can remove only components`);
  }

  component.getElement().remove();
  component.removeElement();
};
