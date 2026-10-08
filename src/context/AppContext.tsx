import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ViewId,
  ThemeMode,
  AppRole,
  Company,
  User,
  Product,
  Customer,
  Deal,
  PipelineStage,
  Order,
  Delivery,
  Task,
  GoalOKR,
  PersonalTransaction,
  PersonalAccount,
  PersonalCard,
  PersonalRecurring,
  PersonalInvestment,
  PersonalAsset,
  PersonalDebt,
  CorporateTransaction,
  CorporateAccount,
  CorporateCard,
  CorporateFixedCost,
  CorporateProperty,
  CorporateContract,
  PlatformUpdate,
  Sale,
  SaleItem,
  SaleOperationalStatus,
  Receivable,
  Payable,
  PurchaseOrder,
  AssemblyOrder,
  Occurrence,
  FollowUpTask,
  StockMovement,
  CommissionEntry,
} from '../types';
import {
  initialCompany,
  currentUser,
  initialProducts,
  initialCustomers,
  initialDeals,
  initialOrders,
  initialDeliveries,
  initialTasks,
  initialGoals,
  initialPersonalAccounts,
  initialPersonalCards,
  initialPersonalTransactions,
  initialPersonalRecurring,
  initialPersonalInvestments,
  initialPersonalAssets,
  initialPersonalDebts,
  initialCorporateAccounts,
  initialCorporateCards,
  initialCorporateTransactions,
  initialCorporateFixedCosts,
  initialCorporateProperties,
  initialCorporateContracts,
  initialUpdates,
  initialSales,
  initialReceivables,
  initialPayables,
  initialPurchaseOrders,
  initialAssemblyOrders,
  initialOccurrences,
  initialFollowUps,
  initialStockMovements,
  initialCommissionEntries,
} from '../data/mockData';

export type QuickModalType =
  | 'venda'
  | 'sale'
  | 'cliente'
  | 'customer'
  | 'produto'
  | 'receita'
  | 'despesa'
  | 'payment'
  | 'tarefa'
  | 'task'
  | 'entrega'
  | 'investimento'
  | 'inventory'
  | 'quote'
  | 'orcamento'
  | 'ocorrencia'
  | null;

interface TrashItem {
  id: string;
  originalType: 'transacao_pessoal' | 'transacao_pj' | 'contrato' | 'conta';
  title: string;
  amount?: number;
  deletedAt: string;
  payload: any;
}

interface AppContextType {
  // Tema & Navegação
  theme: ThemeMode;
  setTheme: (t: ThemeMode) => void;
  activeView: ViewId;
  setActiveView: (view: ViewId) => void;
  company: Company;
  setCompany: (c: Company) => void;
  user: User;
  setUser: (u: User) => void;

  // Busca Global & Ação Rápida
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  quickActionType: QuickModalType;
  openQuickAction: (type: QuickModalType) => void;
  closeQuickAction: () => void;

  // Perfil de Acesso Ativo (RBAC Interativo)
  activeRole: AppRole;
  setActiveRole: (role: AppRole) => void;

  // Dados Empresa & Operação Loja de Móveis
  products: Product[];
  customers: Customer[];
  deals: Deal[];
  orders: Order[];
  deliveries: Delivery[];
  tasks: Task[];
  goals: GoalOKR[];
  updates: PlatformUpdate[];

  // Módulos Conectados ERP / Vendas / Logística
  sales: Sale[];
  receivables: Receivable[];
  payables: Payable[];
  purchaseOrders: PurchaseOrder[];
  assemblies: AssemblyOrder[];
  occurrences: Occurrence[];
  followUps: FollowUpTask[];
  stockMovements: StockMovement[];
  commissionEntries: CommissionEntry[];

  // Seleções para Detalhes / Drawers
  selectedCustomerProfile: Customer | null;
  setSelectedCustomerProfile: (c: Customer | null) => void;
  selectedSaleDetail: Sale | null;
  setSelectedSaleDetail: (s: Sale | null) => void;
  selectedQuoteDetail: any | null;
  setSelectedQuoteDetail: (q: any | null) => void;

  // Ações Conectadas
  createSale: (saleData: Partial<Sale>) => Sale;
  convertQuoteToSale: (quoteId: string) => void;
  updateSaleOperationalStatus: (saleId: string, status: SaleOperationalStatus) => void;
  registerReceivablePayment: (receivableId: string) => void;
  registerPayablePayment: (payableId: string) => void;
  updateDeliveryStatus: (deliveryId: string, status: any) => void;
  updateAssemblyStatus: (assemblyId: string, status: any) => void;
  toggleAssemblyChecklist: (assemblyId: string, checkId: string) => void;
  createPurchaseOrder: (poData: Partial<PurchaseOrder>) => void;
  receivePurchaseOrder: (poId: string) => void;
  createOccurrence: (occData: Partial<Occurrence>) => void;
  resolveOccurrence: (occId: string, resolution: string) => void;
  toggleFollowUp: (id: string) => void;
  addFollowUp: (f: Partial<FollowUpTask>) => void;
  paySalespersonCommissions: (salesperson: string) => void;
  adjustProductStock: (productId: string, delta: number, reason: string) => void;

  // Compatibilidade com Views Anteriores
  transactions: CorporateTransaction[];
  okrs: GoalOKR[];
  suppliers: any[];
  auditLogs: any[];
  quotes: any[];
  cart: Array<{ product: Product; quantity: number }>;
  inventoryMovements: any[];
  updateDealStage: (dealId: string, stage: PipelineStage) => void;
  updateOrderStatus: (orderId: string, status: any) => void;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  addQuote: (q: any) => void;
  approveQuote: (id: string) => void;
  toggleTaskChecklist: (taskId: string, checkId: string) => void;
  quickAction: { isOpen: boolean; type: string };
  addInventoryEntry: (...args: any[]) => void;
  addTransaction: (tx: any) => void;
  alerts: any[];
  resolveAlert: (id: string) => void;

  // Financeiro Pessoal
  personalAccounts: PersonalAccount[];
  personalCards: PersonalCard[];
  personalTransactions: PersonalTransaction[];
  personalRecurring: PersonalRecurring[];
  personalInvestments: PersonalInvestment[];
  personalAssets: PersonalAsset[];
  personalDebts: PersonalDebt[];
  personalTrash: TrashItem[];

