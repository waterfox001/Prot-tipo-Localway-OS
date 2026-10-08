import React, { useState } from 'react';
import {
  FileText,
  Plus,
  CheckCircle2,
  Trash2,
  Printer,
  Send,
  Eye,
  Building,
  DollarSign,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Quote, QuoteItem } from '../types';
import { SectionHeader } from '../components/common/UIComponents';
import { PoloLogo } from '../components/common/PoloLogo';

export const QuotesBuilderView: React.FC = () => {
  const { quotes, products, customers, company, addQuote, approveQuote } = useApp();
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(quotes[0] || null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  // New quote generator states
  const [selectedCustId, setSelectedCustId] = useState(customers[0]?.id || '');
  const [quoteItems, setQuoteItems] = useState<QuoteItem[]>([
    {
      productId: products[0].id,
      productName: products[0].name,
      sku: products[0].sku,
      quantity: 10,
      unitPrice: products[0].salePrice,
      discountPercent: 5,
      unitCost: products[0].costPrice,
      total: products[0].salePrice * 10 * 0.95,
    },
  ]);
  const [freight, setFreight] = useState(550);
  const [assembly, setAssembly] = useState(800);
  const [paymentTerms, setPaymentTerms] = useState('Entrada 30% + Saldo 30/60 dias via boleto bancário');

  const addItemToQuote = () => {
    const defaultProd = products[1] || products[0];
    setQuoteItems([
      ...quoteItems,
      {
        productId: defaultProd.id,
        productName: defaultProd.name,
        sku: defaultProd.sku,
        quantity: 5,
        unitPrice: defaultProd.salePrice,
        discountPercent: 0,
        unitCost: defaultProd.costPrice,
        total: defaultProd.salePrice * 5,
      },
    ]);
  };

  const removeItem = (index: number) => {
    setQuoteItems(quoteItems.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, field: keyof QuoteItem, value: any) => {
    const updated = [...quoteItems];
    const item = { ...updated[index], [field]: value };

    if (field === 'productId') {
      const prod = products.find((p) => p.id === value);
      if (prod) {
        item.productName = prod.name;
        item.sku = prod.sku;
        item.unitPrice = prod.salePrice;
        item.unitCost = prod.costPrice;
      }
    }

    const rawTotal = item.unitPrice * item.quantity;
    const discountVal = (rawTotal * (item.discountPercent || 0)) / 100;
    item.total = rawTotal - discountVal;

    updated[index] = item;
    setQuoteItems(updated);
  };

  const rawSubtotal = quoteItems.reduce((acc, it) => acc + it.unitPrice * it.quantity, 0);
  const totalDiscount = quoteItems.reduce((acc, it) => acc + (it.unitPrice * it.quantity * it.discountPercent) / 100, 0);
  const totalCost = quoteItems.reduce((acc, it) => acc + (it.unitCost || 0) * it.quantity, 0);
  const finalTotal = rawSubtotal - totalDiscount + freight + assembly;
  const grossMargin = finalTotal > 0 ? ((finalTotal - totalCost) / finalTotal) * 100 : 0;

  const handleSaveQuote = () => {
    const cust = customers.find((c) => c.id === selectedCustId) || customers[0];
    addQuote({
      customerId: cust.id,
      customerName: cust.name,
      items: quoteItems,
      subtotal: rawSubtotal,
      discountTotal: totalDiscount,
      freightCost: freight,
      assemblyCost: assembly,
      total: finalTotal,
      totalCost,
      grossMarginPercent: Number(grossMargin.toFixed(1)),
      paymentTerms,
    });
    setIsCreatingNew(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <SectionHeader
        title="Gerador de Orçamentos & Propostas Comerciais"
        subtitle="Elaboração de propostas corporativas com cálculo instantâneo de margem, frete e montagem"
        actions={
          <button
            onClick={() => setIsCreatingNew(true)}
            className="flex items-center gap-1.5 rounded-lg bg-amber-500 px-3.5 py-2 text-xs font-bold text-slate-950 hover:bg-amber-400 transition-colors shadow-sm"
          >
            <Plus className="h-4 w-4" />
            + Elaborar Nova Proposta
          </button>
        }
      />

      {isCreatingNew ? (
        /* PROPOSAL CREATOR FORM */
        <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-base font-bold text-slate-100">
                Nova Proposta Comercial Polo Móveis
              </h3>
              <p className="text-xs text-slate-400">
                Preencha os itens solicitados para gerar a proposta com margem em tempo real
              </p>
            </div>
            <button
              onClick={() => setIsCreatingNew(false)}
              className="text-xs text-slate-400 hover:text-slate-200"
            >
              Cancelar
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Cliente Corporativo
              </label>
              <select
                value={selectedCustId}
                onChange={(e) => setSelectedCustId(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 focus:border-amber-500 focus:outline-none"
              >
                {customers.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.type})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Condições de Faturamento
              </label>
              <input
                type="text"
                value={paymentTerms}
                onChange={(e) => setPaymentTerms(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 focus:border-amber-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Items Table */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                Itens da Proposta ({quoteItems.length})
              </span>
              <button
                type="button"
                onClick={addItemToQuote}
                className="text-xs text-amber-400 font-bold hover:underline flex items-center gap-1"
              >
                <Plus className="h-3.5 w-3.5" /> Adicionar Outro Produto
              </button>
            </div>

            <div className="space-y-2">
              {quoteItems.map((item, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-12 gap-3 items-center rounded-lg border border-slate-800 bg-slate-950/80 p-3 text-xs"
                >
                  <div className="col-span-5">
                    <select
                      value={item.productId}
                      onChange={(e) => updateItem(idx, 'productId', e.target.value)}
                      className="w-full rounded border border-slate-700 bg-slate-900 px-2 py-1 text-xs text-slate-100 focus:outline-none"
                    >
                      {products.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name} (Tabela: R$ {p.salePrice})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-span-2">
                    <input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(e) => updateItem(idx, 'quantity', Number(e.target.value))}
                      className="w-full rounded border border-slate-700 bg-slate-900 px-2 py-1 text-xs text-slate-100 focus:outline-none"
                      placeholder="Qtd"
                    />
                  </div>

                  <div className="col-span-2">
                    <input
                      type="number"
                      min={0}
                      max={30}
                      value={item.discountPercent}
                      onChange={(e) => updateItem(idx, 'discountPercent', Number(e.target.value))}
                      className="w-full rounded border border-slate-700 bg-slate-900 px-2 py-1 text-xs text-slate-100 focus:outline-none"
                      placeholder="Desc %"
                    />
                  </div>

                  <div className="col-span-2 text-right font-mono font-bold text-emerald-400 tabular-nums">
                    R$ {(item.total ?? item.totalPrice ?? 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </div>

                  <div className="col-span-1 text-center">
                    <button
                      type="button"
                      onClick={() => removeItem(idx)}
                      className="text-slate-500 hover:text-rose-400"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Costs, Freight and Margins Calculation Bar */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800">
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Frete Dedicado (R$)</label>
              <input
                type="number"
                value={freight}
                onChange={(e) => setFreight(Number(e.target.value))}
                className="w-full rounded border border-slate-700 bg-slate-900 px-2.5 py-1 text-xs text-slate-100 font-mono"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Montagem Técnica (R$)</label>
              <input
                type="number"
                value={assembly}
                onChange={(e) => setAssembly(Number(e.target.value))}
                className="w-full rounded border border-slate-700 bg-slate-900 px-2.5 py-1 text-xs text-slate-100 font-mono"
              />
            </div>
            <div>
              <div className="text-[11px] text-slate-400 mb-1">Margem Bruta Estimada</div>
              <div className="text-base font-bold text-amber-400 font-mono tabular-nums">
                {grossMargin.toFixed(1)}%
              </div>
            </div>
            <div className="text-right">
              <div className="text-[11px] text-slate-400 mb-1">Total da Proposta</div>
              <div className="text-xl font-black text-emerald-400 font-mono tabular-nums">
                R$ {finalTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={() => setIsCreatingNew(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-slate-100"
            >
              Cancelar
            </button>
            <button
              onClick={handleSaveQuote}
              className="px-5 py-2 text-xs font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 rounded-lg shadow-sm"
            >
              Salvar e Emitir Proposta
            </button>
          </div>
        </div>
      ) : (
        /* PROPOSALS LIST & OFFICIAL VIEWER */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quotes List Sidebar */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Propostas Recentes ({quotes.length})
            </div>
            {quotes.map((q) => (
              <div
                key={q.id}
                onClick={() => setSelectedQuote(q)}
                className={`cursor-pointer rounded-xl border p-4 transition-all ${
                  selectedQuote?.id === q.id
                    ? 'border-amber-500 bg-slate-900/90 shadow-md'
                    : 'border-slate-800 bg-slate-950/60 hover:border-slate-700 hover:bg-slate-900/50'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-mono text-xs font-bold text-amber-400">{q.code}</span>
                  <span
                    className={`rounded px-1.5 py-0.5 text-[10px] font-semibold ${
                      q.status === 'Aprovada'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}
                  >
                    {q.status}
                  </span>
                </div>

                <div className="text-xs font-bold text-slate-100">{q.customerName || 'Cliente'}</div>
                <div className="text-[11px] text-slate-400 mt-1">
                  Validade: {q.validUntil || '30 dias'} · Consultor: {(q.salesperson || 'Consultor Polo').split(' ')[0]}
                </div>

                <div className="mt-3 flex items-center justify-between border-t border-slate-800/60 pt-2 text-xs">
                  <span className="text-[10px] text-slate-500">Margem: {q.grossMarginPercent ?? 45}%</span>
                  <span className="font-mono font-bold text-emerald-400 tabular-nums">
                    R$ {(q.total || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Official Proposal Layout (Letterhead style) */}
          <div className="lg:col-span-2 rounded-2xl border border-slate-800 bg-slate-900/70 p-6 md:p-8 space-y-6 shadow-2xl">
            {selectedQuote ? (
              <>
                {/* Official Letterhead com PoloLogo */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
                  <div>
                    <div className="flex items-center gap-3">
                      <PoloLogo size="md" variant="horizontal" theme="dark" />
                    </div>
                    <p className="text-[11px] text-slate-400 mt-2 font-mono">
                      CNPJ: {company.cnpj} · {company.headquarters}
                    </p>
                  </div>

                  <div className="text-right">
                    <div className="text-xs uppercase font-bold text-slate-400">Proposta Comercial Oficial</div>
                    <div className="text-lg font-black text-amber-400 font-mono">{selectedQuote.code}</div>
                    <div className="text-[11px] text-slate-400">Emissão: {selectedQuote.date}</div>
                  </div>
                </div>

                {/* Client Box */}
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Cliente / Destinatário
                  </div>
                  <div className="text-sm font-bold text-slate-100">{selectedQuote.customerName}</div>
                  <div className="mt-1 text-xs text-slate-400">
                    Condições: <span className="text-slate-200">{selectedQuote.paymentTerms}</span> · Prazo de Entrega: {selectedQuote.deliveryDays} dias úteis
                  </div>
                </div>

                {/* Proposal Items Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead>
                      <tr className="border-b border-slate-800 text-[11px] uppercase tracking-wider text-slate-400">
                        <th className="py-2.5">Item / Descrição</th>
                        <th className="py-2.5 text-center">Qtd</th>
                        <th className="py-2.5 text-right">Unitário</th>
                        <th className="py-2.5 text-center">Desc.</th>
                        <th className="py-2.5 text-right">Total (R$)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 font-mono">
                      {(selectedQuote.items || []).map((item, idx) => (
                        <tr key={idx} className="text-slate-200">
                          <td className="py-3 font-sans">
                            <div className="font-semibold text-slate-100">{item.productName || 'Item Polo'}</div>
                            <div className="text-[10px] text-slate-400">{item.sku || 'SKU-000'}</div>
                          </td>
                          <td className="py-3 text-center">{item.quantity || 1}</td>
                          <td className="py-3 text-right">R$ {(item.unitPrice || 0).toLocaleString('pt-BR')}</td>
                          <td className="py-3 text-center text-amber-400">{item.discountPercent || 0}%</td>
                          <td className="py-3 text-right font-bold text-slate-100">
                            R$ {((item.total ?? (item.unitPrice * item.quantity * (1 - (item.discountPercent || 0) / 100))) || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Financial Summary */}
                <div className="border-t border-slate-800 pt-4 flex flex-col sm:flex-row justify-between gap-4">
                  <div className="text-xs text-slate-400 max-w-sm">
                    <p className="font-semibold text-slate-300 mb-1">Garantia & Condições Polo Móveis:</p>
                    <p className="text-[11px]">
                      Garantia estrutural de até 5 anos. Montagem técnica executada por equipe própria treinada sob a norma ergonômica NR-17.
                    </p>
                  </div>

                  <div className="space-y-1.5 text-xs text-right font-mono min-w-[220px]">
                    <div className="flex justify-between text-slate-400">
                      <span>Subtotal dos Produtos:</span>
                      <span>R$ {(selectedQuote.subtotal ?? selectedQuote.total ?? 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Desconto Comercial:</span>
                      <span className="text-rose-400">- R$ {(selectedQuote.discountTotal ?? 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Frete Especial:</span>
                      <span>R$ {(selectedQuote.freightCost ?? (selectedQuote as any).shippingFee ?? 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Montagem e Instalação:</span>
                      <span>R$ {(selectedQuote.assemblyCost ?? (selectedQuote as any).assemblyFee ?? 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                    </div>
                    <div className="flex justify-between text-sm font-bold text-emerald-400 border-t border-slate-800 pt-2 text-base">
                      <span>Total Geral:</span>
                      <span>R$ {(selectedQuote.total ?? 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                    </div>
                  </div>
                </div>

                {/* Proposal Actions */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => window.print()}
                      className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:bg-slate-700"
                    >
                      <Printer className="h-3.5 w-3.5" />
                      Imprimir / PDF
                    </button>
                  </div>

                  {selectedQuote.status !== 'Aprovada' && selectedQuote.status !== 'Aprovado' ? (
                    <button
                      onClick={() => approveQuote(selectedQuote.id)}
                      className="flex items-center gap-1.5 rounded-lg bg-emerald-500 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-emerald-400 shadow-sm"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      Aprovar Proposta & Gerar Pedido Operacional
                    </button>
                  ) : (
                    <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">
                      <ShieldCheck className="h-4 w-4" />
                      Proposta Aprovada e Convertida em Pedido de Venda
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="py-20 text-center text-xs text-slate-500">
                Selecione uma proposta à esquerda para visualizar
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
