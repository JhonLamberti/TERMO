import { useState, useEffect, useRef, ChangeEvent } from 'react';
import { 
  Building2, 
  User, 
  FileText, 
  Calendar, 
  Printer, 
  RefreshCw, 
  Trash2, 
  RotateCcw, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Info, 
  Clock, 
  Award, 
  Users, 
  FileSignature, 
  UploadCloud, 
  Globe, 
  Phone, 
  Sparkles,
  CheckCircle,
  Eye,
  Settings,
  FileCheck,
  Download
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { FormState, INITIAL_VALUES, ModeloTermo } from './types';
import DocumentPaper from './components/DocumentPaper';

const STORAGE_KEY = 'gerador_termos_fta_v2';

export default function App() {
  const [state, setState] = useState<FormState>(() => {
    // Initial fetch from localStorage matching previously saved format
    const savedRaw = localStorage.getItem(STORAGE_KEY);
    if (savedRaw) {
      try {
        const parsed = JSON.parse(savedRaw);
        let merged = { ...INITIAL_VALUES };
        if (parsed.logoData) {
          merged.logoData = parsed.logoData;
        }
        if (parsed.campos) {
          merged = { ...merged, ...parsed.campos };
        } else if (parsed.modelo) {
          merged = { ...merged, ...parsed };
        }
        return merged;
      } catch (e) {
        console.warn('Erro ao carregar dados salvos:', e);
        return INITIAL_VALUES;
      }
    }
    return INITIAL_VALUES;
  });

  const [activeTab, setActiveTab] = useState<'empresa' | 'colaborador' | 'modelo'>('modelo');
  const [zoom, setZoom] = useState<number>(0.85);
  const [saveIndicator, setSaveIndicator] = useState<'salvo' | 'salvando' | 'erro'>('salvo');
  const [mobileView, setMobileView] = useState<'form' | 'preview'>('form');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-Save Effect
  useEffect(() => {
    setSaveIndicator('salvando');
    const timer = setTimeout(() => {
      try {
        // Save using the compatible format: { logoData, campos: { ...stateWithoutLogo } }
        const { logoData, ...campos } = state;
        const payload = {
          logoData,
          campos: {
            ...campos,
          }
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
        setSaveIndicator('salvo');
      } catch (e) {
        console.error(e);
        setSaveIndicator('erro');
      }
    }, 400); // Debounce saves
    return () => clearTimeout(timer);
  }, [state]);

  // Model-specific doc code updates
  const handleModelChange = (modelo: ModeloTermo) => {
    const codes: Record<ModeloTermo, string> = {
      jornada: 'RH-001',
      promocao: 'RH-002',
      substituicao: 'RH-003',
      advertencia: 'RH-004',
      fgts: 'RH-005',
      proposta: 'RH-006',
      desconto: 'RH-007',
      ferias: 'RH-008',
      inss: 'RH-009',
      reajuste: 'RH-010',
      posdesligamento: 'RH-011',
      dut: 'RH-012',
      checklistDemissional: 'RH-013',
      checklistAdmissional: 'RH-014',
      exercicioFuncoes: 'RH-015',
      listaPresenca: 'RH-016',
      cartoesBeneficios: 'RH-017',
      primeirosAcessos: 'RH-018',
      errataDesligamento: 'RH-019',
      alteracaoFuncao: 'RH-020',
      suspensao: 'RH-021',
      avisoPrevioIndenizado: 'RH-022'
    };
    setState(prev => ({
      ...prev,
      modelo,
      codigo: codes[modelo]
    }));
  };

  // Field change updates
  const setField = (key: keyof FormState, value: string) => {
    setState(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Handle Logo Upload base64
  const handleLogoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      if (ev.target?.result && typeof ev.target.result === 'string') {
        setState(prev => ({
          ...prev,
          logoData: ev.target!.result as string
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  // Clear logo
  const clearLogo = () => {
    setState(prev => ({ ...prev, logoData: '' }));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Clear all employee details to let users write clean data
  const handleClearForm = () => {
    setState(prev => ({
      ...prev,
      nome: '',
      cpf: '',
      matricula: '',
      funcao: '',
      unidade: '',
      // also clear model-specific temporary fields
      substituido: '',
      cargoSubstituido: '',
      periodoAusencia: '',
      periodoSub: '',
    }));
  };

  // Reset entire state and local storage back to factory defaults
  const handleResetAll = () => {
    if (confirm('Deseja apagar todas as informações salvas e retornar ao padrão original da FTA?')) {
      localStorage.removeItem(STORAGE_KEY);
      setState(INITIAL_VALUES);
      clearLogo();
      setActiveTab('modelo');
    }
  };

  // Standard Print Trigger
  const handleExportWord = () => {
    const printableContent = document.getElementById('printable-content');
    if (!printableContent) return;

    const htmlContent = printableContent.innerHTML;
    
    const documentHtml = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
        <head>
          <meta charset="utf-8">
          <title>${state.codigo || 'Documento'}</title>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: 12px; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 15px; }
            td, th { border: 1px solid #ccc; padding: 6px; text-align: left; }
            .font-bold { font-weight: bold; }
            .text-center { text-align: center; }
            .text-right { text-align: right; }
            .w-full { width: 100%; }
            h2 { font-size: 16px; text-align: center; margin-top: 20px; margin-bottom: 20px; }
            h3 { font-size: 14px; margin-top: 15px; margin-bottom: 10px; }
            ul { margin: 0; padding-left: 20px; }
            p { margin-bottom: 10px; line-height: 1.5; }
          </style>
        </head>
        <body>
          ${htmlContent}
        </body>
      </html>
    `;

    const blob = new Blob(['\ufeff', documentHtml], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Documento_FTA_${state.codigo || 'Termo'}.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans antialiased overflow-hidden">
      
      {/* ────────────────── TOP NAVIGATION HEADER BAR ────────────────── */}
      <header className="h-14 shrink-0 bg-slate-900 border-b border-slate-800 px-4 flex items-center justify-between no-print shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#f37021] flex items-center justify-center text-white font-extrabold tracking-tighter text-sm">
            FTA
          </div>
          <div>
            <h1 className="text-white font-bold text-sm sm:text-base leading-none">
              Gerador de Termos FTA
            </h1>
            <span className="text-slate-400 text-[11px]">
              Controle de Documentação e Aditivos Contratuais
            </span>
          </div>
        </div>

        {/* Sync Indicator and Layout Mode */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 bg-slate-800/80 px-2.5 py-1 rounded-full border border-slate-700/50">
            {saveIndicator === 'salvo' && (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-[11px] text-emerald-400 font-medium font-sans">Nuvem Local Sincronizada</span>
              </>
            )}
            {saveIndicator === 'salvando' && (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                <span className="text-[11px] text-amber-400 font-medium font-sans">Atualizando...</span>
              </>
            )}
            {saveIndicator === 'erro' && (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
                <span className="text-[11px] text-rose-400 font-medium font-sans">Erro de Gravação</span>
              </>
            )}
          </div>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 bg-[#f37021] hover:bg-[#d65912] active:scale-95 transition text-white px-3.5 py-1.5 rounded-lg text-xs font-bold shadow-sm shadow-[#f37021]/30 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Imprimir / Salvar PDF</span>
          </button>
          <button
            onClick={handleExportWord}
            className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 active:scale-95 transition text-white px-3.5 py-1.5 rounded-lg text-xs font-bold shadow-sm shadow-blue-600/30 cursor-pointer ml-2"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Baixar Word</span>
          </button>
        </div>
      </header>

      {/* ────────────────── MOBILE TOGGLES FOR RESPONSIVE RESPONSIVENESS ────────────────── */}
      <div className="flex md:hidden border-b border-slate-200 bg-white no-print shrink-0 justify-around p-1">
        <button
          onClick={() => setMobileView('form')}
          className={`flex-1 py-2 text-center text-xs font-bold transition rounded ${mobileView === 'form' ? 'bg-[#f37021]/10 text-[#f37021]' : 'text-slate-600'}`}
        >
          Editar Formulário
        </button>
        <button
          onClick={() => setMobileView('preview')}
          className={`flex-1 py-2 text-center text-xs font-bold transition rounded ${mobileView === 'preview' ? 'bg-[#f37021]/10 text-[#f37021]' : 'text-slate-600'}`}
        >
          Visualizar Termo (A4)
        </button>
      </div>

      {/* ────────────────── MAIN APPLICATION SPLITTER ────────────────── */}
      <main className="flex-1 flex overflow-hidden app-layout">

        {/* ────────────────── LEFT SIDEBAR: FORMS PANEL ────────────────── */}
        <aside 
          className={`w-full md:w-[420px] shrink-0 border-r border-slate-200 bg-white flex flex-col overflow-hidden no-print transition-all duration-300 ${mobileView === 'form' ? 'block' : 'hidden md:flex'}`}
        >
          {/* Sub-Tabs for clean layout */}
          <div className="grid grid-cols-3 bg-slate-50 border-b border-slate-200 p-1 gap-1">
            <button
              onClick={() => setActiveTab('modelo')}
              className={`py-2 px-1 rounded-md text-center text-xs font-bold transition-all duration-200 ${activeTab === 'modelo' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
            >
              <div className="flex flex-col items-center gap-0.5">
                <FileCheck className="w-4 h-4 text-[#f37021]" />
                <span>1. Dados do Termo</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('colaborador')}
              className={`py-2 px-1 rounded-md text-center text-xs font-bold transition-all duration-200 ${activeTab === 'colaborador' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
            >
              <div className="flex flex-col items-center gap-0.5">
                <User className="w-4 h-4 text-[#f37021]" />
                <span>2. Colaborador</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('empresa')}
              className={`py-2 px-1 rounded-md text-center text-xs font-bold transition-all duration-200 ${activeTab === 'empresa' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
            >
              <div className="flex flex-col items-center gap-0.5">
                <Building2 className="w-4 h-4 text-[#f37021]" />
                <span>3. Empresa / Geral</span>
              </div>
            </button>
          </div>

          {/* Form scroll container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-5">
            <AnimatePresence mode="wait">
              {/* TAB 1: MODEL TYPE & EXTRA FIELDS */}
              {activeTab === 'modelo' && (
                <motion.div
                  key="tab-modelo"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="space-y-4"
                >
                  {/* Select Model Type */}
                  <div className="bg-slate-50 border border-slate-200 p-3 rounded-lg">
                    <label className="block text-[11px] font-bold text-slate-600 tracking-wider uppercase mb-1.5">
                      Modelo do Termo
                    </label>
                    <select
                      value={state.modelo}
                      onChange={(e) => handleModelChange(e.target.value as ModeloTermo)}
                      className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-[#f37021] focus:border-transparent outline-none transition"
                    >
                      <option value="jornada">RH-001 | Termo Aditivo de Jornada</option>
                      <option value="promocao">RH-002 | Promoção + Aditivo Contratual</option>
                      <option value="substituicao">RH-003 | Substituição Temporária</option>
                      <option value="advertencia">RH-004 | Carta de Advertência</option>
                      <option value="fgts">RH-005 | Declaração de FGTS</option>
                      <option value="proposta">RH-006 | Proposta de Trabalho</option>
                      <option value="desconto">RH-007 | Autorização de Desconto em Folha</option>
                      <option value="ferias">RH-008 | Cancelamento de Férias</option>
                      <option value="inss">RH-009 | Afastamento Previdenciário INSS</option>
                      <option value="reajuste">RH-010 | Reajuste Salarial por Mérito</option>
                      <option value="posdesligamento">RH-011 | Ciência Pós-Desligamento</option>
                      <option value="dut">RH-012 | Declaração de Último Dia Trabalhado (DUT)</option>
                      <option value="checklistDemissional">RH-013 | Checklist Demissional</option>
                      <option value="checklistAdmissional">RH-014 | Checklist Admissional</option>
                      <option value="exercicioFuncoes">RH-015 | Declaração de Exercício de Funções</option>
                      <option value="listaPresenca">RH-016 | Lista de Presença de Integração</option>
                      <option value="cartoesBeneficios">RH-017 | Termo de Recebimento de Cartões de Benefícios</option>
                      <option value="primeirosAcessos">RH-018 | Guia de Primeiros Acessos</option>
                      <option value="errataDesligamento">RH-019 | Errata ao Aviso de Desligamento</option>
                      <option value="alteracaoFuncao">RH-020 | Termo de Alteração de Função</option>
                      <option value="suspensao">RH-021 | Carta de Suspensão</option>
                      <option value="avisoPrevioIndenizado">RH-022 | Aviso Prévio Indenizado</option>
                    </select>
                  </div>

                  {/* Header metadata (Codigo / Revisão) */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Código</label>
                      <input
                        type="text"
                        value={state.codigo}
                        onChange={(e) => setField('codigo', e.target.value)}
                        className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-2 font-mono font-bold focus:bg-white focus:ring-1 focus:ring-[#f37021]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Revisão</label>
                      <input
                        type="text"
                        value={state.revisao}
                        onChange={(e) => setField('revisao', e.target.value)}
                        className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-2 font-mono font-bold focus:bg-white focus:ring-1 focus:ring-[#f37021]"
                      />
                    </div>
                  </div>

                  {/* ── CONDITIONAL RENDER: JORNADA FIELDS ── */}
                  {state.modelo === 'jornada' && (
                    <div className="space-y-3.5 border-t border-slate-150 pt-3">
                      <div className="flex items-center gap-1.5 text-slate-800 font-bold text-xs mb-1">
                        <Clock className="w-4 h-4 text-[#f37021]" />
                        <span>Parâmetros de Jornada</span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Escala Atual</label>
                          <input
                            type="text"
                            value={state.escalaAtual}
                            onChange={(e) => setField('escalaAtual', e.target.value)}
                            placeholder="ex: 2x2"
                            className="w-full text-xs bg-white border border-slate-250 rounded-lg p-2.5 focus:ring-1 focus:ring-[#f37021]"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Nova Escala</label>
                          <input
                            type="text"
                            value={state.novaEscala}
                            onChange={(e) => setField('novaEscala', e.target.value)}
                            placeholder="ex: 4x4"
                            className="w-full text-xs bg-white border border-slate-250 rounded-lg p-2.5 focus:ring-1 focus:ring-[#f37021]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Horário Atual</label>
                        <input
                          type="text"
                          value={state.horarioAtual}
                          onChange={(e) => setField('horarioAtual', e.target.value)}
                          placeholder="ex: 07:00 às 19:00"
                          className="w-full text-xs bg-white border border-slate-250 rounded-lg p-2.5 focus:ring-1 focus:ring-[#f37021]"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Novo Horário</label>
                        <input
                          type="text"
                          value={state.novoHorario}
                          onChange={(e) => setField('novoHorario', e.target.value)}
                          placeholder="ex: 07:00 às 19:00 / 19:00 às 07:00"
                          className="w-full text-xs bg-white border border-slate-250 rounded-lg p-2.5 focus:ring-1 focus:ring-[#f37021]"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Intervalo</label>
                          <input
                            type="text"
                            value={state.intervalo}
                            onChange={(e) => setField('intervalo', e.target.value)}
                            placeholder="ex: 1 hora"
                            className="w-full text-xs bg-white border border-slate-250 rounded-lg p-2.5 focus:ring-1 focus:ring-[#f37021]"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Data de Vigência</label>
                          <input
                            type="text"
                            value={state.vigencia}
                            onChange={(e) => setField('vigencia', e.target.value)}
                            placeholder="ex: 16/03/2026"
                            className="w-full text-xs bg-white border border-slate-250 rounded-lg p-2.5 focus:ring-1 focus:ring-[#f37021]"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ── CONDITIONAL RENDER: PROMOÇÃO FIELDS ── */}
                  {state.modelo === 'promocao' && (
                    <div className="space-y-3.5 border-t border-slate-150 pt-3">
                      <div className="flex items-center gap-1.5 text-slate-800 font-bold text-xs mb-1">
                        <Award className="w-4 h-4 text-[#f37021]" />
                        <span>Dados de Promoção Contratual</span>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Nova Função</label>
                          <input
                            type="text"
                            value={state.novaFuncao}
                            onChange={(e) => setField('novaFuncao', e.target.value)}
                            className="w-full text-xs bg-white border border-slate-250 rounded-lg p-2.5 focus:ring-1 focus:ring-[#f37021]"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Novo Salário</label>
                          <input
                            type="text"
                            value={state.salario}
                            onChange={(e) => setField('salario', e.target.value)}
                            placeholder="ex: R$ 4.984,20"
                            className="w-full text-xs bg-white border border-slate-250 rounded-lg p-2.5 focus:ring-1 focus:ring-[#f37021]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Vigência (Mês/Ano ou Data)</label>
                        <input
                          type="text"
                          value={state.vigPromo}
                          onChange={(e) => setField('vigPromo', e.target.value)}
                          placeholder="ex: 02/2026"
                          className="w-full text-xs bg-white border border-slate-250 rounded-lg p-2.5 focus:ring-1 focus:ring-[#f37021]"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Mensagem de Congratulations (Carta de Capa)</label>
                        <textarea
                          rows={4}
                          value={state.msgPromo}
                          onChange={(e) => setField('msgPromo', e.target.value)}
                          className="w-full text-xs bg-white border border-slate-350 rounded-lg p-2.5 focus:ring-1 focus:ring-[#f37021] outline-none"
                          placeholder="Digite o texto de parabéns..."
                        />
                        <span className="text-[10px] text-slate-650 leading-tight block mt-1">
                          Este texto é exibido no topo da carta de homenagem antes das cláusulas de aditamento.
                        </span>
                      </div>
                    </div>
                  )}

                  {/* ── CONDITIONAL RENDER: SUBSTITUIÇÃO FIELDS ── */}
                  {state.modelo === 'substituicao' && (
                    <div className="space-y-3.5 border-t border-slate-150 pt-3">
                      <div className="flex items-center gap-1.5 text-slate-800 font-bold text-xs mb-1">
                        <Users className="w-4 h-4 text-[#f37021]" />
                        <span>Dados de Substituição Pró-tempore</span>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Colaborador Substituído</label>
                        <input
                          type="text"
                          value={state.substituido}
                          onChange={(e) => setField('substituido', e.target.value)}
                          className="w-full text-xs bg-white border border-slate-250 rounded-lg p-2.5 focus:ring-1 focus:ring-[#f37021]"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Cargo do Titular</label>
                          <input
                            type="text"
                            value={state.cargoSubstituido}
                            onChange={(e) => setField('cargoSubstituido', e.target.value)}
                            className="w-full text-xs bg-white border border-slate-250 rounded-lg p-2.5 focus:ring-1 focus:ring-[#f37021]"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Período de Ausência</label>
                          <input
                            type="text"
                            value={state.periodoAusencia}
                            onChange={(e) => setField('periodoAusencia', e.target.value)}
                            placeholder="DD/MM a DD/MM"
                            className="w-full text-xs bg-white border border-slate-250 rounded-lg p-2.5 focus:ring-1 focus:ring-[#f37021]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Cargo Durante Sub.</label>
                          <input
                            type="text"
                            value={state.cargoDurante}
                            onChange={(e) => setField('cargoDurante', e.target.value)}
                            className="w-full text-xs bg-white border border-slate-250 rounded-lg p-2.5 focus:ring-1 focus:ring-[#f37021]"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Período de Substituição</label>
                          <input
                            type="text"
                            value={state.periodoSub}
                            onChange={(e) => setField('periodoSub', e.target.value)}
                            placeholder="DD/MM/AAAA a DD/MM/AAAA"
                            className="w-full text-xs bg-white border border-slate-250 rounded-lg p-2.5 focus:ring-1 focus:ring-[#f37021]"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ── CONDITIONAL RENDER: ADVERTENCIA FIELDS ── */}
                  {state.modelo === 'advertencia' && (
                    <div className="space-y-3.5 border-t border-slate-150 pt-3">
                      <div className="flex items-center gap-1.5 text-slate-800 font-bold text-xs mb-1">
                        <FileText className="w-4 h-4 text-[#f37021]" />
                        <span>Dados da Advertência</span>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Tipo da falta</label>
                        <select
                          value={state.tipoAdvertencia}
                          onChange={(e) => setField('tipoAdvertencia', e.target.value)}
                          className="w-full text-xs bg-white border border-slate-250 rounded-lg p-2.5 focus:ring-1 focus:ring-[#f37021] outline-none"
                        >
                          <option>Alínea a: Atos de improbidade</option>
                          <option>Alínea b: Incontinência de Conduta ou Mau Procedimento</option>
                          <option>Alínea e: Desídia no Desempenho das Funções</option>
                          <option>Alínea f: Embriaguez Habitual ou em Serviço</option>
                          <option>Alínea g: Violação de Segredo da Empresa</option>
                          <option>Alínea h: Ato de Indisciplina ou de Insubordinação</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Motivo</label>
                        <input
                          type="text"
                          value={state.motivoAdvertencia}
                          onChange={(e) => setField('motivoAdvertencia', e.target.value)}
                          className="w-full text-xs bg-white border border-slate-250 rounded-lg p-2.5 focus:ring-1 focus:ring-[#f37021]"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Relato do ocorrido</label>
                        <textarea
                          rows={3}
                          value={state.relatoAdvertencia}
                          onChange={(e) => setField('relatoAdvertencia', e.target.value)}
                          className="w-full text-xs bg-white border border-slate-250 rounded-lg p-2.5 focus:ring-1 focus:ring-[#f37021] outline-none"
                        />
                      </div>
                    </div>
                  )}

                  {/* ── CONDITIONAL RENDER: FGTS FIELDS ── */}
                  {state.modelo === 'fgts' && (
                    <div className="space-y-3.5 border-t border-slate-150 pt-3">
                      <div className="flex items-center gap-1.5 text-slate-800 font-bold text-xs mb-1">
                        <FileText className="w-4 h-4 text-[#f37021]" />
                        <span>Dados do FGTS</span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Competência / Período</label>
                          <input
                            type="text"
                            value={state.competenciaFgts}
                            onChange={(e) => setField('competenciaFgts', e.target.value)}
                            placeholder="Mês/Ano"
                            className="w-full text-xs bg-white border border-slate-250 rounded-lg p-2.5 focus:ring-1 focus:ring-[#f37021]"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Data de Recolhimento</label>
                          <input
                            type="text"
                            value={state.dataRecolhimentoFgts}
                            onChange={(e) => setField('dataRecolhimentoFgts', e.target.value)}
                            placeholder="DD/MM/AAAA"
                            className="w-full text-xs bg-white border border-slate-250 rounded-lg p-2.5 focus:ring-1 focus:ring-[#f37021]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Observações</label>
                        <textarea
                          rows={3}
                          value={state.obsFgts}
                          onChange={(e) => setField('obsFgts', e.target.value)}
                          className="w-full text-xs bg-white border border-slate-250 rounded-lg p-2.5 focus:ring-1 focus:ring-[#f37021] outline-none"
                        />
                      </div>
                    </div>
                  )}

                  {/* ── CONDITIONAL RENDER: PROPOSTA FIELDS ── */}
                  {state.modelo === 'proposta' && (
                    <div className="space-y-3.5 border-t border-slate-150 pt-3">
                      <div className="flex items-center gap-1.5 text-slate-800 font-bold text-xs mb-1">
                        <FileText className="w-4 h-4 text-[#f37021]" />
                        <span>Dados da Proposta de Trabalho</span>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Telefone do candidato</label>
                          <input
                            type="text"
                            value={state.telefoneCandidato}
                            onChange={(e) => setField('telefoneCandidato', e.target.value)}
                            className="w-full text-xs bg-white border border-slate-250 rounded-lg p-2.5 focus:ring-1 focus:ring-[#f37021]"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Endereço do candidato</label>
                          <input
                            type="text"
                            value={state.enderecoCandidato}
                            onChange={(e) => setField('enderecoCandidato', e.target.value)}
                            className="w-full text-xs bg-white border border-slate-250 rounded-lg p-2.5 focus:ring-1 focus:ring-[#f37021]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Cargo proposto</label>
                          <input
                            type="text"
                            value={state.novaFuncao}
                            onChange={(e) => setField('novaFuncao', e.target.value)}
                            className="w-full text-xs bg-white border border-slate-250 rounded-lg p-2.5 focus:ring-1 focus:ring-[#f37021]"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Salário proposto</label>
                          <input
                            type="text"
                            value={state.salarioProposta}
                            onChange={(e) => setField('salarioProposta', e.target.value)}
                            className="w-full text-xs bg-white border border-slate-250 rounded-lg p-2.5 focus:ring-1 focus:ring-[#f37021]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Data prevista admissão</label>
                          <input
                            type="text"
                            value={state.dataAdmissao}
                            onChange={(e) => setField('dataAdmissao', e.target.value)}
                            className="w-full text-xs bg-white border border-slate-250 rounded-lg p-2.5 focus:ring-1 focus:ring-[#f37021]"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Tipo de Contrato</label>
                          <input
                            type="text"
                            value={state.tipoContrato}
                            onChange={(e) => setField('tipoContrato', e.target.value)}
                            placeholder="Determinado / Indeterminado"
                            className="w-full text-xs bg-white border border-slate-250 rounded-lg p-2.5 focus:ring-1 focus:ring-[#f37021]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Validade do Contrato</label>
                          <input
                            type="text"
                            value={state.validadeContrato}
                            onChange={(e) => setField('validadeContrato', e.target.value)}
                            className="w-full text-xs bg-white border border-slate-250 rounded-lg p-2.5 focus:ring-1 focus:ring-[#f37021]"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Horário de trabalho</label>
                          <input
                            type="text"
                            value={state.horarioProposta}
                            onChange={(e) => setField('horarioProposta', e.target.value)}
                            className="w-full text-xs bg-white border border-slate-250 rounded-lg p-2.5 focus:ring-1 focus:ring-[#f37021]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Carga semanal</label>
                          <input
                            type="text"
                            value={state.cargaSemanal}
                            onChange={(e) => setField('cargaSemanal', e.target.value)}
                            className="w-full text-xs bg-white border border-slate-250 rounded-lg p-2.5 focus:ring-1 focus:ring-[#f37021]"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Local de trabalho</label>
                          <input
                            type="text"
                            value={state.localTrabalho}
                            onChange={(e) => setField('localTrabalho', e.target.value)}
                            className="w-full text-xs bg-white border border-slate-250 rounded-lg p-2.5 focus:ring-1 focus:ring-[#f37021]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Benefícios (separe por ;)</label>
                        <textarea
                          rows={3}
                          value={state.beneficiosProposta}
                          onChange={(e) => setField('beneficiosProposta', e.target.value)}
                          className="w-full text-xs bg-white border border-slate-250 rounded-lg p-2.5 focus:ring-1 focus:ring-[#f37021] outline-none"
                        />
                      </div>
                    </div>
                  )}

                  {/* ── CONDITIONAL RENDER: DESCONTO EM FOLHA FIELDS ── */}
                  {state.modelo === 'desconto' && (
                    <div className="space-y-3.5 border-t border-slate-150 pt-3">
                      <div className="flex items-center gap-1.5 text-slate-800 font-bold text-xs mb-1">
                        <FileText className="w-4 h-4 text-[#f37021]" />
                        <span>Autorização de Desconto em Folha</span>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Motivo do desconto</label>
                        <select
                          value={state.motivoDesconto}
                          onChange={(e) => setField('motivoDesconto', e.target.value)}
                          className="w-full text-xs bg-white border border-slate-250 rounded-lg p-2.5 focus:ring-1 focus:ring-[#f37021] outline-none"
                        >
                          <option>Adiantamento salarial</option>
                          <option>Coparticipação de plano de saúde e/ou odontológico</option>
                          <option>Vale-transporte</option>
                          <option>Danos ou prejuízos causados à empresa</option>
                          <option>Empréstimos ou adiantamentos concedidos pela empresa</option>
                          <option>Outros</option>
                        </select>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Valor total</label>
                          <input
                            type="text"
                            value={state.valorDesconto}
                            onChange={(e) => setField('valorDesconto', e.target.value)}
                            className="w-full text-xs bg-white border border-slate-250 rounded-lg p-2.5 focus:ring-1 focus:ring-[#f37021]"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Forma de desconto</label>
                          <input
                            type="text"
                            value={state.formaDesconto}
                            onChange={(e) => setField('formaDesconto', e.target.value)}
                            className="w-full text-xs bg-white border border-slate-250 rounded-lg p-2.5 focus:ring-1 focus:ring-[#f37021]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Descrição / Observação</label>
                        <textarea
                          rows={3}
                          value={state.obsDesconto}
                          onChange={(e) => setField('obsDesconto', e.target.value)}
                          className="w-full text-xs bg-white border border-slate-250 rounded-lg p-2.5 focus:ring-1 focus:ring-[#f37021] outline-none"
                        />
                      </div>
                    </div>
                  )}

                  {/* ── CONDITIONAL RENDER: FÉRIAS FIELDS ── */}
                  {state.modelo === 'ferias' && (
                    <div className="space-y-3.5 border-t border-slate-150 pt-3">
                      <div className="flex items-center gap-1.5 text-slate-800 font-bold text-xs mb-1">
                        <FileText className="w-4 h-4 text-[#f37021]" />
                        <span>Cancelamento de Férias</span>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Período cancelado</label>
                          <input
                            type="text"
                            value={state.periodoFerias}
                            onChange={(e) => setField('periodoFerias', e.target.value)}
                            placeholder="DD/MM a DD/MM"
                            className="w-full text-xs bg-white border border-slate-250 rounded-lg p-2.5 focus:ring-1 focus:ring-[#f37021]"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Início previsto</label>
                          <input
                            type="text"
                            value={state.inicioFerias}
                            onChange={(e) => setField('inicioFerias', e.target.value)}
                            className="w-full text-xs bg-white border border-slate-250 rounded-lg p-2.5 focus:ring-1 focus:ring-[#f37021]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Motivo do cancelamento</label>
                        <textarea
                          rows={4}
                          value={state.motivoFerias}
                          onChange={(e) => setField('motivoFerias', e.target.value)}
                          className="w-full text-xs bg-white border border-slate-250 rounded-lg p-2.5 focus:ring-1 focus:ring-[#f37021] outline-none"
                        />
                      </div>
                    </div>
                  )}

                  {/* ── CONDITIONAL RENDER: INSS FIELDS ── */}
                  {state.modelo === 'inss' && (
                    <div className="space-y-3.5 border-t border-slate-150 pt-3">
                      <div className="flex items-center gap-1.5 text-slate-800 font-bold text-xs mb-1">
                        <FileText className="w-4 h-4 text-[#f37021]" />
                        <span>Afastamento INSS</span>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Data do afastamento</label>
                          <input
                            type="text"
                            value={state.dataAfastamento}
                            onChange={(e) => setField('dataAfastamento', e.target.value)}
                            className="w-full text-xs bg-white border border-slate-250 rounded-lg p-2.5 focus:ring-1 focus:ring-[#f37021]"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Nº benefício / protocolo</label>
                          <input
                            type="text"
                            value={state.beneficioInss}
                            onChange={(e) => setField('beneficioInss', e.target.value)}
                            className="w-full text-xs bg-white border border-slate-250 rounded-lg p-2.5 focus:ring-1 focus:ring-[#f37021]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Benefícios mantidos</label>
                        <textarea
                          rows={5}
                          value={state.beneficiosInss}
                          onChange={(e) => setField('beneficiosInss', e.target.value)}
                          className="w-full text-xs bg-white border border-slate-250 rounded-lg p-2.5 focus:ring-1 focus:ring-[#f37021] outline-none"
                        />
                      </div>
                    </div>
                  )}

                  {/* ── CONDITIONAL RENDER: REAJUSTE FIELDS ── */}
                  {state.modelo === 'reajuste' && (
                    <div className="space-y-3.5 border-t border-slate-150 pt-3">
                      <div className="flex items-center gap-1.5 text-slate-800 font-bold text-xs mb-1">
                        <FileText className="w-4 h-4 text-[#f37021]" />
                        <span>Reajuste Salarial por Mérito</span>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Salário anterior</label>
                          <input
                            type="text"
                            value={state.salarioAnterior}
                            onChange={(e) => setField('salarioAnterior', e.target.value)}
                            className="w-full text-xs bg-white border border-slate-250 rounded-lg p-2.5 focus:ring-1 focus:ring-[#f37021]"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Percentual de reajuste</label>
                          <input
                            type="text"
                            value={state.percentualReajuste}
                            onChange={(e) => setField('percentualReajuste', e.target.value)}
                            className="w-full text-xs bg-white border border-slate-250 rounded-lg p-2.5 focus:ring-1 focus:ring-[#f37021]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Novo salário</label>
                          <input
                            type="text"
                            value={state.novoSalarioReajuste}
                            onChange={(e) => setField('novoSalarioReajuste', e.target.value)}
                            className="w-full text-xs bg-white border border-slate-250 rounded-lg p-2.5 focus:ring-1 focus:ring-[#f37021]"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Vigência</label>
                          <input
                            type="text"
                            value={state.vigenciaReajuste}
                            onChange={(e) => setField('vigenciaReajuste', e.target.value)}
                            className="w-full text-xs bg-white border border-slate-250 rounded-lg p-2.5 focus:ring-1 focus:ring-[#f37021]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Mensagem de reconhecimento</label>
                        <textarea
                          rows={3}
                          value={state.msgReajuste}
                          onChange={(e) => setField('msgReajuste', e.target.value)}
                          className="w-full text-xs bg-white border border-slate-250 rounded-lg p-2.5 focus:ring-1 focus:ring-[#f37021] outline-none"
                        />
                      </div>
                    </div>
                  )}

                  {/* ── CONDITIONAL RENDER: POS-DESLIGAMENTO FIELDS ── */}
                  {state.modelo === 'posdesligamento' && (
                    <div className="space-y-3.5 border-t border-slate-150 pt-3">
                      <div className="flex items-center gap-1.5 text-slate-800 font-bold text-xs mb-1">
                        <FileText className="w-4 h-4 text-[#f37021]" />
                        <span>Ciência Pós-Desligamento</span>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Data exame demissional</label>
                          <input
                            type="text"
                            value={state.dataExameDemissional}
                            onChange={(e) => setField('dataExameDemissional', e.target.value)}
                            className="w-full text-xs bg-white border border-slate-250 rounded-lg p-2.5 focus:ring-1 focus:ring-[#f37021]"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Horário do exame</label>
                          <input
                            type="text"
                            value={state.horaExameDemissional}
                            onChange={(e) => setField('horaExameDemissional', e.target.value)}
                            className="w-full text-xs bg-white border border-slate-250 rounded-lg p-2.5 focus:ring-1 focus:ring-[#f37021]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Local do exame</label>
                        <input
                          type="text"
                          value={state.localExameDemissional}
                          onChange={(e) => setField('localExameDemissional', e.target.value)}
                          className="w-full text-xs bg-white border border-slate-250 rounded-lg p-2.5 focus:ring-1 focus:ring-[#f37021]"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Data do desligamento</label>
                        <input
                          type="text"
                          value={state.dataDesligamento}
                          onChange={(e) => setField('dataDesligamento', e.target.value)}
                          className="w-full text-xs bg-white border border-slate-250 rounded-lg p-2.5 focus:ring-1 focus:ring-[#f37021]"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Texto do exame demissional</label>
                        <textarea
                          rows={2}
                          value={state.textoExameDemissional}
                          onChange={(e) => setField('textoExameDemissional', e.target.value)}
                          className="w-full text-xs bg-white border border-slate-250 rounded-lg p-2.5 focus:ring-1 focus:ring-[#f37021] outline-none"
                        />
                        <p className="text-[9px] text-slate-400 mt-0.5 leading-tight">Use {'{data}'}, {'{hora}'} e {'{local}'} para puxar os campos acima automaticamente.</p>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Texto pagamento verbas</label>
                        <textarea
                          rows={2}
                          value={state.textoPagamentoVerbas}
                          onChange={(e) => setField('textoPagamentoVerbas', e.target.value)}
                          className="w-full text-xs bg-white border border-slate-250 rounded-lg p-2.5 focus:ring-1 focus:ring-[#f37021] outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Texto devolução de pertences</label>
                        <textarea
                          rows={3}
                          value={state.textoDevolucaoPertences}
                          onChange={(e) => setField('textoDevolucaoPertences', e.target.value)}
                          className="w-full text-xs bg-white border border-slate-250 rounded-lg p-2.5 focus:ring-1 focus:ring-[#f37021] outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Documentos rescisórios</label>
                        <textarea
                          rows={2}
                          value={state.obsPosDesligamento}
                          onChange={(e) => setField('obsPosDesligamento', e.target.value)}
                          className="w-full text-xs bg-white border border-slate-250 rounded-lg p-2.5 focus:ring-1 focus:ring-[#f37021] outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Responsável da empresa</label>
                          <input
                            type="text"
                            value={state.responsavelEmpresa}
                            onChange={(e) => setField('responsavelEmpresa', e.target.value)}
                            className="w-full text-xs bg-white border border-slate-250 rounded-lg p-2.5 focus:ring-1 focus:ring-[#f37021]"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Cargo do responsável</label>
                          <input
                            type="text"
                            value={state.cargoResponsavelEmpresa}
                            onChange={(e) => setField('cargoResponsavelEmpresa', e.target.value)}
                            className="w-full text-xs bg-white border border-slate-250 rounded-lg p-2.5 focus:ring-1 focus:ring-[#f37021]"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ── CONDITIONAL RENDER: DUT FIELDS ── */}
                  {state.modelo === 'dut' && (
                    <div className="space-y-3.5 border-t border-slate-150 pt-3">
                      <div className="flex items-center gap-1.5 text-slate-800 font-bold text-xs mb-1">
                        <FileText className="w-4 h-4 text-[#f37021]" />
                        <span>Declaração de Último Dia Trabalhado (DUT)</span>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Data de admissão</label>
                          <input
                            type="text"
                            value={state.admissaoDut}
                            onChange={(e) => setField('admissaoDut', e.target.value)}
                            className="w-full text-xs bg-white border border-slate-250 rounded-lg p-2.5 focus:ring-1 focus:ring-[#f37021]"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Último dia trabalhado</label>
                          <input
                            type="text"
                            value={state.ultimoDiaTrabalhadoDut}
                            onChange={(e) => setField('ultimoDiaTrabalhadoDut', e.target.value)}
                            className="w-full text-xs bg-white border border-slate-250 rounded-lg p-2.5 focus:ring-1 focus:ring-[#f37021]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Cidade da emissão</label>
                          <input
                            type="text"
                            value={state.cidadeDut}
                            onChange={(e) => setField('cidadeDut', e.target.value)}
                            className="w-full text-xs bg-white border border-slate-250 rounded-lg p-2.5 focus:ring-1 focus:ring-[#f37021]"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Data da emissão</label>
                          <input
                            type="text"
                            value={state.dataEmissaoDut}
                            onChange={(e) => setField('dataEmissaoDut', e.target.value)}
                            className="w-full text-xs bg-white border border-slate-250 rounded-lg p-2.5 focus:ring-1 focus:ring-[#f37021]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Atestados e laudos apresentados</label>
                        <textarea
                          rows={4}
                          value={state.atestadosDut}
                          onChange={(e) => setField('atestadosDut', e.target.value)}
                          className="w-full text-xs bg-white border border-slate-250 rounded-lg p-2.5 focus:ring-1 focus:ring-[#f37021] outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Orientações da perícia INSS</label>
                        <textarea
                          rows={6}
                          value={state.orientacoesDut}
                          onChange={(e) => setField('orientacoesDut', e.target.value)}
                          className="w-full text-xs bg-white border border-slate-250 rounded-lg p-2.5 focus:ring-1 focus:ring-[#f37021] outline-none"
                        />
                      </div>
                    </div>
                  )}

                  {/* ── CONDITIONAL RENDER: CHECKLIST DEMISSIONAL FIELDS ── */}
                  {state.modelo === 'checklistDemissional' && (
                    <div className="space-y-3.5 border-t border-slate-150 pt-3">
                      <div className="flex items-center gap-1.5 text-slate-800 font-bold text-xs mb-1">
                        <FileText className="w-4 h-4 text-[#f37021]" />
                        <span>Checklist Demissional</span>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Data do desligamento</label>
                          <input
                            type="text"
                            value={state.dataDesligamentoChecklist}
                            onChange={(e) => setField('dataDesligamentoChecklist', e.target.value)}
                            className="w-full text-xs bg-white border border-slate-250 rounded-lg p-2.5 focus:ring-1 focus:ring-[#f37021]"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Responsável pelo processo</label>
                          <input
                            type="text"
                            value={state.responsavelChecklist}
                            onChange={(e) => setField('responsavelChecklist', e.target.value)}
                            className="w-full text-xs bg-white border border-slate-250 rounded-lg p-2.5 focus:ring-1 focus:ring-[#f37021]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Observações gerais</label>
                        <textarea
                          rows={2}
                          value={state.observacoesChecklist}
                          onChange={(e) => setField('observacoesChecklist', e.target.value)}
                          className="w-full text-xs bg-white border border-slate-250 rounded-lg p-2.5 focus:ring-1 focus:ring-[#f37021] outline-none"
                        />
                      </div>

                      <div className="mt-4 pt-4 border-t border-slate-150">
                        <h4 className="text-[11px] font-bold text-slate-700 uppercase mb-3">Itens do Checklist</h4>
                        
                        <div className="space-y-3">
                          {[
                            { key: 1, label: 'Formalização do desligamento' },
                            { key: 2, label: 'Devolução de equipamentos' },
                            { key: 3, label: 'Bloqueio de acessos e e-mail' },
                            { key: 4, label: 'Realização do exame demissional' },
                            { key: 5, label: 'Cálculo das verbas rescisórias' },
                            { key: 6, label: 'Entrega da documentação rescisória' },
                            { key: 7, label: 'Cancelamento de benefícios' },
                            { key: 8, label: 'Arquivamento da documentação' },
                          ].map(item => (
                            <div key={item.key} className="grid grid-cols-3 gap-2 items-center bg-slate-50 p-2 border border-slate-200 rounded">
                              <span className="col-span-3 sm:col-span-1 text-[10px] font-bold text-slate-600 truncate">{item.label}</span>
                              <input
                                type="text"
                                placeholder="Data"
                                value={state[`checkData${item.key}` as keyof FormState] as string}
                                onChange={(e) => setField(`checkData${item.key}` as keyof FormState, e.target.value)}
                                className="w-full text-xs bg-white border border-slate-250 rounded p-1.5 focus:ring-1 focus:ring-[#f37021] col-span-1 sm:col-span-1"
                              />
                              <select
                                value={state[`checkStatus${item.key}` as keyof FormState] as string}
                                onChange={(e) => setField(`checkStatus${item.key}` as keyof FormState, e.target.value)}
                                className="w-full text-xs bg-white border border-slate-250 rounded p-1.5 focus:ring-1 focus:ring-[#f37021] outline-none col-span-2 sm:col-span-1"
                              >
                                <option value="Pendente">Pendente</option>
                                <option value="Concluído">Concluído</option>
                                <option value="Não se aplica">Não se aplica</option>
                              </select>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ── CONDITIONAL RENDER: CHECKLIST ADMISSIONAL FIELDS ── */}
                  {state.modelo === 'checklistAdmissional' && (
                    <div className="space-y-3.5 border-t border-slate-150 pt-3">
                      <div className="flex items-center gap-1.5 text-slate-800 font-bold text-xs mb-1">
                        <FileText className="w-4 h-4 text-[#f37021]" />
                        <span>Checklist Admissional</span>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Setor Admissional</label>
                          <input
                            type="text"
                            value={state.setorAdmissional}
                            onChange={(e) => setField('setorAdmissional', e.target.value)}
                            className="w-full text-xs bg-white border border-slate-250 rounded-lg p-2.5 focus:ring-1 focus:ring-[#f37021]"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Data de Início</label>
                          <input
                            type="text"
                            value={state.dataInicioAdmissional}
                            onChange={(e) => setField('dataInicioAdmissional', e.target.value)}
                            className="w-full text-xs bg-white border border-slate-250 rounded-lg p-2.5 focus:ring-1 focus:ring-[#f37021]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Responsável RH</label>
                        <input
                          type="text"
                          value={state.responsavelAdmissional}
                          onChange={(e) => setField('responsavelAdmissional', e.target.value)}
                          className="w-full text-xs bg-white border border-slate-250 rounded-lg p-2.5 focus:ring-1 focus:ring-[#f37021]"
                        />
                      </div>
                    </div>
                  )}

                  {/* ── CONDITIONAL RENDER: EXERCICIO FUNCOES FIELDS ── */}
                  {state.modelo === 'exercicioFuncoes' && (
                    <div className="space-y-3.5 border-t border-slate-150 pt-3">
                      <div className="flex items-center gap-1.5 text-slate-800 font-bold text-xs mb-1">
                        <FileText className="w-4 h-4 text-[#f37021]" />
                        <span>Declaração de Exercício de Funções</span>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">RG</label>
                          <input
                            type="text"
                            value={state.rgExercicio}
                            onChange={(e) => setField('rgExercicio', e.target.value)}
                            className="w-full text-xs bg-white border border-slate-250 rounded-lg p-2.5 focus:ring-1 focus:ring-[#f37021]"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">CTPS</label>
                            <input
                              type="text"
                              value={state.ctpsExercicio}
                              onChange={(e) => setField('ctpsExercicio', e.target.value)}
                              className="w-full text-xs bg-white border border-slate-250 rounded-lg p-2.5 focus:ring-1 focus:ring-[#f37021]"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Série</label>
                            <input
                              type="text"
                              value={state.serieCtpsExercicio}
                              onChange={(e) => setField('serieCtpsExercicio', e.target.value)}
                              className="w-full text-xs bg-white border border-slate-250 rounded-lg p-2.5 focus:ring-1 focus:ring-[#f37021]"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Data de Admissão</label>
                          <input
                            type="text"
                            value={state.admissaoExercicio}
                            onChange={(e) => setField('admissaoExercicio', e.target.value)}
                            className="w-full text-xs bg-white border border-slate-250 rounded-lg p-2.5 focus:ring-1 focus:ring-[#f37021]"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Início na Função</label>
                          <input
                            type="text"
                            value={state.inicioFuncaoExercicio}
                            onChange={(e) => setField('inicioFuncaoExercicio', e.target.value)}
                            className="w-full text-xs bg-white border border-slate-250 rounded-lg p-2.5 focus:ring-1 focus:ring-[#f37021]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Setor de Exercício</label>
                          <input
                            type="text"
                            value={state.setorExercicio}
                            onChange={(e) => setField('setorExercicio', e.target.value)}
                            className="w-full text-xs bg-white border border-slate-250 rounded-lg p-2.5 focus:ring-1 focus:ring-[#f37021]"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Cidade (Data Final)</label>
                          <input
                            type="text"
                            value={state.cidadeExercicio}
                            onChange={(e) => setField('cidadeExercicio', e.target.value)}
                            className="w-full text-xs bg-white border border-slate-250 rounded-lg p-2.5 focus:ring-1 focus:ring-[#f37021]"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Data de Emissão (Data Final)</label>
                        <input
                          type="text"
                          value={state.dataEmissaoExercicio}
                          onChange={(e) => setField('dataEmissaoExercicio', e.target.value)}
                          className="w-full text-xs bg-white border border-slate-250 rounded-lg p-2.5 focus:ring-1 focus:ring-[#f37021]"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Atividades Realizadas (em bullet points)</label>
                        <textarea
                          rows={4}
                          value={state.atividadesExercicio}
                          onChange={(e) => setField('atividadesExercicio', e.target.value)}
                          className="w-full text-xs bg-white border border-slate-250 rounded-lg p-2.5 focus:ring-1 focus:ring-[#f37021] outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Nome do Responsável (Assinatura)</label>
                        <input
                          type="text"
                          value={state.responsavelExercicio}
                          onChange={(e) => setField('responsavelExercicio', e.target.value)}
                          className="w-full text-xs bg-white border border-slate-250 rounded-lg p-2.5 focus:ring-1 focus:ring-[#f37021]"
                        />
                      </div>
                    </div>
                  )}

                  {/* ── CONDITIONAL RENDER: LISTA PRESENCA FIELDS ── */}
                  {state.modelo === 'listaPresenca' && (
                    <div className="space-y-3.5 border-t border-slate-150 pt-3">
                      <div className="flex items-center gap-1.5 text-slate-800 font-bold text-xs mb-1">
                        <FileText className="w-4 h-4 text-[#f37021]" />
                        <span>Lista de Presença - Integração</span>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Data da Integração</label>
                          <input
                            type="text"
                            value={state.dataIntegracao}
                            onChange={(e) => setField('dataIntegracao', e.target.value)}
                            className="w-full text-xs bg-white border border-slate-250 rounded-lg p-2.5 focus:ring-1 focus:ring-[#f37021]"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Local</label>
                          <input
                            type="text"
                            value={state.localIntegracao}
                            onChange={(e) => setField('localIntegracao', e.target.value)}
                            className="w-full text-xs bg-white border border-slate-250 rounded-lg p-2.5 focus:ring-1 focus:ring-[#f37021]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Horário Início</label>
                          <input
                            type="text"
                            value={state.horarioInicioIntegracao}
                            onChange={(e) => setField('horarioInicioIntegracao', e.target.value)}
                            className="w-full text-xs bg-white border border-slate-250 rounded-lg p-2.5 focus:ring-1 focus:ring-[#f37021]"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Horário Término</label>
                          <input
                            type="text"
                            value={state.horarioTerminoIntegracao}
                            onChange={(e) => setField('horarioTerminoIntegracao', e.target.value)}
                            className="w-full text-xs bg-white border border-slate-250 rounded-lg p-2.5 focus:ring-1 focus:ring-[#f37021]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Responsável pela Integração</label>
                        <input
                          type="text"
                          value={state.responsavelIntegracao}
                          onChange={(e) => setField('responsavelIntegracao', e.target.value)}
                          className="w-full text-xs bg-white border border-slate-250 rounded-lg p-2.5 focus:ring-1 focus:ring-[#f37021]"
                        />
                      </div>
                    </div>
                  )}

                  {/* ── CONDITIONAL RENDER: PRIMEIROS ACESSOS FIELDS ── */}
                  {state.modelo === 'primeirosAcessos' && (
                    <div className="space-y-3.5 border-t border-slate-150 pt-3">
                      <div className="flex items-center gap-1.5 text-slate-800 font-bold text-xs mb-1">
                        <FileText className="w-4 h-4 text-[#f37021]" />
                        <span>Credenciais de Login</span>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Mensagem de Boas-vindas</label>
                        <textarea
                          rows={2}
                          value={state.msgPrimeirosAcessos}
                          onChange={(e) => setField('msgPrimeirosAcessos', e.target.value)}
                          className="w-full text-xs bg-white border border-slate-250 rounded-lg p-2.5 focus:ring-1 focus:ring-[#f37021] outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Usuário Windows</label>
                          <input
                            type="text"
                            value={state.usuarioWindows}
                            onChange={(e) => setField('usuarioWindows', e.target.value)}
                            className="w-full text-xs bg-white border border-slate-250 rounded-lg p-2.5 focus:ring-1 focus:ring-[#f37021]"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Senha Windows</label>
                          <input
                            type="text"
                            value={state.senhaWindows}
                            onChange={(e) => setField('senhaWindows', e.target.value)}
                            className="w-full text-xs bg-white border border-slate-250 rounded-lg p-2.5 focus:ring-1 focus:ring-[#f37021]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">E-mail Corporativo</label>
                          <input
                            type="text"
                            value={state.emailCorporativo}
                            onChange={(e) => setField('emailCorporativo', e.target.value)}
                            className="w-full text-xs bg-white border border-slate-250 rounded-lg p-2.5 focus:ring-1 focus:ring-[#f37021]"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Senha E-mail</label>
                          <input
                            type="text"
                            value={state.senhaEmail}
                            onChange={(e) => setField('senhaEmail', e.target.value)}
                            className="w-full text-xs bg-white border border-slate-250 rounded-lg p-2.5 focus:ring-1 focus:ring-[#f37021]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Senha Teams (Usuário: Mesmo e-mail)</label>
                        <input
                          type="text"
                          value={state.senhaTeams}
                          onChange={(e) => setField('senhaTeams', e.target.value)}
                          className="w-full text-xs bg-white border border-slate-250 rounded-lg p-2.5 focus:ring-1 focus:ring-[#f37021]"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Usuário Protheus</label>
                          <input
                            type="text"
                            value={state.usuarioProtheus}
                            onChange={(e) => setField('usuarioProtheus', e.target.value)}
                            className="w-full text-xs bg-white border border-slate-250 rounded-lg p-2.5 focus:ring-1 focus:ring-[#f37021]"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Senha Protheus</label>
                          <input
                            type="text"
                            value={state.senhaProtheus}
                            onChange={(e) => setField('senhaProtheus', e.target.value)}
                            className="w-full text-xs bg-white border border-slate-250 rounded-lg p-2.5 focus:ring-1 focus:ring-[#f37021]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Outro Sistema</label>
                          <input
                            type="text"
                            value={state.outroSistemaNome}
                            onChange={(e) => setField('outroSistemaNome', e.target.value)}
                            className="w-full text-xs bg-white border border-slate-250 rounded-lg p-2.5 focus:ring-1 focus:ring-[#f37021]"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Usuário</label>
                          <input
                            type="text"
                            value={state.outroSistemaUsuario}
                            onChange={(e) => setField('outroSistemaUsuario', e.target.value)}
                            className="w-full text-xs bg-white border border-slate-250 rounded-lg p-2.5 focus:ring-1 focus:ring-[#f37021]"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Senha</label>
                          <input
                            type="text"
                            value={state.outroSistemaSenha}
                            onChange={(e) => setField('outroSistemaSenha', e.target.value)}
                            className="w-full text-xs bg-white border border-slate-250 rounded-lg p-2.5 focus:ring-1 focus:ring-[#f37021]"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ── CONDITIONAL RENDER: ERRATA DESLIGAMENTO FIELDS ── */}
                  {state.modelo === 'errataDesligamento' && (
                    <div className="space-y-3.5 border-t border-slate-150 pt-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Data do Desligamento</label>
                          <input
                            type="text"
                            value={state.dataDesligamento}
                            onChange={(e) => setField('dataDesligamento', e.target.value)}
                            placeholder="DD/MM/AAAA"
                            className="w-full text-xs bg-white border border-slate-250 rounded-lg p-2.5 focus:ring-1 focus:ring-[#f37021] font-mono outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Representante da Empresa</label>
                          <input
                            type="text"
                            value={state.responsavelEmpresa}
                            onChange={(e) => setField('responsavelEmpresa', e.target.value.toUpperCase())}
                            className="w-full text-xs bg-white border border-slate-250 rounded-lg p-2.5 focus:ring-1 focus:ring-[#f37021] outline-none uppercase"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Texto da Errata (use {'{dataDesligamento}'} para a data)</label>
                        <textarea
                          rows={8}
                          value={state.textoErrata}
                          onChange={(e) => setField('textoErrata', e.target.value)}
                          className="w-full text-xs bg-white border border-slate-250 rounded-lg p-2.5 focus:ring-1 focus:ring-[#f37021] outline-none"
                        />
                      </div>
                    </div>
                  )}

                  {/* ── CONDITIONAL RENDER: ALTERAÇÃO DE FUNÇÃO FIELDS ── */}
                  {state.modelo === 'alteracaoFuncao' && (
                    <div className="space-y-3.5 border-t border-slate-150 pt-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Nova Função</label>
                          <input
                            type="text"
                            value={state.novaFuncao}
                            onChange={(e) => setField('novaFuncao', e.target.value)}
                            className="w-full text-xs bg-white border border-slate-250 rounded-lg p-2.5 focus:ring-1 focus:ring-[#f37021]"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Data da Alteração</label>
                          <input
                            type="text"
                            value={state.dataAlteracaoFuncao}
                            onChange={(e) => setField('dataAlteracaoFuncao', e.target.value)}
                            placeholder="DD/MM/AAAA"
                            className="w-full text-xs bg-white border border-slate-250 rounded-lg p-2.5 focus:ring-1 focus:ring-[#f37021] font-mono outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ── CONDITIONAL RENDER: SUSPENSÃO FIELDS ── */}
                  {state.modelo === 'suspensao' && (
                    <div className="space-y-3.5 border-t border-slate-150 pt-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Alínea a destacar</label>
                          <select
                            value={state.alineaSuspensao}
                            onChange={(e) => setField('alineaSuspensao', e.target.value)}
                            className="w-full text-xs bg-white border border-slate-250 rounded-lg p-2.5 focus:ring-1 focus:ring-[#f37021]"
                          >
                            <option value="a">Alínea a: Atos de improbidade</option>
                            <option value="b">Alínea b: Incontinência de Conduta / Mau Procedimento</option>
                            <option value="e">Alínea e: Desídia no Desempenho das Funções</option>
                            <option value="f">Alínea f: Embriaguez Habitual ou em Serviço</option>
                            <option value="g">Alínea g: Violação de Segredo da Empresa</option>
                            <option value="h">Alínea h: Ato de Indisciplina ou de Insubordinação</option>
                            <option value="i">Alínea i: Ato lesivo da honra e boa fama</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Dias de Suspensão</label>
                          <input
                            type="text"
                            value={state.diasSuspensao}
                            onChange={(e) => setField('diasSuspensao', e.target.value)}
                            placeholder="ex: 3"
                            className="w-full text-xs bg-white border border-slate-250 rounded-lg p-2.5 focus:ring-1 focus:ring-[#f37021]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Data Início Suspensão</label>
                          <input
                            type="text"
                            value={state.dataInicioSuspensao}
                            onChange={(e) => setField('dataInicioSuspensao', e.target.value)}
                            className="w-full text-xs bg-white border border-slate-250 rounded-lg p-2.5 focus:ring-1 focus:ring-[#f37021]"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Data e Dia Retorno</label>
                          <input
                            type="text"
                            value={state.dataRetornoSuspensao}
                            onChange={(e) => setField('dataRetornoSuspensao', e.target.value)}
                            placeholder="ex: __/__/____ (sexta-feira)"
                            className="w-full text-xs bg-white border border-slate-250 rounded-lg p-2.5 focus:ring-1 focus:ring-[#f37021]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Relato do ocorrido</label>
                        <textarea
                          rows={4}
                          value={state.relatoSuspensao}
                          onChange={(e) => setField('relatoSuspensao', e.target.value)}
                          className="w-full text-xs bg-white border border-slate-250 rounded-lg p-2.5 focus:ring-1 focus:ring-[#f37021] outline-none"
                        />
                      </div>
                    </div>
                  )}

                  {/* ── CONDITIONAL RENDER: AVISO PRÉVIO INDENIZADO FIELDS ── */}
                  {state.modelo === 'avisoPrevioIndenizado' && (
                    <div className="space-y-3.5 border-t border-slate-150 pt-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Código da Empresa</label>
                          <input
                            type="text"
                            value={state.codigoEmpresaAviso}
                            onChange={(e) => setField('codigoEmpresaAviso', e.target.value)}
                            className="w-full text-xs bg-white border border-slate-250 rounded-lg p-2.5 focus:ring-1 focus:ring-[#f37021]"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">CTPS / Série</label>
                          <input
                            type="text"
                            value={state.ctpsAviso}
                            onChange={(e) => setField('ctpsAviso', e.target.value)}
                            className="w-full text-xs bg-white border border-slate-250 rounded-lg p-2.5 focus:ring-1 focus:ring-[#f37021]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Data de Admissão</label>
                          <input
                            type="text"
                            value={state.admissaoAviso}
                            onChange={(e) => setField('admissaoAviso', e.target.value)}
                            placeholder="DD/MM/AAAA"
                            className="w-full text-xs bg-white border border-slate-250 rounded-lg p-2.5 focus:ring-1 focus:ring-[#f37021]"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Data do Aviso</label>
                          <input
                            type="text"
                            value={state.dataAviso}
                            onChange={(e) => setField('dataAviso', e.target.value)}
                            placeholder="DD/MM/AAAA"
                            className="w-full text-xs bg-white border border-slate-250 rounded-lg p-2.5 focus:ring-1 focus:ring-[#f37021]"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {/* TAB 2: EMPLOYEE INFO */}
              {activeTab === 'colaborador' && (
                <motion.div
                  key="tab-colaborador"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="space-y-3.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#f37021] uppercase tracking-wide">Qualificação do Empregado</span>
                    <button
                      onClick={handleClearForm}
                      className="text-[10.5px] font-bold text-rose-500 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 px-2 py-1 rounded transition"
                    >
                      Limpar Campos
                    </button>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Nome Completo</label>
                    <input
                      type="text"
                      value={state.nome}
                      onChange={(e) => setField('nome', e.target.value.toUpperCase())}
                      className="w-full text-xs bg-white border border-slate-300 rounded-lg p-2.5 font-bold uppercase focus:ring-2 focus:ring-[#f37021] focus:border-transparent outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">CPF</label>
                      <input
                        type="text"
                        value={state.cpf}
                        onChange={(e) => setField('cpf', e.target.value)}
                        placeholder="000.000.000-00"
                        className="w-full text-xs bg-white border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#f37021] focus:border-transparent outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Matrícula</label>
                      <input
                        type="text"
                        value={state.matricula}
                        onChange={(e) => setField('matricula', e.target.value)}
                        placeholder="Nº Matrícula"
                        className="w-full text-xs bg-white border border-slate-300 rounded-lg p-2.5 font-mono focus:ring-2 focus:ring-[#f37021] focus:border-transparent outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Função Atual</label>
                    <input
                      type="text"
                      value={state.funcao}
                      onChange={(e) => setField('funcao', e.target.value.toUpperCase())}
                      className="w-full text-xs bg-white border border-slate-300 rounded-lg p-2.5 uppercase focus:ring-2 focus:ring-[#f37021] focus:border-transparent outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Unidade / Contrato Principal</label>
                    <input
                      type="text"
                      value={state.unidade}
                      onChange={(e) => setField('unidade', e.target.value.toUpperCase())}
                      className="w-full text-xs bg-white border border-slate-300 rounded-lg p-2.5 uppercase focus:ring-2 focus:ring-[#f37021] focus:border-transparent outline-none"
                    />
                  </div>

                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 flex gap-2 items-start text-[11px] text-slate-650 leading-relaxed mt-4">
                    <Info className="w-4 h-4 text-[#f37021] shrink-0 mt-0.5" />
                    <span>
                      As letras digitadas no nome, papelada de função e unidade são convertidas automaticamente em <strong>maiúsculas</strong> no documento impresso para seguir o padrão corporativo.
                    </span>
                  </div>
                </motion.div>
              )}

              {/* TAB 3: COMPANY GENERAL LOGO & INFO */}
              {activeTab === 'empresa' && (
                <motion.div
                  key="tab-empresa"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="space-y-4"
                >
                  {/* Custom Logo Upload block */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1.5">
                      Logomarca da Empresa
                    </label>
                    
                    <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 text-center hover:border-[#f37021] transition relative group bg-slate-50">
                      <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/png, image/jpeg, image/jpg"
                        onChange={handleLogoUpload}
                        className="hidden"
                      />
                      {state.logoData ? (
                        <div className="flex flex-col items-center gap-2">
                          <img
                            src={state.logoData}
                            alt="Logo carregada"
                            className="max-h-16 object-contain border border-slate-200 bg-white p-1 rounded"
                          />
                          <div className="flex gap-2">
                            <button
                              onClick={() => fileInputRef.current?.click()}
                              className="text-[10px] font-bold text-[#f37021] bg-[#f37021]/15 hover:bg-[#f37021]/20 px-2.5 py-1 rounded transition cursor-pointer"
                            >
                              Alterar Imagem
                            </button>
                            <button
                              onClick={clearLogo}
                              className="text-[10px] font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 px-2.5 py-1 rounded transition cursor-pointer"
                            >
                              Remover
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div 
                          onClick={() => fileInputRef.current?.click()}
                          className="flex flex-col items-center justify-center cursor-pointer py-1"
                        >
                          <UploadCloud className="w-8 h-8 text-slate-400 group-hover:text-[#f37021] transition mb-1.5" />
                          <span className="text-[11.5px] font-bold text-slate-700 block">
                            Upload PNG ou JPG
                          </span>
                          <span className="text-[10px] text-slate-400 mt-0.5 block">
                            Substitui o logotipo padrão &quot;FTA&quot; no cabeçalho
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Company general info */}
                  <div className="space-y-3 pt-2">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 uppercase mb-0.5">Razão Social</label>
                      <input
                        type="text"
                        value={state.razaoSocial}
                        onChange={(e) => setField('razaoSocial', e.target.value)}
                        className="w-full text-xs bg-white border border-slate-300 rounded-lg p-2 focus:ring-1 focus:ring-[#f37021]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 uppercase mb-0.5">Endereço da Empresa</label>
                      <input
                        type="text"
                        value={state.enderecoEmpresa}
                        onChange={(e) => setField('enderecoEmpresa', e.target.value)}
                        className="w-full text-xs bg-white border border-slate-300 rounded-lg p-2 focus:ring-1 focus:ring-[#f37021]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-500 uppercase mb-0.5">CNPJ</label>
                        <input
                          type="text"
                          value={state.cnpjEmpresa}
                          onChange={(e) => setField('cnpjEmpresa', e.target.value)}
                          className="w-full text-xs bg-white border border-slate-300 rounded-lg p-2 focus:ring-1 focus:ring-[#f37021]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-500 uppercase mb-0.5">Telefone</label>
                        <input
                          type="text"
                          value={state.telEmpresa}
                          onChange={(e) => setField('telEmpresa', e.target.value)}
                          className="w-full text-xs bg-white border border-slate-300 rounded-lg p-2 focus:ring-1 focus:ring-[#f37021]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-500 uppercase mb-0.5">Endereço Web</label>
                        <input
                          type="text"
                          value={state.siteEmpresa}
                          onChange={(e) => setField('siteEmpresa', e.target.value)}
                          className="w-full text-xs bg-white border border-slate-300 rounded-lg p-2 focus:ring-1 focus:ring-[#f37021]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-500 uppercase mb-0.5">Local e Data Geral</label>
                        <input
                          type="text"
                          value={state.dataDoc}
                          onChange={(e) => setField('dataDoc', e.target.value)}
                          placeholder="Cidade - UF, Dia de Mês de Ano"
                          className="w-full text-xs bg-white border border-slate-300 rounded-lg p-2 focus:ring-1 focus:ring-[#f37021]"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Persistent Action Buttons inside bottom of sidebar */}
          <div className="border-t border-slate-200 p-4 bg-slate-50 space-y-2">
            <div className="flex gap-2">
              <button
                onClick={handlePrint}
                className="flex-1 flex items-center justify-center gap-1.5 bg-[#f37021] hover:bg-[#d65912] text-white font-bold py-2 px-3 rounded-lg text-xs cursor-pointer shadow-sm shadow-[#f37021]/20"
              >
                <Printer className="w-4 h-4" />
                <span>Imprimir PDF</span>
              </button>
              <button
                onClick={handleExportWord}
                className="flex-1 flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded-lg text-xs cursor-pointer shadow-sm shadow-blue-600/20"
              >
                <Download className="w-4 h-4" />
                <span>Baixar Word</span>
              </button>
              <button
                onClick={handleResetAll}
                className="flex items-center justify-center bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold py-2 px-3 rounded-lg text-xs gap-1 cursor-pointer transition-colors"
                title="Redefinir Todas as Configurações"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Resetar Dados</span>
              </button>
            </div>
            
            <div className="text-[10px] text-slate-500 text-center select-none font-medium">
              As alterações preenchidas são salvas em tempo real.
            </div>
          </div>
        </aside>

        {/* ────────────────── RIGHT VIEWPORT: LIVE DOCUMENT PREVIEW CANVAS ────────────────── */}
        <section 
          className={`flex-1 bg-slate-300 p-4 sm:p-6 overflow-y-auto flex flex-col items-center justify-start relative no-print stage-area ${mobileView === 'preview' ? 'block' : 'hidden md:flex'}`}
        >
          {/* Zoom & Model toolbar on top */}
          <div className="w-full max-w-[794px] bg-slate-900 border border-slate-800 rounded-lg p-3 mb-6 no-print flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md">
            <div className="flex-1"></div> {/* Spacer */}

            {/* Interactive Zoom Scaling Buttons */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 bg-slate-800/80 px-2 py-1 rounded-lg border border-slate-700">
                <button
                  onClick={() => setZoom(z => Math.max(0.5, z - 0.15))}
                  className="p-1 hover:bg-slate-700 rounded transition text-slate-400 hover:text-white cursor-pointer"
                  title="Diminuir Zoom"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="text-xs font-mono font-bold text-slate-300 w-12 text-center select-none">
                  {Math.round(zoom * 100)}%
                </span>
                <button
                  onClick={() => setZoom(z => Math.min(1.5, z + 0.15))}
                  className="p-1 hover:bg-slate-700 rounded transition text-slate-400 hover:text-white cursor-pointer"
                  title="Aumentar Zoom"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setZoom(0.85)}
                  className="p-1 pl-1.5 border-l border-slate-700 text-slate-500 hover:text-slate-300 transition text-[10px] font-bold cursor-pointer"
                  title="Ajustar ao padrão (85%)"
                >
                  Auto
                </button>
              </div>
            </div>
          </div>

          {/* The Physical Simulated A4 Sheet Container */}
          <div className="w-full flex-1 flex justify-center items-start overflow-x-auto p-4 select-none">
            <div className="origin-top pb-24 scale-transform-container">
              <DocumentPaper state={state} zoom={zoom} />
            </div>
          </div>
        </section>
      </main>

      {/* ────────────────── PRISTINE PRINT ONLY CONTAINER (ALWAYS SCALE 1.0) ────────────────── */}
      <div className="hidden print:block w-full">
        <DocumentPaper state={state} zoom={1.0} />
      </div>
    </div>
  );
}
