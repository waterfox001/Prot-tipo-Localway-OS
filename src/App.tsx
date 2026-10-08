import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { GlobalSearchModal } from './components/layout/GlobalSearchModal';
import { QuickActionModal } from './components/layout/QuickActionModal';
import { AnimatedTabContainer } from './components/charts/AnimatedTabContainer';

// INÍCIO
import { HomeOverviewView } from './views/HomeOverviewView';
import { HomeUpdatesView } from './views/HomeUpdatesView';

// COMERCIAL
import { CommercialDashboardView } from './views/commercial/CommercialDashboardView';
import { CommercialQuotesView } from './views/commercial/CommercialQuotesView';
import { CommercialSalesView } from './views/commercial/CommercialSalesView';
import { CommercialCustomersView } from './views/commercial/CommercialCustomersView';
import { CommercialCrmView } from './views/commercial/CommercialCrmView';

// CATÁLOGO & ESTOQUE
import { ProductsCatalogView } from './views/ProductsCatalogView';
import { CatalogCategoriesView } from './views/catalog/CatalogCategoriesView';
import { InventoryView } from './views/InventoryView';
import { CatalogMovementsView } from './views/catalog/CatalogMovementsView';
import { SuppliersView } from './views/SuppliersView';
import { CatalogPurchasesView } from './views/catalog/CatalogPurchasesView';

// OPERAÇÃO
import { OperationsOrdersView } from './views/operations/OperationsOrdersView';
import { OperationsDeliveriesView } from './views/operations/OperationsDeliveriesView';
import { OperationsAssembliesView } from './views/operations/OperationsAssembliesView';
import { OperationsOccurrencesView } from './views/operations/OperationsOccurrencesView';
import { OperationsWarrantiesView } from './views/operations/OperationsWarrantiesView';

// FINANCEIRO
import { FinancialReceivablesView } from './views/financial/FinancialReceivablesView';
import { FinancialPayablesView } from './views/financial/FinancialPayablesView';
import { FinancialCashFlowView } from './views/financial/FinancialCashFlowView';
import { FinancialCommissionsView } from './views/financial/FinancialCommissionsView';
import { CorporateDREView } from './views/corporate/CorporateDREView';
import { FinancialMethodsView } from './views/financial/FinancialMethodsView';

// GESTÃO
import { ManagementIndicatorsView } from './views/management/ManagementIndicatorsView';
import { ManagementReportsView } from './views/management/ManagementReportsView';
import { StrategyOKRsView } from './views/StrategyOKRsView';
import { ManagementUsersView } from './views/management/ManagementUsersView';

// CONFIGURAÇÕES
import { SettingsCompanyView } from './views/settings/SettingsCompanyView';
import { SettingsPreferencesView } from './views/settings/SettingsPreferencesView';
import { SettingsAccountView } from './views/settings/SettingsAccountView';

// MEU FINANCEIRO (PESSOAL / SÓCIO - PRESERVADO PARA CONTROLE DO PROPRIETÁRIO)
import { PersonalOverviewView } from './views/personal/PersonalOverviewView';
import { PersonalTransactionsView } from './views/personal/PersonalTransactionsView';
import { PersonalAccountsView } from './views/personal/PersonalAccountsView';
import { PersonalCardsView } from './views/personal/PersonalCardsView';
import { PersonalRecurringView } from './views/personal/PersonalRecurringView';
import { PersonalInvestmentsView } from './views/personal/PersonalInvestmentsView';
import { PersonalNetWorthView } from './views/personal/PersonalNetWorthView';
import { PersonalReportsView } from './views/personal/PersonalReportsView';

// CORPORATIVO AVANÇADO
import { CorporateOverviewView } from './views/corporate/CorporateOverviewView';
import { CorporateTransactionsView } from './views/corporate/CorporateTransactionsView';
import { CorporateContractsView } from './views/corporate/CorporateContractsView';

