import React, { useState } from 'react';
import {
  X,
  UserPlus,
  ShoppingBag,
  FileSpreadsheet,
  CheckSquare,
  PackagePlus,
  CreditCard,
  Save,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const QuickActionModal: React.FC = () => {
  const {
    quickAction,
    closeQuickAction,
    products,
    customers,
    addCustomer,
    addOrder,
    addQuote,
    addTask,
    addInventoryEntry,
    addTransaction,
  } = useApp();

  // Form states
  // Customer form
  const [custName, setCustName] = useState('');
  const [custDoc, setCustDoc] = useState('');
  const [custEmail, setCustEmail] = useState('');
  const [custPhone, setCustPhone] = useState('');
  const [custSegment, setCustSegment] = useState('Arquitetura e Interiores');
  const [custLimit, setCustLimit] = useState(50000);

  // Sale / Order form
  const [saleCustId, setSaleCustId] = useState(customers[0]?.id || '');
  const [saleProdId, setSaleProdId] = useState(products[0]?.id || '');
  const [saleQty, setSaleQty] = useState(5);
  const [salePayment, setSalePayment] = useState<'Pago' | 'Faturado 30/60DD'>('Faturado 30/60DD');

  // Quote form
  const [quoteCustId, setQuoteCustId] = useState(customers[0]?.id || '');
  const [quoteProdId, setQuoteProdId] = useState(products[0]?.id || '');
  const [quoteQty, setQuoteQty] = useState(10);
  const [quoteDiscount, setQuoteDiscount] = useState(8);

  // Task form
  const [taskTitle, setTaskTitle] = useState('');
  const [taskAssignee, setTaskAssignee] = useState('João Pedro Carvalho');
  const [taskPriority, setTaskPriority] = useState<'Baixa' | 'Média' | 'Alta' | 'Urgente'>('Alta');
  const [taskDept, setTaskDept] = useState('Operações');

  // Inventory form
  const [invProdId, setInvProdId] = useState(products[0]?.id || '');
  const [invQty, setInvQty] = useState(20);
  const [invReason, setInvReason] = useState('Recebimento de Lote de Reposição');

  // Payment form
  const [payDesc, setPayDesc] = useState('');
  const [payAmount, setPayAmount] = useState(15000);
  const [payType, setPayType] = useState<'receita' | 'despesa'>('receita');
  const [payEntity, setPayEntity] = useState('Studio Alpha Arquitetura');

  if (!quickAction.isOpen || !quickAction.type) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (quickAction.type === 'customer') {
      if (!custName) return;
      addCustomer({
        name: custName,
        document: custDoc || '00.000.000/0001-00',
        email: custEmail || 'contato@empresa.com.br',
        phone: custPhone || '(11) 3000-0000',
        segment: custSegment,
        creditLimit: Number(custLimit),
      });
    } else if (quickAction.type === 'sale') {
      const selectedCust = customers.find((c) => c.id === saleCustId) || customers[0];
      const selectedProd = products.find((p) => p.id === saleProdId) || products[0];
      const total = selectedProd.salePrice * saleQty;
      addOrder({
        customerId: selectedCust.id,
        customerName: selectedCust.name,
        customerAddress: `${selectedCust.address.street}, ${selectedCust.address.number}`,
        totalValue: total,
        itemsCount: saleQty,
        paymentStatus: salePayment,
        items: [
          {
            productId: selectedProd.id,
            productName: selectedProd.name,
            quantity: saleQty,
            price: selectedProd.salePrice,
          },
        ],
      });
    } else if (quickAction.type === 'quote') {
      const selectedCust = customers.find((c) => c.id === quoteCustId) || customers[0];
      const selectedProd = products.find((p) => p.id === quoteProdId) || products[0];
      const rawSub = selectedProd.salePrice * quoteQty;
      const discountVal = (rawSub * quoteDiscount) / 100;
      const total = rawSub - discountVal + 450 + 600;
      addQuote({
        customerId: selectedCust.id,
        customerName: selectedCust.name,
        items: [
          {
            productId: selectedProd.id,
            productName: selectedProd.name,
            sku: selectedProd.sku,
            quantity: quoteQty,
            unitPrice: selectedProd.salePrice,
            discountPercent: quoteDiscount,
            unitCost: selectedProd.costPrice,
            total: rawSub - discountVal,
          },
        ],
        subtotal: rawSub,
        discountTotal: discountVal,
        freightCost: 450,
        assemblyCost: 600,
        total,
        totalCost: selectedProd.costPrice * quoteQty,
        grossMarginPercent: 50.5,
      });
    } else if (quickAction.type === 'task') {
      if (!taskTitle) return;
      addTask({
        title: taskTitle,
        assignedTo: taskAssignee,
        department: taskDept,
        priority: taskPriority,
        column: 'hoje',
      });
    } else if (quickAction.type === 'inventory') {
      addInventoryEntry(invProdId, Number(invQty), invReason);
    } else if (quickAction.type === 'payment') {
      if (!payDesc) return;
      addTransaction({
        type: payType,
        description: payDesc,
        amount: Number(payAmount),
        entityName: payEntity,
        status: 'Pago',
      });
    }

    closeQuickAction();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/50">
          <div className="flex items-center gap-2.5">
            {quickAction.type === 'customer' && <UserPlus className="h-5 w-5 text-amber-500" />}
            {quickAction.type === 'sale' && <ShoppingBag className="h-5 w-5 text-emerald-500" />}
            {quickAction.type === 'quote' && <FileSpreadsheet className="h-5 w-5 text-sky-500" />}
            {quickAction.type === 'task' && <CheckSquare className="h-5 w-5 text-amber-500" />}
            {quickAction.type === 'inventory' && <PackagePlus className="h-5 w-5 text-indigo-500" />}
            {quickAction.type === 'payment' && <CreditCard className="h-5 w-5 text-purple-500" />}
            <div>
              <h2 className="text-sm font-bold text-slate-100">
                {quickAction.type === 'customer' && 'Cadastrar Novo Cliente PJ / PF'}
                {quickAction.type === 'sale' && 'Lançar Nova Venda / Pedido'}
                {quickAction.type === 'quote' && 'Gerar Novo Orçamento Comercial'}
                {quickAction.type === 'task' && 'Criar Nova Tarefa Operacional'}
                {quickAction.type === 'inventory' && 'Registrar Entrada de Estoque'}
                {quickAction.type === 'payment' && 'Registrar Lançamento Financeiro'}
              </h2>
              <p className="text-[11px] text-slate-400">Polo Móveis · Gestão Operacional</p>
            </div>
          </div>
          <button
            onClick={closeQuickAction}
            className="p-1.5 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* CUSTOMER FORM */}
          {quickAction.type === 'customer' && (
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Razão Social ou Nome Completo *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Studio Alpha Arquitetura"
                  value={custName}
                  onChange={(e) => setCustName(e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:border-amber-500 focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    CNPJ ou CPF
                  </label>
                  <input
                    type="text"
                    placeholder="00.000.000/0001-00"
                    value={custDoc}
                    onChange={(e) => setCustDoc(e.target.value)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Segmento
                  </label>
                  <select
                    value={custSegment}
                    onChange={(e) => setCustSegment(e.target.value)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 focus:border-amber-500 focus:outline-none"
                  >
                    <option value="Arquitetura e Interiores">Arquitetura e Interiores</option>
                    <option value="Construção & Engenharia">Construção & Engenharia</option>
                    <option value="Tecnologia & Startups">Tecnologia & Startups</option>
                    <option value="Serviços Financeiros">Serviços Financeiros</option>
                    <option value="Saúde & Clínicas">Saúde & Clínicas</option>
                    <option value="Jurídico">Jurídico</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    E-mail Corporativo
                  </label>
                  <input
                    type="email"
                    placeholder="compras@empresa.com.br"
                    value={custEmail}
                    onChange={(e) => setCustEmail(e.target.value)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Telefone / WhatsApp
                  </label>
                  <input
                    type="text"
                    placeholder="(11) 98800-0000"
                    value={custPhone}
                    onChange={(e) => setCustPhone(e.target.value)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Limite de Crédito Inicial (R$)
                </label>
                <input
                  type="number"
                  value={custLimit}
                  onChange={(e) => setCustLimit(Number(e.target.value))}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 focus:border-amber-500 focus:outline-none"
                />
              </div>
            </>
          )}

          {/* SALE / ORDER FORM */}
          {quickAction.type === 'sale' && (
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Cliente Solicitante *
                </label>
                <select
                  value={saleCustId}
                  onChange={(e) => setSaleCustId(e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 focus:border-emerald-500 focus:outline-none"
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
                  Produto Principal Polo Móveis *
                </label>
                <select
                  value={saleProdId}
                  onChange={(e) => setSaleProdId(e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 focus:border-emerald-500 focus:outline-none"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} — R$ {p.salePrice.toLocaleString('pt-BR')} (Estoque: {p.stockAvailable} un.)
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Quantidade
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={saleQty}
                    onChange={(e) => setSaleQty(Number(e.target.value))}
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Condição de Pagamento
                  </label>
                  <select
                    value={salePayment}
                    onChange={(e) => setSalePayment(e.target.value as any)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 focus:border-emerald-500 focus:outline-none"
                  >
                    <option value="Faturado 30/60DD">Faturado 30/60DD</option>
                    <option value="Pago">À Vista / PIX (Pago)</option>
                  </select>
                </div>
              </div>
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-xs text-emerald-300">
                O pedido entrará automaticamente na fila operacional de <strong>Reserva de Estoque</strong> e gerará o código de rastreamento.
              </div>
            </>
          )}

          {/* QUOTE FORM */}
          {quickAction.type === 'quote' && (
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Cliente para a Proposta *
                </label>
                <select
                  value={quoteCustId}
                  onChange={(e) => setQuoteCustId(e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 focus:border-sky-500 focus:outline-none"
                >
                  {customers.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Item Polo Móveis
                </label>
                <select
                  value={quoteProdId}
                  onChange={(e) => setQuoteProdId(e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 focus:border-sky-500 focus:outline-none"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} — Tab: R$ {p.salePrice.toLocaleString('pt-BR')}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Quantidade
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={quoteQty}
                    onChange={(e) => setQuoteQty(Number(e.target.value))}
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 focus:border-sky-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Desconto Comercial (%)
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={30}
                    value={quoteDiscount}
                    onChange={(e) => setQuoteDiscount(Number(e.target.value))}
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 focus:border-sky-500 focus:outline-none"
                  />
                </div>
              </div>
            </>
          )}

          {/* TASK FORM */}
          {quickAction.type === 'task' && (
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Título da Tarefa *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Realizar vistoria técnica de montagem no 14º andar"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:border-amber-500 focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Responsável
                  </label>
                  <select
                    value={taskAssignee}
                    onChange={(e) => setTaskAssignee(e.target.value)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 focus:border-amber-500 focus:outline-none"
                  >
                    <option value="João Pedro Carvalho">João Pedro (Comercial)</option>
                    <option value="Mariana Duarte">Mariana Duarte (Comercial)</option>
                    <option value="Ana Paula Ramos">Ana Paula Ramos (Operações)</option>
                    <option value="Marcos Vinicius Lima">Marcos Lima (Logística)</option>
                    <option value="Carlos Eduardo Mendes">Carlos Mendes (Financeiro)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Prioridade
                  </label>
                  <select
                    value={taskPriority}
                    onChange={(e) => setTaskPriority(e.target.value as any)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 focus:border-amber-500 focus:outline-none"
                  >
                    <option value="Baixa">Baixa</option>
                    <option value="Média">Média</option>
                    <option value="Alta">Alta</option>
                    <option value="Urgente">Urgente</option>
                  </select>
                </div>
              </div>
            </>
          )}

          {/* INVENTORY FORM */}
          {quickAction.type === 'inventory' && (
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Produto para Entrada *
                </label>
                <select
                  value={invProdId}
                  onChange={(e) => setInvProdId(e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 focus:border-indigo-500 focus:outline-none"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.sku}) — Atual: {p.stockCurrent} un.
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Quantidade a Adicionar
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={invQty}
                    onChange={(e) => setInvQty(Number(e.target.value))}
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 focus:border-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Motivo / NF-e
                  </label>
                  <input
                    type="text"
                    value={invReason}
                    onChange={(e) => setInvReason(e.target.value)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>
            </>
          )}

          {/* PAYMENT FORM */}
          {quickAction.type === 'payment' && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Tipo de Operação
                  </label>
                  <select
                    value={payType}
                    onChange={(e) => setPayType(e.target.value as any)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 focus:border-purple-500 focus:outline-none"
                  >
                    <option value="receita">Receita (Entrada)</option>
                    <option value="despesa">Despesa (Saída)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Valor (R$)
                  </label>
                  <input
                    type="number"
                    value={payAmount}
                    onChange={(e) => setPayAmount(Number(e.target.value))}
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 focus:border-purple-500 focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Descrição do Lançamento *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Recebimento fatura contrato Studio Alpha"
                  value={payDesc}
                  onChange={(e) => setPayDesc(e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:border-purple-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Entidade / Favorecido
                </label>
                <input
                  type="text"
                  value={payEntity}
                  onChange={(e) => setPayEntity(e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 focus:border-purple-500 focus:outline-none"
                />
              </div>
            </>
          )}

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={closeQuickAction}
              className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-slate-100 rounded-lg hover:bg-slate-800 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-orange-600 hover:bg-orange-700 rounded transition-colors shadow-2xs active:scale-95"
            >
              <Save className="h-3.5 w-3.5" />
              <span>Salvar Registro</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
