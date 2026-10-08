import React, { useState } from 'react';
import {
  Globe,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Award,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Send,
  Building,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SectionHeader } from '../components/common/UIComponents';
import { PoloLogo } from '../components/common/PoloLogo';

export const InstitutionalWebsiteView: React.FC = () => {
  const { company, addDeal, setActiveView } = useApp();
  const [formSent, setFormSent] = useState(false);
  const [leadName, setLeadName] = useState('');
  const [leadCompany, setLeadCompany] = useState('');
  const [leadPositions, setLeadPositions] = useState('25');
  const [leadPhone, setLeadPhone] = useState('');

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName) return;

    addDeal({
      title: `Orçamento Inbound: ${leadCompany || leadName} (${leadPositions} posições)`,
      customerName: leadCompany || leadName,
      value: Number(leadPositions) * 1800,
      stage: 'lead',
      source: 'Site Institucional',
      notes: `Lead capturado pelo formulário do site. Contato: ${leadName} - ${leadPhone}.`,
    });

    setFormSent(true);
    setTimeout(() => setFormSent(false), 4000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <SectionHeader
        title="Site Institucional & Portal Público"
        subtitle="Visualização do portal da Polo Móveis com captação direta de leads para o CRM"
      />

      {/* Portal Navbar Header com PoloLogo */}
      <div className="flex items-center justify-between px-6 py-4 rounded-2xl border border-slate-800 bg-slate-950/80 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <PoloLogo size="md" variant="horizontal" theme="dark" />
        </div>
        <div className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-300">
          <button onClick={() => setActiveView('products')} className="hover:text-amber-400 transition-colors">Linhas de Escritório</button>
          <button onClick={() => setActiveView('catalog_categories')} className="hover:text-amber-400 transition-colors">Cadeiras NR-17</button>
          <a href="#orcamento-site" className="hover:text-amber-400 transition-colors">Projetos Sob Medida</a>
          <span className="text-slate-600">|</span>
          <span className="text-amber-400 font-mono">(11) 4004-9800</span>
        </div>
      </div>

      {/* Website Hero Section */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-8 md:p-14 shadow-2xl">
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 border border-amber-500/20 px-3 py-1 text-xs font-semibold text-amber-400">
            <Sparkles className="h-3.5 w-3.5" />
            Mobiliário Corporativo de Alto Padrão
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-slate-100 tracking-tight leading-tight">
            Seu escritório começa pelos móveis certos.
          </h1>

          <p className="text-sm md:text-base text-slate-400 leading-relaxed">
            Projetamos e fornecemos soluções completas em ergonomia certificada NR-17, estações modulares e mesas de reunião executivas para empresas que valorizam bem-estar e produtividade.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setActiveView('products')}
              className="rounded-xl bg-amber-500 px-6 py-3 text-xs font-bold text-slate-950 hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/10 flex items-center gap-2"
            >
              <span>Ver Catálogo de Produtos</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <a
              href="#orcamento-site"
              className="rounded-xl border border-slate-700 bg-slate-900/80 px-6 py-3 text-xs font-semibold text-slate-200 hover:bg-slate-800 transition-colors"
            >
              Solicitar Orçamento Corporativo
            </a>
          </div>
        </div>

        {/* Hero Background Glow */}
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
      </div>

      {/* Corporate Differentials */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 space-y-2">
          <div className="h-10 w-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-100">Certificação Ergonômica NR-17</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Laudos técnicos válidos e homologados para garantir conformidade trabalhista total e saúde postural.
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 space-y-2">
          <div className="h-10 w-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
            <Award className="h-5 w-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-100">Garantia Estrutural de até 5 Anos</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Componentes mecânicos em alumínio polido, pistões classe 4 e tampos resistentes de 25mm e 40mm.
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 space-y-2">
          <div className="h-10 w-10 rounded-lg bg-sky-500/10 flex items-center justify-center text-sky-400">
            <Building className="h-5 w-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-100">Montagem com Equipe Própria</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Frota dedicada rastreada e montadores certificados com horário flexível noturno para não interromper seu expediente.
          </p>
        </div>
      </div>

      {/* Quote Capture Form - Directly connected to CRM */}
      <div id="orcamento-site" className="rounded-2xl border border-slate-800 bg-slate-900/80 p-8 space-y-6">
        <div className="max-w-xl">
          <div className="text-[10px] uppercase font-bold text-amber-400 font-mono">
            Atendimento Consultivo B2B
          </div>
          <h2 className="text-xl font-black text-slate-100 mt-1">
            Solicite um Estudo de Layout & Orçamento sem Compromisso
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Preencha seus dados para receber nossa apresentação corporativa e atendimento em até 2 horas.
          </p>
        </div>

        {formSent ? (
          <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-2">
            <CheckCircle2 className="h-8 w-8 text-emerald-400 mx-auto" />
            <div className="text-sm font-bold text-slate-100">Solicitação Enviada com Sucesso!</div>
            <p className="text-xs text-slate-400">
              Uma nova oportunidade foi criada instantaneamente no CRM da Polo Móveis e um consultor já foi notificado.
            </p>
          </div>
        ) : (
          <form onSubmit={handleLeadSubmit} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Seu Nome *</label>
              <input
                type="text"
                required
                placeholder="Ex: Carlos Eduardo"
                value={leadName}
                onChange={(e) => setLeadName(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Nome da Empresa</label>
              <input
                type="text"
                placeholder="Ex: Horizon Investimentos"
                value={leadCompany}
                onChange={(e) => setLeadCompany(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Qtd. de Posições (Estações)</label>
              <input
                type="number"
                min={1}
                value={leadPositions}
                onChange={(e) => setLeadPositions(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Telefone / WhatsApp</label>
              <input
                type="text"
                placeholder="(11) 98000-0000"
                value={leadPhone}
                onChange={(e) => setLeadPhone(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2 md:col-span-4 flex justify-end pt-2">
              <button
                type="submit"
                className="flex items-center gap-2 rounded-lg bg-amber-500 px-6 py-2.5 text-xs font-bold text-slate-950 hover:bg-amber-400 transition-colors shadow-sm"
              >
                <Send className="h-3.5 w-3.5" />
                <span>Enviar Solicitação ao Comercial</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
