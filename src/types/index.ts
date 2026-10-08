export type ViewId =
  // LOCALWAY BUSINESS COMMAND CENTER
  | 'command_center'
  | 'attention_center'
  | 'ceo_intelligence'
  | 'revenue_analytics'
  | 'forecast_module'
  | 'money_on_table'
  | 'what_if_simulator'
  | 'customer_xray'
  | 'sales_crm'
  | 'inventory_intelligence'
  | 'financial_command'
  | 'performance_center'
  | 'ai_agents'
  | 'ask_localway'
  | 'product_intelligence'
  | 'playbooks_module'
  | 'tasks_projects'
  | 'company_workspace'
  | 'audit_log'
  | 'multi_branch_settings'

  // INÍCIO
  | 'home_overview'
  | 'home_updates'

  // COMERCIAL
  | 'commercial_dashboard'
  | 'commercial_quotes'
  | 'commercial_sales'
  | 'commercial_customers'
  | 'commercial_crm'

  // CATÁLOGO & ESTOQUE
  | 'catalog_products'
  | 'catalog_categories'
  | 'catalog_inventory'
  | 'catalog_movements'
  | 'catalog_suppliers'
  | 'catalog_purchases'

  // OPERAÇÃO
  | 'operations_orders'
  | 'operations_deliveries'
  | 'operations_assemblies'
  | 'operations_occurrences'
  | 'operations_warranties'

  // FINANCEIRO
  | 'financial_receivables'
  | 'financial_payables'
  | 'financial_cashflow'
  | 'financial_commissions'
  | 'financial_expenses'
  | 'financial_methods'

  // GESTÃO
  | 'management_indicators'
  | 'management_reports'
  | 'management_goals'
  | 'management_users'

  // CONFIGURAÇÕES
  | 'settings_company'
  | 'settings_preferences'
  | 'settings_account'

  // COMPATIBILIDADE / ALIASES
  | 'company_sales'
  | 'company_customers'
  | 'company_products'
  | 'company_inventory'
  | 'company_deliveries'
  | 'company_finance'
  | 'planning_goals'
  | 'planning_tasks'
  | 'personal_overview'
  | 'personal_transactions'
  | 'personal_accounts'
  | 'personal_cards'
  | 'personal_recurring'
  | 'personal_investments'
  | 'personal_networth'
  | 'personal_reports'
  | 'personal_trash'
  | 'corp_overview'
  | 'corp_properties'
  | 'corp_contracts'
  | 'corp_transactions'
  | 'corp_accounts'
  | 'corp_cards'
  | 'corp_fixed_costs'
  | 'corp_dre'
  | 'corp_reports'
  | 'corp_trash'
  | 'dashboard'
  | 'alerts'
  | 'strategy'
  | 'bi'
  | 'crm'
  | 'quotes'
  | 'customers'
  | 'products'
  | 'inventory'
  | 'suppliers'
  | 'operational'
  | 'logistics'
  | 'finance'
  | 'tasks'
  | 'rankings'
  | 'reports'
  | 'documents'
  | 'client-portal'
  | 'ecommerce'
  | 'website'
  | 'automations'
  | 'settings'
  | 'audit';

export type ThemeMode = 'light' | 'dark' | 'auto';

export type AppRole = 'admin' | 'vendedor' | 'financeiro' | 'estoque' | 'montador';

export type UserRole =
  | 'admin'
  | 'director'
  | 'manager'
  | 'financial'
  | 'sales'
  | 'operations'
  | 'logistics';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  roleLabel: string;
  avatar: string;
  department: string;
  branch: string;
}

export interface Company {
  id: string;
  name: string;
  subtitle: string;
  tradeName: string;
  cnpj: string;
  segment: string;
  headquarters: string;
  phone: string;
  email: string;
  primaryColor: string;
  logoText: string;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: 'Cadeiras' | 'Mesas' | 'Armários' | 'Estantes' | 'Móveis de Aço' | 'Longarinas' | 'Gaveteiros' | 'Kits';
  subcategory: string;
  brand: string;
  supplier: string;
  costPrice: number;
  salePrice: number;
  promotionalPrice?: number;
  marginPercent: number;
  stockCurrent: number;
  stockReserved: number;
  stockAvailable: number;
  stockMin: number;
  stockMax: number;
  location: string;
  abcClass: 'A' | 'B' | 'C';
  leadTimeDays: number;
  inStock: boolean;
  image?: string;
  description: string;
  dimensions: string;
  warrantyMonths: number;
  lastSoldDaysAgo: number;
}

