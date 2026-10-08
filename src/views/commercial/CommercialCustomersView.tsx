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
  ExternalLink,
  MessageCircle,
  ShoppingBag,
  FileText,
  Truck,
  Wrench,
  AlertTriangle,
  X,
  DollarSign,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Customer } from '../../types';

export const CommercialCustomersView: React.FC = () => {
  const {
    customers,
    sales,
    quotes,
    receivables,
    deliveries,
    assemblies,
    occurrences,
    openQuickAction,
    selectedCustomerProfile,
    setSelectedCustomerProfile,
  } = useApp();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'Todos' | 'Ativo' | 'Inativo'>('Todos');
  const [activeTab, setActiveTab] = useState<'vendas' | 'orcamentos' | 'financeiro' | 'logistica' | 'ocorrencias'>('vendas');

  const filteredCustomers = customers.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.document.includes(search) ||
      c.contactPerson.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'Todos' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Histórico conectado do cliente selecionado
  const customerSales = selectedCustomerProfile
    ? sales.filter((s) => s.customerId === selectedCustomerProfile.id || s.customerName === selectedCustomerProfile.name)
    : [];

  const customerQuotes = selectedCustomerProfile
    ? quotes.filter((q) => q.customerId === selectedCustomerProfile.id || q.customerName === selectedCustomerProfile.name)
    : [];

  const customerReceivables = selectedCustomerProfile
    ? receivables.filter((r) => r.customerName === selectedCustomerProfile.name)
    : [];

  const customerDeliveries = selectedCustomerProfile
    ? deliveries.filter((d) => d.customerName === selectedCustomerProfile.name)
    : [];

  const customerAssemblies = selectedCustomerProfile
    ? assemblies.filter((a) => a.customerName === selectedCustomerProfile.name)
    : [];

  const customerOccurrences = selectedCustomerProfile
    ? occurrences.filter((o) => o.customerName === selectedCustomerProfile.name)
    : [];

  const cleanPhone = (phone: string) => phone.replace(/\D/g, '');

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800">
              <Users className="w-3.5 h-3.5" />
              Gestão de Clientes & CRM
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Base de Clientes 360°
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
            Dossiê completo de cada cliente: histórico de compras, pagamentos, orçamentos, entregas e chamados.
          </p>
        </div>

        <button
          onClick={() => openQuickAction('cliente')}
          className="inline-flex items-center gap-1.5 rounded bg-orange-600 hover:bg-orange-700 px-3 py-1.5 text-xs font-semibold text-white shadow-2xs transition-colors self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
          Novo Cliente
        </button>
      </div>

      {/* Busca e Filtros */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por razão social, nome fantasia, CNPJ/CPF ou contato..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 dark:text-white focus:outline-hidden focus:ring-1 focus:ring-slate-900"
          />
        </div>

        <div className="flex items-center gap-2">
          {(['Todos', 'Ativo', 'Inativo'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                statusFilter === st
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Grid de Cards de Clientes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCustomers.map((cust) => (
          <div
            key={cust.id}
            onClick={() => setSelectedCustomerProfile(cust)}
            className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xs hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                    {cust.type} • {cust.segment}
                  </span>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white mt-1.5 leading-snug">
                    {cust.name}
                  </h3>
                  <div className="text-xs text-slate-500 font-mono mt-0.5">{cust.document}</div>
                </div>

                <span className="flex items-center gap-1 text-xs font-bold text-amber-600">
                  <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                  {cust.csatRating || '5.0'}
                </span>
              </div>

              {/* Contato & Cidade */}
              <div className="space-y-1.5 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{cust.address.city} - {cust.address.state}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{cust.phone}</span>
                </div>
              </div>
            </div>

            {/* Indicadores LTV */}
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">Total Comprado (LTV)</span>
                <div className="font-mono font-bold text-slate-900 dark:text-white text-sm">
                  R$ {cust.totalSpent.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-slate-400">Pedidos</span>
                <div className="font-bold text-slate-800 dark:text-slate-200 text-xs">
                  {cust.ordersCount} pedidos
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* DRAWER / MODAL DA FICHA 360° DO CLIENTE */}
      {selectedCustomerProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-fade-in">
          <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900 space-y-5">
            {/* Topo do Dossiê */}
            <div className="flex items-start justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Ficha 360° do Cliente
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                    {selectedCustomerProfile.status}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-0.5">
                  {selectedCustomerProfile.name}
                </h2>
                <div className="text-xs text-slate-500 font-mono mt-0.5">
                  CNPJ/CPF: {selectedCustomerProfile.document} • Contato: {selectedCustomerProfile.contactPerson}
                </div>
              </div>

              <button
                onClick={() => setSelectedCustomerProfile(null)}
                className="p-1 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Ações Imediatas de Contato */}
            <div className="flex flex-wrap items-center gap-2">
              <a
                href={`https://wa.me/55${cleanPhone(selectedCustomerProfile.whatsapp || selectedCustomerProfile.phone)}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 shadow-2xs"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                Conversar no WhatsApp
              </a>

              <a
                href={`mailto:${selectedCustomerProfile.email}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-semibold text-xs hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-200"
              >
                <Mail className="w-3.5 h-3.5" />
                {selectedCustomerProfile.email}
              </a>

              <div className="text-xs text-slate-500 ml-auto font-medium">
                Vendedor Responsável: <span className="font-bold text-slate-900 dark:text-white">{selectedCustomerProfile.assignedSalesperson || 'Carlos Mendes'}</span>
              </div>
            </div>

            {/* 4 Indicadores Chave do Cliente */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 dark:bg-slate-800/60 dark:border-slate-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Comprado</span>
                <div className="font-mono font-bold text-sm text-slate-900 dark:text-white mt-0.5">
                  R$ {selectedCustomerProfile.totalSpent.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 dark:bg-slate-800/60 dark:border-slate-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Ticket Médio</span>
                <div className="font-mono font-bold text-sm text-slate-900 dark:text-white mt-0.5">
                  R$ {selectedCustomerProfile.averageTicket.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 dark:bg-slate-800/60 dark:border-slate-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total de Pedidos</span>
                <div className="font-bold text-sm text-slate-900 dark:text-white mt-0.5">
                  {selectedCustomerProfile.ordersCount} compras
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 dark:bg-slate-800/60 dark:border-slate-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Última Compra</span>
                <div className="font-medium text-xs text-slate-800 dark:text-slate-200 mt-0.5">
                  {selectedCustomerProfile.lastPurchaseDate}
                </div>
              </div>
            </div>

            {/* Endereço */}
            <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-100 dark:bg-slate-800/40 dark:border-slate-800 text-xs">
              <div className="font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                Endereço Cadastral & Entrega:
              </div>
              <div className="text-slate-600 dark:text-slate-400">
                {selectedCustomerProfile.address.street}, {selectedCustomerProfile.address.number}
                {selectedCustomerProfile.address.complement ? ` - ${selectedCustomerProfile.address.complement}` : ''} • {selectedCustomerProfile.address.neighborhood}, {selectedCustomerProfile.address.city} - {selectedCustomerProfile.address.state} • CEP: {selectedCustomerProfile.address.cep}
              </div>
            </div>

            {/* Abas do Histórico Conectado */}
            <div className="space-y-3">
              <div className="flex border-b border-slate-200 dark:border-slate-800 overflow-x-auto text-xs font-semibold">
                <button
                  onClick={() => setActiveTab('vendas')}
                  className={`pb-2 px-3 border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === 'vendas'
                      ? 'border-slate-900 text-slate-900 font-bold dark:border-white dark:text-white'
                      : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-white'
                  }`}
                >
                  Vendas ({customerSales.length})
                </button>
                <button
                  onClick={() => setActiveTab('orcamentos')}
                  className={`pb-2 px-3 border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === 'orcamentos'
                      ? 'border-slate-900 text-slate-900 font-bold dark:border-white dark:text-white'
                      : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-white'
                  }`}
                >
                  Orçamentos ({customerQuotes.length})
                </button>
                <button
                  onClick={() => setActiveTab('financeiro')}
                  className={`pb-2 px-3 border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === 'financeiro'
                      ? 'border-slate-900 text-slate-900 font-bold dark:border-white dark:text-white'
                      : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-white'
                  }`}
                >
                  Pagamentos / Receber ({customerReceivables.length})
                </button>
                <button
                  onClick={() => setActiveTab('logistica')}
                  className={`pb-2 px-3 border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === 'logistica'
                      ? 'border-slate-900 text-slate-900 font-bold dark:border-white dark:text-white'
                      : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-white'
                  }`}
                >
                  Entregas & Montagens ({customerDeliveries.length + customerAssemblies.length})
                </button>
                <button
                  onClick={() => setActiveTab('ocorrencias')}
                  className={`pb-2 px-3 border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === 'ocorrencias'
                      ? 'border-slate-900 text-slate-900 font-bold dark:border-white dark:text-white'
                      : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-white'
                  }`}
                >
                  Ocorrências / SAC ({customerOccurrences.length})
                </button>
              </div>

              {/* Conteúdo da Aba */}
              <div className="space-y-2 max-h-56 overflow-y-auto">
                {activeTab === 'vendas' && (
                  customerSales.length > 0 ? (
                    customerSales.map((s) => (
                      <div key={s.id} className="flex justify-between items-center p-3 rounded-xl border border-slate-100 bg-slate-50/50 text-xs">
                        <div>
                          <div className="font-bold text-slate-900 dark:text-white font-mono">{s.code}</div>
                          <div className="text-slate-500 text-[11px]">{s.date} • {s.salesperson}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-mono font-bold text-slate-900 dark:text-white">
                            R$ {s.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </div>
                          <span className="text-[10px] font-bold text-emerald-700">{s.operationalStatus}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-xs text-slate-400">Nenhuma venda registrada para este cliente.</div>
                  )
                )}

                {activeTab === 'orcamentos' && (
                  customerQuotes.length > 0 ? (
                    customerQuotes.map((q) => (
                      <div key={q.id} className="flex justify-between items-center p-3 rounded-xl border border-slate-100 bg-slate-50/50 text-xs">
                        <div>
                          <div className="font-bold text-slate-900 dark:text-white font-mono">{q.code}</div>
                          <div className="text-slate-500 text-[11px]">{q.date}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-mono font-bold text-slate-900 dark:text-white">
                            R$ {(q.total || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </div>
                          <span className="text-[10px] font-bold text-blue-700">{q.status}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-xs text-slate-400">Nenhum orçamento em aberto para este cliente.</div>
                  )
                )}

                {activeTab === 'financeiro' && (
                  customerReceivables.length > 0 ? (
                    customerReceivables.map((r) => (
                      <div key={r.id} className="flex justify-between items-center p-3 rounded-xl border border-slate-100 bg-slate-50/50 text-xs">
                        <div>
                          <div className="font-bold text-slate-900 dark:text-white">Parcela {r.installment} (Venda {r.saleCode})</div>
                          <div className="text-slate-500 text-[11px]">Vencimento: {r.dueDate}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-mono font-bold text-slate-900 dark:text-white">
                            R$ {r.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </div>
                          <span className={`text-[10px] font-bold ${r.status === 'Pago' ? 'text-emerald-700' : 'text-amber-700'}`}>
                            {r.status}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-xs text-slate-400">Nenhum título a receber em aberto.</div>
                  )
                )}

                {activeTab === 'logistica' && (
                  customerDeliveries.length > 0 || customerAssemblies.length > 0 ? (
                    <div className="space-y-2">
                      {customerDeliveries.map((d) => (
                        <div key={d.id} className="p-2.5 rounded-xl border border-slate-100 bg-slate-50/50 text-xs flex justify-between items-center">
                          <div>
                            <span className="font-bold text-blue-600">Entrega Pedido {d.orderCode}</span>
                            <div className="text-slate-500 text-[11px]">Motorista: {d.driver} ({d.vehicle})</div>
                          </div>
                          <span className="text-[10px] font-bold text-slate-700">{d.status}</span>
                        </div>
                      ))}
                      {customerAssemblies.map((a) => (
                        <div key={a.id} className="p-2.5 rounded-xl border border-slate-100 bg-slate-50/50 text-xs flex justify-between items-center">
                          <div>
                            <span className="font-bold text-emerald-600">Montagem Pedido {a.saleCode}</span>
                            <div className="text-slate-500 text-[11px]">Montador: {a.assemblerName} ({a.scheduledDate})</div>
                          </div>
                          <span className="text-[10px] font-bold text-slate-700">{a.status}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-xs text-slate-400">Nenhuma entrega ou montagem registrada.</div>
                  )
                )}

                {activeTab === 'ocorrencias' && (
                  customerOccurrences.length > 0 ? (
                    customerOccurrences.map((o) => (
                      <div key={o.id} className="p-3 rounded-xl border border-slate-100 bg-slate-50/50 text-xs space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="font-bold font-mono text-slate-900 dark:text-white">{o.protocol}</span>
                          <span className="text-[10px] font-bold text-amber-700">{o.status}</span>
                        </div>
                        <div className="text-slate-600 dark:text-slate-400">{o.description}</div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-xs text-slate-400">Nenhum chamado de assistência ou ocorrência aberto.</div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
