import { Header } from "./components/Header";
import { FilterBar } from "./components/FilterBar";
import { ProductCard } from "./components/ProductCard";
import { Footer } from "./components/Footer";
import { useProductCatalog } from "./hooks/useProductCatalog";

export default function App() {
  const {
    visible,
    filter,
    setFilter,
    sortKey,
    setSortKey,
    totalFiltered,
    totalVisible,
    hasMore,
    loadMore,
  } = useProductCatalog();

  return (
    <div className="min-h-screen bg-gray-100 font-body">
      <Header />

      <FilterBar
        filter={filter}
        setFilter={setFilter}
        sortKey={sortKey}
        setSortKey={setSortKey}
        totalVisible={totalVisible}
        totalFiltered={totalFiltered}
      />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero title */}
        <div className="text-center mb-8">
          <h1 className="font-heading font-900 text-5xl md:text-6xl tracking-tight uppercase text-black">
            STOC DISPONIBIL
          </h1>
          <p className="text-gray-500 mt-2 text-sm tracking-wide">
            Prețuri de lichidare – stoc limitat!
          </p>
        </div>

        {/* Product grid */}
        {visible.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {visible.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>

            {/* Load more */}
            {hasMore && (
              <div className="flex justify-center mt-10">
                <button
                  onClick={loadMore}
                  className="flex items-center gap-2 border-2 border-black text-black font-heading font-700 
                             text-sm tracking-widest uppercase px-8 py-3 rounded
                             hover:bg-black hover:text-white transition-all duration-200"
                >
                  ÎNCARCĂ MAI MULTE MODELE
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20 text-gray-400">
            <p className="text-5xl mb-4">🔍</p>
            <p className="font-heading font-700 text-2xl text-gray-600">
              Niciun produs găsit
            </p>
            <p className="text-sm mt-1">Încearcă o altă mărime</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
