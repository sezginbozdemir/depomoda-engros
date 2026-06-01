import { ALL_KEYWORDS, SortKey } from "../data/products";

interface FilterBarProps {
  filter: string | "all";
  setFilter: (key: string | "all") => void;
  sortKey: SortKey;
  setSortKey: (key: SortKey) => void;
  totalVisible: number;
  totalFiltered: number;
}

export function FilterBar({
  filter,
  setFilter,
  sortKey,
  setSortKey,
  totalVisible,
  totalFiltered,
}: FilterBarProps) {
  return (
    <div className="bg-white border-b border-gray-200 sticky top-14 z-40">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        {/* Left: filter + count */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <label
              htmlFor="size-filter"
              className="text-sm font-semibold text-gray-600 whitespace-nowrap"
            >
              Filtrează:
            </label>
            <select
              id="size-filter"
              value={filter}
              onChange={(e) => {
                const v = e.target.value;
                setFilter(v === "all" ? "all" : v);
              }}
              className="filter-select"
            >
              <option value="all">Toate</option>
              {ALL_KEYWORDS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <span className="text-sm text-gray-500">
            {totalFiltered === totalVisible
              ? `${totalVisible} produse`
              : `${totalVisible} din ${totalFiltered} produse`}
          </span>
        </div>

        {/* Right: sort */}
        <div className="flex items-center gap-2">
          <label
            htmlFor="sort-select"
            className="text-sm font-semibold text-gray-600 whitespace-nowrap"
          >
            Sortează după:
          </label>
          <select
            id="sort-select"
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value as SortKey)}
            className="filter-select"
          >
            <option value="code-asc">Cod produs (A-Z)</option>
            <option value="code-desc">Cod produs (Z-A)</option>
            <option value="price-asc">Preț (mic → mare)</option>
            <option value="price-desc">Preț (mare → mic)</option>
          </select>
        </div>
      </div>
    </div>
  );
}
