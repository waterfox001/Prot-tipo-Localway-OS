import React, { useState } from 'react';
import {
  Users,
  Search,
  Plus,
  Phone,
  Mail,
  MapPin,
  Calendar,
  CreditCard,
  Building,
  CheckCircle2,
  Clock,
  ArrowRight,
  Star,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Customer } from '../types';
import { SectionHeader } from '../components/common/UIComponents';

export const CustomersView: React.FC = () => {
  const { customers, openQuickAction } = useApp();
  const [search, setSearch] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer>(customers[0]);
  const [statusFilter, setStatusFilter] = useState<'Todos' | 'Ativo' | 'Inativo'>('Todos');

  const filteredCustomers = customers.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.document.includes(search) ||
      c.contactPerson.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'Todos' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <SectionHeader
        title="Base de Clientes 360°"
        subtitle="Gestão corporativa de contas B2B e clientes VIP com histórico completo de compras e relacionamento"
        actions={
          <button
            onClick={() => openQuickAction('customer')}
            className="flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 dark:bg-amber-500 dark:text-slate-950 dark:hover:bg-amber-400 transition-colors shadow-2xs"
          >
            <Plus className="h-4 w-4" />
            Cadastrar Novo Cliente
          </button>
        }
      />

      {/* Search and Filters Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nome da empresa, CNPJ, responsável..."
            className="w-full rounded-xl border border-slate-200/90 bg-white pl-10 pr-4 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-amber-500 shadow-2xs"
          />
        </div>

        <div className="flex items-center rounded-xl border border-slate-200/90 bg-white p-0.5 dark:border-slate-800 dark:bg-slate-900 shrink-0 shadow-2xs">
          {(['Todos', 'Ativo', 'Inativo'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                statusFilter === st
                  ? 'bg-slate-100 text-slate-900 font-bold dark:bg-slate-800 dark:text-white'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Grid: Customers List + 360 Profile Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Customers Table / Cards */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
            Empresas Cadastradas ({filteredCustomers.length})
          </div>

          <div className="space-y-2.5 max-h-[720px] overflow-y-auto pr-1">
            {filteredCustomers.map((cust) => {
              const isSelected = selectedCustomer?.id === cust.id;

              return (
                <div
                  key={cust.id}
                  onClick={() => setSelectedCustomer(cust)}
                  className={`cursor-pointer rounded-2xl border p-4 transition-all shadow-2xs ${
                    isSelected
                      ? 'border-slate-900 bg-slate-50/80 ring-1 ring-slate-900/10 dark:border-amber-500 dark:bg-slate-800/80 dark:ring-amber-500/20'
                      : 'border-slate-200/90 bg-white hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-900 dark:text-slate-100">{cust.name}</span>
                        <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-mono text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                          {cust.type}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{cust.segment}</div>
                    </div>

                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                        cust.status === 'Ativo'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-900/40'
                          : 'bg-rose-50 text-rose-700 border border-rose-200/60 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-900/40'
                      }`}
                    >
                      {cust.status}
                    </span>
                  </div>

                  <div className="mt-3 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-2.5 text-xs">
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">
                      {cust.ordersCount} pedidos realizados
                    </span>
                    <span className="font-mono font-bold text-slate-900 dark:text-slate-100 tabular-nums">
                      R$ {cust.totalSpent.toLocaleString('pt-BR', { minimumFractionDigits: 0 })}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 360° Profile Viewer */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-200/90 bg-white p-6 space-y-6 shadow-2xs dark:border-slate-800 dark:bg-slate-900">
          {selectedCustomer ? (
            <>
              {/* Header profile */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
                <div>
                  <div className="flex items-center gap-2.5">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">{selectedCustomer.name}</h3>
                    <span className="rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60 text-[10px] px-2.5 py-0.5 font-bold dark:bg-emerald-950/40 dark:text-emerald-300">
                      {selectedCustomer.status}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-2">
                    <span className="font-mono">{selectedCustomer.document}</span>
                    <span>·</span>
                    <span>{selectedCustomer.segment}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-amber-700 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200/60 text-xs font-semibold dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-900/40">
                  <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                  <span>CSAT {selectedCustomer.csatRating}.0 / 5.0</span>
                </div>
              </div>

              {/* 360 Financial KPI Summary */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 bg-slate-50/70 rounded-xl border border-slate-100 dark:bg-slate-800/40 dark:border-slate-800">
                  <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Total Faturado (LTV)</div>
                  <div className="text-base font-bold text-slate-900 dark:text-slate-100 font-mono mt-1 tabular-nums">
                    R$ {selectedCustomer.totalSpent.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </div>
                </div>
                <div className="p-3.5 bg-slate-50/70 rounded-xl border border-slate-100 dark:bg-slate-800/40 dark:border-slate-800">
                  <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Ticket Médio</div>
                  <div className="text-base font-bold text-slate-900 dark:text-slate-100 font-mono mt-1 tabular-nums">
                    R$ {selectedCustomer.averageTicket.toLocaleString('pt-BR', { minimumFractionDigits: 0 })}
                  </div>
                </div>
                <div className="p-3.5 bg-slate-50/70 rounded-xl border border-slate-100 dark:bg-slate-800/40 dark:border-slate-800">
                  <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Limite de Crédito</div>
                  <div className="text-base font-bold text-emerald-600 dark:text-emerald-400 font-mono mt-1 tabular-nums">
                    R$ {selectedCustomer.creditAvailable.toLocaleString('pt-BR', { minimumFractionDigits: 0 })}
                  </div>
                  <span className="text-[9px] text-slate-400 block mt-0.5">Disponível</span>
                </div>
                <div className="p-3.5 bg-slate-50/70 rounded-xl border border-slate-100 dark:bg-slate-800/40 dark:border-slate-800">
                  <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Última Compra</div>
                  <div className="text-sm font-semibold text-slate-900 dark:text-slate-100 mt-1 font-mono">
                    {selectedCustomer.lastPurchaseDate}
                  </div>
                </div>
              </div>

              {/* Contact and Address */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-slate-50/70 rounded-xl border border-slate-100 dark:bg-slate-800/40 dark:border-slate-800 space-y-2">
                  <div className="font-bold text-slate-900 dark:text-slate-100 text-xs">Contatos & Responsável</div>
                  <div className="text-slate-600 dark:text-slate-300">
                    Contato: <strong className="text-slate-900 dark:text-slate-100">{selectedCustomer.contactPerson}</strong>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                    <Phone className="h-3.5 w-3.5 text-slate-400" />
                    <span>{selectedCustomer.phone} / {selectedCustomer.whatsapp}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                    <Mail className="h-3.5 w-3.5 text-slate-400" />
                    <span>{selectedCustomer.email}</span>
                  </div>
                </div>

                <div className="p-4 bg-slate-50/70 rounded-xl border border-slate-100 dark:bg-slate-800/40 dark:border-slate-800 space-y-2">
                  <div className="font-bold text-slate-900 dark:text-slate-100 text-xs">Endereço de Entrega & Montagem</div>
                  <div className="flex items-start gap-2 text-slate-600 dark:text-slate-300">
                    <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <div className="space-y-0.5">
                      <div>{selectedCustomer.address.street}, {selectedCustomer.address.number}</div>
                      <div>{selectedCustomer.address.neighborhood} — {selectedCustomer.address.city}/{selectedCustomer.address.state}</div>
                      <div className="font-mono text-[11px] text-slate-500">CEP: {selectedCustomer.address.cep}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* TIMELINE DO CLIENTE */}
              <div className="border-t border-slate-100 dark:border-slate-800 pt-5">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Jornada 360° do Cliente (Lead → Pós-Venda)
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 text-center text-xs">
                  {[
                    { step: '1. Lead', status: 'Concluído' },
                    { step: '2. Contato', status: 'Concluído' },
                    { step: '3. Orçamento', status: 'Concluído' },
                    { step: '4. Venda', status: 'Concluído' },
                    { step: '5. Pagamento', status: 'Em dia' },
                    { step: '6. Entrega', status: 'Em Rota' },
                    { step: '7. Pós-venda', status: 'CSAT 5★' },
                  ].map((s, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl bg-slate-50/70 p-2.5 border border-slate-100 text-center dark:bg-slate-800/40 dark:border-slate-800"
                    >
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 mx-auto mb-1" />
                      <div className="font-bold text-slate-900 dark:text-slate-100 text-[11px]">{s.step}</div>
                      <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">{s.status}</div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="py-20 text-center text-xs text-slate-400">
              Selecione um cliente para carregar a visão 360°
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
