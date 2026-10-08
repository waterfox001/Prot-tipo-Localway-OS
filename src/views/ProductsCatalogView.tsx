import React, { useState } from 'react';
import {
  Armchair,
  Search,
  Filter,
  Layers,
  DollarSign,
  Boxes,
  Plus,
  ShoppingBag,
  CheckCircle2,
  AlertTriangle,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Product } from '../types';
import { SectionHeader } from '../components/common/UIComponents';

export const ProductsCatalogView: React.FC = () => {
  const { products, addToCart, openQuickAction } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [search, setSearch] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const categories = [
    'Todos',
    'Cadeiras',
    'Mesas',
    'Estantes',
    'Longarinas',
    'Gaveteiros',
    'Móveis de Aço',
    'Kits',
  ];

  const filteredProducts = products.filter((p) => {
    const matchesCat = selectedCategory === 'Todos' || p.category === selectedCategory;
    const matchesSearch =
      (p.name || '').toLowerCase().includes(search.toLowerCase()) ||
      (p.sku || '').toLowerCase().includes(search.toLowerCase()) ||
      (p.subcategory || '').toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <SectionHeader
        title="Catálogo Geral & Engenharia de Produtos"
        subtitle="Mobiliário corporativo, especificações técnicas, custos industriais, margens e estoque em tempo real"
        actions={
          <button
            onClick={() => openQuickAction('inventory')}
            className="flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 dark:bg-amber-500 dark:text-slate-950 dark:hover:bg-amber-400 transition-colors shadow-2xs"
          >
            <Plus className="h-4 w-4" />
            Registrar Entrada
          </button>
        }
      />

      {/* Categories Tabs & Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Category Pill Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white dark:bg-amber-500 dark:text-slate-950 shadow-2xs'
                  : 'bg-white border border-slate-200/90 text-slate-600 hover:text-slate-900 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por produto, SKU..."
            className="w-full rounded-xl border border-slate-200/90 bg-white pl-10 pr-4 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 shadow-2xs"
          />
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filteredProducts.map((p) => (
          <div
            key={p.id}
            onClick={() => setSelectedProduct(p)}
            className="cursor-pointer group flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-4 transition-all hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700 shadow-2xs"
          >
            <div>
              {/* Product Image Showcase */}
              <div className="relative h-44 w-full rounded-xl bg-slate-50 border border-slate-100 overflow-hidden mb-3 flex items-center justify-center dark:bg-slate-800/40 dark:border-slate-800">
                {p.image ? (
                  <img
                    src={p.image}
                    alt={p.name}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <Armchair className="h-10 w-10 text-slate-300 dark:text-slate-600" />
                )}
                <div className="absolute top-2 left-2 flex items-center gap-1.5">
                  <span className="rounded-md bg-white/90 backdrop-blur-md px-2 py-0.5 text-[10px] font-mono font-bold text-slate-700 border border-slate-200/60 shadow-2xs dark:bg-slate-900/90 dark:text-slate-300 dark:border-slate-700">
                    Curva {p.abcClass}
                  </span>
                  <span className="rounded-md bg-white/90 backdrop-blur-md px-2 py-0.5 text-[10px] text-amber-700 border border-slate-200/60 font-semibold shadow-2xs dark:bg-slate-900/90 dark:text-amber-400 dark:border-slate-700">
                    {p.category}
                  </span>
                </div>
              </div>

              {/* Title & SKU */}
              <div className="text-[10px] font-mono text-slate-400 uppercase">{p.sku}</div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors line-clamp-1 mt-0.5">
                {p.name}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                {p.description}
              </p>
            </div>

            {/* Price & Stock Footer */}
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between text-xs mb-2">
                <div>
                  <div className="text-[10px] text-slate-400">Preço de Venda</div>
                  <div className="font-mono font-bold text-slate-900 dark:text-slate-100 text-sm tabular-nums">
                    R$ {p.salePrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[10px] text-slate-400">Margem</div>
                  <div className="font-mono font-semibold text-emerald-600 dark:text-emerald-400 tabular-nums">
                    {p.marginPercent.toFixed(1)}%
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] pt-1">
                <span className="text-slate-500 dark:text-slate-400">
                  Disp: <strong className="text-slate-900 dark:text-slate-100 font-mono tabular-nums">{p.stockAvailable} un.</strong>
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(p, 1);
                  }}
                  className="rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-800 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  + Carrinho B2B
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fade-in">
          <div className="relative w-full max-w-2xl rounded-2xl border border-slate-200/90 bg-white shadow-xl p-6 dark:border-slate-800 dark:bg-slate-900 space-y-4">
            <div className="flex items-start justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <span className="rounded-md bg-slate-100 text-slate-700 px-2 py-0.5 text-[10px] font-mono font-bold dark:bg-slate-800 dark:text-slate-300">
                  SKU: {selectedProduct.sku}
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-1">{selectedProduct.name}</h3>
                <p className="text-xs text-slate-500">{selectedProduct.subcategory} · {selectedProduct.brand}</p>
              </div>
              <button
                onClick={() => setSelectedProduct(null)}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 p-1"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              <div className="h-56 rounded-xl bg-slate-50 border border-slate-100 overflow-hidden flex items-center justify-center dark:bg-slate-800/40 dark:border-slate-800">
                {selectedProduct.image ? (
                  <img src={selectedProduct.image} alt={selectedProduct.name} className="h-full w-full object-cover" />
                ) : (
                  <Armchair className="h-12 w-12 text-slate-400" />
                )}
              </div>

              <div className="space-y-3">
                <div className="p-3.5 bg-slate-50/70 rounded-xl border border-slate-100 dark:bg-slate-800/40 dark:border-slate-800 space-y-1.5">
                  <div className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Estrutura de Preço & Margem</div>
                  <div className="flex justify-between font-mono">
                    <span className="text-slate-500">Custo Fornecedor:</span>
                    <span>R$ {selectedProduct.costPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-mono">
                    <span className="text-slate-500">Preço de Tabela:</span>
                    <span className="font-bold text-slate-900 dark:text-slate-100">R$ {selectedProduct.salePrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-mono border-t border-slate-200/80 dark:border-slate-700 pt-1">
                    <span className="text-slate-500">Margem Bruta:</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">{selectedProduct.marginPercent}%</span>
                  </div>
                </div>

                <div className="p-3.5 bg-slate-50/70 rounded-xl border border-slate-100 dark:bg-slate-800/40 dark:border-slate-800 space-y-1">
                  <div className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Posição de Armazenagem</div>
                  <div className="text-slate-700 dark:text-slate-300">Local: {selectedProduct.location}</div>
                  <div className="flex justify-between font-mono text-[11px] pt-1">
                    <span className="text-slate-500">Estoque: {selectedProduct.stockCurrent} un.</span>
                    <span className="text-amber-600 dark:text-amber-400">Reserva: {selectedProduct.stockReserved} un.</span>
                    <span className="font-bold text-slate-900 dark:text-slate-100">Disp: {selectedProduct.stockAvailable} un.</span>
                  </div>
                </div>

                <div className="text-slate-500 dark:text-slate-400 text-[11px]">
                  <strong>Dimensões:</strong> {selectedProduct.dimensions} · <strong>Garantia:</strong> {selectedProduct.warrantyMonths} meses
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => setSelectedProduct(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-lg dark:text-slate-300 dark:hover:bg-slate-800"
              >
                Fechar
              </button>
              <button
                onClick={() => {
                  addToCart(selectedProduct, 1);
                  setSelectedProduct(null);
                }}
                className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg dark:bg-amber-500 dark:text-slate-950 dark:hover:bg-amber-400 shadow-2xs"
              >
                + Adicionar ao Carrinho B2B
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
