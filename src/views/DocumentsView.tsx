import React, { useState } from 'react';
import {
  FolderLock,
  FileText,
  FileCheck,
  Download,
  Eye,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Calendar,
} from 'lucide-react';
import { SectionHeader } from '../components/common/UIComponents';

export const DocumentsView: React.FC = () => {
  const [selectedFolder, setSelectedFolder] = useState<string>('todos');

  const documents = [
    { id: 'doc-01', title: 'Contrato Fornecimento Mobiliário Nubrill 80 Posições.pdf', type: 'Contrato Digital', size: '2.4 MB', date: '04/10/2026', client: 'Studio Alpha', status: 'Aguardando Assinatura' },
    { id: 'doc-02', title: 'NF-e 1048-A Faturamento Polo Moveis Matriz.xml', type: 'Nota Fiscal', size: '180 KB', date: '02/10/2026', client: 'Studio Alpha', status: 'Emitida' },
    { id: 'doc-03', title: 'Contrato Anual Mobiliario Executivo Banco Zenith.pdf', type: 'Contrato Digital', size: '3.8 MB', date: '28/09/2026', client: 'Banco Zenith', status: 'Assinado Digitalmente' },
    { id: 'doc-04', title: 'Laudo Técnico Ergonômico NR-17 Cadeiras Vertex e Ergomax.pdf', type: 'Laudo Técnico', size: '5.1 MB', date: '15/09/2026', client: 'Interno Polo', status: 'Válido até 2028' },
    { id: 'doc-05', title: 'Canhoto Digital de Entrega e Montagem BMA Law.jpg', type: 'Comprovante / Foto', size: '1.2 MB', date: '01/10/2026', client: 'BMA Law', status: 'Conferido' },
    { id: 'doc-06', title: 'Proposta Comercial Oficial PROP-1082 Zenith.pdf', type: 'Proposta', size: '1.9 MB', date: '03/10/2026', client: 'Banco Zenith', status: 'Enviada' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <SectionHeader
        title="Drive Corporativo & Gestão de Contratos Digitais"
        subtitle="Biblioteca documental centralizada: contratos assinados, Notas Fiscais Eletrônicas, laudos NR-17 e canhotos de montagem"
        actions={
          <button
            onClick={() => alert('Selecione o arquivo do contrato ou nota fiscal para upload no Drive da Polo Móveis.')}
            className="flex items-center gap-1.5 rounded-lg bg-amber-500 px-3.5 py-2 text-xs font-bold text-slate-950 hover:bg-amber-400 transition-colors shadow-sm"
          >
            <Plus className="h-4 w-4" />
            + Fazer Upload de Documento
          </button>
        }
      />

      {/* Contract Signatures Pipeline Banner */}
      <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-100">
              Certificação de Assinatura Digital ICP-Brasil Integrada
            </h4>
            <p className="text-[11px] text-slate-400">
              Contratos assinados possuem validade jurídica plena com carimbo do tempo e hash SHA-256
            </p>
          </div>
        </div>
        <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/20 px-2.5 py-1 rounded">
          1 Contrato Pendente de Assinatura
        </span>
      </div>

      {/* Documents Grid / Drive Style */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-4 shadow-md">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
            Arquivos da Empresa ({documents.length} itens)
          </span>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-mono">Armazenamento: 4.8 GB / 100 GB</span>
          </div>
        </div>

        <div className="space-y-2">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-lg border border-slate-800/80 bg-slate-950/70 p-3 text-xs hover:border-slate-700 hover:bg-slate-950 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-slate-800 text-amber-400 shrink-0">
                  <FileText className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-bold text-slate-200">{doc.title}</div>
                  <div className="text-[11px] text-slate-500 font-mono">
                    {doc.type} · {doc.size} · Cliente: {doc.client} · Data: {doc.date}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span
                  className={`rounded px-2 py-0.5 text-[10px] font-bold ${
                    doc.status === 'Assinado Digitalmente'
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : doc.status === 'Aguardando Assinatura'
                      ? 'bg-amber-500/20 text-amber-400 animate-pulse'
                      : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  {doc.status}
                </span>

                <button
                  onClick={() => alert(`Visualizando documento: ${doc.title}`)}
                  className="rounded p-1.5 text-slate-400 hover:bg-slate-800 hover:text-slate-100"
                  title="Visualizar"
                >
                  <Eye className="h-4 w-4" />
                </button>
                <button
                  onClick={() => alert(`Download iniciado: ${doc.title}`)}
                  className="rounded p-1.5 text-slate-400 hover:bg-slate-800 hover:text-slate-100"
                  title="Download"
                >
                  <Download className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
