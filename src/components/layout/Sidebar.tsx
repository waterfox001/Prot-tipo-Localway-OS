import React, { useState } from 'react';
import {
  LayoutDashboard,
  BarChart3,
  FileText,
  ShoppingBag,
  Users,
  Target,
  Armchair,
  FolderTree,
  Boxes,
  ArrowLeftRight,
  Truck,
  Building2,
  PackageCheck,
  Wrench,
  AlertTriangle,
  ShieldCheck,
  TrendingUp,
  Receipt,
  DollarSign,
  Percent,
  CreditCard,
  LineChart,
  FileSpreadsheet,
  Goal,
  UserCheck,
  Sliders,
  ChevronDown,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ViewId, AppRole } from '../../types';
import { PoloLogo } from '../common/PoloLogo';

interface MenuItem {
  id: ViewId;
  label: string;
  icon: any;
  badge?: string | number;
  badgeColor?: 'orange' | 'slate' | 'amber';
}

interface MenuGroup {
  title: string;
  allowedRoles?: AppRole[];
  items: MenuItem[];
}

export const Sidebar: React.FC = () => {
  const {
    activeView,
    setActiveView,
    activeRole,
    setActiveRole,
    sales,
    quotes,
    deliveries,
    assemblies,
    occurrences,
    receivables,
    products,
    followUps,
  } = useApp();

  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    INÍCIO: true,
    COMERCIAL: true,
    'CATÁLOGO & ESTOQUE': true,
    OPERAÇÃO: true,
    FINANCEIRO: false,
    GESTÃO: false,
    CONFIGURAÇÕES: false,
  });

  const toggleGroup = (title: string) => {
    setOpenGroups((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  // Contadores dinâmicos objetivos
  const pendingQuotes = quotes.filter((q) => q.status === 'Enviado' || q.status === 'Rascunho').length;
  const activeSales = sales.filter((s) => s.operationalStatus !== 'Concluído' && s.operationalStatus !== 'Cancelado').length;
  const lowStockCount = products.filter((p) => p.stockAvailable <= p.stockMin).length;
  const pendingDeliveries = deliveries.filter((d) => d.status !== 'Entregue').length;
  const pendingAssemblies = assemblies.filter((a) => a.status !== 'Concluída').length;
  const openOccurrences = occurrences.filter((o) => o.status !== 'Resolvido' && o.status !== 'Encerrado').length;
  const overdueReceivables = receivables.filter((r) => r.status === 'Atrasado').length;
  const pendingFollowUps = followUps.filter((f) => f.status === 'Pendente').length;

  const menuGroups: MenuGroup[] = [
    {
      title: 'INÍCIO',
      items: [
        { id: 'home_overview', label: 'Painel Geral', icon: LayoutDashboard },
      ],
    },
    {
      title: 'COMERCIAL',
      allowedRoles: ['admin', 'vendedor'],
      items: [
        { id: 'commercial_dashboard', label: 'Dashboard Comercial', icon: BarChart3 },
        {
          id: 'commercial_quotes',
          label: 'Orçamentos',
          icon: FileText,
          badge: pendingQuotes > 0 ? pendingQuotes : undefined,
          badgeColor: 'slate',
        },
        {
          id: 'commercial_sales',
          label: 'Vendas & Pedidos',
          icon: ShoppingBag,
          badge: activeSales > 0 ? activeSales : undefined,
          badgeColor: 'orange',
        },
        { id: 'commercial_customers', label: 'Clientes', icon: Users },
        {
          id: 'commercial_crm',
          label: 'CRM & Pipeline',
          icon: Target,
          badge: pendingFollowUps > 0 ? pendingFollowUps : undefined,
          badgeColor: 'amber',
        },
      ],
    },
    {
      title: 'CATÁLOGO & ESTOQUE',
      allowedRoles: ['admin', 'estoque'],
      items: [
        { id: 'catalog_products', label: 'Produtos', icon: Armchair },
        { id: 'catalog_categories', label: 'Categorias', icon: FolderTree },
        {
          id: 'catalog_inventory',
          label: 'Estoque Físico',
          icon: Boxes,
          badge: lowStockCount > 0 ? lowStockCount : undefined,
          badgeColor: 'orange',
        },
        { id: 'catalog_movements', label: 'Movimentações', icon: ArrowLeftRight },
        { id: 'catalog_suppliers', label: 'Fornecedores', icon: Building2 },
        { id: 'catalog_purchases', label: 'Ordens de Compra', icon: Receipt },
      ],
    },
    {
      title: 'OPERAÇÃO',
      allowedRoles: ['admin', 'estoque', 'montador'],
      items: [
        { id: 'operations_orders', label: 'Separação & Picking', icon: PackageCheck },
        {
          id: 'operations_deliveries',
          label: 'Entregas & Frotas',
          icon: Truck,
          badge: pendingDeliveries > 0 ? pendingDeliveries : undefined,
          badgeColor: 'slate',
        },
        {
          id: 'operations_assemblies',
          label: 'Montagens',
          icon: Wrench,
          badge: pendingAssemblies > 0 ? pendingAssemblies : undefined,
          badgeColor: 'slate',
        },
        {
          id: 'operations_occurrences',
          label: 'Ocorrências / SAC',
          icon: AlertTriangle,
          badge: openOccurrences > 0 ? openOccurrences : undefined,
          badgeColor: 'orange',
        },
        { id: 'operations_warranties', label: 'Garantias & Pós-Venda', icon: ShieldCheck },
      ],
    },
    {
      title: 'FINANCEIRO',
      allowedRoles: ['admin', 'financeiro'],
      items: [
        {
          id: 'financial_receivables',
          label: 'Contas a Receber',
          icon: TrendingUp,
          badge: overdueReceivables > 0 ? overdueReceivables : undefined,
          badgeColor: 'orange',
        },
        { id: 'financial_payables', label: 'Contas a Pagar', icon: Receipt },
        { id: 'financial_cashflow', label: 'Fluxo de Caixa', icon: DollarSign },
        { id: 'financial_commissions', label: 'Comissões', icon: Percent },
        { id: 'financial_expenses', label: 'Demonstrativo (DRE)', icon: LineChart },
        { id: 'financial_methods', label: 'Formas de Pagamento', icon: CreditCard },
      ],
    },
    {
      title: 'GESTÃO',
      allowedRoles: ['admin'],
      items: [
        { id: 'management_indicators', label: 'Indicadores & BI', icon: BarChart3 },
        { id: 'management_reports', label: 'Relatórios', icon: FileSpreadsheet },
        { id: 'management_goals', label: 'Metas da Loja', icon: Goal },
        { id: 'management_users', label: 'Usuários & Permissões', icon: UserCheck },
      ],
    },
    {
      title: 'CONFIGURAÇÕES',
      allowedRoles: ['admin'],
      items: [
        { id: 'settings_company', label: 'Empresa & Unidades', icon: Building2 },
        { id: 'settings_preferences', label: 'Parâmetros Gerais', icon: Sliders },
      ],
    },
  ];

  const visibleGroups = menuGroups.filter((g) => {
    if (!g.allowedRoles) return true;
    if (activeRole === 'admin') return true;
    return g.allowedRoles.includes(activeRole);
  });

  const getBadgeStyle = (color?: string) => {
    switch (color) {
      case 'orange':
        return 'bg-orange-50 text-orange-700 dark:bg-orange-950/60 dark:text-orange-300 border border-orange-200 dark:border-orange-800';
      case 'amber':
        return 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-800';
      default:
        return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700';
    }
  };

  return (
    <aside className="w-60 shrink-0 flex flex-col border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 transition-colors z-40 select-none">
      {/* Brand Header — Compact Enterprise Polo Móveis (alinhado a h-14 com o Header) */}
      <div className="flex h-14 items-center px-3.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60">
        <button
          onClick={() => setActiveView('home_overview')}
          className="flex items-center w-full group py-0.5 transition-all text-left"
          title="Ir para o Painel Geral Polo Móveis"
        >
          <PoloLogo
            size="xs"
            variant="horizontal"
            className="transition-transform group-hover:scale-[1.02] duration-200"
          />
        </button>
      </div>

      {/* Navigation Groups */}
      <div className="flex-1 overflow-y-auto px-2 py-2 space-y-2.5">
        {visibleGroups.map((group) => {
          const isOpen = openGroups[group.title] ?? false;
          const hasActiveItem = group.items.some((it) => it.id === activeView);

          return (
            <div key={group.title} className="space-y-0.5">
              {/* Group Title Toggle */}
              <button
                onClick={() => toggleGroup(group.title)}
                className={`flex w-full items-center justify-between px-2 py-1 text-[10px] font-semibold tracking-wider transition-colors uppercase ${
                  hasActiveItem
                    ? 'text-slate-900 dark:text-white'
                    : 'text-slate-400 hover:text-slate-700 dark:text-slate-500 dark:hover:text-slate-300'
                }`}
              >
                <span>{group.title}</span>
                {isOpen ? (
                  <ChevronDown className="h-2.5 w-2.5 opacity-60" />
                ) : (
                  <ChevronRight className="h-2.5 w-2.5 opacity-60" />
                )}
              </button>

              {/* Group Items */}
              {isOpen && (
                <div className="space-y-0.5">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeView === item.id;

                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveView(item.id)}
                        className={`group flex w-full items-center justify-between rounded px-2.5 py-1.5 text-xs transition-colors ${
                          isActive
                            ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold border-l-2 border-orange-600'
                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/60 dark:hover:text-slate-200'
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <Icon
                            className={`h-3.5 w-3.5 shrink-0 transition-colors ${
                              isActive
                                ? 'text-orange-600 dark:text-orange-400'
                                : 'text-slate-400 group-hover:text-slate-600 dark:text-slate-500 dark:group-hover:text-slate-300'
                            }`}
                          />
                          <span className="truncate">{item.label}</span>
                        </div>

                        {item.badge !== undefined && (
                          <span
                            className={`text-[10px] px-1.5 py-0.2 rounded font-mono font-medium ${getBadgeStyle(
                              item.badgeColor
                            )}`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Role Context & Status Bar */}
      <div className="p-2.5 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-2">
        <div className="space-y-1">
          <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
            Perfil Operacional
          </label>
          <select
            value={activeRole}
            onChange={(e) => setActiveRole(e.target.value as AppRole)}
            className="w-full text-[11px] font-medium rounded border border-slate-200 bg-white px-2 py-1 text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-orange-600 cursor-pointer"
          >
            <option value="admin">Administrador Geral</option>
            <option value="vendedor">Comercial / Vendas</option>
            <option value="financeiro">Controladoria / Finanças</option>
            <option value="estoque">Almoxarifado & Compras</option>
            <option value="montador">Logística & Montagens</option>
          </select>
        </div>

        <div className="flex items-center justify-between pt-1 text-[10px] text-slate-500 dark:text-slate-400">
          <span className="truncate font-mono">v4.2.0 • PROD</span>
          <span className="inline-flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span className="text-emerald-700 dark:text-emerald-400 font-medium">Online</span>
          </span>
        </div>
      </div>
    </aside>
  );
};
