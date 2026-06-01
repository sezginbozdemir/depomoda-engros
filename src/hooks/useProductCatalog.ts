import { useState, useMemo } from "react";
import { products, sortProducts, SortKey } from "../data/products";
import { CONFIG } from "../config";

export function useProductCatalog() {
  const [filter, setFilter] = useState<string | "all">("all");
  const [sortKey, setSortKey] = useState<SortKey>("code-asc");
  const [visibleCount, setVisibleCount] = useState<number>(CONFIG.initialLoad);

  const filtered = useMemo(() => {
    if (!filter || filter === "all") return products;

    return products.filter(
      (p) => p.brand.toLowerCase() === filter.toLowerCase(),
    );
  }, [filter]);

  const sorted = useMemo(
    () => sortProducts(filtered, sortKey),
    [filtered, sortKey],
  );

  // Apply pagination
  const visible = useMemo(
    () => sorted.slice(0, visibleCount),
    [sorted, visibleCount],
  );

  const hasMore = visibleCount < sorted.length;

  function loadMore() {
    setVisibleCount((c) => c + CONFIG.loadMoreCount);
  }

  function handleSetFilter(key: string | "all") {
    setFilter(key);
    setVisibleCount(CONFIG.initialLoad);
  }

  function handleSetSortKey(key: SortKey) {
    setSortKey(key);
    setVisibleCount(CONFIG.initialLoad);
  }

  return {
    visible,
    filter,
    setFilter: handleSetFilter,
    sortKey,
    setSortKey: handleSetSortKey,
    totalFiltered: sorted.length,
    totalVisible: visible.length,
    hasMore,
    loadMore,
  };
}
