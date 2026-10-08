import React, { useState } from 'react';
import {
  UserCheck,
  Users,
  Shield,
  Key,
  Lock,
  CheckCircle2,
  AlertCircle,
  Plus,
  Search,
  Building,
  Mail,
  Phone,
  Edit2,
  Trash2,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AppRole } from '../../types';

export const ManagementUsersView: React.FC = () => {
  const { activeRole, setActiveRole } = useApp();
  const [search, setSearch] = useState('');

  const usersList = [
    {
      id: 'usr-1',
      name: 'Marcus Glauber',
      email: 'marcus.glauber@polomoveis.com.br',
      role: 'admin' as AppRole,
      roleTitle: 'Diretor Geral / Sócio Proprietário',
      branch: 'Matriz Showroom SP',
      status: 'Ativo',
      lastLogin: 'Hoje às 08:14',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    },
    {
      id: 'usr-2',
      name: 'Carlos Mendes',
      email: 'carlos.vendas@polomoveis.com.br',
      role: 'vendedor' as AppRole,
      roleTitle: 'Consultor Comercial Sênior',
      branch: 'Matriz Showroom SP',
      status: 'Ativo',
      lastLogin: 'Hoje às 08:30',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
    },
    {
      id: 'usr-3',
      name: 'Juliana Matos',
      email: 'juliana.vendas@polomoveis.com.br',
      role: 'vendedor' as AppRole,
      roleTitle: 'Consultora de Projetos Corporativos',
      branch: 'Filial Campinas',
      status: 'Ativo',
      lastLogin: 'Hoje às 09:12',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100',
    },
    {
      id: 'usr-4',
      name: 'Fabiana Rezende',
      email: 'fabiana.financeiro@polomoveis.com.br',
      role: 'financeiro' as AppRole,
      roleTitle: 'Coordenadora Financeira & Controladoria',
      branch: 'Matriz Showroom SP',
      status: 'Ativo',
      lastLogin: 'Hoje às 08:00',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100',
    },
    {
      id: 'usr-5',
      name: 'Valdomiro Costa',
      email: 'valdomiro.estoque@polomoveis.com.br',
      role: 'estoque' as AppRole,
      roleTitle: 'Líder de Expedição & Almoxarifado',
      branch: 'CD Logístico Barueri',
      status: 'Ativo',
      lastLogin: 'Hoje às 07:45',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    },
    {
      id: 'usr-6',
      name: 'Marcos Rocha',
      email: 'marcos.montagem@polomoveis.com.br',
      role: 'montador' as AppRole,
      roleTitle: 'Líder de Montagem & Assistência Técnica',
      branch: 'CD Logístico Barueri',
      status: 'Ativo',
      lastLogin: 'Hoje às 08:20',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
    },
  ];

  const rolePermissionsMatrix = [
    { module: 'Dashboard Executivo & Faturamento Total', admin: true, vendedor: false, financeiro: true, estoque: false, montador: false },
    { module: 'Visualizar Custo de Compra & Margem de Lucro', admin: true, vendedor: false, financeiro: true, estoque: false, montador: false },
    { module: 'Criar Orçamentos & Propostas Comerciais', admin: true, vendedor: true, financeiro: false, estoque: false, montador: false },
    { module: 'Transformar Orçamento em Venda Direta', admin: true, vendedor: true, financeiro: false, estoque: false, montador: false },
    { module: 'Contas a Pagar, Receber & Fluxo de Caixa', admin: true, vendedor: false, financeiro: true, estoque: false, montador: false },
    { module: 'Extrato Geral de Comissões da Equipe', admin: true, vendedor: false, financeiro: true, estoque: false, montador: false },
    { module: 'Minhas Comissões Individuais', admin: true, vendedor: true, financeiro: true, estoque: false, montador: false },
    { module: 'Separação de Pedidos (Picking) & Ajuste Estoque', admin: true, vendedor: false, financeiro: false, estoque: true, montador: false },
    { module: 'Ordens de Entrega & Rotas Logísticas', admin: true, vendedor: false, financeiro: false, estoque: true, montador: true },
    { module: 'Checklist e Conclusão de Montagem Técnica', admin: true, vendedor: false, financeiro: false, estoque: false, montador: true },
  ];

  const filteredUsers = usersList.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.roleTitle.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-800 dark:bg-blue-950 dark:text-blue-300 border border-blue-200/80 dark:border-blue-800">
              <UserCheck className="w-3.5 h-3.5" />
              Governança & Segurança
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Usuários & Níveis de Permissão (RBAC)
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
            Gerencie os colaboradores da loja e alterne perfis para testar a experiência de cada cargo.
          </p>
        </div>
      </div>

      {/* Simulador Interativo de Perfis (RBAC em Tempo Real) */}
      <div className="rounded-2xl border-2 border-amber-300 dark:border-amber-700/80 bg-amber-50/50 dark:bg-amber-950/20 p-5 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold">
              <Key className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                Simulador de Permissões em Tempo Real
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Alterne o papel ativo para visualizar como a barra lateral e os menus se comportam para cada colaborador:
              </p>
            </div>
          </div>

          <span className="text-xs font-bold px-3 py-1 rounded-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-amber-200 dark:border-amber-800 shadow-2xs">
            Papel Atual: <span className="uppercase text-amber-600 dark:text-amber-400">{activeRole}</span>
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2">
          {(
            [
              { role: 'admin', label: '1. Administrador', desc: 'Acesso total irrestrito' },
              { role: 'vendedor', label: '2. Consultor / Vendas', desc: 'Orçamentos e CRM' },
              { role: 'financeiro', label: '3. Financeiro', desc: 'Contas, DRE e Caixa' },
              { role: 'estoque', label: '4. Almoxarifado', desc: 'Separação e Estoque' },
              { role: 'montador', label: '5. Entrega & Montagem', desc: 'Rotas e Checklists' },
            ] as const
          ).map((item) => (
            <button
              key={item.role}
              onClick={() => setActiveRole(item.role)}
              className={`p-3 rounded-xl border text-left transition-all ${
                activeRole === item.role
                  ? 'border-slate-900 bg-slate-900 text-white dark:border-white dark:bg-white dark:text-slate-950 shadow-xs'
                  : 'border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-900 text-slate-900 dark:text-white hover:border-slate-300'
              }`}
            >
              <div className="text-xs font-bold">{item.label}</div>
              <div className={`text-[10px] mt-0.5 ${activeRole === item.role ? 'text-slate-300 dark:text-slate-600' : 'text-slate-500'}`}>
                {item.desc}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Tabela de Usuários */}
      <div className="rounded-2xl border border-slate-200/80 bg-white shadow-2xs dark:border-slate-800 dark:bg-slate-900 overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar colaborador..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <th className="py-3 px-4">Colaborador</th>
                <th className="py-3 px-4">Perfil de Acesso</th>
                <th className="py-3 px-4">Filial / Unidade</th>
                <th className="py-3 px-4">Último Acesso</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={u.avatar}
                        alt={u.name}
                        className="w-8 h-8 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                      />
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white">
                          {u.name}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {u.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-slate-900 dark:text-white capitalize">
                      {u.roleTitle}
                    </span>
                    <div className="text-[11px] text-slate-400 font-mono">
                      Role: {u.role}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                    {u.branch}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-500">
                    {u.lastLogin}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                      {u.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Matriz de Permissões */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-2xs dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-base font-bold text-slate-900 dark:text-white mb-2">
          Matriz de Acessos por Função da Loja
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
          Garante que comissões, margens de lucro e dados sigilosos sejam restritos aos cargos apropriados.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <th className="py-2.5 px-3">Recurso / Módulo</th>
                <th className="py-2.5 px-3 text-center">Admin</th>
                <th className="py-2.5 px-3 text-center">Vendedor</th>
                <th className="py-2.5 px-3 text-center">Financeiro</th>
                <th className="py-2.5 px-3 text-center">Estoque</th>
                <th className="py-2.5 px-3 text-center">Montador</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {rolePermissionsMatrix.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="py-2.5 px-3 font-semibold text-slate-800 dark:text-slate-200">
                    {item.module}
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    {item.admin ? <CheckCircle2 className="w-4 h-4 text-emerald-600 inline" /> : <span className="text-slate-300">—</span>}
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    {item.vendedor ? <CheckCircle2 className="w-4 h-4 text-emerald-600 inline" /> : <span className="text-slate-300">—</span>}
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    {item.financeiro ? <CheckCircle2 className="w-4 h-4 text-emerald-600 inline" /> : <span className="text-slate-300">—</span>}
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    {item.estoque ? <CheckCircle2 className="w-4 h-4 text-emerald-600 inline" /> : <span className="text-slate-300">—</span>}
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    {item.montador ? <CheckCircle2 className="w-4 h-4 text-emerald-600 inline" /> : <span className="text-slate-300">—</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