export interface Customer {
  id: string;
  name: string;
  tradeName?: string;
  document: string;
  type: 'PJ' | 'PF';
  email: string;
  phone: string;
  whatsapp: string;
  contactPerson: string;
  segment: string;
  address: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    cep: string;
  };
  assignedSalesperson: string;
  creditLimit: number;
  creditUsed: number;
  creditAvailable: number;
  totalSpent: number;
  ordersCount: number;
  averageTicket: number;
  lastPurchaseDate: string;
  csatRating: number;
  status: 'Ativo' | 'Inativo' | 'Em Prospecção';
  tags: string[];
}

export type PipelineStage =
  | 'lead'
  | 'qualificacao'
  | 'contato'
  | 'necessidade'
  | 'orcamento'
  | 'proposta'
  | 'negociacao'
  | 'fechado'
  | 'perdido';

export type OrderOperationalStatus =
  | 'venda_aprovada'
  | 'reserva_estoque'
  | 'separacao'
  | 'conferencia'
  | 'expedicao'
  | 'transporte'
  | 'entrega'
  | 'montagem'
  | 'instalacao'
  | 'finalizado';

export interface QuoteItem {
  productId: string;
  productName: string;
  sku: string;
  quantity: number;
  unitPrice: number;
  unitCost?: number;
  discountPercent: number;
  totalPrice?: number;
  total?: number;
  marginPercent?: number;
  leadTimeDays?: number;
}

export interface Quote {
  id: string;
  code: string;
  customerId: string;
  customerName: string;
  customerCompany?: string;
  customerDocument?: string;
  customerPhone?: string;
  date: string;
  validUntil: string;
  items: QuoteItem[];
  subtotal: number;
  discountTotal: number;
  shippingFee: number;
  freightCost?: number;
  assemblyFee: number;
  assemblyCost?: number;
  taxTotal: number;
  total: number;
  paymentTerms: string;
  deliveryDays: number;
  status: 'Rascunho' | 'Enviado' | 'Aprovado' | 'Aprovada' | 'Recusado' | 'Expirado';
  notes?: string;
}

export interface FinancialTransaction {
  id: string;
  description: string;
  amount: number;
  type: 'receita' | 'despesa';
  date: string;
  dueDate?: string;
  category: string;
  account: string;
  status: 'Pago' | 'Pendente' | 'Atrasado';
  documentRef?: string;
  entityName?: string;
}

export interface Deal {
  id: string;
  title: string;
  customerId: string;
  customerName: string;
  customerCompany?: string;
  value: number;
  weightedValue: number;
  probability: number;
  stage: PipelineStage;
  salesperson: string;
  source: string;
  productsOfInterest: string[];
  expectedCloseDate: string;
  createdAt: string;
  lastInteraction: string;
  notes: string;
}

export interface Order {
  id: string;
  code: string;
  customerId: string;
  customerName: string;
  customerAddress: string;
  date: string;
  deliveryEstimate: string;
  totalValue: number;
  itemsCount: number;
  items: Array<{
    productId: string;
    productName: string;
    quantity: number;
    price: number;
  }>;
  operationalStatus:
    | 'venda_aprovada'
    | 'reserva_estoque'
    | 'separacao'
    | 'conferencia'
    | 'expedicao'
    | 'transporte'
    | 'entrega'
    | 'montagem'
    | 'finalizado';
  paymentStatus: 'Pago' | 'Faturado 30/60DD' | 'Aguardando Pagamento';
  driver?: string;
  vehicle?: string;
  progressPercent: number;
  trackingCode: string;
  assemblyTeam?: string;
}

export interface Delivery {
  id: string;
  orderCode: string;
  customerName: string;
  address: string;
  driver: string;
  vehicle: string;
  plate: string;
  departureTime: string;
  estimatedArrival: string;
  status: 'Preparando' | 'Separando' | 'Em rota' | 'Entregue';
  podReceived: boolean;
  assemblyRequired?: boolean;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  department: string;
  priority: 'Baixa' | 'Média' | 'Alta' | 'Urgente';
  column: 'backlog' | 'hoje' | 'andamento' | 'aguardando' | 'concluido';
  dueDate: string;
  checklist: Array<{ id: string; text: string; done: boolean }>;
}

