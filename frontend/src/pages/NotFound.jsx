const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-96">
      <h1 className="text-5xl font-bold text-primary-600 mb-4">404</h1>
      <p className="text-lg text-gray-700 mb-2">Página no encontrada</p>
      <p className="text-gray-500">La ruta que buscas no existe.</p>
    </div>
  );
};

export default NotFound; 