const MainContentRouter: React.FC = () => {
  const { activeView } = useApp();

  const renderActiveView = () => {
    switch (activeView) {
      // 1. INÍCIO
      case 'home_overview':
        return <HomeOverviewView />;
      case 'home_updates':
        return <HomeUpdatesView />;

      // 2. COMERCIAL
      case 'commercial_dashboard':
        return <CommercialDashboardView />;
      case 'commercial_quotes':
        return <CommercialQuotesView />;
      case 'commercial_sales':
        return <CommercialSalesView />;
      case 'commercial_customers':
        return <CommercialCustomersView />;
      case 'commercial_crm':
        return <CommercialCrmView />;

      // 3. CATÁLOGO & ESTOQUE
      case 'catalog_products':
        return <ProductsCatalogView />;
      case 'catalog_categories':
        return <CatalogCategoriesView />;
      case 'catalog_inventory':
        return <InventoryView />;
      case 'catalog_movements':
        return <CatalogMovementsView />;
      case 'catalog_suppliers':
        return <SuppliersView />;
      case 'catalog_purchases':
        return <CatalogPurchasesView />;

      // 4. OPERAÇÃO
      case 'operations_orders':
        return <OperationsOrdersView />;
      case 'operations_deliveries':
        return <OperationsDeliveriesView />;
      case 'operations_assemblies':
        return <OperationsAssembliesView />;
      case 'operations_occurrences':
        return <OperationsOccurrencesView />;
      case 'operations_warranties':
        return <OperationsWarrantiesView />;

      // 5. FINANCEIRO
      case 'financial_receivables':
        return <FinancialReceivablesView />;
      case 'financial_payables':
        return <FinancialPayablesView />;
      case 'financial_cashflow':
        return <FinancialCashFlowView />;
      case 'financial_commissions':
        return <FinancialCommissionsView />;
      case 'financial_expenses':
        return <CorporateDREView />;
      case 'financial_methods':
        return <FinancialMethodsView />;

      // 6. GESTÃO
      case 'management_indicators':
        return <ManagementIndicatorsView />;
      case 'management_reports':
        return <ManagementReportsView />;
      case 'management_goals':
        return <StrategyOKRsView />;
      case 'management_users':
        return <ManagementUsersView />;

      // 7. CONFIGURAÇÕES
      case 'settings_company':
        return <SettingsCompanyView />;
      case 'settings_preferences':
        return <SettingsPreferencesView />;
      case 'settings_account':
        return <SettingsAccountView />;

      // COMPATIBILIDADE / ALIASES
      case 'company_sales' as any:
      case 'crm' as any:
        return <CommercialCrmView />;
      case 'company_customers' as any:
      case 'customers' as any:
        return <CommercialCustomersView />;
      case 'company_products' as any:
      case 'products' as any:
        return <ProductsCatalogView />;
      case 'company_inventory' as any:
      case 'inventory' as any:
        return <InventoryView />;
      case 'company_deliveries' as any:
      case 'logistics' as any:
        return <OperationsDeliveriesView />;
      case 'company_finance' as any:
      case 'finance' as any:
        return <CorporateOverviewView />;
      case 'quotes' as any:
        return <CommercialQuotesView />;
      case 'suppliers' as any:
        return <SuppliersView />;
      case 'operational' as any:
        return <OperationsOrdersView />;
      case 'planning_goals' as any:
      case 'strategy' as any:
        return <StrategyOKRsView />;

      // PESSOAL / SÓCIO
      case 'personal_overview' as any:
        return <PersonalOverviewView />;
      case 'personal_transactions' as any:
        return <PersonalTransactionsView />;
      case 'personal_accounts' as any:
        return <PersonalAccountsView />;
      case 'personal_cards' as any:
        return <PersonalCardsView />;
      case 'personal_recurring' as any:
        return <PersonalRecurringView />;
      case 'personal_investments' as any:
        return <PersonalInvestmentsView />;
      case 'personal_networth' as any:
        return <PersonalNetWorthView />;
      case 'personal_reports' as any:
        return <PersonalReportsView />;

      // CORPORATIVO LEGADO
      case 'corp_overview' as any:
        return <CorporateOverviewView />;
      case 'corp_transactions' as any:
        return <CorporateTransactionsView />;
      case 'corp_contracts' as any:
        return <CorporateContractsView />;
      case 'corp_dre' as any:
        return <CorporateDREView />;

      default:
        return <HomeOverviewView />;
    }
  };

  return (
    <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-slate-50/70 dark:bg-slate-950 transition-colors">
      <div className="max-w-[1600px] mx-auto pb-12">
        <AnimatedTabContainer tabKey={activeView}>
          {renderActiveView()}
        </AnimatedTabContainer>
      </div>
    </main>
  );
};

export default function App() {
  return (
    <AppProvider>
      <div className="flex h-screen w-screen overflow-hidden bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 font-sans transition-colors">
        {/* Fixed Collapsible Strategic Sidebar */}
        <Sidebar />

        {/* Main View Area with Top Header */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <Header />
          <MainContentRouter />
        </div>

        {/* Interactive Modals */}
        <GlobalSearchModal />
        <QuickActionModal />
      </div>
    </AppProvider>
  );
}
