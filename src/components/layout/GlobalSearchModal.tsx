import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  X,
  Armchair,
  Users,
  FileText,
  Boxes,
  Truck,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ViewId } from '../../types';

export const GlobalSearchModal: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    products,
    customers,
    orders,
    quotes,
    setActiveView,
  } = useApp();

  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(!isSearchOpen);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const normalized = query.toLowerCase().trim();

  const matchedProducts = query
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(normalized) ||
          p.sku.toLowerCase().includes(normalized) ||
          p.category.toLowerCase().includes(normalized)
      )
    : [];

  const matchedCustomers = query
    ? customers.filter(
        (c) =>
          c.name.toLowerCase().includes(normalized) ||
          c.document.includes(normalized) ||
          c.contactPerson.toLowerCase().includes(normalized)
      )
    : [];

  const matchedOrders = query
    ? orders.filter(
        (o) =>
          o.code.toLowerCase().includes(normalized) ||
          o.customerName.toLowerCase().includes(normalized) ||
          o.trackingCode.toLowerCase().includes(normalized)
      )
    : [];

  const matchedQuotes = query
    ? quotes.filter(
        (q) =>
          q.code.toLowerCase().includes(normalized) ||
          q.customerName.toLowerCase().includes(normalized)
      )
    : [];

  const quickNavigations: Array<{ label: string; view: ViewId; icon: any }> = [
    { label: 'Ir para Dashboard Executivo', view: 'dashboard', icon: TrendingUp },
    { label: 'Ir para CRM & Funil de Vendas', view: 'crm', icon: Users },
    { label: 'Ir para Catálogo de Produtos', view: 'products', icon: Armchair },
    { label: 'Ir para Estoque & Curva ABC', view: 'inventory', icon: Boxes },
    { label: 'Ir para Logística & Rastreamento', view: 'logistics', icon: Truck },
  ];

  const handleSelectView = (view: ViewId) => {
    setActiveView(view);
    setIsSearchOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl overflow-hidden">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-800 gap-3">
          <Search className="h-5 w-5 text-amber-500 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por produto (ex: Vertex), cliente (ex: Studio Alpha), pedido ou código..."
            className="flex-1 bg-transparent text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-200"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block rounded border border-slate-700 bg-slate-800 px-2 py-0.5 text-[10px] font-mono text-slate-400">
            ESC
          </kbd>
        </div>

        {/* Results Body */}
        <div className="max-h-[60vh] overflow-y-auto p-3 space-y-4">
          {!query ? (
            <div className="py-2">
              <div className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Acessos Rápidos do Sistema
              </div>
              <div className="space-y-1">
                {quickNavigations.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectView(item.view)}
                      className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs text-slate-300 hover:bg-slate-800 hover:text-amber-400 transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="h-4 w-4 text-slate-400" />
                        <span>{item.label}</span>
                      </div>
                      <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <>
              {/* Products Section */}
              {matchedProducts.length > 0 && (
                <div>
                  <div className="px-3 pb-1.5 text-[11px] font-bold uppercase tracking-wider text-amber-400 flex items-center justify-between">
                    <span>Produtos Encontrados ({matchedProducts.length})</span>
                    <span className="text-[10px] text-slate-400 font-normal">Estoque & Preço</span>
                  </div>
                  <div className="space-y-1">
                    {matchedProducts.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => handleSelectView('products')}
                        className="flex w-full items-center justify-between rounded-lg p-2.5 text-left hover:bg-slate-800/80 transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-md bg-slate-800 flex items-center justify-center shrink-0 border border-slate-700/60 overflow-hidden">
                            {p.image ? (
                              <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
                            ) : (
                              <Armchair className="h-4 w-4 text-amber-400" />
                            )}
                          </div>
                          <div>
                            <div className="text-xs font-semibold text-slate-100 group-hover:text-amber-300">
                              {p.name}
                            </div>
                            <div className="text-[11px] text-slate-400 font-mono">
                              {p.sku} · {p.category} · Curva {p.abcClass}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs font-bold text-slate-200 tabular-nums">
                            R$ {p.salePrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </div>
                          <div className="text-[11px] text-emerald-400 tabular-nums">
                            {p.stockAvailable} un. disponíveis
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Customers Section */}
              {matchedCustomers.length > 0 && (
                <div>
                  <div className="px-3 pb-1.5 text-[11px] font-bold uppercase tracking-wider text-sky-400">
                    Clientes Cadastrados ({matchedCustomers.length})
                  </div>
                  <div className="space-y-1">
                    {matchedCustomers.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => handleSelectView('customers')}
                        className="flex w-full items-center justify-between rounded-lg p-2.5 text-left hover:bg-slate-800/80 transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-md bg-sky-950/60 border border-sky-800/40 flex items-center justify-center shrink-0 text-sky-400 font-bold text-xs">
                            {c.type}
                          </div>
                          <div>
                            <div className="text-xs font-semibold text-slate-100 group-hover:text-sky-300">
                              {c.name}
                            </div>
                            <div className="text-[11px] text-slate-400">
                              {c.document} · Contato: {c.contactPerson}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs font-bold text-slate-200 tabular-nums">
                            R$ {c.totalSpent.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </div>
                          <div className="text-[11px] text-slate-400">{c.ordersCount} pedidos</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Orders Section */}
              {matchedOrders.length > 0 && (
                <div>
                  <div className="px-3 pb-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                    Pedidos Operacionais ({matchedOrders.length})
                  </div>
                  <div className="space-y-1">
                    {matchedOrders.map((o) => (
                      <button
                        key={o.id}
                        onClick={() => handleSelectView('operational')}
                        className="flex w-full items-center justify-between rounded-lg p-2.5 text-left hover:bg-slate-800/80 transition-colors group"
                      >
                        <div>
                          <div className="text-xs font-semibold text-slate-100">
                            Pedido {o.code} — {o.customerName}
                          </div>
                          <div className="text-[11px] text-slate-400 font-mono">
                            Rastreio: {o.trackingCode} · Status: {o.operationalStatus}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs font-bold text-emerald-400 tabular-nums">
                            R$ {o.totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </div>
                          <div className="text-[10px] text-slate-400">{o.paymentStatus}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* No results message */}
              {matchedProducts.length === 0 &&
                matchedCustomers.length === 0 &&
                matchedOrders.length === 0 &&
                matchedQuotes.length === 0 && (
                  <div className="py-12 text-center text-slate-400 text-xs">
                    Nenhum resultado encontrado para "<span className="text-slate-200">{query}</span>".
                    <div className="mt-1 text-slate-400">Tente buscar por nome de produto, cliente, SKU ou pedido.</div>
                  </div>
                )}
            </>
          )}
        </div>

        {/* Modal Footer info */}
        <div className="px-4 py-2.5 bg-slate-950/70 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
          <span>Pressione [ESC] para fechar</span>
          <span className="font-mono text-orange-500/80">Polo Móveis · Busca Global</span>
        </div>
      </div>
    </div>
  );
};
