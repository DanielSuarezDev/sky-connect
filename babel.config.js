module.exports = function(api) {
  // Solo aplicar esta configuración cuando estemos en entorno de pruebas de Jest
  const isTest = api.env('test');
  api.cache(true);
  
  // Si estamos en entorno de pruebas, devolver la configuración para Babel
  if (isTest) {
    return {
      presets: [
        ['@babel/preset-env', { targets: { node: 'current' } }],
        '@babel/preset-typescript',
        ['@babel/preset-react', { runtime: 'automatic' }],
      ],
    }; 
  }
  
  // En entorno de producción o desarrollo, devolver una configuración vacía
  // para que Next.js pueda usar SWC
  return {
    presets: [],
  };
}; 