import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Eye, MessageSquare, Check, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product } from '../data/initialData';
import { SafeImage } from './SafeImage';

interface ProductsSectionProps {
  externalCategory?: string;
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({ externalCategory }) => {
  const { products, business, addToCart } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeFinish, setActiveFinish] = useState<string>('');
  const [addedNotice, setAddedNotice] = useState<string | null>(null);

  useEffect(() => {
    if (externalCategory) {
      setSelectedCategory(externalCategory);
    }
  }, [externalCategory]);

  const categories = [
    { id: 'all', label: 'All Hardware' },
    { id: 'door-handles', label: 'Door Handles' },
    { id: 'locks', label: 'Locks & Security' },
    { id: 'cabinet', label: 'Cabinet & Kitchen' },
    { id: 'sanitary', label: 'Bathroom & Sanitary' }
  ];

  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === 'all' || p.categoryKey === selectedCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.material.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleOpenModal = (prod: Product) => {
    setSelectedProduct(prod);
    setActiveFinish(prod.finishes[0] || 'Standard');
  };

  const handleAdd = (prod: Product, finish?: string) => {
    addToCart(prod, 1, finish || prod.finishes[0]);
    setAddedNotice(prod.id);
    setTimeout(() => {
      setAddedNotice(null);
    }, 2000);
  };

  return (
    <section id="products" className="py-20 bg-[#FBFBFC] text-[#191C21]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs uppercase tracking-widest text-[#D97706] font-semibold mb-2">
            Showroom Collections & Catalog
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-[#17191E] leading-tight mb-4">
            Precision Architectural Hardware & Locksets.
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Engineered for longevity, tactile luxury, and seamless performance. Browse our featured lines or request custom trade quotations for your project.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-200">
          {/* Functional Button Segmented Filter Controls */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#17191E] text-white shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search handles, locks, brass..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#D97706] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-xl p-12 text-center">
            <p className="text-slate-500 text-sm mb-4">No hardware items match your current filter or search query.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 text-xs font-semibold text-[#17191E] bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((prod) => (
              <div
                key={prod.id}
                className="bg-white border border-slate-200/90 rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 flex flex-col group"
              >
                {/* Product Image Slot */}
                <div className="relative bg-slate-100 h-56 overflow-hidden">
                  <SafeImage
                    src={prod.image}
                    alt={prod.name}
                    fallbackTitle={prod.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="text-[11px] font-semibold text-slate-800 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded shadow-xs">
                      {prod.category}
                    </span>
                  </div>

                  {/* Quick Action Overlay */}
                  <button
                    onClick={() => handleOpenModal(prod)}
                    className="absolute bottom-3 right-3 p-2 bg-white/90 hover:bg-white text-slate-800 rounded-lg shadow-sm transition-transform active:scale-95 text-xs font-medium flex items-center gap-1.5 cursor-pointer"
                    title="View technical details"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Specs</span>
                  </button>
                </div>

                {/* Content Area */}
                <div className="p-5 flex flex-col flex-1">
                  <div className="text-[11px] text-slate-500 font-mono mb-1.5">
                    SKU: {prod.sku}
                  </div>
                  <h3 className="text-base font-semibold text-[#17191E] font-display line-clamp-1 mb-2">
                    {prod.name}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                    {prod.description}
                  </p>

                  <div className="text-xs text-slate-500 space-y-1 mb-4 pt-3 border-t border-slate-100 mt-auto">
                    <div>
                      <span className="font-medium text-slate-700">Material:</span> {prod.material}
                    </div>
                    <div className="truncate">
                      <span className="font-medium text-slate-700">Finishes:</span> {prod.finishes.join(', ')}
                    </div>
                  </div>

                  {/* Price & Primary Inquiry Actions */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Est. Trade Price</span>
                      <div className="text-lg font-bold font-mono tabular-nums text-[#17191E]">
                        ₹{prod.price.toLocaleString('en-IN')}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleAdd(prod)}
                        className={`p-2 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center gap-1 ${
                          addedNotice === prod.id
                            ? 'bg-emerald-600 text-white'
                            : 'bg-[#17191E] text-white hover:bg-slate-800'
                        }`}
                        title="Add to quotation list"
                        aria-label="Add to quotation list"
                      >
                        {addedNotice === prod.id ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span className="text-[11px]">Added</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-4 h-4" />
                            <span className="text-[11px] font-semibold hidden sm:inline">Add to Quote</span>
                          </>
                        )}
                      </button>

                      <a
                        href={`https://wa.me/${business.whatsappNumber}?text=Hello%20Classic%20Hardware%2C%20I%20am%20inquiring%20about%20${encodeURIComponent(prod.name)}%20(SKU:%20${prod.sku})`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg transition-colors"
                        title="Inquire via WhatsApp"
                      >
                        <MessageSquare className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Product Details & Specifications Modal */}
        {selectedProduct && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase tracking-wider text-[#D97706] font-semibold">
                    Technical Specifications
                  </span>
                  <span className="text-slate-400" aria-hidden="true">·</span>
                  <span className="text-xs font-mono text-slate-500">{selectedProduct.sku}</span>
                </div>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="p-1 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto max-h-[80vh]">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div className="rounded-xl overflow-hidden bg-slate-100 border border-slate-200 h-64">
                    <SafeImage
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      fallbackTitle={selectedProduct.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold font-display text-[#17191E] mb-2">
                        {selectedProduct.name}
                      </h3>
                      <div className="text-2xl font-bold font-mono text-[#17191E] mb-4">
                        ₹{selectedProduct.price.toLocaleString('en-IN')}
                        <span className="text-xs text-slate-500 font-normal ml-2 font-sans">
                          (Trade rate / piece)
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed mb-4">
                        {selectedProduct.description}
                      </p>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-2">
                        Available Architectural Finishes:
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {selectedProduct.finishes.map((fin) => (
                          <button
                            key={fin}
                            onClick={() => setActiveFinish(fin)}
                            className={`px-3 py-1.5 text-xs rounded-md font-medium border transition-colors cursor-pointer ${
                              activeFinish === fin
                                ? 'bg-[#17191E] text-white border-[#17191E]'
                                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            {fin}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                    Engineering & Performance Highlights
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 mb-6">
                    {selectedProduct.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-slate-100">
                    <button
                      onClick={() => {
                        handleAdd(selectedProduct, activeFinish);
                        setSelectedProduct(null);
                      }}
                      className="w-full sm:w-auto flex-1 py-3 px-6 bg-[#17191E] hover:bg-slate-800 text-white font-semibold rounded-lg text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      Add to Quotation List ({activeFinish})
                    </button>

                    <a
                      href={`https://wa.me/${business.whatsappNumber}?text=Hello%20Classic%20Hardware%2C%20I%20am%20inquiring%20about%20${encodeURIComponent(selectedProduct.name)}%20in%20finish%20${encodeURIComponent(activeFinish)}%20(SKU:%20${selectedProduct.sku})`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto py-3 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg text-xs transition-colors flex items-center justify-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4" />
                      Chat on WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
