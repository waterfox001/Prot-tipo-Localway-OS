import React, { useState } from 'react';
import {
  Search,
  Plus,
  Bell,
  Sun,
  Moon,
  Laptop,
  CheckCircle2,
  ChevronDown,
  ShoppingBag,
  DollarSign,
  Package,
  FileText,
  AlertTriangle,
  Building,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ViewId, AppRole } from '../../types';
import { PoloLogo } from '../common/PoloLogo';

const viewTitles: Partial<Record<ViewId, { section: string; title: string }>> = {
  home_overview: { section: 'Geral', title: 'Painel de Comando' },
  home_updates: { section: 'Geral', title: 'Atualizações' },
  commercial_dashboard: { section: 'Comercial', title: 'Dashboard de Vendas' },
  commercial_quotes: { section: 'Comercial', title: 'Orçamentos' },
  commercial_sales: { section: 'Comercial', title: 'Vendas & Pedidos' },
  commercial_customers: { section: 'Comercial', title: 'Clientes' },
  commercial_crm: { section: 'Comercial', title: 'CRM & Pipeline' },
  catalog_products: { section: 'Catálogo', title: 'Produtos' },
  catalog_categories: { section: 'Catálogo', title: 'Categorias' },
  catalog_inventory: { section: 'Catálogo', title: 'Estoque Físico' },
  catalog_movements: { section: 'Catálogo', title: 'Movimentações' },
  catalog_suppliers: { section: 'Catálogo', title: 'Fornecedores' },
  catalog_purchases: { section: 'Catálogo', title: 'Ordens de Compra' },
  operations_orders: { section: 'Operação', title: 'Separação & Picking' },
  operations_deliveries: { section: 'Operação', title: 'Entregas' },
  operations_assemblies: { section: 'Operação', title: 'Montagens' },
  operations_occurrences: { section: 'Operação', title: 'Ocorrências / SAC' },
  operations_warranties: { section: 'Operação', title: 'Garantias' },
  financial_receivables: { section: 'Financeiro', title: 'Contas a Receber' },
  financial_payables: { section: 'Financeiro', title: 'Contas a Pagar' },
  financial_cashflow: { section: 'Financeiro', title: 'Fluxo de Caixa' },
  financial_commissions: { section: 'Financeiro', title: 'Comissões' },
  financial_expenses: { section: 'Financeiro', title: 'Demonstrativo (DRE)' },
  financial_methods: { section: 'Financeiro', title: 'Formas de Pagamento' },
  management_indicators: { section: 'Gestão', title: 'Indicadores & BI' },
  management_reports: { section: 'Gestão', title: 'Relatórios' },
  management_goals: { section: 'Gestão', title: 'Metas' },
  management_users: { section: 'Gestão', title: 'Usuários & Permissões' },
  settings_company: { section: 'Configurações', title: 'Empresa' },
  settings_preferences: { section: 'Configurações', title: 'Parâmetros' },
  settings_account: { section: 'Configurações', title: 'Minha Conta' },
};

