// Importar Jest DOM Matchers
import '@testing-library/jest-dom';

// Suprimir advertencias de la consola relacionadas con el uso de ReactDOMTestUtils.act
const originalError = console.error;
console.error = (...args) => {
  if (
    args[0] && 
    typeof args[0] === 'string' && 
    args[0].includes('ReactDOMTestUtils.act is deprecated')
  ) {
    return;
  }
  if (
    args[0] && 
    typeof args[0] === 'string' && 
    args[0].includes('outdated JSX transform')
  ) {
    return;
  }
  originalError(...args);
}; 