  // Financeiro da Empresa
  corporateAccounts: CorporateAccount[];
  corporateCards: CorporateCard[];
  corporateTransactions: CorporateTransaction[];
  corporateFixedCosts: CorporateFixedCost[];
  corporateProperties: CorporateProperty[];
  corporateContracts: CorporateContract[];
  corporateTrash: TrashItem[];

  // Mutadores & Ações
  addPersonalTransaction: (tx: Partial<PersonalTransaction>) => void;
  deletePersonalTransaction: (id: string) => void;
  restorePersonalTrashItem: (id: string) => void;
  emptyPersonalTrash: () => void;

  addCorporateTransaction: (tx: Partial<CorporateTransaction>) => void;
  deleteCorporateTransaction: (id: string) => void;
  restoreCorporateTrashItem: (id: string) => void;
  emptyCorporateTrash: () => void;

  addCustomer: (c: Partial<Customer>) => void;
  addProduct: (p: Partial<Product>) => void;
  addDeal: (d: Partial<Deal>) => void;
  addOrder: (o: Partial<Order>) => void;
  addTask: (t: Partial<Task>) => void;
  toggleTaskCheck: (taskId: string, checkId: string) => void;
  updateTaskColumn: (taskId: string, col: Task['column']) => void;
  addPersonalInvestment: (inv: Partial<PersonalInvestment>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Tema com suporte a Light (padrão) e Dark
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('polo_theme') as ThemeMode;
    return saved || 'light';
  });

  const setTheme = (t: ThemeMode) => {
    setThemeState(t);
    localStorage.setItem('polo_theme', t);
  };

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else if (theme === 'light') {
      root.classList.remove('dark');
    } else {
      // auto
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
  }, [theme]);

  // Navegação
  const [activeView, setActiveView] = useState<ViewId>('home_overview');
  const [company, setCompany] = useState<Company>(initialCompany);
  const [user, setUser] = useState<User>(currentUser);

  useEffect(() => {
    const handleGoHome = () => setActiveView('home_overview');
    window.addEventListener('polo-go-home', handleGoHome);
    return () => window.removeEventListener('polo-go-home', handleGoHome);
  }, []);

  // Modais
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [quickActionType, setQuickActionType] = useState<QuickModalType>(null);

  // Dados da Empresa
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [deals, setDeals] = useState<Deal[]>(initialDeals);
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [deliveries, setDeliveries] = useState<Delivery[]>(initialDeliveries);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [goals] = useState<GoalOKR[]>(initialGoals);
  const [updates] = useState<PlatformUpdate[]>(initialUpdates);

  // Perfil Ativo (RBAC Interativo)
  const [activeRole, setActiveRole] = useState<AppRole>('admin');

  // Módulos Conectados ERP / Loja de Móveis
  const [sales, setSales] = useState<Sale[]>(initialSales);
  const [receivables, setReceivables] = useState<Receivable[]>(initialReceivables);
  const [payables, setPayables] = useState<Payable[]>(initialPayables);
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>(initialPurchaseOrders);
  const [assemblies, setAssemblies] = useState<AssemblyOrder[]>(initialAssemblyOrders);
  const [occurrences, setOccurrences] = useState<Occurrence[]>(initialOccurrences);
  const [followUps, setFollowUps] = useState<FollowUpTask[]>(initialFollowUps);
  const [stockMovements, setStockMovements] = useState<StockMovement[]>(initialStockMovements);
  const [commissionEntries, setCommissionEntries] = useState<CommissionEntry[]>(initialCommissionEntries);

  // Seleções para Drawers & Modais
  const [selectedCustomerProfile, setSelectedCustomerProfile] = useState<Customer | null>(null);
  const [selectedSaleDetail, setSelectedSaleDetail] = useState<Sale | null>(null);
  const [selectedQuoteDetail, setSelectedQuoteDetail] = useState<any | null>(null);

  // Financeiro Pessoal
  const [personalAccounts, setPersonalAccounts] = useState<PersonalAccount[]>(initialPersonalAccounts);
  const [personalCards, setPersonalCards] = useState<PersonalCard[]>(initialPersonalCards);
  const [personalTransactions, setPersonalTransactions] = useState<PersonalTransaction[]>(initialPersonalTransactions);
  const [personalRecurring, setPersonalRecurring] = useState<PersonalRecurring[]>(initialPersonalRecurring);
  const [personalInvestments, setPersonalInvestments] = useState<PersonalInvestment[]>(initialPersonalInvestments);
  const [personalAssets, setPersonalAssets] = useState<PersonalAsset[]>(initialPersonalAssets);
  const [personalDebts, setPersonalDebts] = useState<PersonalDebt[]>(initialPersonalDebts);
  const [personalTrash, setPersonalTrash] = useState<TrashItem[]>([]);

  // Financeiro Empresarial
  const [corporateAccounts, setCorporateAccounts] = useState<CorporateAccount[]>(initialCorporateAccounts);
  const [corporateCards, setCorporateCards] = useState<CorporateCard[]>(initialCorporateCards);
  const [corporateTransactions, setCorporateTransactions] = useState<CorporateTransaction[]>(initialCorporateTransactions);
  const [corporateFixedCosts, setCorporateFixedCosts] = useState<CorporateFixedCost[]>(initialCorporateFixedCosts);
  const [corporateProperties, setCorporateProperties] = useState<CorporateProperty[]>(initialCorporateProperties);
  const [corporateContracts, setCorporateContracts] = useState<CorporateContract[]>(initialCorporateContracts);
  const [corporateTrash, setCorporateTrash] = useState<TrashItem[]>([]);

  // Compatibilidade adicional
  const [cart, setCart] = useState<Array<{ product: Product; quantity: number }>>([]);
  const [quotes, setQuotes] = useState<any[]>([
    {
      id: 'q-101',
      code: 'PROP-2026-088',
      customerName: 'Banco Zenith de Investimentos',
      date: '02/10/2026',
      total: 112000,
      status: 'Aprovado',
      items: [{ productName: 'Cadeira Presidente Vertex', quantity: 40, unitPrice: 1780, totalPrice: 71200 }],
    },
    {
      id: 'q-102',
      code: 'PROP-2026-089',
      customerName: 'Studio Alpha Arquitetura',
      date: '04/10/2026',
      total: 38450,
      status: 'Enviado',
      items: [{ productName: 'Estação de Trabalho Prime 4 Lugares', quantity: 4, unitPrice: 4200, totalPrice: 16800 }],
    },
  ]);

  const [inventoryMovements] = useState<any[]>([
    { id: 'mov-1', productName: 'Cadeira Presidente Vertex', type: 'Entrada', quantity: 20, date: '04/10/2026', reason: 'NF Fornecedor #1820' },
    { id: 'mov-2', productName: 'Estação de Trabalho Prime', type: 'Saída', quantity: 4, date: '05/10/2026', reason: 'Pedido #1048' },
  ]);

  const [suppliers] = useState<any[]>([
    { id: 'sup-1', name: 'TecnoPoltronas Brasil', cnpj: '12.345.678/0001-90', contact: 'Carlos Eduardo', phone: '(11) 4002-8922', category: 'Cadeiras & Espumas', rating: 4.9, activeOrders: 2 },
    { id: 'sup-2', name: 'ErgoTech Mecanismos', cnpj: '98.765.432/0001-11', contact: 'Mariana Pires', phone: '(19) 3871-9900', category: 'Pistões & Braços 3D', rating: 4.8, activeOrders: 1 },
    { id: 'sup-3', name: 'WoodTech Painéis MDP', cnpj: '45.123.789/0001-55', contact: 'Roberto Albuquerque', phone: '(54) 3290-1122', category: 'Tampos & Marcenaria', rating: 4.7, activeOrders: 3 },
  ]);

  const [auditLogs] = useState<any[]>([
    { id: 'log-1', user: 'Marcus Glauber', action: 'Aprovação de Proposta', detail: 'Proposta #PROP-2026-088 Banco Zenith', timestamp: '05/10/2026 14:32', ip: '189.120.45.12' },
    { id: 'log-2', user: 'Ana Paula Ramos', action: 'Separação de Pedido', detail: 'Pedido #1048 Studio Alpha', timestamp: '05/10/2026 11:15', ip: '189.120.45.18' },
    { id: 'log-3', user: 'Marcus Glauber', action: 'Alteração de Meta OKR', detail: 'Meta Faturamento Q4 atualizada', timestamp: '04/10/2026 16:40', ip: '189.120.45.12' },
  ]);

  const updateDealStage = (dealId: string, stage: PipelineStage) => {
    setDeals((prev) => prev.map((d) => (d.id === dealId ? { ...d, stage } : d)));
  };

  const updateOrderStatus = (orderId: string, status: any) => {
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, operationalStatus: status } : o)));
  };

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const clearCart = () => setCart([]);

  const addQuote = (q: any) => setQuotes((prev) => [q, ...prev]);
  const approveQuote = (id: string) =>
    setQuotes((prev) => prev.map((q) => (q.id === id ? { ...q, status: 'Aprovado' } : q)));

  const toggleTaskChecklist = (taskId: string, checkId: string) => toggleTaskCheck(taskId, checkId);

  const [alerts, setAlerts] = useState<any[]>([
    { id: 'alt-1', title: 'Estoque Mínimo: Cadeira Presidente Ergomax', category: 'Estoque', priority: 'alta', date: 'Hoje', status: 'Ativo' },
    { id: 'alt-2', title: 'Contrato a vencer em 27 dias: Banco Zenith', category: 'Contratos', priority: 'alta', date: 'Hoje', status: 'Ativo' },
    { id: 'alt-3', title: 'Cotação Pendente: 40 Cadeiras Pro Studio Alpha', category: 'Comercial', priority: 'media', date: 'Ontem', status: 'Ativo' },
  ]);

  const resolveAlert = (id: string) => setAlerts((prev) => prev.filter((a) => a.id !== id));
  const addInventoryEntry = (..._args: any[]) => {};
  const addTransaction = (tx: any) => addCorporateTransaction(tx);

  const openQuickAction = (type: QuickModalType) => setQuickActionType(type);
  const closeQuickAction = () => setQuickActionType(null);

  // Ações Pessoais
  const addPersonalTransaction = (tx: Partial<PersonalTransaction>) => {
    const newTx: PersonalTransaction = {
      id: `ptx-${Date.now()}`,
      description: tx.description || 'Lançamento Pessoal',
      amount: Number(tx.amount) || 0,
      type: tx.type || 'despesa',
      date: tx.date || new Date().toLocaleDateString('pt-BR'),
      category: tx.category || 'Outros',
      account: tx.account || personalAccounts[0].name,
      card: tx.card,
      status: tx.status || 'Pago',
      notes: tx.notes,
    };
    setPersonalTransactions((prev) => [newTx, ...prev]);

    // Atualiza saldo da conta
    setPersonalAccounts((prev) =>
      prev.map((acc) => {
        if (acc.name === newTx.account) {
          return {
            ...acc,
            balance: newTx.type === 'receita' ? acc.balance + newTx.amount : acc.balance - newTx.amount,
          };
        }
        return acc;
      })
    );
  };

  const deletePersonalTransaction = (id: string) => {
    const found = personalTransactions.find((t) => t.id === id);
    if (!found) return;

    setPersonalTransactions((prev) => prev.filter((t) => t.id !== id));
    setPersonalTrash((prev) => [
      {
        id: `trash-${Date.now()}`,
        originalType: 'transacao_pessoal',
        title: found.description,
        amount: found.amount,
        deletedAt: new Date().toLocaleDateString('pt-BR'),
        payload: found,
      },
      ...prev,
    ]);
  };

  const restorePersonalTrashItem = (trashId: string) => {
    const item = personalTrash.find((i) => i.id === trashId);
    if (!item) return;

    if (item.originalType === 'transacao_pessoal') {
      setPersonalTransactions((prev) => [item.payload, ...prev]);
    }
    setPersonalTrash((prev) => prev.filter((i) => i.id !== trashId));
  };

  const emptyPersonalTrash = () => setPersonalTrash([]);

  // Ações Corporativas
  const addCorporateTransaction = (tx: Partial<CorporateTransaction>) => {
    const newTx: CorporateTransaction = {
      id: `ctx-${Date.now()}`,
      description: tx.description || 'Lançamento Empresarial',
      amount: Number(tx.amount) || 0,
      type: tx.type || 'despesa',
      date: tx.date || new Date().toLocaleDateString('pt-BR'),
      dueDate: tx.dueDate || new Date().toLocaleDateString('pt-BR'),
      category: tx.category || 'Outros',
      account: tx.account || corporateAccounts[0].name,
      entityName: tx.entityName || 'Fornecedor / Cliente',
      costCenter: tx.costCenter || 'Operações',
      status: tx.status || 'Pago',
      documentRef: tx.documentRef || `DOC-${Math.floor(1000 + Math.random() * 9000)}`,
    };
    setCorporateTransactions((prev) => [newTx, ...prev]);

    // Atualiza saldo da conta PJ
    setCorporateAccounts((prev) =>
      prev.map((acc) => {
        if (acc.name === newTx.account) {
          return {
            ...acc,
            balance: newTx.type === 'receita' ? acc.balance + newTx.amount : acc.balance - newTx.amount,
          };
        }
        return acc;
      })
    );
  };

  const deleteCorporateTransaction = (id: string) => {
    const found = corporateTransactions.find((t) => t.id === id);
    if (!found) return;

    setCorporateTransactions((prev) => prev.filter((t) => t.id !== id));
    setCorporateTrash((prev) => [
      {
        id: `trash-${Date.now()}`,
        originalType: 'transacao_pj',
        title: found.description,
        amount: found.amount,
        deletedAt: new Date().toLocaleDateString('pt-BR'),
        payload: found,
      },
      ...prev,
    ]);
  };

  const restoreCorporateTrashItem = (trashId: string) => {
    const item = corporateTrash.find((i) => i.id === trashId);
    if (!item) return;

    if (item.originalType === 'transacao_pj') {
      setCorporateTransactions((prev) => [item.payload, ...prev]);
    }
    setCorporateTrash((prev) => prev.filter((i) => i.id !== trashId));
  };

  const emptyCorporateTrash = () => setCorporateTrash([]);

  // Ações de Cadastros Gerais
  const addCustomer = (c: Partial<Customer>) => {
    const newCust: Customer = {
      id: `cust-${Date.now()}`,
      name: c.name || 'Nova Empresa',
      document: c.document || '00.000.000/0001-00',
      type: c.type || 'PJ',
      email: c.email || 'contato@empresa.com.br',
      phone: c.phone || '(11) 3000-0000',
      whatsapp: c.whatsapp || '(11) 99000-0000',
      contactPerson: c.contactPerson || 'Responsável',
      segment: c.segment || 'Corporativo',
      address: c.address || {
        street: 'Av. Paulista',
        number: '1000',
        neighborhood: 'Bela Vista',
        city: 'São Paulo',
        state: 'SP',
        cep: '01310-100',
      },
      assignedSalesperson: user.name,
      creditLimit: c.creditLimit || 50000,
      creditUsed: 0,
      creditAvailable: c.creditLimit || 50000,
      totalSpent: 0,
      ordersCount: 0,
      averageTicket: 0,
      lastPurchaseDate: new Date().toLocaleDateString('pt-BR'),
      csatRating: 5,
      status: 'Ativo',
      tags: ['Novo Cadastro'],
    };
    setCustomers((prev) => [newCust, ...prev]);
  };

  const addProduct = (p: Partial<Product>) => {
    const newProd: Product = {
      id: `prod-${Date.now()}`,
      sku: p.sku || `POLO-${Math.floor(100 + Math.random() * 900)}`,
      name: p.name || 'Novo Produto',
      category: p.category || 'Cadeiras',
      subcategory: p.subcategory || 'Executiva',
      brand: 'Polo Móveis',
      supplier: 'Fabricação Polo',
      costPrice: Number(p.costPrice) || 500,
      salePrice: Number(p.salePrice) || 1000,
      marginPercent: 50,
      stockCurrent: Number(p.stockCurrent) || 20,
      stockReserved: 0,
      stockAvailable: Number(p.stockCurrent) || 20,
      stockMin: 5,
      stockMax: 50,
      location: 'Galpão 1',
      abcClass: 'A',
      leadTimeDays: 7,
      inStock: true,
      description: p.description || 'Produto de linha corporativa.',
      dimensions: p.dimensions || 'Padrão NR-17',
      warrantyMonths: 36,
      lastSoldDaysAgo: 0,
    };
    setProducts((prev) => [newProd, ...prev]);
  };

  const addDeal = (d: Partial<Deal>) => {
    const newDeal: Deal = {
      id: `deal-${Date.now()}`,
      title: d.title || 'Nova Negociação',
      customerId: d.customerId || customers[0].id,
      customerName: d.customerName || customers[0].name,
      value: Number(d.value) || 25000,
      weightedValue: (Number(d.value) || 25000) * 0.6,
      probability: 60,
      stage: d.stage || 'orcamento',
      salesperson: user.name,
      source: d.source || 'Indicação',
      productsOfInterest: d.productsOfInterest || ['Cadeira Presidente Vertex'],
      expectedCloseDate: '30/10/2026',
      createdAt: new Date().toLocaleDateString('pt-BR'),
      lastInteraction: 'Negociação iniciada',
      notes: d.notes || '',
    };
    setDeals((prev) => [newDeal, ...prev]);
  };

  const addOrder = (o: Partial<Order>) => {
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      code: `#${1050 + orders.length}`,
      customerId: o.customerId || customers[0].id,
      customerName: o.customerName || customers[0].name,
      customerAddress: o.customerAddress || 'São Paulo, SP',
      date: new Date().toLocaleDateString('pt-BR'),
      deliveryEstimate: o.deliveryEstimate || 'Em até 5 dias úteis',
      totalValue: Number(o.totalValue) || 15000,
      itemsCount: o.itemsCount || 5,
      items: o.items || [],
      operationalStatus: 'venda_aprovada',
      paymentStatus: o.paymentStatus || 'Pago',
      progressPercent: 20,
      trackingCode: `POLO-TRK-${Math.floor(1000 + Math.random() * 9000)}`,
    };
    setOrders((prev) => [newOrder, ...prev]);
  };

  const addTask = (t: Partial<Task>) => {
    const newTask: Task = {
      id: `tsk-${Date.now()}`,
      title: t.title || 'Nova Tarefa',
      description: t.description || '',
      assignedTo: t.assignedTo || user.name,
      department: t.department || 'Operações',
      priority: t.priority || 'Média',
      column: t.column || 'hoje',
      dueDate: t.dueDate || 'Hoje',
      checklist: t.checklist || [{ id: 'c1', text: 'Executar atividade', done: false }],
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const toggleTaskCheck = (taskId: string, checkId: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          return {
            ...t,
            checklist: t.checklist.map((c) => (c.id === checkId ? { ...c, done: !c.done } : c)),
          };
        }
        return t;
      })
    );
  };

  const updateTaskColumn = (taskId: string, col: Task['column']) => {
    setTasks((prev) => prev.map((t) => (t.id === taskId ? { ...t, column: col } : t)));
  };

  const addPersonalInvestment = (inv: Partial<PersonalInvestment>) => {
    const newInv: PersonalInvestment = {
      id: `inv-${Date.now()}`,
      name: inv.name || 'Novo Investimento',
      category: inv.category || 'Renda Fixa',
      institution: inv.institution || 'XP Investimentos',
      investedAmount: Number(inv.investedAmount) || 10000,
      currentAmount: Number(inv.currentAmount) || Number(inv.investedAmount) || 10000,
      profit: 0,
      profitabilityPercent: 0,
      allocationPercent: 10,
    };
    setPersonalInvestments((prev) => [newInv, ...prev]);
  };

  // Criação Conectada de Venda
  const createSale = (saleData: Partial<Sale>): Sale => {
    const saleNum = 149 + sales.length;
    const saleCode = saleData.code || `VD-2026-${saleNum}`;
    const items = saleData.items || [];
    const subtotal = items.reduce((acc, i) => acc + (i.unitPrice * i.quantity), 0);
    const discountTotal = saleData.discountTotal || 0;
    const shippingFee = saleData.shippingFee || 0;
    const assemblyFee = saleData.assemblyFee || 0;
    const total = saleData.total || (subtotal - discountTotal + shippingFee + assemblyFee);
    const commissionPercent = saleData.commissionPercent || 4.5;
    const commissionAmount = Number(((total * commissionPercent) / 100).toFixed(2));
    const installmentsCount = saleData.installmentsCount || 1;
    const salesperson = saleData.salesperson || user.name || 'Carlos Mendes';

    const newSale: Sale = {
      id: `sale-${Date.now()}`,
      code: saleCode,
      customerId: saleData.customerId || (customers[0]?.id ?? 'cust-01'),
      customerName: saleData.customerName || customers[0]?.name || 'Cliente Polo',
      customerPhone: saleData.customerPhone || customers[0]?.phone || '(11) 99000-0000',
      customerDocument: saleData.customerDocument || customers[0]?.document || '00.000.000/0001-00',
      customerAddress: saleData.customerAddress || 'São Paulo - SP',
      date: saleData.date || new Date().toLocaleDateString('pt-BR'),
      salesperson,
      items,
      subtotal,
      discountTotal,
      shippingFee,
      assemblyFee,
      total,
      paymentMethod: saleData.paymentMethod || 'Pix',
      installmentsCount,
      paymentStatus: (saleData.paymentMethod === 'Pix' || saleData.paymentMethod === 'Dinheiro') ? 'Pago' : 'Pendente',
      operationalStatus: saleData.operationalStatus || 'Novo',
      deliveryScheduledDate: saleData.deliveryScheduledDate,
      deliveryPeriod: saleData.deliveryPeriod || 'Manhã (08h-12h)',
      needsAssembly: saleData.needsAssembly,
      assemblyScheduledDate: saleData.assemblyScheduledDate,
      assemblerName: saleData.assemblerName || 'Marcos Rocha (Equipe Polo Alpha)',
      commissionPercent,
      commissionAmount,
      notes: saleData.notes || '',
      quoteOriginCode: saleData.quoteOriginCode,
    };

    setSales((prev) => [newSale, ...prev]);

    // 1. Atualizar métricas do Cliente
    setCustomers((prev) =>
      prev.map((c) => {
        if (c.id === newSale.customerId || c.name === newSale.customerName) {
          const newOrdersCount = c.ordersCount + 1;
          const newTotalSpent = c.totalSpent + total;
          return {
            ...c,
            ordersCount: newOrdersCount,
            totalSpent: newTotalSpent,
            averageTicket: Math.round(newTotalSpent / newOrdersCount),
            lastPurchaseDate: newSale.date,
          };
        }
        return c;
      })
    );

    // 2. Debitar / Reservar Estoque & Registrar Movimentação
    items.forEach((item) => {
      setProducts((prev) =>
        prev.map((p) => {
          if (p.id === item.productId || p.sku === item.sku) {
            const newAvail = Math.max(0, p.stockAvailable - item.quantity);
            const newReserved = p.stockReserved + item.quantity;
            return {
              ...p,
              stockAvailable: newAvail,
              stockReserved: newReserved,
            };
          }
          return p;
        })
      );

      const moveEntry: StockMovement = {
        id: `sm-${Date.now()}-${item.sku}`,
        productName: item.productName,
        sku: item.sku,
        type: 'Reserva Venda',
        quantity: item.quantity,
        date: new Date().toLocaleDateString('pt-BR') + ' ' + new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        responsible: salesperson,
        reference: `${saleCode} (${newSale.customerName})`,
        stockAfter: 15,
      };
      setStockMovements((prev) => [moveEntry, ...prev]);
    });

    // 3. Gerar Parcelas no Contas a Receber
    const installmentValue = Number((total / installmentsCount).toFixed(2));
    const now = new Date();
    const newRecs: Receivable[] = [];
    for (let i = 1; i <= installmentsCount; i++) {
      const due = new Date(now);
      due.setDate(due.getDate() + (i * 30));
      const isPaid = (newSale.paymentStatus === 'Pago');
      newRecs.push({
        id: `rec-${Date.now()}-${i}`,
        saleId: newSale.id,
        saleCode,
        customerName: newSale.customerName,
        installment: `${i}/${installmentsCount}`,
        dueDate: isPaid ? newSale.date : due.toLocaleDateString('pt-BR'),
        amount: i === installmentsCount ? Number((total - (installmentValue * (installmentsCount - 1))).toFixed(2)) : installmentValue,
        receivedAmount: isPaid ? total : 0,
        paymentMethod: newSale.paymentMethod,
        status: isPaid ? 'Pago' : 'Pendente',
        paidDate: isPaid ? newSale.date : undefined,
      });
    }
    setReceivables((prev) => [...newRecs, ...prev]);

    // Entrada no Caixa Corporativo se pago à vista
    if (newSale.paymentStatus === 'Pago') {
      addCorporateTransaction({
        description: `Recebimento à vista Venda ${saleCode}`,
        amount: total,
        type: 'receita',
        category: 'Venda Mobiliário',
        entityName: newSale.customerName,
        costCenter: 'Comercial',
        status: 'Pago',
      });
    }

    // 4. Registrar Comissão do Vendedor
    const commEntry: CommissionEntry = {
      id: `com-${Date.now()}`,
      salesperson,
      saleCode,
      saleDate: newSale.date,
      saleAmount: total,
      ratePercent: commissionPercent,
      amount: commissionAmount,
      status: 'Pendente',
    };
    setCommissionEntries((prev) => [commEntry, ...prev]);

    // 5. Agendar Entrega se houver data
    if (newSale.deliveryScheduledDate) {
      const newDel: Delivery = {
        id: `del-${Date.now()}`,
        orderCode: saleCode,
        customerName: newSale.customerName,
        address: newSale.customerAddress,
        driver: 'Valdomiro Costa (Frota 02)',
        vehicle: 'Iveco Daily Baú',
        plate: 'PLM-9B42',
        departureTime: '08:30',
        estimatedArrival: '11:00',
        status: 'Preparando',
        podReceived: false,
        assemblyRequired: newSale.needsAssembly,
      };
      setDeliveries((prev) => [newDel, ...prev]);
    }

    // 6. Agendar Montagem se aplicável
    if (newSale.needsAssembly) {
      const newAsm: AssemblyOrder = {
        id: `asm-${Date.now()}`,
        saleCode,
        customerName: newSale.customerName,
        customerPhone: newSale.customerPhone,
        address: newSale.customerAddress,
        assemblerName: newSale.assemblerName || 'Marcos Rocha (Equipe Polo Alpha)',
        scheduledDate: newSale.assemblyScheduledDate || 'A definir',
        period: 'Manhã (09h)',
        status: 'Agendada',
        notes: `Montagem referente à venda ${saleCode}. Itens: ${items.map((i) => `${i.quantity}x ${i.productName}`).join(', ')}`,
        checklist: items.map((it, idx) => ({
          id: `chk-${idx}`,
          item: `Montagem e teste de conformidade NR-17 de ${it.quantity}x ${it.productName}`,
          checked: false,
        })),
        confirmedByCustomer: false,
      };
      setAssemblies((prev) => [newAsm, ...prev]);
    }

    return newSale;
  };

  // Transformar Orçamento em Venda
  const convertQuoteToSale = (quoteId: string) => {
    const q = quotes.find((item) => item.id === quoteId);
    if (!q) return;

    setQuotes((prev) => prev.map((item) => (item.id === quoteId ? { ...item, status: 'Aprovado' } : item)));

    const saleItems: SaleItem[] = (q.items || []).map((it: any) => ({
      productId: it.productId || products[0].id,
      productName: it.productName || 'Produto Polo',
      sku: it.sku || 'SKU-POLO',
      quantity: it.quantity || 1,
      unitPrice: it.unitPrice || 1000,
      unitCost: it.unitCost || (it.unitPrice ? it.unitPrice * 0.5 : 500),
      discountPercent: it.discountPercent || 0,
      total: it.total || it.totalPrice || (it.unitPrice * it.quantity),
    }));

    const cust = customers.find((c) => c.name === q.customerName) || customers[0];

    const generatedSale = createSale({
      customerId: cust.id,
      customerName: q.customerName || cust.name,
      customerPhone: cust.phone,
      customerDocument: cust.document,
      customerAddress: `${cust.address.street}, ${cust.address.number} - ${cust.address.neighborhood}, ${cust.address.city} - ${cust.address.state}`,
      salesperson: q.salesperson || user.name || 'Carlos Mendes',
      items: saleItems,
      subtotal: q.subtotal || q.total || 50000,
      discountTotal: q.discountTotal || 0,
      shippingFee: q.shippingFee || q.freightCost || 350,
      assemblyFee: q.assemblyFee || q.assemblyCost || 500,
      total: q.total || 50850,
      paymentMethod: 'Boleto Bancário 30/60',
      installmentsCount: 2,
      operationalStatus: 'Novo',
      deliveryScheduledDate: 'Em até 5 dias úteis',
      deliveryPeriod: 'Manhã (08h-12h)',
      needsAssembly: true,
      assemblyScheduledDate: 'Em até 7 dias úteis',
      quoteOriginCode: q.code,
      notes: `Venda gerada automaticamente a partir do orçamento aprovado ${q.code}.`,
    });

    setSelectedSaleDetail(generatedSale);
    setActiveView('commercial_sales');
  };

  // Alteração de Status Operacional da Venda
  const updateSaleOperationalStatus = (saleId: string, status: SaleOperationalStatus) => {
    setSales((prev) =>
      prev.map((s) => {
        if (s.id === saleId) {
          return { ...s, operationalStatus: status };
        }
        return s;
      })
    );

    const sale = sales.find((s) => s.id === saleId);
    if (sale) {
      if (status === 'Em rota') {
        setDeliveries((prev) =>
          prev.map((d) => (d.orderCode === sale.code ? { ...d, status: 'Em rota' } : d))
        );
      } else if (status === 'Entregue') {
        setDeliveries((prev) =>
          prev.map((d) => (d.orderCode === sale.code ? { ...d, status: 'Entregue', podReceived: true } : d))
        );
      } else if (status === 'Concluído') {
        setAssemblies((prev) =>
          prev.map((a) => (a.saleCode === sale.code ? { ...a, status: 'Concluída', confirmedByCustomer: true } : a))
        );
      }
    }
  };

  // Dar Baixa em Conta a Receber
  const registerReceivablePayment = (receivableId: string) => {
    const rec = receivables.find((r) => r.id === receivableId);
    if (!rec || rec.status === 'Pago') return;

    const today = new Date().toLocaleDateString('pt-BR');

    setReceivables((prev) =>
      prev.map((r) =>
        r.id === receivableId
          ? { ...r, status: 'Pago', receivedAmount: r.amount, paidDate: today }
          : r
      )
    );

    // Entrada no Caixa Corporativo
    addCorporateTransaction({
      description: `Recebimento Parcela ${rec.installment} Venda ${rec.saleCode} - ${rec.customerName}`,
      amount: rec.amount,
      type: 'receita',
      category: 'Venda Mobiliário',
      entityName: rec.customerName,
      costCenter: 'Comercial',
      status: 'Pago',
    });

    // Se todas parcelas da venda estiverem pagas, marcar venda como 'Pago'
    const otherRecs = receivables.filter((r) => r.saleCode === rec.saleCode && r.id !== receivableId);
    const allOthersPaid = otherRecs.every((r) => r.status === 'Pago');
    if (allOthersPaid) {
      setSales((prev) =>
        prev.map((s) => (s.code === rec.saleCode ? { ...s, paymentStatus: 'Pago' } : s))
      );
    } else {
      setSales((prev) =>
        prev.map((s) => (s.code === rec.saleCode ? { ...s, paymentStatus: 'Parcial' } : s))
      );
    }
  };

  // Registrar Pagamento de Conta a Pagar
  const registerPayablePayment = (payableId: string) => {
    const pay = payables.find((p) => p.id === payableId);
    if (!pay || pay.status === 'Pago') return;

    const today = new Date().toLocaleDateString('pt-BR');

    setPayables((prev) =>
      prev.map((p) =>
        p.id === payableId ? { ...p, status: 'Pago', paidDate: today } : p
      )
    );

    // Saída no Caixa Corporativo
    addCorporateTransaction({
      description: `Pagamento ${pay.supplierName} - ${pay.description}`,
      amount: pay.amount,
      type: 'despesa',
      category: (pay.category as any) || 'Fornecedores Matéria-Prima',
      entityName: pay.supplierName,
      costCenter: 'Operações',
      status: 'Pago',
    });
  };

  // Atualizar Entrega
  const updateDeliveryStatus = (deliveryId: string, status: any) => {
    setDeliveries((prev) =>
      prev.map((d) => (d.id === deliveryId ? { ...d, status, podReceived: status === 'Entregue' } : d))
    );
    const del = deliveries.find((d) => d.id === deliveryId);
    if (del) {
      if (status === 'Em rota') {
        setSales((prev) => prev.map((s) => (s.code === del.orderCode ? { ...s, operationalStatus: 'Em rota' } : s)));
      } else if (status === 'Entregue') {
        setSales((prev) => prev.map((s) => (s.code === del.orderCode ? { ...s, operationalStatus: del.assemblyRequired ? 'Montagem pendente' : 'Entregue' } : s)));
      }
    }
  };

  // Atualizar Montagem
  const updateAssemblyStatus = (assemblyId: string, status: any) => {
    setAssemblies((prev) =>
      prev.map((a) => (a.id === assemblyId ? { ...a, status, confirmedByCustomer: status === 'Concluída' } : a))
    );
    const asm = assemblies.find((a) => a.id === assemblyId);
    if (asm && status === 'Concluída') {
      setSales((prev) => prev.map((s) => (s.code === asm.saleCode ? { ...s, operationalStatus: 'Concluído' } : s)));
    }
  };

  const toggleAssemblyChecklist = (assemblyId: string, checkId: string) => {
    setAssemblies((prev) =>
      prev.map((a) => {
        if (a.id === assemblyId) {
          return {
            ...a,
            checklist: a.checklist.map((c) => (c.id === checkId ? { ...c, checked: !c.checked } : c)),
          };
        }
        return a;
      })
    );
  };

  // Compras de Fornecedores
  const createPurchaseOrder = (poData: Partial<PurchaseOrder>) => {
    const newPO: PurchaseOrder = {
      id: `po-${Date.now()}`,
      code: poData.code || `PC-2026-0${45 + purchaseOrders.length}`,
      supplierId: poData.supplierId || 'sup-1',
      supplierName: poData.supplierName || 'TecnoPoltronas Brasil',
      items: poData.items || [],
      totalValue: poData.totalValue || 15000,
      orderDate: new Date().toLocaleDateString('pt-BR'),
      expectedDate: poData.expectedDate || '10 dias úteis',
      status: poData.status || 'Pedido ao fornecedor',
      notes: poData.notes || '',
    };
    setPurchaseOrders((prev) => [newPO, ...prev]);
  };

  const receivePurchaseOrder = (poId: string) => {
    const po = purchaseOrders.find((p) => p.id === poId);
    if (!po || po.status === 'Recebido') return;

    setPurchaseOrders((prev) =>
      prev.map((p) => (p.id === poId ? { ...p, status: 'Recebido' } : p))
    );

    // Entrada nos produtos
    po.items.forEach((it) => {
      setProducts((prev) =>
        prev.map((p) => {
          if (p.id === it.productId || p.sku === it.sku) {
            const newCurr = p.stockCurrent + it.quantity;
            const newAvail = p.stockAvailable + it.quantity;
            return { ...p, stockCurrent: newCurr, stockAvailable: newAvail };
          }
          return p;
        })
      );

      const moveEntry: StockMovement = {
        id: `sm-${Date.now()}-${it.sku}`,
        productName: it.productName,
        sku: it.sku,
        type: 'Entrada Compra',
        quantity: it.quantity,
        date: new Date().toLocaleDateString('pt-BR') + ' ' + new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        responsible: 'Almoxarifado Polo',
        reference: `Recebimento ${po.code} (${po.supplierName})`,
        stockAfter: 35,
      };
      setStockMovements((prev) => [moveEntry, ...prev]);
    });

    // Gera Conta a Pagar
    const due = new Date();
    due.setDate(due.getDate() + 28);
    const newPay: Payable = {
      id: `pay-${Date.now()}`,
      supplierName: po.supplierName,
      category: 'Fornecedor Móveis',
      description: `NF-e ref. Ordem de Compra ${po.code}`,
      dueDate: due.toLocaleDateString('pt-BR'),
      amount: po.totalValue,
      status: 'Pendente',
      purchaseCode: po.code,
    };
    setPayables((prev) => [newPay, ...prev]);
  };

  // Ocorrências / Pós-Venda
  const createOccurrence = (occData: Partial<Occurrence>) => {
    const newOcc: Occurrence = {
      id: `occ-${Date.now()}`,
      protocol: occData.protocol || `OC-2026-0${32 + occurrences.length}`,
      customerName: occData.customerName || 'Cliente Polo',
      customerPhone: occData.customerPhone || '(11) 99000-0000',
      saleCode: occData.saleCode || 'VD-2026-147',
      productName: occData.productName || 'Mobiliário Corporativo',
      type: occData.type || 'Assistência técnica',
      priority: occData.priority || 'Média',
      status: 'Aberto',
      responsible: occData.responsible || user.name || 'Marcos Rocha',
      createdAt: new Date().toLocaleDateString('pt-BR') + ' ' + new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      description: occData.description || 'Chamado registrado pelo cliente.',
    };
    setOccurrences((prev) => [newOcc, ...prev]);
  };

  const resolveOccurrence = (occId: string, resolution: string) => {
    setOccurrences((prev) =>
      prev.map((o) =>
        o.id === occId ? { ...o, status: 'Resolvido', resolution } : o
      )
    );
  };

  // CRM Follow-ups
  const toggleFollowUp = (id: string) => {
    setFollowUps((prev) =>
      prev.map((f) => (f.id === id ? { ...f, status: f.status === 'Concluído' ? 'Pendente' : 'Concluído' } : f))
    );
  };

  const addFollowUp = (f: Partial<FollowUpTask>) => {
    const newFup: FollowUpTask = {
      id: `fup-${Date.now()}`,
      customerId: f.customerId || 'cust-01',
      customerName: f.customerName || 'Cliente Polo',
      customerPhone: f.customerPhone || '(11) 99000-0000',
      title: f.title || 'Follow-up comercial',
      dueDate: f.dueDate || 'Hoje',
      dueTime: f.dueTime || '14:00',
      assignedTo: f.assignedTo || user.name || 'Carlos Mendes',
      status: 'Pendente',
      notes: f.notes || '',
    };
    setFollowUps((prev) => [newFup, ...prev]);
  };

  // Quitar Comissões de Vendedor
  const paySalespersonCommissions = (salesperson: string) => {
    const today = new Date().toLocaleDateString('pt-BR');
    let totalPaid = 0;
    setCommissionEntries((prev) =>
      prev.map((c) => {
        if (c.salesperson === salesperson && c.status === 'Pendente') {
          totalPaid += c.amount;
          return { ...c, status: 'Pago', paidDate: today };
        }
        return c;
      })
    );

    if (totalPaid > 0) {
      addCorporateTransaction({
        description: `Pagamento Comissões de Vendas - ${salesperson}`,
        amount: totalPaid,
        type: 'despesa',
        category: 'Comissões Vendas',
        entityName: salesperson,
        costCenter: 'Comercial',
        status: 'Pago',
      });
    }
  };

  // Ajuste Manual de Estoque
  const adjustProductStock = (productId: string, delta: number, reason: string) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const newCurrent = Math.max(0, p.stockCurrent + delta);
          const newAvail = Math.max(0, p.stockAvailable + delta);

          const moveEntry: StockMovement = {
            id: `sm-${Date.now()}`,
            productName: p.name,
            sku: p.sku,
            type: 'Ajuste Inventário',
            quantity: Math.abs(delta),
            date: new Date().toLocaleDateString('pt-BR') + ' ' + new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
            responsible: user.name || 'Marcus Glauber',
            reference: reason || 'Ajuste balanço de inventário',
            stockAfter: newAvail,
          };
          setStockMovements((sm) => [moveEntry, ...sm]);

          return { ...p, stockCurrent: newCurrent, stockAvailable: newAvail };
        }
        return p;
      })
    );
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        setTheme,
        activeView,
        setActiveView,
        company,
        setCompany,
        user,
        setUser,
        isSearchOpen,
        setIsSearchOpen,
        quickActionType,
        openQuickAction,
        closeQuickAction,
        activeRole,
        setActiveRole,
        products,
        customers,
        deals,
        orders,
        deliveries,
        tasks,
        goals,
        updates,
        sales,
        receivables,
        payables,
        purchaseOrders,
        assemblies,
        occurrences,
        followUps,
        stockMovements,
        commissionEntries,
        selectedCustomerProfile,
        setSelectedCustomerProfile,
        selectedSaleDetail,
        setSelectedSaleDetail,
        selectedQuoteDetail,
        setSelectedQuoteDetail,
        createSale,
        convertQuoteToSale,
        updateSaleOperationalStatus,
        registerReceivablePayment,
        registerPayablePayment,
        updateDeliveryStatus,
        updateAssemblyStatus,
        toggleAssemblyChecklist,
        createPurchaseOrder,
        receivePurchaseOrder,
        createOccurrence,
        resolveOccurrence,
        toggleFollowUp,
        addFollowUp,
        paySalespersonCommissions,
        adjustProductStock,
        transactions: corporateTransactions,
        okrs: goals,
        suppliers,
        auditLogs,
        quotes,
        cart,
        inventoryMovements,
        updateDealStage,
        updateOrderStatus,
        addToCart,
        removeFromCart,
        clearCart,
        addQuote,
        approveQuote,
        toggleTaskChecklist,
        quickAction: {
          isOpen: Boolean(quickActionType),
          type: quickActionType
            ? quickActionType === 'cliente'
              ? 'customer'
              : quickActionType === 'venda'
              ? 'sale'
              : quickActionType === 'tarefa'
              ? 'task'
              : quickActionType === 'despesa' || quickActionType === 'receita'
              ? 'payment'
              : quickActionType === 'produto'
              ? 'inventory'
              : (quickActionType as any)
            : '',
        },
        addInventoryEntry,
        addTransaction,
        alerts,
        resolveAlert,
        personalAccounts,
        personalCards,
        personalTransactions,
        personalRecurring,
        personalInvestments,
        personalAssets,
        personalDebts,
        personalTrash,
        corporateAccounts,
        corporateCards,
        corporateTransactions,
        corporateFixedCosts,
        corporateProperties,
        corporateContracts,
        corporateTrash,
        addPersonalTransaction,
        deletePersonalTransaction,
        restorePersonalTrashItem,
        emptyPersonalTrash,
        addCorporateTransaction,
        deleteCorporateTransaction,
        restoreCorporateTrashItem,
        emptyCorporateTrash,
        addCustomer,
        addProduct,
        addDeal,
        addOrder,
        addTask,
        toggleTaskCheck,
        updateTaskColumn,
        addPersonalInvestment,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