export interface GoalOKR {
  id: string;
  objective: string;
  department: string;
  progress: number;
  period: string;
  keyResults: Array<{
    id: string;
    description: string;
    target: string;
    current: string;
    progressPercent: number;
    status: 'No Prazo' | 'Atenção' | 'Concluído';
  }>;
}

// ==========================================
// MEU FINANCEIRO (PESSOAL)
// ==========================================

export interface PersonalTransaction {
  id: string;
  description: string;
  amount: number;
  type: 'receita' | 'despesa' | 'transferencia';
  date: string;
  category:
    | 'Alimentação'
    | 'Moradia'
    | 'Transporte'
    | 'Saúde'
    | 'Educação'
    | 'Lazer'
    | 'Investimentos'
    | 'Pró-Labore'
    | 'Dividendos'
    | 'Outros';
  account: string;
  card?: string;
  beneficiary?: string;
  status: 'Pago' | 'Pendente';
  notes?: string;
  isRecurring?: boolean;
}

export interface PersonalAccount {
  id: string;
  name: string;
  bank: string;
  type: 'Conta Corrente' | 'Poupança' | 'Conta Digital' | 'Carteira / Dinheiro';
  balance: number;
  incomeMonth: number;
  expenseMonth: number;
  icon?: string;
}

export interface PersonalCard {
  id: string;
  name: string;
  bank: string;
  limit: number;
  availableLimit: number;
  currentInvoice: number;
  nextInvoice: number;
  closingDay: number;
  dueDay: number;
  brand: 'Mastercard Black' | 'Visa Infinite' | 'Elo Nanquim' | 'Visa Platinum';
}

export interface PersonalRecurring {
  id: string;
  title: string;
  category: string;
  amount: number;
  frequency: 'Mensal' | 'Semanal' | 'Anual';
  dueDay: number;
  status: 'Ativo' | 'Pausado';
  account: string;
}

export interface PersonalInvestment {
  id: string;
  name: string;
  category: 'Renda Fixa' | 'Ações' | 'Fundos Imobiliários' | 'Fundos Multimercado' | 'Criptomoedas' | 'Previdência';
  institution: string;
  investedAmount: number;
  currentAmount: number;
  profit: number;
  profitabilityPercent: number;
  allocationPercent: number;
}

export interface PersonalAsset {
  id: string;
  name: string;
  category: 'Dinheiro & Contas' | 'Investimentos' | 'Imóveis' | 'Veículos' | 'Outros Bens';
  value: number;
  acquisitionDate?: string;
}

export interface PersonalDebt {
  id: string;
  name: string;
  category: 'Financiamento Imobiliário' | 'Financiamento Veículo' | 'Empréstimo' | 'Parcelamento Cartão';
  originalAmount: number;
  remainingAmount: number;
  installmentsRemaining: number;
  nextDue: string;
  nextAmount: number;
  monthlyPayment?: number;
}

// ==========================================
// FINANCEIRO DA EMPRESA (CORPORATIVO)
// ==========================================

export interface CorporateTransaction {
  id: string;
  description: string;
  amount: number;
  type: 'receita' | 'despesa' | 'transferencia';
  date: string;
  dueDate: string;
  category:
    | 'Venda Mobiliário'
    | 'Fornecedores Matéria-Prima'
    | 'Folha Montagem & Salários'
    | 'Logística & Frete'
    | 'Impostos'
    | 'Comissões Vendas'
    | 'Aluguel & Infra'
    | 'Outros';
  account: string;
  entityName: string; // Cliente ou Fornecedor
  costCenter: 'Comercial' | 'Operações' | 'Administrativo' | 'Logística' | 'Diretoria';
  status: 'Pago' | 'Pendente' | 'Atrasado';
  documentRef?: string;
}

export interface CorporateAccount {
  id: string;
  name: string;
  bank: string;
  type: 'Conta Corrente PJ' | 'Reserva Emergência' | 'Caixa Operacional';
  balance: number;
  yieldInfo?: string;
}

export interface CorporateCard {
  id: string;
  name: string;
  holder: string;
  bank: string;
  limit: number;
  availableLimit: number;
  currentInvoice: number;
  dueDay: number;
}

