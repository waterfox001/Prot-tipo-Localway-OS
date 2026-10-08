import React, { useState } from 'react';
import {
  Trophy,
  Medal,
  Award,
  TrendingUp,
  DollarSign,
  Users,
  Armchair,
  Wrench,
  Star,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SectionHeader } from '../components/common/UIComponents';

export const RankingsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'vendedores' | 'produtos' | 'clientes' | 'equipe'>('vendedores');

  const sellersRanking = [
    { rank: 1, name: 'João Pedro Carvalho', role: 'Consultor de Contas Corporativas', faturamento: 268900, vendas: 12, ticket: 22408, conversao: '44.2%', margem: '52.1%' },
    { rank: 2, name: 'Mariana Duarte', role: 'Gerente Comercial & Key Accounts', faturamento: 241400, vendas: 8, ticket: 30175, conversao: '41.0%', margem: '51.8%' },
    { rank: 3, name: 'Carlos Mendes', role: 'Consultor Vendas Especiais', faturamento: 114200, vendas: 6, ticket: 19033, conversao: '34.5%', margem: '50.2%' },
    { rank: 4, name: 'Beatriz Vasconcelos', role: 'Inside Sales & Reativação', faturamento: 60000, vendas: 4, ticket: 15000, conversao: '29.8%', margem: '49.5%' },
  ];

  const productsRanking = [
    { rank: 1, name: 'Cadeira Presidente Vertex', categoria: 'Cadeiras', vendas: 52, faturamento: 92560, margem: '50.0%', giro: '4.2x' },
    { rank: 2, name: 'Estação de Trabalho Prime 4 Lugares', categoria: 'Mesas', vendas: 18, faturamento: 70020, margem: '52.4%', giro: '3.8x' },
    { rank: 3, name: 'Cadeira Aero Pro', categoria: 'Cadeiras', vendas: 65, faturamento: 68250, margem: '51.4%', giro: '5.1x' },
    { rank: 4, name: 'Cadeira Presidente Oslo', categoria: 'Cadeiras', vendas: 24, faturamento: 47520, margem: '52.5%', giro: '3.1x' },
    { rank: 5, name: 'Mesa de Reunião Retangular', categoria: 'Mesas', vendas: 14, faturamento: 41720, margem: '52.3%', giro: '2.9x' },
  ];

  const teamsRanking = [
    { rank: 1, team: 'Equipe Alpha (Líder: Rogério Pires)', regioes: 'Zona Sul & Faria Lima', concluidas: 38, sla: '98.5%', csat: '4.9★' },
    { rank: 2, team: 'Equipe Beta (Líder: Thiago Rocha)', regioes: 'Paulista & Centro', concluidas: 32, sla: '96.0%', csat: '4.8★' },
    { rank: 3, team: 'Equipe Gamma (Líder: Samuel Ramos)', regioes: 'Campinas & Interior', concluidas: 24, sla: '94.2%', csat: '4.7★' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <SectionHeader
        title="Rankings de Performance & Gamificação 360°"
        subtitle="Liderança comercial, curvas de tração de produtos e indicadores de eficiência das equipes de montagem"
        actions={
          <div className="flex items-center rounded-lg border border-slate-800 bg-slate-900 p-1">
            {(['vendedores', 'produtos', 'clientes', 'equipe'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded px-3 py-1 text-xs font-semibold capitalize transition-colors ${
                  activeTab === tab ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        }
      />

      {/* Podium Showcase for Top 3 */}
      {activeTab === 'vendedores' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* 2nd place */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 text-center flex flex-col justify-between order-2 md:order-1">
              <div>
                <div className="h-10 w-10 mx-auto rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-black text-slate-300">
                  2º
                </div>
                <h4 className="font-bold text-slate-100 text-sm mt-3">{sellersRanking[1].name}</h4>
                <p className="text-xs text-slate-400">{sellersRanking[1].role}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800 font-mono">
                <div className="text-lg font-bold text-slate-200">
                  R$ {sellersRanking[1].faturamento.toLocaleString('pt-BR')}
                </div>
                <div className="text-[11px] text-emerald-400">Conversão {sellersRanking[1].conversao}</div>
              </div>
            </div>

            {/* 1st place - HIGHLIGHTED GOLD */}
            <div className="rounded-xl border border-amber-500/50 bg-amber-500/10 p-6 text-center flex flex-col justify-between order-1 md:order-2 shadow-xl shadow-amber-500/5 relative overflow-hidden">
              <div className="absolute top-2 right-2 text-amber-500">
                <Trophy className="h-6 w-6" />
              </div>
              <div>
                <div className="h-14 w-14 mx-auto rounded-full bg-amber-500 flex items-center justify-center font-black text-slate-950 text-xl shadow-lg">
                  1º
                </div>
                <h4 className="font-extrabold text-slate-100 text-base mt-3">{sellersRanking[0].name}</h4>
                <p className="text-xs text-amber-300/80">{sellersRanking[0].role}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-amber-500/30 font-mono">
                <div className="text-2xl font-black text-amber-400">
                  R$ {sellersRanking[0].faturamento.toLocaleString('pt-BR')}
                </div>
                <div className="text-xs text-emerald-400 font-bold">Líder Absoluto · Conv. {sellersRanking[0].conversao}</div>
              </div>
            </div>

            {/* 3rd place */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 text-center flex flex-col justify-between order-3">
              <div>
                <div className="h-10 w-10 mx-auto rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-black text-slate-300">
                  3º
                </div>
                <h4 className="font-bold text-slate-100 text-sm mt-3">{sellersRanking[2].name}</h4>
                <p className="text-xs text-slate-400">{sellersRanking[2].role}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800 font-mono">
                <div className="text-lg font-bold text-slate-200">
                  R$ {sellersRanking[2].faturamento.toLocaleString('pt-BR')}
                </div>
                <div className="text-[11px] text-emerald-400">Conversão {sellersRanking[2].conversao}</div>
              </div>
            </div>
          </div>

          {/* Full Sellers Table */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden text-xs">
            <div className="p-4 border-b border-slate-800 font-bold text-slate-200 uppercase tracking-wider">
              Tabela de Metas Comerciais e Comissões
            </div>
            <table className="w-full text-left font-mono">
              <thead className="bg-slate-950 text-[11px] uppercase tracking-wider text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="p-3">Posição</th>
                  <th className="p-3 font-sans">Consultor Comercial</th>
                  <th className="p-3 text-right">Faturamento</th>
                  <th className="p-3 text-center">Vendas</th>
                  <th className="p-3 text-right">Ticket Médio</th>
                  <th className="p-3 text-center">Conversão</th>
                  <th className="p-3 text-center">Margem</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {sellersRanking.map((s) => (
                  <tr key={s.rank} className="hover:bg-slate-850">
                    <td className="p-3 font-bold text-amber-400">#{s.rank}</td>
                    <td className="p-3 font-sans font-semibold text-slate-100">{s.name}</td>
                    <td className="p-3 text-right font-bold text-emerald-400 tabular-nums">
                      R$ {s.faturamento.toLocaleString('pt-BR')}
                    </td>
                    <td className="p-3 text-center tabular-nums">{s.vendas}</td>
                    <td className="p-3 text-right tabular-nums">R$ {s.ticket.toLocaleString('pt-BR')}</td>
                    <td className="p-3 text-center text-sky-400">{s.conversao}</td>
                    <td className="p-3 text-center text-amber-400">{s.margem}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* PRODUCTS RANKING */}
      {activeTab === 'produtos' && (
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden text-xs">
          <div className="p-4 border-b border-slate-800 font-bold text-slate-200 uppercase tracking-wider">
            Curva de Tração dos Produtos Polo Móveis
          </div>
          <table className="w-full text-left font-mono">
            <thead className="bg-slate-950 text-[11px] uppercase tracking-wider text-slate-400 border-b border-slate-800">
              <tr>
                <th className="p-3">Rank</th>
                <th className="p-3 font-sans">Produto Polo</th>
                <th className="p-3 font-sans">Categoria</th>
                <th className="p-3 text-center">Unidades</th>
                <th className="p-3 text-right">Faturamento Total</th>
                <th className="p-3 text-center">Margem Média</th>
                <th className="p-3 text-center">Giro Anual</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {productsRanking.map((p) => (
                <tr key={p.rank} className="hover:bg-slate-850">
                  <td className="p-3 font-bold text-amber-400">#{p.rank}</td>
                  <td className="p-3 font-sans font-semibold text-slate-100">{p.name}</td>
                  <td className="p-3 font-sans text-slate-400">{p.categoria}</td>
                  <td className="p-3 text-center font-bold text-slate-200">{p.vendas} un.</td>
                  <td className="p-3 text-right font-bold text-emerald-400 tabular-nums">
                    R$ {p.faturamento.toLocaleString('pt-BR')}
                  </td>
                  <td className="p-3 text-center text-amber-400">{p.margem}</td>
                  <td className="p-3 text-center text-sky-400">{p.giro}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* EQUIPE OPERACIONAL RANKING */}
      {activeTab === 'equipe' && (
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-4">
          <div className="text-xs font-bold text-slate-200 uppercase tracking-wider border-b border-slate-800 pb-2">
            Desempenho das Equipes de Montagem & Instalação
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {teamsRanking.map((t) => (
              <div key={t.rank} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-amber-400">#{t.rank} Lugar</span>
                  <span className="text-xs font-bold text-emerald-400 font-mono">{t.csat}</span>
                </div>
                <div className="text-sm font-bold text-slate-100">{t.team}</div>
                <div className="text-xs text-slate-400">{t.regioes}</div>
                <div className="pt-2 border-t border-slate-800 text-xs font-mono flex justify-between">
                  <span className="text-slate-400">Montagens: {t.concluidas}</span>
                  <span className="text-emerald-400 font-bold">SLA: {t.sla}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CLIENTES RANKING */}
      {activeTab === 'clientes' && (
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-3">
          <div className="text-xs font-bold text-slate-200 uppercase tracking-wider border-b border-slate-800 pb-2">
            Principais Contas Corporativas por Valor Comprado
          </div>
          <div className="space-y-2 text-xs">
            {[
              { rank: 1, name: 'Banco Zenith de Investimentos', ltv: 520000, pedidos: 6, ticket: 86666 },
              { rank: 2, name: 'Construtora Horizon Engenharia', ltv: 412000, pedidos: 8, ticket: 51500 },
              { rank: 3, name: 'Studio Alpha Arquitetura & Design', ltv: 284900, pedidos: 14, ticket: 20350 },
              { rank: 4, name: 'Brandão, Mattos & Associados Advocacia', ltv: 198000, pedidos: 4, ticket: 49500 },
            ].map((c) => (
              <div
                key={c.rank}
                className="flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-amber-400">#{c.rank}</span>
                  <span className="font-bold text-slate-100">{c.name}</span>
                </div>
                <div className="text-right font-mono">
                  <span className="font-bold text-emerald-400 tabular-nums">
                    R$ {c.ltv.toLocaleString('pt-BR')}
                  </span>
                  <span className="text-slate-500 text-[11px] ml-3">({c.pedidos} pedidos)</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
