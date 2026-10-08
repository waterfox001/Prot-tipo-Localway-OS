import React, { useState } from 'react';
import {
  Settings,
  Building2,
  ShieldCheck,
  ShieldAlert,
  Save,
  Users,
  Lock,
  History,
  CheckCircle2,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SectionHeader } from '../components/common/UIComponents';

export const SettingsAuditView: React.FC = () => {
  const { company, setCompany, auditLogs, user } = useApp();
  const [activeTab, setActiveTab] = useState<'empresa' | 'rbac' | 'auditoria'>('empresa');

  // Form states
  const [name, setName] = useState(company.name);
  const [tradeName, setTradeName] = useState(company.tradeName);
  const [cnpj, setCnpj] = useState(company.cnpj);
  const [headquarters, setHeadquarters] = useState(company.headquarters);
  const [phone, setPhone] = useState(company.phone);
  const [email, setEmail] = useState(company.email);
  const [logoText, setLogoText] = useState(company.logoText);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveCompany = (e: React.FormEvent) => {
    e.preventDefault();
    setCompany({
      ...company,
      name,
      tradeName,
      cnpj,
      headquarters,
      phone,
      email,
      logoText,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const roles = [
    { name: 'Diretoria Executiva / CEO', desc: 'Acesso irrestrito a todos os dados, aprovação de propostas e DRE contábil' },
    { name: 'Gerência Comercial', desc: 'Acesso ao CRM, pipeline de vendas, aprovação de descontos até 15%' },
    { name: 'Consultores de Vendas', desc: 'Criação de orçamentos, oportunidades próprias e cadastro de clientes' },
    { name: 'Controladoria & Financeiro', desc: 'Baixa de pagamentos, fluxo de caixa, contas a pagar e receber' },
    { name: 'Operações & Montagem', desc: 'Avanço de etapas operacionais, checklist de qualidade e separação' },
    { name: 'Logística & Frota', desc: 'Roteirização de veículos, comprovantes de entrega e romaneios' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <SectionHeader
        title="Configurações da Empresa & Auditoria de Segurança"
        subtitle="Customização da marca Polo Móveis, permissões de usuários (RBAC) e logs de auditoria"
        actions={
          <div className="flex items-center rounded-lg border border-slate-800 bg-slate-900 p-1">
            <button
              onClick={() => setActiveTab('empresa')}
              className={`rounded px-3 py-1 text-xs font-semibold ${
                activeTab === 'empresa' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'
              }`}
            >
              Identidade da Empresa
            </button>
            <button
              onClick={() => setActiveTab('rbac')}
              className={`rounded px-3 py-1 text-xs font-semibold ${
                activeTab === 'rbac' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'
              }`}
            >
              Perfis & Permissões
            </button>
            <button
              onClick={() => setActiveTab('auditoria')}
              className={`rounded px-3 py-1 text-xs font-semibold ${
                activeTab === 'auditoria' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'
              }`}
            >
              Logs de Auditoria ({auditLogs.length})
            </button>
          </div>
        }
      />

      {/* EMPRESA TAB */}
      {activeTab === 'empresa' && (
        <form onSubmit={handleSaveCompany} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 md:p-8 space-y-6 shadow-xl">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <Building2 className="h-4 w-4 text-amber-500" />
              Customização de Identidade Visual & Dados Cadastrais
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Altere o nome fantasia, texto do logo e dados da empresa. O sistema atualizará os cabeçalhos de propostas automaticamente.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Nome Fantasia do Sistema</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 focus:border-amber-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Texto do Logotipo (Sidebar & Topo)</label>
              <input
                type="text"
                value={logoText}
                onChange={(e) => setLogoText(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 focus:border-amber-500 focus:outline-none uppercase font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Razão Social Completa</label>
              <input
                type="text"
                value={tradeName}
                onChange={(e) => setTradeName(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 focus:border-amber-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">CNPJ Matriz</label>
              <input
                type="text"
                value={cnpj}
                onChange={(e) => setCnpj(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 focus:border-amber-500 focus:outline-none font-mono"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 mb-1">Endereço da Matriz / Showroom</label>
              <input
                type="text"
                value={headquarters}
                onChange={(e) => setHeadquarters(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 focus:border-amber-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Telefone Principal</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 focus:border-amber-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">E-mail Comercial Oficial</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 focus:border-amber-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            {savedSuccess ? (
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4" /> Configurações salvas e aplicadas em todo o sistema!
              </span>
            ) : (
              <span className="text-xs text-slate-500">Alterações são refletidas em tempo real.</span>
            )}

            <button
              type="submit"
              className="flex items-center gap-1.5 rounded-lg bg-amber-500 px-5 py-2 text-xs font-bold text-slate-950 hover:bg-amber-400 transition-colors shadow-sm"
            >
              <Save className="h-4 w-4" />
              Salvar Alterações
            </button>
          </div>
        </form>
      )}

      {/* RBAC PERMISSIONS */}
      {activeTab === 'rbac' && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 space-y-4">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-slate-100">
              Matriz de Permissões por Papel (RBAC)
            </h3>
            <p className="text-xs text-slate-400">
              Controle granular de acesso a módulos estratégicos, financeiro e aprovação de margens
            </p>
          </div>

          <div className="space-y-3">
            {roles.map((r, i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs"
              >
                <div>
                  <div className="font-bold text-slate-200">{r.name}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{r.desc}</div>
                </div>
                <div className="flex items-center gap-1.5 font-mono text-[10px]">
                  <span className="bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20">
                    Visualizar
                  </span>
                  <span className="bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20">
                    Editar
                  </span>
                  <span className="bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20">
                    Aprovar
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AUDIT LOGS */}
      {activeTab === 'auditoria' && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 space-y-4 shadow-md">
          <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <History className="h-4 w-4 text-amber-500" />
                Histórico de Auditoria & Ações do Sistema
              </h3>
              <p className="text-xs text-slate-400">
                Registro inalterável de todas as modificações efetuadas por colaboradores e automações
              </p>
            </div>
            <span className="text-xs font-mono text-slate-400">{auditLogs.length} eventos registrados</span>
          </div>

          <div className="space-y-2">
            {auditLogs.map((log) => (
              <div
                key={log.id}
                className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-amber-400">{log.action}</span>
                    <span className="text-slate-500">·</span>
                    <span className="font-semibold text-slate-300">{log.module}</span>
                    <span className="text-slate-500">·</span>
                    <span className="font-mono text-slate-400 text-[11px]">{log.recordAffected}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">{log.details}</div>
                </div>

                <div className="text-right shrink-0">
                  <div className="font-semibold text-slate-200">{log.userName}</div>
                  <div className="text-[10px] text-slate-500 font-mono">{log.timestamp}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