export interface CorporateFixedCost {
  id: string;
  name: string;
  category: string;
  monthlyAmount: number;
  dueDay: number;
  responsible: string;
  status: 'Ativo' | 'Em Renegociação';
}

export interface CorporateProperty {
  id: string;
  name: string;
  address: string;
  type: 'Galpão Logístico' | 'Showroom Comercial' | 'Fábrica Parceira';
  marketValue: number;
  rentAmount: number;
  monthlyExpenses: number;
  contractDue: string;
  occupancyStatus: 'Próprio' | 'Locado';
  roiPercent: number;
}

export interface CorporateContract {
  id: string;
  customerName: string;
  contractCode: string;
  title: string;
  monthlyValue: number;
  totalValue: number;
  startDate: string;
  endDate: string;
  daysToRenew: number;
  status: 'Ativo' | 'Renovação Próxima' | 'Encerrado';
  terms: string;
}

// Updates / Novidades
export interface PlatformUpdate {
  id: string;
  date: string;
  tag: string;
  title: string;
  description: string;
  badge?: string;
}

// ==========================================
// SISTEMA OPERACIONAL DA LOJA DE MÓVEIS (ERP/CRM/LOGÍSTICA)
// ==========================================

export type SaleOperationalStatus =
  | 'Novo'
  | 'Pagamento pendente'
  | 'Pago'
  | 'Em preparação'
  | 'Aguardando estoque'
  | 'Pronto para entrega'
  | 'Em rota'
  | 'Entregue'
  | 'Montagem pendente'
  | 'Concluído'
  | 'Cancelado';

export interface SaleItem {
  productId: string;
  productName: string;
  sku: string;
  quantity: number;
  unitPrice: number;
  unitCost: number;
  discountPercent: number;
  total: number;
}

export interface Sale {
  id: string;
  code: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerDocument: string;
  customerAddress: string;
  date: string;
  salesperson: string;
  items: SaleItem[];
  subtotal: number;
  discountTotal: number;
  shippingFee: number;
  assemblyFee: number;
  total: number;
  paymentMethod: 'Pix' | 'Cartão de Crédito 1x' | 'Cartão de Crédito 3x' | 'Cartão de Crédito 6x' | 'Cartão de Crédito 10x' | 'Cartão de Crédito 12x' | 'Boleto Bancário 30/60' | 'Dinheiro' | 'Faturado 30/60';
  installmentsCount: number;
  paymentStatus: 'Pago' | 'Pendente' | 'Parcial';
  operationalStatus: SaleOperationalStatus;
  deliveryScheduledDate?: string;
  deliveryPeriod?: 'Manhã (08h-12h)' | 'Tarde (13h-18h)' | 'Integral';
  needsAssembly?: boolean;
  assemblyScheduledDate?: string;
  assemblerName?: string;
  commissionPercent: number;
  commissionAmount: number;
  notes?: string;
  quoteOriginCode?: string;
}

export interface Receivable {
  id: string;
  saleId: string;
  saleCode: string;
  customerName: string;
  installment: string;
  dueDate: string;
  amount: number;
  receivedAmount: number;
  paymentMethod: string;
  status: 'Pendente' | 'Pago' | 'Atrasado';
  paidDate?: string;
}

export interface Payable {
  id: string;
  supplierName: string;
  category: string;
  description: string;
  dueDate: string;
  amount: number;
  status: 'Pendente' | 'Pago' | 'Atrasado';
  paidDate?: string;
  purchaseCode?: string;
}

export interface PurchaseOrderItem {
  productId: string;
  productName: string;
  sku: string;
  quantity: number;
  unitCost: number;
  total: number;
}

export interface PurchaseOrder {
  id: string;
  code: string;
  supplierId: string;
  supplierName: string;
  items: PurchaseOrderItem[];
  totalValue: number;
  orderDate: string;
  expectedDate: string;
  status: 'Necessidade' | 'Pedido ao fornecedor' | 'Aguardando' | 'Em trânsito' | 'Recebido';
  notes?: string;
}

export interface AssemblyOrder {
  id: string;
  saleCode: string;
  customerName: string;
  customerPhone: string;
  address: string;
  assemblerName: string;
  scheduledDate: string;
  period: string;
  status: 'Agendada' | 'Em andamento' | 'Concluída' | 'Pendente de peças';
  notes?: string;
  checklist: Array<{ id: string; item: string; checked: boolean }>;
  confirmedByCustomer?: boolean;
}

