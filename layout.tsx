"use client";

import { useMemo, useState } from "react";
import "./shop.css";

const products = [
  { name: "The Nocturne", type: "Contemporary / Solo", size: "Child L", price: 248, image: "/product-burgundy.png", tier: "signature", badge: "Editor’s choice", tags: ["contemporary", "lyrical", "burgundy", "dramatic"] },
  { name: "Midnight Crystal", type: "Jazz / Competition", size: "Adult XS", price: 195, image: "/product-black.png", tier: "studio", badge: "Just in", tags: ["jazz", "black", "crystal", "dramatic"] },
  { name: "Blue Hour", type: "Lyrical / Solo", size: "Child M", price: 168, image: "/inventory-blue.png", tier: "studio", badge: "New to Ginge", tags: ["lyrical", "contemporary", "blue", "soft"] },
  { name: "Gilded Line", type: "Jazz / Solo", size: "Teen S", price: 285, image: "/inventory-gold.png", tier: "signature", badge: "Rare find", tags: ["jazz", "gold", "black", "bold"] },
  { name: "First Position", type: "Character / Solo", size: "Child XL", price: 225, image: "/inventory-march.png", tier: "signature", badge: "The theme edit", tags: ["marching band", "character", "red", "structured"] },
  { name: "Afterglow", type: "Contemporary / Duo", size: "Adult S", price: 92, image: "/product-burgundy.png", tier: "essentials", badge: "Under $100", tags: ["contemporary", "burgundy", "duo", "dramatic"] },
];

const filters = [
  ["Collection", ["Signature Edit", "Studio Edit", "Essentials Edit"]],
  ["Dance", ["Contemporary", "Jazz", "Lyrical", "Character", "Musical Theatre"]],
  ["Age & size", ["Child", "Tween", "Teen", "Adult"]],
  ["Color", ["Black", "Blue", "Burgundy", "Gold", "Red"]],
  ["Price", ["Under $100", "$100–$200", "$200+"]],
  ["Condition", ["Pristine", "Excellent", "Performance Ready"]],
] as const;

export default function ShopPage() {
  const [query, setQuery] = useState("");
  const [activeTier, setActiveTier] = useState("all");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [openFilter, setOpenFilter] = useState("Collection");
  const [saved, setSaved] = useState<string[]>([]);

  const visibleProducts = useMemo(() => {
    const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    return products.filter((product) => {
      const matchesTier = activeTier === "all" || product.tier === activeTier;
      const searchable = `${product.name} ${product.type} ${product.tags.join(" ")}`.toLowerCase();
      const matchesQuery = !terms.length || terms.every((term) => searchable.includes(term));
      return matchesTier && matchesQuery;
    });
  }, [query, activeTier]);

  function toggleSaved(name: string) {
    setSaved((current) => current.includes(name) ? current.filter((item) => item !== name) : [...current, name]);
  }

  return (
    <main className="shop-page">
      <div className="shop-announcement">Complimentary seller concierge for opening members</div>
      <header className="shop-nav">
        <a className="wordmark" href="/">GINGE<span>.</span></a>
        <nav aria-label="Shop navigation"><a href="/shop">Shop</a><a href="/sell">Sell</a><a href="/#story">Our standard</a></nav>
        <div><button aria-label="Search inventory" onClick={() => document.getElementById("inventory-search")?.focus()}>Search</button><a href="/#access">Request access</a></div>
      </header>

      <section className="catalog-intro">
        <p className="eyebrow">The Ginge collection</p>
        <div><h1>Find the piece<br /><em>the story needs.</em></h1><p>Curated performance wear selected for design, condition, and stage presence.</p></div>
        <label className="concept-search" htmlFor="inventory-search">
          <span>Search by dance, color, mood, or idea</span>
          <div><input id="inventory-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try “marching band solo”"/><b>↗</b></div>
        </label>
      </section>

      <div className="edit-tabs" role="group" aria-label="Shop collections">
        {[["all","All arrivals"],["signature","Signature Edit"],["studio","Studio Edit"],["essentials","Essentials Edit"]].map(([value,label]) => (
          <button key={value} className={activeTier === value ? "active" : ""} onClick={() => setActiveTier(value)}>{label}</button>
        ))}
      </div>

      <div className="catalog-shell">
        <button className="mobile-filter-button" onClick={() => setFiltersOpen((value) => !value)}>Filters <span>+</span></button>
        <aside className={filtersOpen ? "filter-sidebar open" : "filter-sidebar"}>
          <div className="filter-title"><span>Refine</span><button onClick={() => { setQuery(""); setActiveTier("all"); }}>Clear all</button></div>
          {filters.map(([title, options]) => (
            <section className="filter-group" key={title}>
              <button onClick={() => setOpenFilter(openFilter === title ? "" : title)} aria-expanded={openFilter === title}>{title}<span>{openFilter === title ? "−" : "+"}</span></button>
              {openFilter === title && <div>{options.map((option) => <label key={option}><input type="checkbox"/><i />{option}</label>)}</div>}
            </section>
          ))}
        </aside>

        <section className="inventory-area" aria-live="polite">
          <div className="inventory-toolbar"><p>{visibleProducts.length} exceptional pieces</p><label>Sort by <select aria-label="Sort inventory"><option>Curated</option><option>Newest</option><option>Price: low to high</option><option>Price: high to low</option></select></label></div>
          {visibleProducts.length ? (
            <div className="inventory-grid">
              {visibleProducts.map((product, index) => (
                <article className={index === 0 ? "inventory-card lead" : "inventory-card"} key={product.name}>
                  <div className="inventory-image" style={{backgroundImage:`url(${product.image})`}}>
                    <span className="inventory-badge">{product.badge}</span>
                    <button className={saved.includes(product.name) ? "save saved" : "save"} aria-label={`Save ${product.name}`} onClick={() => toggleSaved(product.name)}>{saved.includes(product.name) ? "♥" : "♡"}</button>
                  </div>
                  <div className="inventory-details">
                    <div><p>{product.type}</p><h2>{product.name}</h2><span>{product.size} · Excellent</span></div>
                    <strong>${product.price}</strong>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-state"><p>No exact match—yet.</p><span>Save this search and Ginge can alert you when the right piece arrives.</span><button>Save “{query}”</button></div>
          )}
        </section>
      </div>
      <section className="catalog-cta"><p>Can’t find the story yet?</p><h2>Tell Ginge what you’re<br /><em>looking for.</em></h2><a href="/#access">Create a costume request ↗</a></section>
    </main>
  );
}
