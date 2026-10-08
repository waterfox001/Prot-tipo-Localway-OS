import React, { useState } from 'react';
import {
  ShoppingBag,
  Search,
  CheckCircle2,
  Trash2,
  ArrowRight,
  ShieldCheck,
  Truck,
  CreditCard,
  Armchair,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SectionHeader } from '../components/common/UIComponents';
import { PoloLogo } from '../components/common/PoloLogo';

export const EcommerceStoreView: React.FC = () => {
  const { products, cart, addToCart, removeFromCart, clearCart, addOrder } = useApp();
  const [selectedCat, setSelectedCat] = useState<string>('Todos');
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  const categories = ['Todos', 'Cadeiras', 'Mesas', 'Estantes', 'Longarinas', 'Gaveteiros', 'Kits'];

  const filtered = products.filter((p) => {
    if (selectedCat === 'Todos') return true;
    return p.category === selectedCat;
  });

  const cartTotal = cart.reduce((acc, it) => acc + it.product.salePrice * it.quantity, 0);

  const handleFinishCheckout = () => {
    addOrder({
      customerName: 'Cliente Loja Online B2B (E-commerce)',
      customerAddress: 'Av. das Nações Unidas, 14261 - São Paulo, SP',
      totalValue: cartTotal,
      itemsCount: cart.reduce((acc, it) => acc + it.quantity, 0),
      items: cart.map((it) => ({
        productId: it.product.id,
        productName: it.product.name,
        quantity: it.quantity,
        price: it.product.salePrice,
      })),
      paymentStatus: 'Pago',
    });
    setCheckoutComplete(true);
    clearCart();
    setTimeout(() => {
      setCheckoutComplete(false);
      setIsCheckoutOpen(false);
    }, 2500);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Store Brand Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-r from-orange-50/70 via-white to-slate-50 dark:from-slate-900 dark:via-slate-900/80 dark:to-slate-950">
        <div className="flex items-center gap-4">
          <PoloLogo size="md" variant="horizontal" />
          <div className="hidden sm:block border-l border-slate-300 dark:border-slate-700 pl-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400 block">Canal Corporativo B2B</span>
            <span className="text-xs text-slate-500 dark:text-slate-400">Preços diretos de fábrica com faturamento 30/60/90 para PJ</span>
          </div>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Estoque Sincronizado
          </span>
        </div>
      </div>

      <SectionHeader
        title="Loja Online & Catálogo E-Commerce B2B"
        subtitle="Canal digital de autosserviço com estoque integrado em tempo real ao armazém central"
        actions={
          <button
            onClick={() => setIsCheckoutOpen(true)}
            className="relative flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-amber-400 shadow-sm"
          >
            <ShoppingBag className="h-4 w-4" />
            <span>Meu Carrinho B2B ({cart.length})</span>
            {cart.length > 0 && (
              <span className="rounded-full bg-slate-950 text-amber-400 px-1.5 py-0.2 text-[10px] font-mono">
                R$ {cartTotal.toLocaleString('pt-BR', { minimumFractionDigits: 0 })}
              </span>
            )}
          </button>
        }
      />

      {/* Categories Filter Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-800">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCat(cat)}
            className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedCat === cat
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Showcase Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {filtered.map((prod) => (
          <div
            key={prod.id}
            className="flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-900/60 p-4 hover:border-slate-700 transition-all shadow-md group"
          >
            <div>
              <div className="relative h-44 w-full rounded-lg bg-slate-950 border border-slate-800 overflow-hidden mb-3 flex items-center justify-center">
                {prod.image ? (
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <Armchair className="h-10 w-10 text-slate-700" />
                )}
                <span className="absolute top-2 left-2 rounded bg-slate-950/80 backdrop-blur-md px-2 py-0.5 text-[10px] font-mono text-emerald-400 font-bold border border-slate-800">
                  {prod.stockAvailable} un. Pronta Entrega
                </span>
              </div>

              <span className="text-[10px] font-mono text-slate-500 uppercase">{prod.category}</span>
              <h4 className="text-xs font-bold text-slate-100 line-clamp-1 group-hover:text-amber-400 transition-colors mt-0.5">
                {prod.name}
              </h4>
              <p className="text-[11px] text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                {prod.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
              <div>
                <div className="text-[10px] text-slate-500">Valor Unitário</div>
                <div className="text-sm font-black text-slate-100 font-mono tabular-nums">
                  R$ {prod.salePrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
              </div>

              <button
                onClick={() => addToCart(prod, 1)}
                className="rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-bold text-slate-950 hover:bg-amber-400 transition-colors"
              >
                + Comprar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Cart & Checkout Modal */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl p-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-amber-500" />
                <h3 className="text-sm font-bold text-slate-100">Carrinho de Compras B2B</h3>
              </div>
              <button
                onClick={() => setIsCheckoutOpen(false)}
                className="text-slate-400 hover:text-slate-100 text-xs"
              >
                ✕
              </button>
            </div>

            {checkoutComplete ? (
              <div className="py-12 text-center space-y-3">
                <CheckCircle2 className="h-12 w-12 text-emerald-400 mx-auto animate-bounce" />
                <h4 className="text-base font-bold text-slate-100">Pedido Realizado com Sucesso!</h4>
                <p className="text-xs text-slate-400">
                  O pedido foi integrado instantaneamente ao módulo operacional da Polo Móveis.
                </p>
              </div>
            ) : cart.length > 0 ? (
              <div className="space-y-4">
                <div className="max-h-64 overflow-y-auto space-y-2 pr-1">
                  {cart.map((it) => (
                    <div
                      key={it.product.id}
                      className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs"
                    >
                      <div className="flex-1 pr-3">
                        <div className="font-bold text-slate-200">{it.product.name}</div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          {it.quantity} un. x R$ {it.product.salePrice.toLocaleString('pt-BR')}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-bold text-emerald-400 tabular-nums">
                          R$ {(it.product.salePrice * it.quantity).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </span>
                        <button
                          onClick={() => removeFromCart(it.product.id)}
                          className="text-slate-500 hover:text-rose-400"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-slate-800 pt-3 flex justify-between font-bold text-slate-100 text-sm">
                  <span>Total do Pedido:</span>
                  <span className="font-mono text-emerald-400">
                    R$ {cartTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    onClick={() => setIsCheckoutOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-slate-200"
                  >
                    Continuar Comprando
                  </button>
                  <button
                    onClick={handleFinishCheckout}
                    className="px-5 py-2 text-xs font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 rounded-lg shadow-sm"
                  >
                    Confirmar Pedido Faturado
                  </button>
                </div>
              </div>
            ) : (
              <div className="py-12 text-center text-xs text-slate-500">
                Seu carrinho está vazio no momento.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
