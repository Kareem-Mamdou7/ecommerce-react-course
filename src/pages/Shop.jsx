import { SlidersHorizontal, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductGrid from "../components/ProductGrid.jsx";
import products from "../data/products.js";

const categories = ["All", ...new Set(products.map((product) => product.category))];

function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "All",
  );
  const [sortOrder, setSortOrder] = useState("featured");

  useEffect(() => {
    setSearchTerm(searchParams.get("search") || "");
    setSelectedCategory(searchParams.get("category") || "All");
  }, [searchParams]);

  const search = searchTerm.trim().toLowerCase();
  const matchingProducts = products.filter((product) => {
    const matchesName = product.name.toLowerCase().includes(search);
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;

    return matchesName && matchesCategory;
  });

  const visibleProducts = [...matchingProducts].sort((first, second) => {
    if (sortOrder === "low-to-high") return first.price - second.price;
    if (sortOrder === "high-to-low") return second.price - first.price;
    return Number(second.featured) - Number(first.featured);
  });

  function clearFilters() {
    setSearchTerm("");
    setSelectedCategory("All");
    setSortOrder("featured");
    setSearchParams({});
  }

  return (
    <div className="shop-page page-width">
      <div className="page-intro">
        <p className="eyebrow">Good things live here</p>
        <h1>Shop all</h1>
        <p>Thoughtful little treasures, useful favorites, and a few things in between.</p>
      </div>

      <div className="shop-toolbar">
        <label className="filter-field">
          <span>Search by name</span>
          <input
            type="search"
            aria-label="Search products by name"
            placeholder="Try “tote” or “candle”"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </label>
        <label className="filter-field">
          <span>Category</span>
          <select
            aria-label="Filter by category"
            value={selectedCategory}
            onChange={(event) => {
              setSelectedCategory(event.target.value);
              if (event.target.value === "All") {
                const nextParams = new URLSearchParams(searchParams);
                nextParams.delete("category");
                setSearchParams(nextParams);
              } else {
                setSearchParams((currentParams) => {
                  const nextParams = new URLSearchParams(currentParams);
                  nextParams.set("category", event.target.value);
                  return nextParams;
                });
              }
            }}
          >
            {categories.map((category) => (
              <option value={category} key={category}>{category}</option>
            ))}
          </select>
        </label>
        <label className="filter-field">
          <span>Sort by</span>
          <select
            aria-label="Sort products"
            value={sortOrder}
            onChange={(event) => setSortOrder(event.target.value)}
          >
            <option value="featured">Featured</option>
            <option value="low-to-high">Price: low to high</option>
            <option value="high-to-low">Price: high to low</option>
          </select>
        </label>
        <button type="button" className="clear-filters" onClick={clearFilters}>
          <X size={15} aria-hidden="true" /> Clear filters
        </button>
      </div>

      <div className="shop-results-heading">
        <span><SlidersHorizontal size={16} aria-hidden="true" /> {visibleProducts.length} lovely finds</span>
      </div>
      <ProductGrid products={visibleProducts} />
    </div>
  );
}

export default Shop;
