import { useFetch } from "../hooks/useFetch";


export const HomePage = () => {
  const { datos: articulos, cargando, error } = useFetch(
    "http://localhost:3001/api/articles"
  );

  
  if (cargando) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-gray-500 text-lg">Cargando artículos...</p>
      </div>
    );
  }

  
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-red-500 text-lg">Error: {error}</p>
      </div>
    );
  }

  
  if (!articulos || articulos.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-gray-500 text-lg">
          No hay artículos publicados todavía.
        </p>
      </div>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Artículos publicados
      </h1>

      {/* Lista con map() y key estable (id) */}
      <ul className="flex flex-col gap-4">
        {articulos.map((articulo) => (
          <li
            key={articulo.id}
            className="border border-gray-200 rounded-lg p-5 bg-white shadow-sm hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {articulo.title}
            </h2>
            <p className="text-gray-600 mb-3">{articulo.excerpt}</p>
            <p className="text-sm text-gray-500">
              Autor: {articulo.author?.username || "Anónimo"}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
};