export interface Occurrence {
  id: string;
  protocol: string;
  customerName: string;
  customerPhone: string;
  saleCode: string;
  productName: string;
  type: 'Avaria no transporte' | 'Peça faltando' | 'Atraso na entrega' | 'Troca/Substituição' | 'Assistência técnica' | 'Garantia' | 'Reclamação de acabamento';
  priority: 'Baixa' | 'Média' | 'Alta' | 'Crítica';
  status: 'Aberto' | 'Em análise' | 'Em atendimento' | 'Aguardando fornecedor' | 'Resolvido' | 'Encerrado';
  responsible: string;
  createdAt: string;
  description: string;
  resolution?: string;
}

export interface FollowUpTask {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  title: string;
  dueDate: string;
  dueTime: string;
  assignedTo: string;
  status: 'Pendente' | 'Concluído' | 'Atrasado';
  notes?: string;
}

export interface StockMovement {
  id: string;
  productId?: string;
  productName: string;
  sku: string;
  type: 'Entrada Compra' | 'Saída Venda' | 'Reserva Venda' | 'Ajuste Inventário' | 'Devolução';
  quantity: number;
  date: string;
  responsible: string;
  reference: string;
  stockAfter: number;
}

export interface CommissionEntry {
  id: string;
  salesperson: string;
  saleCode: string;
  saleDate: string;
  saleAmount: number;
  ratePercent: number;
  amount: number;
  status: 'Pendente' | 'Pago';
  paidDate?: string;
}

// LOCALWAY BUSINESS COMMAND CENTER TYPES
export type AlertPriority = 'critico' | 'importante' | 'atencao' | 'informativo';

export interface AttentionAlert {
  id: string;
  priority: AlertPriority;
  title: string;
  description: string;
  financialImpact: number;
  department: 'Estoque' | 'Financeiro' | 'Comercial' | 'Operação' | 'Estratégico';
  actionLabel: string;
  actionType: 'comprar' | 'cobrar' | 'followup' | 'cliente' | 'analisar' | 'resolver';
  targetId?: string;
  resolved: boolean;
  timestamp: string;
}

export type OpportunityCategory =
  | 'inativo'
  | 'orcamento'
  | 'estagnado'
  | 'cobranca'
  | 'margem'
  | 'cross_sell';

export interface MoneyOpportunity {
  id: string;
  title: string;
  category: OpportunityCategory;
  clientName: string;
  potentialValue: number;
  probability: number;
  reason: string;
  recommendedAction: string;
  status: 'identificada' | 'em_andamento' | 'recuperada' | 'descartada';
}

export interface CustomerJourneyStep {
  date: string;
  stage: 'lead' | 'first_buy' | 'second_buy' | 'upgrade' | 'last_buy' | 'risk';
  title: string;
  description: string;
  amount?: number;
  products?: string[];
}

export interface WhatIfParameters {
  priceDeltaPct: number;
  discountPct: number;
  volumeDeltaPct: number;
  sellersCount: number;
  monthlyGoal: number;
  stockCoverageDays: number;
  commissionPct: number;
}

export interface AiAgentAction {
  id: string;
  time: string;
  text: string;
  status: 'ok' | 'pending' | 'review';
}

export interface AiAgent {
  id: string;
  name: string;
  role: string;
  status: 'ativo' | 'executando' | 'pausado';
  tasksToday: number;
  recentActions: AiAgentAction[];
  rulesCount: number;
  humanApprovalRequired: boolean;
  avatar: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progressPct: number;
  unlockedAt?: string;
}

export interface PlaybookStage {
  id: string;
  name: string;
  sla: string;
  responsible: string;
  tasks: string[];
}

export interface Playbook {
  id: string;
  title: string;
  department: string;
  stagesCount: number;
  slaHours: number;
  completionRate: number;
  stages: PlaybookStage[];
}

export interface ProjectTaskCheckItem {
  id: string;
  text: string;
  done: boolean;
}

export interface ProjectTask {
  id: string;
  title: string;
  list: 'Estratégico' | 'Operações' | 'Comercial' | 'Financeiro';
  status: 'backlog' | 'todo' | 'in_progress' | 'review' | 'done';
  priority: 'urgente' | 'alta' | 'media' | 'baixa';
  assignee: string;
  dueDate: string;
  checklist: ProjectTaskCheckItem[];
}

