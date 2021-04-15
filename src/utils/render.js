import Abstract from '../view/abstract.js';

export const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

export const render = (container, element, place) => {

  if (container instanceof Abstract) {
    container = container.getElement();
  }

  if (element instanceof Abstract) {
    element = element.getElement();
  }

  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

export const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const replace = (oldChild, element) => {

  if (oldChild instanceof Abstract) {
    oldChild = oldChild.getElement();
  }

  if (element === null || oldChild === null ) {
    throw new Error('Can\'t replace unexisting elements');
  }

  element.appendChild(oldChild);
};

export const remove = (oldChild, element) => {

  if (oldChild instanceof Abstract) {
    oldChild = oldChild.getElement();
  }

  if (element === null || oldChild === null ) {
    throw new Error('Can\'t replace unexisting elements');
  }

  element.removeChild(oldChild);
};