export const Header: React.FC = () => {
  const {
    activeView,
    setActiveView,
    theme,
    setTheme,
    user,
    company,
    activeRole,
    setIsSearchOpen,
    openQuickAction,
  } = useApp();

  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const [quickMenuOpen, setQuickMenuOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState('Matriz São Paulo (SP)');

  const viewInfo = viewTitles[activeView] || { section: 'Geral', title: 'Painel de Comando' };

  const roleLabels: Record<AppRole, string> = {
    admin: 'Administrador',
    vendedor: 'Vendas',
    financeiro: 'Financeiro',
    estoque: 'Estoque',
    montador: 'Operação',
  };

  return (
    <header className="sticky top-0 z-30 flex h-14 w-full items-center justify-between border-b border-slate-200 bg-white px-4 md:px-6 dark:border-slate-800 dark:bg-slate-900 transition-colors">
      {/* 1. Breadcrumbs Enterprise */}
      <div className="flex items-center gap-2 text-xs">
        <button
          onClick={() => setActiveView('home_overview')}
          className="font-extrabold tracking-tight text-slate-900 dark:text-white hover:text-orange-600 dark:hover:text-orange-400 transition-colors flex items-center gap-1.5"
          title="Polo Móveis - Ir para Início"
        >
          <span>Polo Móveis</span>
        </button>
        <span className="text-slate-300 dark:text-slate-600">/</span>
        <span className="text-slate-500 dark:text-slate-400 hidden sm:inline">
          {viewInfo.section}
        </span>
        <span className="text-slate-300 dark:text-slate-600 hidden sm:inline">/</span>
        <h1 className="font-bold text-slate-900 dark:text-white truncate">
          {viewInfo.title}
        </h1>
      </div>

      {/* 2. Campo de Busca Compacto */}
      <div className="hidden md:flex items-center flex-1 max-w-sm mx-6">
        <button
          onClick={() => setIsSearchOpen(true)}
          className="flex w-full items-center justify-between rounded border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs text-slate-500 hover:border-slate-300 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:border-slate-600 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Search className="h-3.5 w-3.5 text-slate-400" />
            <span className="truncate">Buscar clientes, pedidos, SKUs...</span>
          </div>
          <kbd className="rounded border border-slate-200 bg-white px-1.5 text-[10px] font-mono text-slate-400 dark:border-slate-600 dark:bg-slate-700">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* 3. Ações: Unidade, + Novo Registro, Tema e Perfil Marcus Glauber */}
      <div className="flex items-center gap-2">
        {/* Mobile Search Button */}
        <button
          onClick={() => setIsSearchOpen(true)}
          className="md:hidden p-1.5 rounded text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
          title="Buscar"
        >
          <Search className="h-4 w-4" />
        </button>

        {/* Seletor de Unidade Operacional */}
        {/* Seletor de Unidade Operacional */}
        <div className="hidden lg:flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 border-r border-slate-200 dark:border-slate-800 pr-3 h-8">
          <Building className="h-3.5 w-3.5 text-slate-400 shrink-0" />
          <select
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
            className="text-xs bg-transparent border-none text-slate-800 dark:text-slate-200 font-medium focus:ring-0 cursor-pointer pr-4 py-0"
          >
            <option value="Matriz São Paulo (SP)">Matriz São Paulo (SP)</option>
            <option value="CD Barueri Logístico">CD Barueri Logístico</option>
            <option value="Showroom Campinas">Showroom Campinas</option>
          </select>
        </div>

        {/* Botão Novo Registro */}
        <div className="relative">
          <button
            onClick={() => setQuickMenuOpen(!quickMenuOpen)}
            className="h-8 flex items-center gap-1.5 rounded-lg bg-orange-600 hover:bg-orange-700 px-3 text-xs font-semibold text-white shadow-2xs transition-colors cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5 stroke-[2.5]" />
            <span className="hidden sm:inline">Novo Registro</span>
            <ChevronDown className="h-3 w-3 opacity-80" />
          </button>

          {quickMenuOpen && (
            <div className="absolute right-0 mt-1.5 w-48 rounded-xl border border-slate-200 bg-white p-1 shadow-lg dark:border-slate-800 dark:bg-slate-900 z-50 animate-fade-in text-xs">
              <button
                onClick={() => {
                  openQuickAction('venda');
                  setQuickMenuOpen(false);
                }}
                className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                <ShoppingBag className="h-3.5 w-3.5 text-slate-500" />
                <span>Nova Venda</span>
              </button>
              <button
                onClick={() => {
                  openQuickAction('quote');
                  setQuickMenuOpen(false);
                }}
                className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                <FileText className="h-3.5 w-3.5 text-slate-500" />
                <span>Novo Orçamento</span>
              </button>
              <button
                onClick={() => {
                  openQuickAction('cliente');
                  setQuickMenuOpen(false);
                }}
                className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                <Plus className="h-3.5 w-3.5 text-slate-500" />
                <span>Cadastrar Cliente</span>
              </button>
              <button
                onClick={() => {
                  openQuickAction('receita');
                  setQuickMenuOpen(false);
                }}
                className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                <DollarSign className="h-3.5 w-3.5 text-slate-500" />
                <span>Lançar Pagamento</span>
              </button>
            </div>
          )}
        </div>

        {/* Alternador de Tema Discreto */}
        <div className="relative">
          <button
            onClick={() => setThemeMenuOpen(!themeMenuOpen)}
            className="h-8 w-8 flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            title="Alternar Tema"
          >
            {theme === 'dark' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </button>

          {themeMenuOpen && (
            <div className="absolute right-0 mt-1.5 w-28 rounded-xl border border-slate-200 bg-white p-1 shadow-lg dark:border-slate-800 dark:bg-slate-900 z-50 text-xs">
              <button
                onClick={() => {
                  setTheme('light');
                  setThemeMenuOpen(false);
                }}
                className={`flex w-full items-center gap-2 rounded-lg px-2 py-1 ${
                  theme === 'light' ? 'bg-slate-100 dark:bg-slate-800 font-semibold text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                <Sun className="h-3.5 w-3.5" /> Claro
              </button>
              <button
                onClick={() => {
                  setTheme('dark');
                  setThemeMenuOpen(false);
                }}
                className={`flex w-full items-center gap-2 rounded-lg px-2 py-1 ${
                  theme === 'dark' ? 'bg-slate-100 dark:bg-slate-800 font-semibold text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                <Moon className="h-3.5 w-3.5" /> Escuro
              </button>
            </div>
          )}
        </div>

        {/* Perfil Executivo Marcus Glauber (Foto removida conforme solicitação do usuário) */}
        <button
          onClick={() => setActiveView('settings_account')}
          className="h-8 flex items-center gap-2.5 pl-3 border-l border-slate-200 dark:border-slate-800 hover:opacity-85 transition-opacity text-left cursor-pointer group"
          title="Minha Conta Executiva"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500/10 text-orange-600 dark:text-orange-400 font-bold text-xs border border-orange-500/20 shrink-0 group-hover:scale-105 transition-transform">
            MG
          </div>
          <div className="hidden sm:block text-left leading-tight">
            <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <span>Marcus Glauber</span>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 inline-block" title="Online"></span>
            </div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400">
              Diretor Geral • {roleLabels[activeRole]}
            </div>
          </div>
        </button>
      </div>
    </header>
  );
};
