import { ReactNode } from 'react';
import { FormState } from '../types';

interface DocumentPaperProps {
  state: FormState;
  zoom: number; // Scale factor 0.5 to 1.5
}

export default function DocumentPaper({ state, zoom }: DocumentPaperProps) {
  const {
    logoData,
    modelo,
    codigo,
    revisao,
    razaoSocial,
    enderecoEmpresa,
    cnpjEmpresa,
    telEmpresa,
    siteEmpresa,
    dataDoc,
    nome,
    cpf,
    matricula,
    funcao,
    unidade,
    escalaAtual,
    novaEscala,
    horarioAtual,
    novoHorario,
    intervalo,
    vigencia,
    novaFuncao,
    salario,
    vigPromo,
    msgPromo,
    substituido,
    cargoSubstituido,
    periodoAusencia,
    cargoDurante,
    periodoSub,
    tipoAdvertencia,
    motivoAdvertencia,
    relatoAdvertencia,
    competenciaFgts,
    dataRecolhimentoFgts,
    obsFgts,
    telefoneCandidato,
    enderecoCandidato,
    salarioProposta,
    dataAdmissao,
    validadeContrato,
    tipoContrato,
    horarioProposta,
    cargaSemanal,
    localTrabalho,
    beneficiosProposta,
    motivoDesconto,
    valorDesconto,
    formaDesconto,
    obsDesconto,
    periodoFerias,
    inicioFerias,
    motivoFerias,
    dataAfastamento,
    beneficioInss,
    beneficiosInss,
    salarioAnterior,
    percentualReajuste,
    novoSalarioReajuste,
    vigenciaReajuste,
    msgReajuste,
    dataExameDemissional,
    horaExameDemissional,
    localExameDemissional,
    dataDesligamento,
    textoExameDemissional,
    textoPagamentoVerbas,
    textoDevolucaoPertences,
    obsPosDesligamento,
    textoErrata,
    dataAlteracaoFuncao,
    alineaSuspensao,
    relatoSuspensao,
    diasSuspensao,
    dataInicioSuspensao,
    dataRetornoSuspensao,
    codigoEmpresaAviso,
    ctpsAviso,
    admissaoAviso,
    dataAviso,
    responsavelEmpresa,
    cargoResponsavelEmpresa,
    admissaoDut,
    ultimoDiaTrabalhadoDut,
    cidadeDut,
    dataEmissaoDut,
    atestadosDut,
    orientacoesDut,
    dataDesligamentoChecklist,
    responsavelChecklist,
    observacoesChecklist,
    checkData1,
    checkStatus1,
    checkData2,
    checkStatus2,
    checkData3,
    checkStatus3,
    checkData4,
    checkStatus4,
    checkData5,
    checkStatus5,
    checkData6,
    checkStatus6,
    checkData7,
    checkStatus7,
    checkData8,
    checkStatus8,
    setorAdmissional,
    dataInicioAdmissional,
    responsavelAdmissional,
    rgExercicio,
    ctpsExercicio,
    serieCtpsExercicio,
    admissaoExercicio,
    inicioFuncaoExercicio,
    setorExercicio,
    atividadesExercicio,
    cidadeExercicio,
    dataEmissaoExercicio,
    responsavelExercicio,
    dataIntegracao,
    horarioInicioIntegracao,
    horarioTerminoIntegracao,
    responsavelIntegracao,
    localIntegracao,
    numCartaoVt, recebeuVt, recebeuMobilidade, recebeuAlimentacao,
    usuarioWindows, senhaWindows, emailCorporativo, senhaEmail, senhaTeams,
    usuarioProtheus, senhaProtheus, outroSistemaNome, outroSistemaUsuario, outroSistemaSenha,
    msgPrimeirosAcessos
  } = state;

  // Helper safe defaults to display placeholder underlines if empty
  const getVal = (val: string) => val ? val : '________________';

  // Component representing the corporate header on each official page
  const RenderHeader = ({ title }: { title: string }) => {
    return (
      <div className="w-full">
        <div className="flex items-start justify-between border-b-2 border-[#f37021] pb-2 mb-3">
          {/* Logo container */}
          <div className="w-[160px] h-[70px] flex items-center justify-start">
            {logoData ? (
              <img
                src={logoData}
                alt="Logo da empresa"
                className="max-w-[160px] max-h-[66px] object-contain block"
              />
            ) : (
              <div className="flex items-end gap-1 select-none">
                <span className="font-sans font-black text-4xl tracking-tighter text-[#f37021] leading-none mb-1">
                  FTA
                </span>
                <span className="w-2 h-2 rounded-full bg-[#f37021] mb-2 animate-pulse"></span>
              </div>
            )}
          </div>

          {/* Company contact stack */}
          <div className="text-right font-sans text-[9px] sm:text-[10px] leading-tight text-neutral-700">
            <div className="font-bold text-neutral-900">{getVal(razaoSocial)}</div>
            {enderecoEmpresa && <div>{enderecoEmpresa}</div>}
            <div>CNPJ: {getVal(cnpjEmpresa)}</div>
            <div>{getVal(siteEmpresa)}</div>
            <div>Tel: {getVal(telEmpresa)}</div>
          </div>
        </div>

        {/* Document Identifier Meta Grid */}
        <div className="grid grid-cols-[1.5fr_0.7fr_0.8fr] gap-2 bg-neutral-50 border border-neutral-200 p-1.5 text-[10px] font-sans text-neutral-700 mb-4">
          <div>
            <span className="font-bold text-neutral-600 block text-[8px] uppercase tracking-wider">Documento</span>
            <span className="font-semibold text-neutral-900 truncate block">{title}</span>
          </div>
          <div>
            <span className="font-bold text-neutral-600 block text-[8px] uppercase tracking-wider">Código</span>
            <span className="font-mono text-neutral-900 font-semibold block">{getVal(codigo)}</span>
          </div>
          <div>
            <span className="font-bold text-neutral-600 block text-[8px] uppercase tracking-wider">Revisão</span>
            <span className="font-mono text-neutral-900 font-semibold block">{getVal(revisao)}</span>
          </div>
        </div>

        {/* Central Title */}
        <h2 className="text-center font-sans font-extrabold text-[14px] text-neutral-900 tracking-wide uppercase my-4">
          {title}
        </h2>
      </div>
    );
  };

  // Standardized Employee Information Table
  const RenderEmployeeData = () => {
    return (
      <div className="mb-4">
        <h3 className="font-sans font-bold text-[10px] tracking-wider text-neutral-500 uppercase mb-1.5">
          1. DADOS DO COLABORADOR
        </h3>
        <table className="w-full text-[11px] font-sans border-collapse">
          <tbody>
            <tr className="border border-neutral-300">
              <td className="w-[30%] bg-neutral-50 p-1.5 font-bold text-neutral-700 border-r border-neutral-300">Nome</td>
              <td className="p-1.5 text-neutral-900 font-medium">{getVal(nome)}</td>
            </tr>
            <tr className="border border-neutral-300">
              <td className="bg-neutral-50 p-1.5 font-bold text-neutral-700 border-r border-neutral-300">CPF</td>
              <td className="p-1.5 text-neutral-900 font-medium">{getVal(cpf)}</td>
            </tr>
            <tr className="border border-neutral-300">
              <td className="bg-neutral-50 p-1.5 font-bold text-neutral-700 border-r border-neutral-300">Matrícula</td>
              <td className="p-1.5 text-neutral-900 font-mono font-semibold">{getVal(matricula)}</td>
            </tr>
            <tr className="border border-neutral-300">
              <td className="bg-neutral-50 p-1.5 font-bold text-neutral-700 border-r border-neutral-300">Função atual</td>
              <td className="p-1.5 text-neutral-900 font-medium">{getVal(funcao)}</td>
            </tr>
            <tr className="border border-neutral-300">
              <td className="bg-neutral-50 p-1.5 font-bold text-neutral-700 border-r border-neutral-300">Contrato / Unidade</td>
              <td className="p-1.5 text-neutral-900 font-medium">{getVal(unidade)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  // Signatures component
  const RenderSignatures = ({ extraSig, hideEmpregado = false }: { extraSig?: ReactNode, hideEmpregado?: boolean }) => {
    return (
      <div className="mt-6">
        <div className="text-right text-[11px] text-neutral-700 font-sans mb-6">
          {getVal(dataDoc)}.
        </div>
        
        <div className={`grid ${extraSig ? 'grid-cols-2 gap-x-6 gap-y-8' : (hideEmpregado ? 'grid-cols-1 gap-8 max-w-xs mx-auto' : 'grid-cols-2 gap-8')} text-center text-[10px] font-sans mt-4`}>
          <div className="flex flex-col items-center">
            <div className="w-full border-t border-neutral-800 pt-1.5 font-bold text-neutral-900 uppercase">
              EMPREGADOR
            </div>
            <div className="text-[10px] text-neutral-600 mt-0.5 truncate max-w-full">
              {getVal(razaoSocial)}
            </div>
          </div>
          {!hideEmpregado && (
            <div className="flex flex-col items-center">
              <div className="w-full border-t border-neutral-800 pt-1.5 font-bold text-neutral-900 uppercase">
                EMPREGADO(A)
              </div>
              <div className="text-[10px] text-neutral-600 mt-0.5 truncate max-w-full">
                {getVal(nome)}
              </div>
            </div>
          )}
          {extraSig}
        </div>
      </div>
    );
  };

  // Document Footer
  const RenderFooter = ({ pageStr = 'Página 1 de 1' }: { pageStr?: string }) => {
    return null;
  };

  // Outer style mimicking standard physical doc
  const paperClass = "relative box-border w-[750px] min-h-[1050px] bg-white p-[25px_35px] shadow-[0_10px_35px_rgba(0,0,0,0.08)] flex flex-col justify-between select-text mx-auto print:shadow-none print:m-0 print:w-[750px] print:min-h-[1050px] print:p-[25px_35px] overflow-hidden page-break-after-always break-inside-avoid";

  return (
    <div 
      className="origin-top transition-transform duration-200"
      style={{ transform: `scale(${zoom})` }}
      id="printable-content"
    >
      {/* ────────────────── 1. MODÊLO JORNADA ────────────────── */}
      {modelo === 'jornada' && (
        <div className={paperClass}>
          {/* Header & Meta */}
          <div>
            <RenderHeader title="TERMO ADITIVO DE ALTERAÇÃO DE JORNADA DE TRABALHO" />
            <RenderEmployeeData />

            {/* Changes comparison block */}
            <div className="mb-4">
              <h3 className="font-sans font-bold text-[10px] tracking-wider text-neutral-500 uppercase mb-1.5">
                2. ALTERAÇÃO DA JORNADA
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="border border-neutral-300 p-2.5 rounded-md bg-neutral-50 flex flex-col">
                  <div className="text-center font-bold text-[10px] text-neutral-600 tracking-wider uppercase border-b border-neutral-200 pb-1 mb-2">
                    Situação Atual
                  </div>
                  <div className="space-y-1 text-[11px] font-sans">
                    <div><span className="font-bold text-neutral-700">Escala:</span> <span className="text-neutral-900 font-medium">{getVal(escalaAtual)}</span></div>
                    <div><span className="font-bold text-neutral-700">Horário:</span> <span className="text-neutral-900 font-medium">{getVal(horarioAtual)}</span></div>
                    <div><span className="font-bold text-neutral-700">Intervalo:</span> <span className="text-neutral-900 font-medium">{getVal(intervalo)}</span></div>
                  </div>
                </div>

                <div className="border border-[#f37021]/30 p-2.5 rounded-md bg-[#f37021]/5 flex flex-col">
                  <div className="text-center font-bold text-[10px] text-[#f37021] tracking-wider uppercase border-b border-[#f37021]/20 pb-1 mb-2">
                    Nova Situação
                  </div>
                  <div className="space-y-1 text-[11px] font-sans">
                    <div><span className="font-bold text-neutral-700">Escala:</span> <span className="text-neutral-950 font-semibold">{getVal(novaEscala)}</span></div>
                    <div><span className="font-bold text-neutral-700">Horário:</span> <span className="text-neutral-950 font-semibold">{getVal(novoHorario)}</span></div>
                    <div><span className="font-bold text-neutral-700">Intervalo:</span> <span className="text-neutral-950 font-semibold">{getVal(intervalo)}</span></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Clauses */}
            <div className="text-[11px] font-sans leading-relaxed text-neutral-800 space-y-2.5 text-justify">
              <p>
                <strong>CLÁUSULA PRIMEIRA – DA ALTERAÇÃO.</strong> Por mútuo acordo entre as partes, fica alterada a jornada de trabalho do(a) empregado(a) acima qualificado(a), passando da situação atual para a nova situação descrita neste termo, com vigência definitiva a partir de <strong>{getVal(vigencia)}</strong>.
              </p>
              <p>
                <strong>CLÁUSULA SEGUNDA – DA RATIFICAÇÃO.</strong> Permanecem ratificadas todas as demais cláusulas e condições do contrato individual de trabalho vigente que não tenham sido expressamente alteradas ou ajustadas por este instrumento aditivo.
              </p>
              <p>
                <strong>CLÁUSULA TERCEIRA – DAS DISPOSIÇÕES FINAIS.</strong> As partes declaram estar de pleno e mútuo acordo com todas as disposições expressas acima, assinando o presente instrumento em duas vias de igual teor e forma jurídica.
              </p>
            </div>
          </div>

          {/* Date, Signs & Footer */}
          <div>
            <RenderSignatures />
            <RenderFooter pageStr="Página 1 de 1" />
          </div>
        </div>
      )}

      {/* ────────────────── 2. MODÊLO PROMOÇÃO (DOUBLE PAGE DOC) ────────────────── */}
      {modelo === 'promocao' && (
        <div className="space-y-8 print:space-y-0">
          {/* Cover Letter - Celebration */}
          <div className={`${paperClass} border border-dashed border-neutral-300 print:border-none`}>
            <div>
              <div className="flex items-center justify-between border-b border-neutral-100 pb-3 mb-10">
                <div className="w-[180px] h-[80px] flex items-center">
                  {logoData ? (
                    <img
                      src={logoData}
                      alt="Logo da empresa"
                      className="max-w-[180px] max-h-[76px] object-contain block"
                    />
                  ) : (
                    <div className="font-sans font-black text-4xl tracking-tighter text-[#f37021] leading-none">
                      FTA
                    </div>
                  )}
                </div>
                <div className="text-right text-[11px] text-neutral-500 font-mono">
                  {getVal(siteEmpresa)}
                </div>
              </div>

              <div className="my-10 text-center">
                <div className="inline-block text-[11px] tracking-widest font-extrabold text-[#f37021] bg-[#f37021]/10 px-3 py-1.5 rounded-full mb-4 uppercase">
                  Comunicado Especial
                </div>
                <h1 className="text-[30px] font-sans font-black tracking-tight text-neutral-900 uppercase">
                  PARABÉNS PELA SUA PROMOÇÃO!
                </h1>
              </div>

              <div className="text-[13.5px] font-sans leading-relaxed text-neutral-800 space-y-4">
                <p className="font-bold text-neutral-950 text-[14.5px]">
                  Olá, {getVal(nome)}!
                </p>
                <p className="text-justify indent-6 min-h-[1.5em] whitespace-pre-wrap">
                  {msgPromo || '_______________________________________________________'}
                </p>
                <p className="text-justify indent-6">
                  Que este novo ciclo e as novas atribuições na função técnica de{' '}
                  <span className="font-extrabold text-neutral-950 border-b-2 border-[#f37021] pb-0.5">
                    {getVal(novaFuncao)}
                  </span>{' '}
                  sejam uma etapa de ainda mais relevância, realizações e crescimento compartilhado em sua trajetória profissional no Grupo.
                </p>

                {/* Highlight Notice box */}
                <div className="bg-[#fff4ec] border-l-4 border-[#f37021] p-4 my-6 rounded-r-md">
                  <div className="text-[11px] font-bold text-[#f37021] uppercase tracking-wider mb-1">
                    Nova Grade de Remuneração e Vigência
                  </div>
                  <p className="text-[13.5px] text-neutral-900 leading-snug">
                    Seu novo salário mensal bruto passa a ser de{' '}
                    <strong className="text-[14.5px] text-neutral-950 font-extrabold">
                      {getVal(salario)}
                    </strong>
                    , com vigência estipulada a partir da referência{' '}
                    <strong className="text-neutral-950">{getVal(vigPromo)}</strong>.
                  </p>
                </div>

                <p className="text-center font-bold text-[#f37021] pt-4 text-base">
                  Desejamos muito sucesso nesta nova jornada corporativa!
                </p>
              </div>
            </div>

            <div>
              <div className="text-right text-[12.5px] text-neutral-700 font-sans mt-8">
                {getVal(dataDoc)}.
              </div>
              <RenderFooter pageStr="Comunicado Especial" />
            </div>
          </div>

          {/* Legal Contract Addendum Paper */}
          <div className={paperClass}>
            <div>
              <RenderHeader title="TERMO DE ADITIVO CONTRATUAL - PROMOÇÃO" />
              <RenderEmployeeData />

              <div className="mb-4">
                <h3 className="font-sans font-bold text-[11px] tracking-wider text-neutral-500 uppercase mb-2">
                  2. CLAUSULADO DE PROMOÇÃO
                </h3>
              </div>

              {/* Clauses */}
              <div className="text-[12px] font-sans leading-relaxed text-neutral-800 space-y-4 text-justify">
                <p>
                  <strong>CLÁUSULA PRIMEIRA – DA ALTERAÇÃO CONTRATUAL.</strong> A partir da data de vigência ora pactuada, o(a) colaborador(a) qualificado(a) no presente termo passa a exercer em definitivo a função técnica de <strong>{getVal(novaFuncao)}</strong>, fazendo jus a um novo salário nominal fixado em <strong>{getVal(salario)}</strong> por mês, com vigência atribuída a contar do período de <strong>{getVal(vigPromo)}</strong>.
                </p>
                <p>
                  <strong>CLÁUSULA SEGUNDA – DA RATIFICAÇÃO.</strong> Permanecem plenamente ratificadas, operantes e vigentes todas as demais cláusulas, regras, acordos e condições contratuais do instrumento primitivo que não tenham sido expressamente ajustadas por este termo de aditivo promocional.
                </p>
                <p>
                  <strong>CLÁUSULA TERCEIRA – DAS DISPOSIÇÕES FINAIS.</strong> E, por estarem as partes plenamente cientes e de mútuo e comum acordo, subscrevem o presente aditivo em duas vias físicas, para que produza os devidos efeitos jurídicos.
                </p>
              </div>
            </div>

            <div>
              <RenderSignatures />
              <RenderFooter pageStr="Página 1 de 1" />
            </div>
          </div>
        </div>
      )}

      {/* ────────────────── 3. MODÊLO SUBSTITUIÇÃO ────────────────── */}
      {modelo === 'substituicao' && (
        <div className={paperClass}>
          {/* Header & Meta */}
          <div>
            <RenderHeader title="TERMO DE SUBSTITUIÇÃO TEMPORÁRIA" />
            <RenderEmployeeData />

            {/* Substitution description block */}
            <div className="mb-4">
              <h3 className="font-sans font-bold text-[10px] tracking-wider text-neutral-500 uppercase mb-1.5">
                2. DADOS DA SUBSTITUIÇÃO TEMPORÁRIA
              </h3>
              <table className="w-full text-[11px] font-sans border-collapse">
                <tbody>
                  <tr className="border border-neutral-300">
                    <td className="w-[30%] bg-neutral-50 p-1.5 font-bold text-neutral-700 border-r border-neutral-300">Colaborador substituído</td>
                    <td className="p-1.5 text-neutral-900 font-medium">{getVal(substituido)}</td>
                  </tr>
                  <tr className="border border-neutral-300">
                    <td className="bg-neutral-50 p-1.5 font-bold text-neutral-700 border-r border-neutral-300">Cargo do substituído</td>
                    <td className="p-1.5 text-neutral-900 font-medium">{getVal(cargoSubstituido)}</td>
                  </tr>
                  <tr className="border border-neutral-300">
                    <td className="bg-neutral-50 p-1.5 font-bold text-neutral-700 border-r border-neutral-300">Período de ausência</td>
                    <td className="p-1.5 text-neutral-900 font-mono font-medium">{getVal(periodoAusencia)}</td>
                  </tr>
                  <tr className="border border-neutral-300 border-t-2 border-t-neutral-400">
                    <td className="bg-neutral-50 p-1.5 font-bold text-neutral-700 border-r border-neutral-300">Colaborador substituto</td>
                    <td className="p-1.5 text-[#f37021] font-bold">{getVal(nome)}</td>
                  </tr>
                  <tr className="border border-neutral-300">
                    <td className="bg-neutral-50 p-1.5 font-bold text-neutral-700 border-r border-neutral-300">Cargo durante substituição</td>
                    <td className="p-1.5 text-neutral-900 font-bold">{getVal(cargoDurante)}</td>
                  </tr>
                  <tr className="border border-neutral-300">
                    <td className="bg-neutral-50 p-1.5 font-bold text-neutral-700 border-r border-neutral-300">Período da substituição</td>
                    <td className="p-1.5 text-neutral-900 font-mono font-semibold">{getVal(periodoSub)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Clauses */}
            <div className="text-[11px] font-sans leading-relaxed text-neutral-800 space-y-2.5 text-justify">
              <p>
                <strong>CLÁUSULA PRIMEIRA – DO OBJETO.</strong> Este instrumento formaliza e regulamenta a substituição provisória do(a) empregado(a) substituído(a) <strong>{getVal(substituido)}</strong> pelo(a) funcionário(a) adquirente temporário(a) <strong>{getVal(nome)}</strong>, durante a ausência e o período discriminado neste aditivo.
              </p>
              <p>
                <strong>CLÁUSULA SEGUNDA – DA FUNÇÃO E REMUNERAÇÃO.</strong> Durante o intervalo integral e efetivo da substituição, o(a) colaborador(a) substituto(a) fará jus à percepção da remuneração temporária correspondente ao cargo exercido provisoriamente, consoante regras da CLT e regimento interno de substituição corporativa.
              </p>
              <p>
                <strong>CLÁUSULA TERCEIRA – DA TEMPORARIEDADE.</strong> O presente ato não importa em alteração permanente ou definitiva ao contrato de trabalho original. Após findo o período de afastamento do titular, o substituto retorna ipso facto às suas qualificações e remuneração primitivas.
              </p>
            </div>
          </div>

          {/* Signs Grid with Substitutions & Footer */}
          <div>
            <RenderSignatures 
              extraSig={
                <>
                  <div className="flex flex-col items-center">
                    <div className="w-full border-t border-neutral-800 pt-1.5 font-bold text-neutral-900 uppercase">
                      GESTOR DO CONTRATO
                    </div>
                    <div className="text-[10px] text-neutral-600 mt-0.5">
                      Visto de Autenticidade
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-full border-t border-neutral-800 pt-1.5 font-bold text-neutral-900 uppercase">
                      COLABORADOR SUBSTITUÍDO
                    </div>
                    <div className="text-[10px] text-neutral-600 mt-0.5 truncate max-w-full">
                      {getVal(substituido)}
                    </div>
                  </div>
                </>
              }
            />
            <RenderFooter pageStr="Página 1 de 1" />
          </div>
        </div>
      )}

      {/* ────────────────── 4. MODÊLO ADVERTÊNCIA ────────────────── */}
      {modelo === 'advertencia' && (
        <div className={paperClass}>
          <div>
            <RenderHeader title="CARTA DE ADVERTÊNCIA DISCIPLINAR" />
            <RenderEmployeeData />

            <div className="mb-4">
              <h3 className="font-sans font-bold text-[10px] tracking-wider text-neutral-500 uppercase mb-1.5">
                2. MOTIVO DA ADVERTÊNCIA
              </h3>
              <div className="border border-neutral-300 p-3 rounded-md bg-neutral-50 mb-3 text-[11px]">
                <p className="mb-1.5"><span className="font-bold">Falta cometida:</span> {getVal(tipoAdvertencia)}</p>
                <p className="mb-1.5"><span className="font-bold">Especificação do Motivo:</span> {getVal(motivoAdvertencia)}</p>
                <p><span className="font-bold">Relato do ocorrido:</span> {getVal(relatoAdvertencia)}</p>
              </div>
            </div>

            <div className="text-[11px] font-sans leading-relaxed text-neutral-800 space-y-2.5 text-justify">
              <p>
                Prezado(a) Colaborador(a),
              </p>
              <p>
                Vimos por meio desta adverti-lo(a) disciplinarmente pela atitude acima descrita, o que constitui falta prevista nas disposições legais e regulamentares da empresa. Esclarecemos que a reincidência poderá acarretar sanções mais severas, tais como suspensão contratual ou mesmo a rescisão por justa causa, nos termos do art. 482 da CLT.
              </p>
              <p>
                Solicitamos que doravante observe as normas internas desta empresa, visando a manutenção de um ambiente de colaboração mútua, eximindo-nos assim da obrigação de tomar medidas mais enérgicas amparadas na lei vigente.
              </p>
              <p>
                Favor assinar a via inclusa, confirmando o recebimento da presente.
              </p>
            </div>
          </div>

          <div>
            <RenderSignatures 
              extraSig={
                <>
                  <div className="flex flex-col items-center">
                    <div className="w-full border-t border-neutral-800 pt-1.5 font-bold text-neutral-900 uppercase">
                      TESTEMUNHA 1
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-full border-t border-neutral-800 pt-1.5 font-bold text-neutral-900 uppercase">
                      TESTEMUNHA 2
                    </div>
                  </div>
                </>
              }
            />
            <RenderFooter pageStr="Página 1 de 1" />
          </div>
        </div>
      )}

      {/* ────────────────── 5. MODÊLO FGTS ────────────────── */}
      {modelo === 'fgts' && (
        <div className={paperClass}>
          <div>
            <RenderHeader title="DECLARAÇÃO DE REGULARIDADE - FGTS" />
            <RenderEmployeeData />

            <div className="mb-4">
              <h3 className="font-sans font-bold text-[10px] tracking-wider text-neutral-500 uppercase mb-1.5">
                2. DADOS DE RECOLHIMENTO
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="border border-neutral-300 p-2.5 rounded-md bg-neutral-50 text-[11px]">
                  <p><span className="font-bold text-neutral-700">Competência Correlata:</span> <br/><span className="text-neutral-900 font-semibold">{getVal(competenciaFgts)}</span></p>
                </div>
                <div className="border border-neutral-300 p-2.5 rounded-md bg-neutral-50 text-[11px]">
                  <p><span className="font-bold text-neutral-700">Data de Recolhimento:</span> <br/><span className="text-neutral-900 font-semibold">{getVal(dataRecolhimentoFgts)}</span></p>
                </div>
              </div>
            </div>

            <div className="text-[11px] font-sans leading-relaxed text-neutral-800 space-y-2.5 text-justify">
              <p>
                Declaramos, para os devidos fins de direito, aos órgãos fiscalizadores do Trabalho, em especial a quem possa interessar, que a empresa qualificada no cabeçalho cumpriu tempestivamente com o recolhimento das obrigações incidentes sobre a remuneração do colaborar supramencionado, conforme dispõe a legislação que rege o Fundo de Garantia do Tempo de Serviço – FGTS (Lei 8.036/90).
              </p>
              <p>
                Esta declaração não isenta a contratante das obrigações fiscais acessórias ou eventuais reajustes determinados perante a Caixa Econômica Federal e demais agentes mantenedores.
              </p>
              {obsFgts && (
                <div className="mt-3 p-3 border border-dashed border-neutral-300 rounded-md text-[10.5px] bg-neutral-50 whitespace-pre-wrap">
                  <span className="font-bold text-neutral-700">Observações Complementares:</span><br/>
                  <span className="italic">{obsFgts}</span>
                </div>
              )}
            </div>
          </div>

          <div>
            <RenderSignatures hideEmpregado />
            <RenderFooter pageStr="Página 1 de 1" />
          </div>
        </div>
      )}

      {/* ────────────────── 6. MODÊLO PROPOSTA ────────────────── */}
      {modelo === 'proposta' && (
        <div className={paperClass}>
          <div>
            <RenderHeader title="CARTA PROPOSTA DE TRABALHO" />
            
            <div className="mb-4">
               <h3 className="font-sans font-bold text-[10px] tracking-wider text-neutral-500 uppercase mb-1.5">
                 1. DADOS DO CANDIDATO
               </h3>
               <table className="w-full text-[11px] font-sans border-collapse">
                 <tbody>
                   <tr className="border border-neutral-300">
                     <td className="w-[30%] bg-neutral-50 p-1.5 font-bold text-neutral-700 border-r border-neutral-300">Nome Mapeado</td>
                     <td className="p-1.5 text-neutral-900 font-medium">{getVal(nome)}</td>
                   </tr>
                   <tr className="border border-neutral-300">
                     <td className="bg-neutral-50 p-1.5 font-bold text-neutral-700 border-r border-neutral-300">CPF</td>
                     <td className="p-1.5 text-neutral-900 font-medium">{getVal(cpf)}</td>
                   </tr>
                   <tr className="border border-neutral-300">
                     <td className="bg-neutral-50 p-1.5 font-bold text-neutral-700 border-r border-neutral-300">Telefone</td>
                     <td className="p-1.5 text-neutral-900 font-medium">{getVal(telefoneCandidato)}</td>
                   </tr>
                   <tr className="border border-neutral-300">
                     <td className="bg-neutral-50 p-1.5 font-bold text-neutral-700 border-r border-neutral-300">Endereço Residencial</td>
                     <td className="p-1.5 text-neutral-900 font-medium">{getVal(enderecoCandidato)}</td>
                   </tr>
                 </tbody>
               </table>
            </div>

            <div className="mb-4">
               <h3 className="font-sans font-bold text-[10px] tracking-wider text-neutral-500 uppercase mb-1.5">
                 2. TERMOS DA PROPOSTA
               </h3>
               <table className="w-full text-[11px] font-sans border-collapse">
                 <tbody>
                   <tr className="border border-neutral-300">
                     <td className="w-[30%] bg-neutral-50 p-1.5 font-bold text-neutral-700 border-r border-neutral-300">Cargo Proposto</td>
                     <td className="p-1.5 text-neutral-900 font-medium text-[#f37021] font-bold">{getVal(novaFuncao)}</td>
                   </tr>
                   <tr className="border border-neutral-300">
                     <td className="bg-neutral-50 p-1.5 font-bold text-neutral-700 border-r border-neutral-300">Salário / Remuneração</td>
                     <td className="p-1.5 text-neutral-900 font-bold">{getVal(salarioProposta)}</td>
                   </tr>
                   <tr className="border border-neutral-300">
                     <td className="bg-neutral-50 p-1.5 font-bold text-neutral-700 border-r border-neutral-300">Data Prevista Admissão</td>
                     <td className="p-1.5 text-neutral-900 font-medium">{getVal(dataAdmissao)}</td>
                   </tr>
                   <tr className="border border-neutral-300">
                     <td className="bg-neutral-50 p-1.5 font-bold text-neutral-700 border-r border-neutral-300">Tipo de Contrato</td>
                     <td className="p-1.5 text-neutral-900 font-medium">{getVal(tipoContrato)}</td>
                   </tr>
                   <tr className="border border-neutral-300">
                     <td className="bg-neutral-50 p-1.5 font-bold text-neutral-700 border-r border-neutral-300">Validade do Contrato</td>
                     <td className="p-1.5 text-neutral-900 font-medium">{getVal(validadeContrato)}</td>
                   </tr>
                   <tr className="border border-neutral-300">
                     <td className="bg-neutral-50 p-1.5 font-bold text-neutral-700 border-r border-neutral-300">Horário / Escala</td>
                     <td className="p-1.5 text-neutral-900 font-medium">{getVal(horarioProposta)} ({getVal(cargaSemanal)})</td>
                   </tr>
                   <tr className="border border-neutral-300">
                     <td className="bg-neutral-50 p-1.5 font-bold text-neutral-700 border-r border-neutral-300">Local de Exercício</td>
                     <td className="p-1.5 text-neutral-900 font-medium">{getVal(localTrabalho)}</td>
                   </tr>
                 </tbody>
               </table>
            </div>

            <div className="text-[11px] font-sans leading-relaxed text-neutral-800 space-y-2.5 text-justify mb-4">
              <p>Prezado(a) candidato(a),</p>
              <p>Temos a satisfação de lhe apresentar esta Proposta de Emprego para integrar a equipe de nossa organização. Caso seja de vosso aceite, a efetivação da admissão fica condicionada à aprovação em exames médicos e à entrega da documentação legal exigida perante as normas da legislação trabalhista e rotinas internas de ingresso da empresa.</p>
              
              <div className="mt-2.5">
                <span className="font-bold inline-block mb-0.5 text-neutral-700">Pacote de Benefícios e Facilidades:</span>
                <div className="pl-4 text-[10.5px] space-y-0.5">
                  {beneficiosProposta ? beneficiosProposta.split(';').map((b, i) => b.trim() && <div key={i}>• {b.trim()}</div>) 
                    : <div>• Informações sobre benefícios a serem detalhadas na admissão.</div>}
                </div>
              </div>
            </div>

            <div className="border border-neutral-300 p-3 rounded-md bg-neutral-50 text-[10.5px] text-neutral-600 text-center font-medium mt-auto">
               Declaro ter conhecimento da proposta apresentada, seus termos e condições preliminares, manifestando o meu imediato DE ACORDO.
            </div>
            
          </div>

          <div>
            <RenderSignatures extraSig={
              <div className="flex flex-col items-center">
                <div className="w-full border-t border-neutral-800 pt-1.5 font-bold text-neutral-900 uppercase">
                  CANDIDATO(A) DE ACORDO
                </div>
                <div className="text-[10px] text-neutral-600 mt-0.5 truncate max-w-full">
                  {getVal(nome)}
                </div>
              </div>
            } hideEmpregado />
            <RenderFooter pageStr="Página 1 de 1" />
          </div>
        </div>
      )}

      {/* ────────────────── 7. MODÊLO DESCONTO EM FOLHA ────────────────── */}
      {modelo === 'desconto' && (
        <div className={paperClass}>
          <div>
            <RenderHeader title="TERMO DE AUTORIZAÇÃO DE DESCONTO EM FOLHA DE PAGAMENTO" />
            <RenderEmployeeData />

            <div className="text-[11px] font-sans leading-relaxed text-neutral-800 space-y-4 text-justify">
              <p>
                Eu, acima e devidamente qualificado(a) pelo presente <strong>TERMO DE AUTORIZAÇÃO</strong>, nos exatos termos delineados e permitidos pelo artigo 462 da Consolidação das Leis do Trabalho (CLT), AUTORIZO de forma irrevogável e irretratável a empresa empregadora que proceda com o desconto diretamente em minha folha de pagamento corporativa, bem como em minhas rescisões contratuais de verbas trabalhistas – se houver.
              </p>
              
              <div className="border-l-4 border-[#f37021] bg-neutral-50/70 border-y border-neutral-200 border-r border-neutral-200 p-3 my-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <span className="font-bold text-[9px] uppercase text-neutral-500 tracking-wider block mb-0.5">Valor Autorizado:</span>
                    <span className="font-extrabold text-[14px]">{getVal(valorDesconto)}</span>
                  </div>
                  <div>
                     <span className="font-bold text-[9px] uppercase text-neutral-500 tracking-wider block mb-0.5">Forma do Desconto/Parcelas:</span>
                     <span className="font-bold text-[12px]">{getVal(formaDesconto)}</span>
                  </div>
                </div>
                <div className="mt-3 border-t border-neutral-200 pt-2.5">
                   <span className="font-bold text-[9px] uppercase text-neutral-500 tracking-wider block mb-0.5">Motivo do Desconto:</span>
                   <span className="font-bold text-[12px] text-neutral-700">{getVal(motivoDesconto)}</span>
                </div>
                {obsDesconto && (
                  <div className="mt-3 text-[10.5px] text-neutral-600 pt-2 border-t border-dashed border-neutral-300">
                    <span className="font-bold block mb-0.5">Observações / Detalhamento:</span>
                    <span className="italic">{obsDesconto}</span>
                  </div>
                )}
              </div>

              <p>
                A presente autorização exprime a minha manifestação de vontade, sendo proferida de modo livre e consciente, e, uma vez efetivados os respectivos débitos por parte do departamento contábil e de recursos humanos, não caberá nenhum pleito ou restituição a respeito, já que se prestam ao efetivo cumprimento obrigacional do repasse supracitado.
              </p>
            </div>
          </div>

          <div>
            <RenderSignatures />
            <RenderFooter pageStr="Página 1 de 1" />
          </div>
        </div>
      )}

      {/* ────────────────── 8. MODÊLO CANCELAMENTO FÉRIAS ────────────────── */}
      {modelo === 'ferias' && (
        <div className={paperClass}>
          <div>
            <RenderHeader title="TERMO DE CANCELAMENTO E REPROGRAMAÇÃO DE FÉRIAS" />
            <RenderEmployeeData />

            <div className="mb-4">
              <h3 className="font-sans font-bold text-[10px] tracking-wider text-neutral-500 uppercase mb-1.5">
                2. DADOS DO CANCELAMENTO
              </h3>
              <table className="w-full text-[11px] font-sans border-collapse">
                <tbody>
                  <tr className="border border-neutral-300">
                    <td className="w-[40%] bg-neutral-50 p-1.5 font-bold text-neutral-700 border-r border-neutral-300">Período Aquisitivo ou Gozo Cancelado</td>
                    <td className="p-1.5 text-neutral-900 font-medium font-mono">{getVal(periodoFerias)}</td>
                  </tr>
                  <tr className="border border-neutral-300">
                    <td className="bg-neutral-50 p-1.5 font-bold text-neutral-700 border-r border-neutral-300">Data Prevista do Início</td>
                    <td className="p-1.5 text-neutral-900 font-medium font-mono">{getVal(inicioFerias)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="text-[11px] font-sans leading-relaxed text-neutral-800 space-y-3 text-justify">
              <p>
                Dada as necessidades preementes de ordem operacional e corporativa, vimos por meio deste comunicar formalmente o <strong>cancelamento e a reprogramação do seu período de férias</strong> mencionado anteriormente, nos referindo ao Aviso de Férias outrora emitido a vosso nome.
              </p>

               <div className="border border-neutral-300 p-3 border-l-4 border-l-[#f37021] bg-neutral-50 rounded text-[10.5px] my-4">
                  <span className="font-bold text-[9px] uppercase text-neutral-500 tracking-wider block mb-0.5">Motivador do Cancelamento Operacional:</span>
                  <span className="text-neutral-800 italic">{getVal(motivoFerias)}</span>
               </div>

              <p>
                Reiteramos que a referida repactuação ocorrerá dentro do período concessivo legal amparado pela CLT, de tal forma que lhe seja assegurado o fiel e tempestivo gozo de seu descanso, em nova data e escala futura a ser programada pelo departamento, conforme alinhamento direto com vossa respectiva gestão. Agradecemos a compreensão e a sua constante colaboração com nossas diretrizes.
              </p>
            </div>
          </div>

          <div>
            <RenderSignatures />
            <RenderFooter pageStr="Página 1 de 1" />
          </div>
        </div>
      )}

      {/* ────────────────── 9. MODÊLO AFASTAMENTO INSS ────────────────── */}
      {modelo === 'inss' && (
        <div className={paperClass}>
          <div>
            <RenderHeader title="COMUNICADO DE AFASTAMENTO PREVIDENCIÁRIO (INSS)" />
            <RenderEmployeeData />

            <div className="mb-4">
              <h3 className="font-sans font-bold text-[10px] tracking-wider text-neutral-500 uppercase mb-1.5">
                2. REGISTRO PREVIDENCIÁRIO
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="border border-neutral-300 p-2.5 rounded-md bg-neutral-50 text-[11px]">
                  <span className="font-bold text-neutral-700 block mb-0.5">Data de Afastamento:</span>
                  <span className="text-neutral-900 font-semibold">{getVal(dataAfastamento)}</span>
                </div>
                <div className="border border-neutral-300 p-2.5 rounded-md bg-neutral-50 text-[11px]">
                  <span className="font-bold text-neutral-700 block mb-0.5">Nº Benefício / Protocolo INSS:</span>
                  <span className="text-neutral-900 font-mono font-bold tracking-wide">{getVal(beneficioInss)}</span>
                </div>
              </div>
            </div>

            <div className="text-[11px] font-sans leading-relaxed text-neutral-800 space-y-3 text-justify">
              <p>
                Em decorrência de acompanhamento médico e afastamento atestado por perícia oficial do INSS, comunicamos o afastamento formal de vossas atividades laborais a partir da data de competência supra documentada, resultando em repercussão legal na interrupção/suspensão de seu contrato de trabalho frente à nossa corporação, aguardando o deferimento da Autarquia Previdenciária.
              </p>
              
              <div className="my-4 border border-neutral-200 bg-neutral-50 p-3 rounded bg-[#f37021]/5 border-[#f37021]/20">
                 <h4 className="font-bold text-[10px] uppercase text-[#f37021] tracking-wider mb-1.5">Manutenção e Impacto nos Benefícios Corporativos:</h4>
                 <div className="text-[10.5px] text-neutral-700 whitespace-pre-wrap leading-relaxed">
                    {getVal(beneficiosInss)}
                 </div>
              </div>

              <p>
                Lembramos-lhe que caberá exclusivamente a você a responsabilidade de realizar os devidos agendamentos, avaliações periciais, prorrogações ou acompanhamento de alta médica diretamente junto aos canais de atendimento do INSS. 
              </p>
              <p>
                <strong>ALERTA DE RETORNO:</strong> Uma vez findado o prazo concedido ou após formalizada a vossa liberação por alta médica pericial do INSS, é obrigatório o retorno providencial às vossas atribuições na sede corporativa e no primeiro dia útil subsequente. O retorno das funções dependerá apenas da emissão apta do Atestado de Saúde Ocupacional (ASO) de retorno, sob pena de serem aplicadas as penalidades disciplinares pertinentes na presunção de abandono de emprego ou faltas injustificadas.
              </p>
            </div>
          </div>

          <div>
             <RenderSignatures hideEmpregado />
             <RenderFooter pageStr="Página 1 de 1" />
          </div>
        </div>
      )}

      {/* ────────────────── 10. MODÊLO REAJUSTE DE MÉRITO ────────────────── */}
      {modelo === 'reajuste' && (
        <div className={paperClass}>
          <div>
            <RenderHeader title="CARTA DE REAJUSTE SALARIAL (MERITOCRACIA)" />
            <RenderEmployeeData />

            <div className="border border-neutral-200 bg-neutral-50 py-4 px-3 rounded-xl flex items-center justify-around text-center max-w-full mx-auto my-4 shadow-sm">
               <div className="flex-1">
                  <span className="text-[9px] uppercase font-bold text-neutral-500 tracking-wider block mb-0.5">Salário Anterior</span>
                  <span className="text-neutral-400 line-through text-[13px] font-mono font-medium">{getVal(salarioAnterior)}</span>
               </div>
               <div className="bg-white border border-neutral-200 py-1.5 px-2.5 rounded-md mx-2 shadow-sm flex flex-col items-center">
                  <span className="text-[13px] font-black text-[#f37021] block leading-none">+{getVal(percentualReajuste)}</span>
                  <span className="text-neutral-400 font-bold tracking-widest text-[7px] uppercase mt-0.5">Mérito</span>
               </div>
               <div className="flex-1">
                  <span className="text-[9px] uppercase font-bold text-[#f37021] tracking-wider block mb-0.5">Novo Salário Base</span>
                  <span className="text-neutral-900 font-extrabold text-[15px] font-mono">{getVal(novoSalarioReajuste)}</span>
               </div>
            </div>

            <div className="text-[11px] font-sans leading-relaxed text-neutral-800 space-y-3 text-justify">
              <p>
                Prezado(a) <strong>{getVal(nome)}</strong>,
              </p>
              <p>
                Temos o prazer de lhe comunicar que, em reconhecimento à sua dedicação contínua, eficácia em suas metas operacionais e aos resultados exemplares de rotina apresentados ao longo do último ciclo de atuação, lhe foi concedido um mérito de excelência dentro de sua respectiva categoria técnica e nível funcional.
              </p>
              <p>
                Isso quer dizer que, a partir da referência de competência da folha de pagamento datada em <strong>{getVal(vigenciaReajuste)}</strong>, a sua remuneração oficial fixa passará a figurar a atualização descritiva exposta de forma bruta.
              </p>

              {(msgReajuste) && (
                 <div className="italic text-neutral-600 border-l-4 border-neutral-300 bg-neutral-50 p-3 mt-4 text-[11px] rounded-r-md">
                    "{msgReajuste}"
                 </div>
              )}
              
              <p className="mt-6 pt-3 border-t border-neutral-200 text-[12px] font-semibold text-neutral-900 text-center">
                 Em nome de nossa Liderança e Diretoria Corporativa, queremos parabenizá-lo(a)!
                 <br/><span className="text-[11px] text-neutral-600 font-medium font-sans mt-0.5 block">Continue nos inspirando.</span>
              </p>
            </div>
          </div>

          <div>
            <RenderSignatures />
            <RenderFooter pageStr="Página 1 de 1" />
          </div>
        </div>
      )}

      {/* ────────────────── 11. MODÊLO PÓS-DESLIGAMENTO ────────────────── */}
      {modelo === 'posdesligamento' && (
        <div className={paperClass}>
          <div>
            <RenderHeader title="TERMO DE CIÊNCIA – PROCEDIMENTOS PÓS-DESLIGAMENTO" />
            <RenderEmployeeData />

            <div className="text-[11px] font-sans leading-relaxed text-neutral-800 space-y-3 text-justify">
              <p>
                Eu, <strong>{getVal(nome)}</strong>, inscrito(a) no CPF nº <strong>{getVal(cpf)}</strong>, declaro estar ciente dos procedimentos referentes ao meu desligamento da empresa, ocorrido em <strong>{getVal(dataDesligamento)}</strong>.
              </p>

              <div className="mb-4 mt-4">
                <h3 className="font-sans font-bold text-[10px] tracking-wider text-neutral-500 uppercase mb-1.5">
                  2. ORIENTAÇÕES PÓS-DESLIGAMENTO
                </h3>
                <table className="w-full text-[11px] font-sans border-collapse">
                  <tbody>
                    <tr className="border border-neutral-300">
                      <td className="w-[30%] bg-neutral-50 p-1.5 font-bold text-neutral-700 border-r border-neutral-300">Exame demissional</td>
                      <td className="p-1.5 text-neutral-900" dangerouslySetInnerHTML={{ __html: textoExameDemissional ? textoExameDemissional.replace(/{data}/g, `<b>${dataExameDemissional || '________________'}</b>`).replace(/{hora}/g, `<b>${horaExameDemissional || '____'}</b>`).replace(/{local}/g, `<b>${localExameDemissional || '________________'}</b>`) : '' }}></td>
                    </tr>
                    <tr className="border border-neutral-300">
                      <td className="bg-neutral-50 p-1.5 font-bold text-neutral-700 border-r border-neutral-300">Pagamento das verbas rescisórias</td>
                      <td className="p-1.5 text-neutral-900">{getVal(textoPagamentoVerbas)}</td>
                    </tr>
                    <tr className="border border-neutral-300">
                      <td className="bg-neutral-50 p-1.5 font-bold text-neutral-700 border-r border-neutral-300">Devolução de pertences</td>
                      <td className="p-1.5 text-neutral-900">{getVal(textoDevolucaoPertences)}</td>
                    </tr>
                    <tr className="border border-neutral-300">
                      <td className="bg-neutral-50 p-1.5 font-bold text-neutral-700 border-r border-neutral-300">Documentos rescisórios</td>
                      <td className="p-1.5 text-neutral-900">{getVal(obsPosDesligamento)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p>
                Declaro que recebi as informações acima, estando ciente dos procedimentos a serem adotados em razão do encerramento do meu contrato de trabalho.
              </p>
            </div>
          </div>

          <div>
            <RenderSignatures 
              extraSig={
                <div className="flex flex-col items-center">
                  <div className="w-full border-t border-neutral-800 pt-1.5 font-bold text-neutral-900 uppercase">
                    RESPONSÁVEL PELA EMPRESA
                  </div>
                  <div className="text-[10px] text-neutral-600 mt-0.5 truncate max-w-full">
                    {getVal(responsavelEmpresa)}
                  </div>
                  <div className="text-[10px] text-neutral-600 mt-0.5 truncate max-w-full">
                    {getVal(cargoResponsavelEmpresa)}
                  </div>
                </div>
              }
            />
            <RenderFooter pageStr="Página 1 de 1" />
          </div>
        </div>
      )}

      {/* ────────────────── 12. MODÊLO DUT ────────────────── */}
      {modelo === 'dut' && (
        <div className="space-y-8 print:space-y-0">
          <div className={`${paperClass} border border-dashed border-neutral-300 print:border-none`}>
            <div>
              <RenderHeader title="DECLARAÇÃO DE ÚLTIMO DIA TRABALHADO (DUT)" />
              
              <div className="text-[11px] font-sans leading-relaxed text-neutral-800 space-y-3 text-justify">
                <p><strong>Ao INSS,</strong></p>
                <p>
                  <strong>{getVal(razaoSocial)}</strong>, pessoa jurídica de direito privado, inscrita no CNPJ sob o nº <strong>{getVal(cnpjEmpresa)}</strong>, com sede à <strong>{getVal(enderecoEmpresa)}</strong>, declara, para os devidos fins, que o(a) Sr(a). <strong>{getVal(nome)}</strong>, inscrito(a) no CPF sob o nº <strong>{getVal(cpf)}</strong>, admitido(a) em <strong>{getVal(admissaoDut)}</strong>, encontra-se afastado(a) de suas atividades profissionais desde o último dia de trabalho em <strong>{getVal(ultimoDiaTrabalhadoDut)}</strong>, em decorrência de atestados médicos emitidos conforme abaixo:
                </p>

                <div className="mb-4 mt-4">
                  <h3 className="font-sans font-bold text-[10px] tracking-wider text-neutral-500 uppercase mb-1.5">
                    Atestados e laudos apresentados pelo colaborador
                  </h3>
                  <ul className="list-disc pl-5 space-y-0.5 text-[10.5px]">
                    {atestadosDut ? atestadosDut.split('\n').map((line, i) => line.trim() && <li key={i}>{line.trim()}</li>) : <li>_____________________________________________________</li>}
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <div className="text-right text-[11.5px] text-neutral-700 font-sans mt-6 mb-8">
                <strong>{getVal(cidadeDut)}</strong>, {getVal(dataEmissaoDut)}.
              </div>

              <div className="grid grid-cols-2 gap-8 text-center text-[10px] font-sans mt-6">
                <div className="flex flex-col items-center">
                  <div className="w-full border-t border-neutral-800 pt-1.5 font-bold text-neutral-900 uppercase">
                    {getVal(razaoSocial)}
                  </div>
                  <div className="text-[10px] text-neutral-600 mt-0.5 truncate max-w-full">
                    CNPJ {getVal(cnpjEmpresa)}
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-full border-t border-neutral-800 pt-1.5 font-bold text-neutral-900 uppercase">
                    RESPONSÁVEL PELA EMPRESA
                  </div>
                  <div className="text-[10px] text-neutral-600 mt-0.5 truncate max-w-full">
                    Assinatura e carimbo
                  </div>
                </div>
              </div>
              <RenderFooter pageStr="Página 1 de 2" />
            </div>
          </div>

          <div className={paperClass}>
            <div>
              <RenderHeader title="INFORMAÇÕES - PERÍCIA INSS" />
              
              <div className="text-[12px] font-sans leading-relaxed text-neutral-800 space-y-4 text-justify">
                {orientacoesDut ? orientacoesDut.split('\n').map((para, i) => para.trim() && <p key={i}>{para.trim()}</p>) : <p>_____________________________________________________</p>}
              </div>
            </div>

            <div>
              <RenderFooter pageStr="Página 2 de 2" />
            </div>
          </div>
        </div>
      )}

      {/* ────────────────── 13. MODÊLO CHECKLIST DEMISSIONAL ────────────────── */}
      {modelo === 'checklistDemissional' && (
        <div className={paperClass}>
          <div>
            <RenderHeader title="CHECKLIST DEMISSIONAL" />
            
            <div className="mb-4">
              <h3 className="font-sans font-bold text-[10px] tracking-wider text-neutral-500 uppercase mb-1.5">
                1. IDENTIFICAÇÃO DO PROCESSO
              </h3>
              <table className="w-full text-[11px] font-sans border-collapse">
                <tbody>
                  <tr className="border border-neutral-300">
                    <td className="w-[30%] bg-neutral-50 p-1.5 font-bold text-neutral-700 border-r border-neutral-300">Colaborador</td>
                    <td className="p-1.5 text-neutral-900 font-medium">{getVal(nome)}</td>
                  </tr>
                  <tr className="border border-neutral-300">
                    <td className="bg-neutral-50 p-1.5 font-bold text-neutral-700 border-r border-neutral-300">CPF</td>
                    <td className="p-1.5 text-neutral-900 font-medium">{getVal(cpf)}</td>
                  </tr>
                  <tr className="border border-neutral-300">
                    <td className="bg-neutral-50 p-1.5 font-bold text-neutral-700 border-r border-neutral-300">Matrícula</td>
                    <td className="p-1.5 text-neutral-900 font-mono font-semibold">{getVal(matricula)}</td>
                  </tr>
                  <tr className="border border-neutral-300">
                    <td className="bg-neutral-50 p-1.5 font-bold text-neutral-700 border-r border-neutral-300">Cargo</td>
                    <td className="p-1.5 text-neutral-900 font-medium">{getVal(funcao)}</td>
                  </tr>
                  <tr className="border border-neutral-300">
                    <td className="bg-neutral-50 p-1.5 font-bold text-neutral-700 border-r border-neutral-300">Contrato / Unidade</td>
                    <td className="p-1.5 text-neutral-900 font-medium">{getVal(unidade)}</td>
                  </tr>
                  <tr className="border border-neutral-300">
                    <td className="bg-neutral-50 p-1.5 font-bold text-neutral-700 border-r border-neutral-300">Data do desligamento</td>
                    <td className="p-1.5 text-neutral-900 font-medium">{getVal(dataDesligamentoChecklist)}</td>
                  </tr>
                  <tr className="border border-neutral-300">
                    <td className="bg-neutral-50 p-1.5 font-bold text-neutral-700 border-r border-neutral-300">Responsável pelo processo</td>
                    <td className="p-1.5 text-neutral-900 font-medium">{getVal(responsavelChecklist)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mb-4">
              <h3 className="font-sans font-bold text-[10px] tracking-wider text-neutral-500 uppercase mb-1.5">
                2. CHECKLIST DEMISSIONAL
              </h3>
              <table className="w-full text-[11px] font-sans border-collapse">
                <thead>
                  <tr className="border border-neutral-300 bg-neutral-50 text-neutral-700">
                    <td className="p-1.5 font-bold border-r border-neutral-300 w-[55%]">Item</td>
                    <td className="p-1.5 font-bold border-r border-neutral-300 w-[20%] text-center">Data</td>
                    <td className="p-1.5 font-bold w-[25%] text-center">Status</td>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: 'Formalização do desligamento', data: checkData1, status: checkStatus1 },
                    { label: 'Devolução de equipamentos e materiais da empresa', data: checkData2, status: checkStatus2 },
                    { label: 'Bloqueio de acessos e e-mail corporativo', data: checkData3, status: checkStatus3 },
                    { label: 'Realização do exame demissional, quando aplicável', data: checkData4, status: checkStatus4 },
                    { label: 'Cálculo e pagamento das verbas rescisórias', data: checkData5, status: checkStatus5 },
                    { label: 'Entrega da documentação rescisória', data: checkData6, status: checkStatus6 },
                    { label: 'Cancelamento de benefícios', data: checkData7, status: checkStatus7 },
                    { label: 'Arquivamento da documentação do processo', data: checkData8, status: checkStatus8 },
                  ].map((item, index) => {
                    let statusLabel = '☐ Pendente';
                    if (item.status === 'Concluído') statusLabel = '☑ Concluído';
                    if (item.status === 'Não se aplica') statusLabel = 'N/A';
                    return (
                      <tr key={index} className="border border-neutral-300">
                        <td className="p-1.5 text-neutral-800 border-r border-neutral-300">{item.label}</td>
                        <td className="p-1.5 text-neutral-900 font-mono text-center border-r border-neutral-300">{getVal(item.data)}</td>
                        <td className="p-1.5 text-neutral-900 font-bold text-center">{statusLabel}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="mb-4">
              <h3 className="font-sans font-bold text-[10px] tracking-wider text-neutral-500 uppercase mb-1.5">
                3. OBSERVAÇÕES
              </h3>
              <div className="border border-neutral-300 p-2 bg-neutral-50 min-h-[50px] text-[11px] text-neutral-800 whitespace-pre-wrap">
                {observacoesChecklist || '__________________________________________________________________________________'}
              </div>
            </div>

            <div className="text-[11px] font-sans leading-relaxed text-neutral-800 space-y-3 text-justify">
              <p>
                Declaro que os itens acima foram conferidos conforme andamento do processo demissional, permanecendo eventuais pendências registradas para acompanhamento interno.
              </p>
            </div>
          </div>

          <div>
            <RenderSignatures 
              extraSig={
                <div className="flex flex-col items-center">
                  <div className="w-full border-t border-neutral-800 pt-1.5 font-bold text-neutral-900 uppercase">
                    RESPONSÁVEL PELO PROCESSO
                  </div>
                  <div className="text-[10px] text-neutral-600 mt-0.5 truncate max-w-full">
                    {getVal(responsavelChecklist)}
                  </div>
                </div>
              }
            />
            <RenderFooter pageStr="Página 1 de 1" />
          </div>
        </div>
      )}

      {/* ────────────────── 14. MODÊLO CHECKLIST ADMISSIONAL ────────────────── */}
      {modelo === 'checklistAdmissional' && (
        <div className={paperClass}>
          <div>
            <RenderHeader title="CHECKLIST ADMISSIONAL – RH" />
            
            <div className="mb-4">
              <table className="w-full text-[11px] font-sans border-collapse">
                <tbody>
                  <tr className="border border-neutral-300">
                    <td className="w-[30%] bg-neutral-50 p-1.5 font-bold text-neutral-700 border-r border-neutral-300">Colaborador</td>
                    <td className="p-1.5 text-neutral-900 font-medium">{getVal(nome)}</td>
                  </tr>
                  <tr className="border border-neutral-300">
                    <td className="bg-neutral-50 p-1.5 font-bold text-neutral-700 border-r border-neutral-300">Cargo</td>
                    <td className="p-1.5 text-neutral-900 font-medium">{getVal(funcao)}</td>
                  </tr>
                  <tr className="border border-neutral-300">
                    <td className="bg-neutral-50 p-1.5 font-bold text-neutral-700 border-r border-neutral-300">Setor</td>
                    <td className="p-1.5 text-neutral-900 font-medium">{getVal(setorAdmissional)}</td>
                  </tr>
                  <tr className="border border-neutral-300">
                    <td className="bg-neutral-50 p-1.5 font-bold text-neutral-700 border-r border-neutral-300">Data de início</td>
                    <td className="p-1.5 text-neutral-900 font-medium">{getVal(dataInicioAdmissional)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4 mt-4">
              <div>
                <h3 className="font-sans font-bold text-[10px] tracking-wider text-neutral-800 uppercase border-b border-neutral-300 pb-1 mb-2">
                  01 – ABERTURA E VALIDAÇÃO DA VAGA
                </h3>
                <ul className="space-y-1.5 text-[10px] text-neutral-800 font-sans">
                  <li className="flex items-start gap-1.5"><span className="border border-neutral-400 w-2.5 h-2.5 inline-block rounded-sm mt-0.5 shrink-0"></span> Recebimento da solicitação da vaga</li>
                  <li className="flex items-start gap-1.5"><span className="border border-neutral-400 w-2.5 h-2.5 inline-block rounded-sm mt-0.5 shrink-0"></span> Aprovação da vaga pelo gestor/diretoria</li>
                  <li className="flex items-start gap-1.5"><span className="border border-neutral-400 w-2.5 h-2.5 inline-block rounded-sm mt-0.5 shrink-0"></span> Validação do perfil necessário</li>
                  <li className="flex items-start gap-1.5"><span className="border border-neutral-400 w-2.5 h-2.5 inline-block rounded-sm mt-0.5 shrink-0"></span> Conferência da descrição de cargo</li>
                  <li className="flex items-start gap-1.5"><span className="border border-neutral-400 w-2.5 h-2.5 inline-block rounded-sm mt-0.5 shrink-0"></span> Definição dos requisitos da vaga</li>
                  <li className="flex items-start gap-1.5"><span className="border border-neutral-400 w-2.5 h-2.5 inline-block rounded-sm mt-0.5 shrink-0"></span> Alinhamento de salário e benefícios</li>
                </ul>
              </div>

              <div>
                <h3 className="font-sans font-bold text-[10px] tracking-wider text-neutral-800 uppercase border-b border-neutral-300 pb-1 mb-2">
                  02 – RECRUTAMENTO E SELEÇÃO
                </h3>
                <ul className="space-y-1.5 text-[10px] text-neutral-800 font-sans">
                  <li className="flex items-start gap-1.5"><span className="border border-neutral-400 w-2.5 h-2.5 inline-block rounded-sm mt-0.5 shrink-0"></span> Divulgação da vaga</li>
                  <li className="flex items-start gap-1.5"><span className="border border-neutral-400 w-2.5 h-2.5 inline-block rounded-sm mt-0.5 shrink-0"></span> Triagem de currículos</li>
                  <li className="flex items-start gap-1.5"><span className="border border-neutral-400 w-2.5 h-2.5 inline-block rounded-sm mt-0.5 shrink-0"></span> Entrevista inicial RH</li>
                  <li className="flex items-start gap-1.5"><span className="border border-neutral-400 w-2.5 h-2.5 inline-block rounded-sm mt-0.5 shrink-0"></span> Validação do candidato com gestor</li>
                  <li className="flex items-start gap-1.5"><span className="border border-neutral-400 w-2.5 h-2.5 inline-block rounded-sm mt-0.5 shrink-0"></span> Retorno ao candidato aprovado</li>
                  <li className="flex items-start gap-1.5"><span className="border border-neutral-400 w-2.5 h-2.5 inline-block rounded-sm mt-0.5 shrink-0"></span> Confirmação da disponibilidade para início</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <h3 className="font-sans font-bold text-[10px] tracking-wider text-neutral-800 uppercase border-b border-neutral-300 pb-1 mb-2">
                  03 – RECEBIMENTO DE DOCUMENTOS
                </h3>
                <ul className="space-y-1.5 text-[10px] text-neutral-800 font-sans">
                  <li className="flex items-start gap-1.5"><span className="border border-neutral-400 w-2.5 h-2.5 inline-block rounded-sm mt-0.5 shrink-0"></span> Solicitação da documentação admissional</li>
                  <li className="flex items-start gap-1.5"><span className="border border-neutral-400 w-2.5 h-2.5 inline-block rounded-sm mt-0.5 shrink-0"></span> Conferência dos documentos recebidos</li>
                  <li className="flex items-start gap-1.5"><span className="border border-neutral-400 w-2.5 h-2.5 inline-block rounded-sm mt-0.5 shrink-0"></span> Conferência dos certificados exigidos para o cargo</li>
                  <li className="flex items-start gap-1.5"><span className="border border-neutral-400 w-2.5 h-2.5 inline-block rounded-sm mt-0.5 shrink-0"></span> Encaminhamento para continuidade do processo admissional</li>
                </ul>
              </div>

              <div>
                <h3 className="font-sans font-bold text-[10px] tracking-wider text-neutral-800 uppercase border-b border-neutral-300 pb-1 mb-2">
                  04 – INTEGRAÇÃO RH
                </h3>
                <ul className="space-y-1.5 text-[10px] text-neutral-800 font-sans">
                  <li className="flex items-start gap-1.5"><span className="border border-neutral-400 w-2.5 h-2.5 inline-block rounded-sm mt-0.5 shrink-0"></span> Apresentação institucional da empresa</li>
                  <li className="flex items-start gap-1.5"><span className="border border-neutral-400 w-2.5 h-2.5 inline-block rounded-sm mt-0.5 shrink-0"></span> Missão, visão e valores</li>
                  <li className="flex items-start gap-1.5"><span className="border border-neutral-400 w-2.5 h-2.5 inline-block rounded-sm mt-0.5 shrink-0"></span> Código de ética e conduta</li>
                  <li className="flex items-start gap-1.5"><span className="border border-neutral-400 w-2.5 h-2.5 inline-block rounded-sm mt-0.5 shrink-0"></span> Políticas internas da empresa</li>
                  <li className="flex items-start gap-1.5"><span className="border border-neutral-400 w-2.5 h-2.5 inline-block rounded-sm mt-0.5 shrink-0"></span> Regras internas da empresa</li>
                  <li className="flex items-start gap-1.5"><span className="border border-neutral-400 w-2.5 h-2.5 inline-block rounded-sm mt-0.5 shrink-0"></span> Jornada de trabalho e cumprimento de horários</li>
                  <li className="flex items-start gap-1.5"><span className="border border-neutral-400 w-2.5 h-2.5 inline-block rounded-sm mt-0.5 shrink-0"></span> Orientação sobre faltas e atrasos</li>
                  <li className="flex items-start gap-1.5"><span className="border border-neutral-400 w-2.5 h-2.5 inline-block rounded-sm mt-0.5 shrink-0"></span> Apresentação dos benefícios</li>
                  <li className="flex items-start gap-1.5"><span className="border border-neutral-400 w-2.5 h-2.5 inline-block rounded-sm mt-0.5 shrink-0"></span> Apresentação do setor e liderança</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <h3 className="font-sans font-bold text-[10px] tracking-wider text-neutral-800 uppercase border-b border-neutral-300 pb-1 mb-2">
                  05 – DOCUMENTOS E REGISTROS RH
                </h3>
                <ul className="space-y-1.5 text-[10px] text-neutral-800 font-sans">
                  <li className="flex items-start gap-1.5"><span className="border border-neutral-400 w-2.5 h-2.5 inline-block rounded-sm mt-0.5 shrink-0"></span> Assinatura das políticas internas</li>
                  <li className="flex items-start gap-1.5"><span className="border border-neutral-400 w-2.5 h-2.5 inline-block rounded-sm mt-0.5 shrink-0"></span> Termo de ciência das normas da empresa</li>
                  <li className="flex items-start gap-1.5"><span className="border border-neutral-400 w-2.5 h-2.5 inline-block rounded-sm mt-0.5 shrink-0"></span> Registro de integração realizada</li>
                  <li className="flex items-start gap-1.5"><span className="border border-neutral-400 w-2.5 h-2.5 inline-block rounded-sm mt-0.5 shrink-0"></span> Arquivamento das evidências do processo</li>
                  <li className="flex items-start gap-1.5"><span className="border border-neutral-400 w-2.5 h-2.5 inline-block rounded-sm mt-0.5 shrink-0"></span> Atualização dos controles internos do RH</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <div className="grid grid-cols-2 gap-8 mt-6">
              <div className="flex flex-col items-center text-[11px]">
                <div className="w-full border-t border-neutral-800 pt-1 font-bold text-neutral-900">
                  Responsável RH: <span className="font-normal">{getVal(responsavelAdmissional)}</span>
                </div>
                <div className="w-full text-left mt-1.5 font-bold text-neutral-900">
                  Data: <span className="font-normal">{getVal(dataInicioAdmissional)}</span>
                </div>
              </div>
            </div>
            <RenderFooter pageStr="Página 1 de 1" />
          </div>
        </div>
      )}

      {/* ────────────────── 15. MODÊLO DECLARAÇÃO DE EXERCÍCIO DE FUNÇÕES ────────────────── */}
      {modelo === 'exercicioFuncoes' && (
        <div className={paperClass}>
          <div>
            <RenderHeader title="DECLARAÇÃO DE EXERCÍCIO DE FUNÇÕES" />
            

            <div className="text-[11px] font-sans leading-relaxed text-neutral-800 space-y-3 text-justify mt-4">
              <p className="leading-relaxed">
                Declaramos para os fins escolares, que o Sr(a). <strong>{getVal(nome)}</strong>, portador(a) do documento tipo RG nº <strong>{getVal(rgExercicio)}</strong> e Carteira de Trabalho e Previdência Social nº <u>{getVal(ctpsExercicio)}</u> série <strong>{getVal(serieCtpsExercicio)}</strong>, é funcionário(a) desta empresa desde <strong>{getVal(admissaoExercicio)}</strong>, e a partir do dia <strong>{getVal(inicioFuncaoExercicio)}</strong>, exerce a função de <u>{getVal(funcao)}</u> no setor <strong>{getVal(setorExercicio)}</strong> desta Empresa, realizando as seguintes atividades:
              </p>

              <div className="pl-6 my-4">
                {atividadesExercicio.split('\n').map((linha, index) => (
                  <div key={index} className="flex gap-2 mb-0.5">
                    <span className="shrink-0">•</span>
                    <span className="text-[10.5px]">{linha.replace(/^•\s*/, '')}</span>
                  </div>
                ))}
              </div>

              <p>
                Estando assim dispensado do estágio supervisionado, pois já exerce a função no local de trabalho.
              </p>
            </div>
          </div>

          <div>
            <div className="text-center text-[11px] text-neutral-700 font-sans mt-4 mb-8">
              _________________________________, _______ de __________________________ de 20____
              <br/><br/>
              <span className="text-[9px] text-neutral-500 mt-1 block">({getVal(cidadeExercicio)}, {getVal(dataEmissaoExercicio)})</span>
            </div>

            <div className="flex flex-col items-center justify-center text-center text-[11px] font-sans">
              <div className="w-1/2 border-t border-neutral-800 pt-1">
                Nome e assinatura do responsável<br/>
                <strong className="text-[12px]">{getVal(responsavelExercicio)}</strong>
              </div>
              
              <div className="mt-12 text-[10px] text-neutral-500">
                Carimbo da empresa c/ CNPJ
              </div>
            </div>

            
            <RenderFooter pageStr="Página 1 de 1" />
          </div>
        </div>
      )}

      {/* ────────────────── 16. MODÊLO LISTA DE PRESENÇA ────────────────── */}
      {modelo === 'listaPresenca' && (
        <div className="space-y-8 print:space-y-0">
          {/* PÁGINA 1 */}
          <div className={`${paperClass} border border-dashed border-neutral-300 print:border-none`}>
            <div>
              <RenderHeader title="LISTA DE PRESENÇA – INTEGRAÇÃO RH" />
              
              <div className="mb-4">
                <table className="w-full text-[10.5px] font-sans border-collapse">
                  <tbody>
                    <tr className="border border-neutral-300">
                      <td className="w-[30%] bg-neutral-50 p-1.5 font-bold text-neutral-700 border-r border-neutral-300">Empresa</td>
                      <td className="p-1.5 text-neutral-900 font-medium">{getVal(razaoSocial)}</td>
                    </tr>
                    <tr className="border border-neutral-300">
                      <td className="bg-neutral-50 p-1.5 font-bold text-neutral-700 border-r border-neutral-300">Data</td>
                      <td className="p-1.5 text-neutral-900 font-medium">{getVal(dataIntegracao)}</td>
                    </tr>
                    <tr className="border border-neutral-300">
                      <td className="bg-neutral-50 p-1.5 font-bold text-neutral-700 border-r border-neutral-300">Horário</td>
                      <td className="p-1.5 text-neutral-900 font-medium">Início: {getVal(horarioInicioIntegracao)} &nbsp;&nbsp;&nbsp;&nbsp; Término: {getVal(horarioTerminoIntegracao)}</td>
                    </tr>
                    <tr className="border border-neutral-300">
                      <td className="bg-neutral-50 p-1.5 font-bold text-neutral-700 border-r border-neutral-300">Responsável pela Integração</td>
                      <td className="p-1.5 text-neutral-900 font-medium">{getVal(responsavelIntegracao)}</td>
                    </tr>
                    <tr className="border border-neutral-300">
                      <td className="bg-neutral-50 p-1.5 font-bold text-neutral-700 border-r border-neutral-300">Local</td>
                      <td className="p-1.5 text-neutral-900 font-medium">{getVal(localIntegracao)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mb-4">
                <h3 className="font-sans font-bold text-[10px] tracking-wider text-neutral-800 uppercase border-b border-neutral-300 pb-1 mb-2">
                  CONTEÚDO APLICADO NA INTEGRAÇÃO RH
                </h3>
                <ul className="space-y-1 text-[9.5px] text-neutral-800 font-sans grid grid-cols-2 gap-x-4">
                  <li className="flex items-start gap-1.5"><span className="border border-neutral-400 w-2.5 h-2.5 inline-block rounded-sm mt-0.5 shrink-0"></span> Apresentação institucional da empresa (história, missão, visão e valores)</li>
                  <li className="flex items-start gap-1.5"><span className="border border-neutral-400 w-2.5 h-2.5 inline-block rounded-sm mt-0.5 shrink-0"></span> Apresentação da estrutura organizacional e setores</li>
                  <li className="flex items-start gap-1.5"><span className="border border-neutral-400 w-2.5 h-2.5 inline-block rounded-sm mt-0.5 shrink-0"></span> Código de ética e conduta profissional</li>
                  <li className="flex items-start gap-1.5"><span className="border border-neutral-400 w-2.5 h-2.5 inline-block rounded-sm mt-0.5 shrink-0"></span> Regras e normas internas da empresa</li>
                  <li className="flex items-start gap-1.5"><span className="border border-neutral-400 w-2.5 h-2.5 inline-block rounded-sm mt-0.5 shrink-0"></span> Jornada de trabalho, registro de ponto e cumprimento de horários</li>
                  <li className="flex items-start gap-1.5"><span className="border border-neutral-400 w-2.5 h-2.5 inline-block rounded-sm mt-0.5 shrink-0"></span> Procedimentos para comunicação de faltas, atrasos e ausências</li>
                  <li className="flex items-start gap-1.5"><span className="border border-neutral-400 w-2.5 h-2.5 inline-block rounded-sm mt-0.5 shrink-0"></span> Apresentação dos benefícios concedidos pela empresa</li>
                  <li className="flex items-start gap-1.5"><span className="border border-neutral-400 w-2.5 h-2.5 inline-block rounded-sm mt-0.5 shrink-0"></span> Políticas de RH e canais de comunicação</li>
                  <li className="flex items-start gap-1.5"><span className="border border-neutral-400 w-2.5 h-2.5 inline-block rounded-sm mt-0.5 shrink-0"></span> Responsabilidades e postura profissional esperada</li>
                  <li className="flex items-start gap-1.5"><span className="border border-neutral-400 w-2.5 h-2.5 inline-block rounded-sm mt-0.5 shrink-0"></span> Uso adequado dos recursos disponibilizados pela empresa</li>
                  <li className="flex items-start gap-1.5"><span className="border border-neutral-400 w-2.5 h-2.5 inline-block rounded-sm mt-0.5 shrink-0"></span> Regras de confidencialidade e proteção de informações (LGPD)</li>
                  <li className="flex items-start gap-1.5"><span className="border border-neutral-400 w-2.5 h-2.5 inline-block rounded-sm mt-0.5 shrink-0"></span> Apresentação da liderança e área de atuação</li>
                </ul>
              </div>

              <div>
                <h3 className="font-sans font-bold text-[10px] tracking-wider text-neutral-800 uppercase border-b border-neutral-300 pb-1 mb-2">
                  PARTICIPANTES
                </h3>
                <table className="w-full text-[9.5px] font-sans border-collapse mt-1">
                  <thead>
                    <tr className="border border-neutral-300 bg-neutral-50 text-neutral-700">
                      <td className="p-1.5 font-bold border-r border-neutral-300 text-center w-[5%]">Nº</td>
                      <td className="p-1.5 font-bold border-r border-neutral-300 w-[30%]">Nome do Colaborador</td>
                      <td className="p-1.5 font-bold border-r border-neutral-300 w-[15%]">Cargo</td>
                      <td className="p-1.5 font-bold border-r border-neutral-300 w-[15%]">Setor</td>
                      <td className="p-1.5 font-bold border-r border-neutral-300 w-[15%]">CPF/Matrícula</td>
                      <td className="p-1.5 font-bold w-[20%] text-center">Assinatura</td>
                    </tr>
                  </thead>
                  <tbody>
                    {[1, 2, 3, 4, 5, 6].map(num => (
                      <tr key={num} className="border border-neutral-300">
                        <td className="p-1.5 text-center border-r border-neutral-300 text-neutral-500 font-mono">0{num}</td>
                        <td className="p-1.5 border-r border-neutral-300"></td>
                        <td className="p-1.5 border-r border-neutral-300"></td>
                        <td className="p-1.5 border-r border-neutral-300"></td>
                        <td className="p-1.5 border-r border-neutral-300"></td>
                        <td className="p-1.5"></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div>
              <RenderFooter pageStr="Página 1 de 2" />
            </div>
          </div>

          {/* PÁGINA 2 */}
          <div className={paperClass}>
            <div>
              <RenderHeader title="LISTA DE PRESENÇA – INTEGRAÇÃO RH (Cont.)" />
              <table className="w-full text-[10px] font-sans border-collapse mt-6">
                <thead>
                  <tr className="border border-neutral-300 bg-neutral-50 text-neutral-700">
                    <td className="p-2 font-bold border-r border-neutral-300 text-center w-[5%]">Nº</td>
                    <td className="p-2 font-bold border-r border-neutral-300 w-[30%]">Nome do Colaborador</td>
                    <td className="p-2 font-bold border-r border-neutral-300 w-[15%]">Cargo</td>
                    <td className="p-2 font-bold border-r border-neutral-300 w-[15%]">Setor</td>
                    <td className="p-2 font-bold border-r border-neutral-300 w-[15%]">CPF/Matrícula</td>
                    <td className="p-2 font-bold w-[20%] text-center">Assinatura</td>
                  </tr>
                </thead>
                <tbody>
                  {[7, 8, 9, 10].map(num => (
                    <tr key={num} className="border border-neutral-300">
                      <td className="p-3 text-center border-r border-neutral-300 text-neutral-500 font-mono">{num < 10 ? `0${num}` : num}</td>
                      <td className="p-3 border-r border-neutral-300"></td>
                      <td className="p-3 border-r border-neutral-300"></td>
                      <td className="p-3 border-r border-neutral-300"></td>
                      <td className="p-3 border-r border-neutral-300"></td>
                      <td className="p-3"></td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="text-[11px] font-sans leading-relaxed text-neutral-800 space-y-4 text-justify mt-8">
                <p>
                  Declaro que participei da Integração de RH, recebi as orientações necessárias referente às normas, procedimentos internos e responsabilidades aplicáveis à minha função.
                </p>
              </div>

              <div className="flex flex-col text-[11px] font-sans mt-8 space-y-2">
                <div className="flex gap-2 items-end">
                  <span className="font-bold">Assinatura do Responsável RH:</span>
                  <span className="border-b border-neutral-600 flex-1 ml-2 mr-24"></span>
                </div>
                <div className="flex gap-2 items-end">
                  <span className="font-bold">Data:</span>
                  <span className="border-b border-neutral-600 w-32 ml-2"></span>
                </div>
              </div>
            </div>
            
            <div>
              <RenderFooter pageStr="Página 2 de 2" />
            </div>
          </div>
        </div>
      )}

      {/* ────────────────── 17. MODÊLO CARTÕES DE BENEFÍCIOS ────────────────── */}
      {modelo === 'cartoesBeneficios' && (
        <div className={paperClass}>
          <div>
            <RenderHeader title="TERMO DE RECEBIMENTO DE CARTÕES DE BENEFÍCIOS" />
            <div className="text-center font-serif text-[16px] font-bold text-neutral-900 uppercase tracking-widest mt-4 mb-6">
              
            </div>

            <div className="text-[12px] font-sans text-neutral-800 space-y-4">
              <div className="font-bold">
                {getVal(razaoSocial)}<br />
                CNPJ: {getVal(cnpjEmpresa)}
              </div>

              <div className="leading-relaxed">
                Eu, {getVal(nome)}<br />
                CPF: {getVal(cpf)} &nbsp;&nbsp;&nbsp;&nbsp; Função: {getVal(funcao)}
              </div>

              <div className="space-y-3 text-justify">
                <p>
                  Declaro ainda estar ciente de que, em caso de perda, extravio ou dano dos cartões, os custos
                  para emissão de segunda via serão de minha responsabilidade.
                </p>
                <p>
                  Estou ciente também de que o uso indevido, empréstimo a terceiros, comercialização ou venda
                  dos benefícios poderá ser considerado falta grave, sujeito às medidas disciplinares cabíveis.
                </p>
              </div>

              <div className="space-y-6 mt-4">
                <div>
                  <p className="font-bold">CARTÃO VALE TRANSPORTE</p>
                  <p>Número do Cartão: {getVal(numCartaoVt)}</p>
                  <p>RECEBIMENTO DO CARTÃO: ( {recebeuVt === 'SIM' ? 'X' : ' '} ) SIM &nbsp;&nbsp; ( {recebeuVt === 'NÃO' ? 'X' : ' '} ) NÃO</p>
                  
                  <div className="flex justify-center mt-4">
                    <div className="w-[300px] text-center border-t border-neutral-800 pt-1.5 text-[11px] font-bold">
                      Assinatura do Colaborador
                    </div>
                  </div>
                </div>

                <div>
                  <p className="font-bold">CARTÃO MOBILIDADE</p>
                  <p>RECEBIMENTO DO CARTÃO: ( {recebeuMobilidade === 'SIM' ? 'X' : ' '} ) SIM &nbsp;&nbsp; ( {recebeuMobilidade === 'NÃO' ? 'X' : ' '} ) NÃO</p>
                  
                  <div className="flex justify-center mt-4">
                    <div className="w-[300px] text-center border-t border-neutral-800 pt-1.5 text-[11px] font-bold">
                      Assinatura do Colaborador
                    </div>
                  </div>
                </div>

                <div>
                  <p className="font-bold">CARTÃO ALIMENTAÇÃO / DESJEJUM</p>
                  <p>RECEBIMENTO DO CARTÃO: ( {recebeuAlimentacao === 'SIM' ? 'X' : ' '} ) SIM &nbsp;&nbsp; ( {recebeuAlimentacao === 'NÃO' ? 'X' : ' '} ) NÃO</p>
                  
                  <div className="flex justify-center mt-4">
                    <div className="w-[300px] text-center border-t border-neutral-800 pt-1.5 text-[11px] font-bold">
                      Assinatura do Colaborador
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-right mt-8 text-[12px]">
                LOCAL, DATA: {getVal(dataDoc)}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ────────────────── 18. MODÊLO PRIMEIROS ACESSOS ────────────────── */}
      {modelo === 'primeirosAcessos' && (
        <div className={paperClass}>
          <div>
            <RenderHeader title="GUIA DE PRIMEIROS ACESSOS" />
            <RenderEmployeeData />

            <div className="text-[11px] text-neutral-800 leading-relaxed font-sans space-y-3">
              <h4 className="font-bold text-[12px] uppercase">Primeiro Acesso – Credenciais de Login</h4>
              
              <div className="whitespace-pre-line">
                {getVal(msgPrimeirosAcessos)}
              </div>

              <div className="space-y-2.5">
                <div>
                  <h5 className="font-bold text-[11px] text-neutral-600">Computador (Windows)</h5>
                  <div className="grid grid-cols-[140px_1fr] gap-x-2 mt-0.5 items-center">
                    <span className="font-bold">Usuário:</span>
                    <span className="border-b border-neutral-300 pb-0.5 block">{getVal(usuarioWindows) || '\u00A0'}</span>
                    <span className="font-bold">Senha:</span>
                    <span className="border-b border-neutral-300 pb-0.5 block">{getVal(senhaWindows) || '\u00A0'}</span>
                  </div>
                </div>

                <div>
                  <h5 className="font-bold text-[11px] text-neutral-600">E-mail Corporativo</h5>
                  <div className="grid grid-cols-[140px_1fr] gap-x-2 mt-0.5 items-center">
                    <span className="font-bold">E-mail:</span>
                    <span className="border-b border-neutral-300 pb-0.5 block">{getVal(emailCorporativo) || '\u00A0'}</span>
                    <span className="font-bold">Senha:</span>
                    <span className="border-b border-neutral-300 pb-0.5 block">{getVal(senhaEmail) || '\u00A0'}</span>
                  </div>
                </div>

                <div>
                  <h5 className="font-bold text-[11px] text-neutral-600">Microsoft Teams</h5>
                  <div className="grid grid-cols-[140px_1fr] gap-x-2 mt-0.5 items-center">
                    <span className="font-bold">Usuário:</span>
                    <span>Mesmo e-mail corporativo</span>
                    <span className="font-bold">Senha:</span>
                    <span className="border-b border-neutral-300 pb-0.5 block">{getVal(senhaTeams) || '\u00A0'}</span>
                  </div>
                </div>

                <div>
                  <h5 className="font-bold text-[11px] text-neutral-600">Sistema Protheus</h5>
                  <div className="grid grid-cols-[140px_1fr] gap-x-2 mt-0.5 items-center">
                    <span className="font-bold">Usuário:</span>
                    <span className="border-b border-neutral-300 pb-0.5 block">{getVal(usuarioProtheus) || '\u00A0'}</span>
                    <span className="font-bold">Senha:</span>
                    <span className="border-b border-neutral-300 pb-0.5 block">{getVal(senhaProtheus) || '\u00A0'}</span>
                  </div>
                </div>

                <div>
                  <h5 className="font-bold text-[11px] text-neutral-600">Outros Sistemas</h5>
                  <div className="grid grid-cols-[140px_1fr] gap-x-2 mt-0.5 items-center">
                    <span className="font-bold">Sistema:</span>
                    <span className="border-b border-neutral-300 pb-0.5 block">{getVal(outroSistemaNome) || '\u00A0'}</span>
                    <span className="font-bold">Usuário:</span>
                    <span className="border-b border-neutral-300 pb-0.5 block">{getVal(outroSistemaUsuario) || '\u00A0'}</span>
                    <span className="font-bold">Senha:</span>
                    <span className="border-b border-neutral-300 pb-0.5 block">{getVal(outroSistemaSenha) || '\u00A0'}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <h5 className="font-bold text-[11px] mb-1">Observações</h5>
                <ul className="list-disc pl-5 space-y-0.5">
                  <li>No primeiro acesso, altere sua senha caso seja solicitado.</li>
                  <li>Não compartilhe suas credenciais de acesso.</li>
                  <li>Em caso de qualquer dificuldade para acessar os sistemas, entre em contato com o RH ou com o setor de TI.</li>
                </ul>
              </div>

              <div className="mt-4 font-bold">
                Desejamos sucesso nessa nova etapa e seja muito bem-vindo(a) à equipe!
              </div>


            </div>
          </div>

          <div>
            <RenderFooter />
          </div>
        </div>
      )}

      {/* ────────────────── 19. MODÊLO ERRATA DESLIGAMENTO ────────────────── */}
      {modelo === 'errataDesligamento' && (
        <div className={paperClass}>
          <div>
            <RenderHeader title="ERRATA AO AVISO DE DESLIGAMENTO" />

            <div className="text-[12px] font-sans text-neutral-800 space-y-4 text-justify mt-8">
              {textoErrata && textoErrata.split('\n').map((para, i) => (
                para.trim() ? (
                  <p 
                    key={i} 
                    dangerouslySetInnerHTML={{ 
                      __html: para.replace(/{dataDesligamento}/g, `<strong>${dataDesligamento || '____/____/____'}</strong>`) 
                    }} 
                  />
                ) : null
              ))}
            </div>
          </div>

          <div>
            <RenderSignatures />
            <RenderFooter pageStr="Página 1 de 1" />
          </div>
        </div>
      )}

      {/* ────────────────── 20. MODÊLO ALTERAÇÃO DE FUNÇÃO ────────────────── */}
      {modelo === 'alteracaoFuncao' && (
        <div className={paperClass}>
          <div>
            <RenderHeader title="TERMO DE ALTERAÇÃO DE FUNÇÃO" />
            
            <div className="text-[12px] font-sans text-neutral-800 space-y-6 text-justify mt-10">
              <p>
                Por meio deste termo, a empresa {getVal(razaoSocial)} informa a alteração de função do(a) colaborador(a) abaixo identificado(a), em razão da adequação das atividades desempenhadas à estrutura organizacional e aos riscos ocupacionais associados à sua área de atuação.
              </p>
              
              <p>
                A presente alteração tem caráter administrativo e visa assegurar a compatibilidade entre as atividades efetivamente exercidas, o respectivo Grupo Homogêneo de Exposição (GHE) e os registros funcionais da empresa, em conformidade com as normas de saúde e segurança do trabalho.
              </p>
              
              <div className="border-2 border-[#f37021] rounded-lg p-6 my-8 text-[12px]">
                <div className="space-y-4">
                  <div className="flex">
                    <span className="font-bold mr-2 uppercase">Colaborador(a):</span>
                    <span className="flex-1 border-b border-neutral-400">{getVal(nome)}</span>
                  </div>
                  <div className="flex">
                    <span className="font-bold mr-2 uppercase">CPF:</span>
                    <span className="flex-1 border-b border-neutral-400">{getVal(cpf)}</span>
                  </div>
                  <div className="flex">
                    <span className="font-bold mr-2 uppercase">Matrícula:</span>
                    <span className="flex-1 border-b border-neutral-400 max-w-[200px]">{getVal(matricula)}</span>
                  </div>
                  <div className="flex">
                    <span className="font-bold mr-2 uppercase">Função Atual:</span>
                    <span className="flex-1 border-b border-neutral-400">{getVal(funcao)}</span>
                  </div>
                  <div className="flex">
                    <span className="font-bold mr-2 uppercase">Nova Função:</span>
                    <span className="flex-1 border-b border-neutral-400">{getVal(novaFuncao)}</span>
                  </div>
                  <div className="flex">
                    <span className="font-bold mr-2 uppercase">Data da Alteração:</span>
                    <span className="flex-1 border-b border-neutral-400 max-w-[150px]">{getVal(dataAlteracaoFuncao)}</span>
                  </div>
                </div>
              </div>
              
              <p>
                Ressaltamos que esta alteração não implica, necessariamente, mudança salarial ou promoção, tratando-se de adequação administrativa de função.
              </p>
              
              <p>
                Agradecemos o comprometimento e a dedicação, e contamos com sua colaboração para o contínuo sucesso de nossa equipe.
              </p>
            </div>
          </div>

          <div>
            <RenderSignatures />
            <RenderFooter pageStr="Página 1 de 1" />
          </div>
        </div>
      )}

      {/* ────────────────── 21. MODÊLO SUSPENSÃO ────────────────── */}
      {modelo === 'suspensao' && (
        <div className={paperClass}>
          <div>
            <RenderHeader title="CARTA DE SUSPENSÃO" />
            
            <div className="text-[12px] font-sans text-neutral-800 space-y-4 text-justify mt-10">
              <p>
                Prezado(a) Sr(a). <strong>{getVal(nome)}</strong> na qualidade de empregador, suspendemos V. Sª devido a ato que constitui falta grave <strong>destacado</strong> em <strong>NEGRITO</strong> e relatado abaixo:
              </p>
              
              <ul className="space-y-1 font-bold">
                {alineaSuspensao === 'a' && <li>- Alínea a: Atos de improbidade;</li>}
                {alineaSuspensao === 'b' && <li>- Alínea b: Incontinência de Conduta ou Mau Procedimento;</li>}
                {alineaSuspensao === 'e' && <li>- Alínea e: Desídia no Desempenho das Funções;</li>}
                {alineaSuspensao === 'f' && <li>- Alínea f: Embriaguez Habitual ou em Serviço;</li>}
                {alineaSuspensao === 'g' && <li>- Alínea g: Violação de Segredo da Empresa;</li>}
                {alineaSuspensao === 'h' && <li>- Alínea h: Ato de Indisciplina ou de Insubordinação;</li>}
                {alineaSuspensao === 'i' && <li>- Alínea i: Ato lesivo da honra ou da boa fama praticado contra o empregador e superiores hierárquicos.</li>}
              </ul>
              
              <p>
                <strong>Relato do ocorrido:</strong> {getVal(relatoSuspensao)}
              </p>
              
              <p>
                Diante da falta grave cometida, aplicamos a pena de <strong>SUSPENSÃO</strong> do contrato de trabalho <strong>por {getVal(diasSuspensao)} dias contados a partir do dia {getVal(dataInicioSuspensao)} devendo apresentar-se ao trabalho novamente no dia {getVal(dataRetornoSuspensao)}</strong>, ficando V. Sa. desde já ciente que o excesso de medidas disciplinares ou gravidade delas pode ocasionar dispensa por justa causa.
              </p>

              <p>
                Caso haja a recusa no recebimento da presente documento, para validação da mesma serão colhidas as assinaturas de 2 (duas) testemunhas, comprovando, portanto, a sua ciência, independentemente de sua assinatura.
              </p>

              <p>
                Colocamo-nos à disposição para sanar eventuais dúvidas.
                <br />
                Sem mais para o momento.
              </p>
            </div>
          </div>

          <div>
            <div className="mt-8 mb-6 text-right text-[11px] text-neutral-700 font-sans">
              {getVal(dataDoc)}.
            </div>
            
            <div className="grid grid-cols-2 gap-8 text-center text-[10px] font-sans">
              <div className="flex flex-col items-center">
                <div className="w-full border-t border-neutral-800 pt-1.5 font-bold text-neutral-900 uppercase">
                  ASSINATURA DO EMPREGADOR
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-full border-t border-neutral-800 pt-1.5 font-bold text-neutral-900 uppercase">
                  ASSINATURA DO EMPREGADO(A)
                </div>
              </div>
            </div>

            <div className="mt-8 w-full border-t border-neutral-800 pt-1.5 font-bold text-neutral-900 uppercase text-[10px] text-center mb-10">
              Recusa do Funcionário em Assinar
            </div>
            
            <div className="grid grid-cols-2 gap-8 text-center text-[10px] font-sans">
              <div className="flex flex-col items-center">
                <div className="w-full border-t border-neutral-800 pt-1.5 font-bold text-neutral-900 uppercase">
                  ASSINATURA DA TESTEMUNHA
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-full border-t border-neutral-800 pt-1.5 font-bold text-neutral-900 uppercase">
                  ASSINATURA DA TESTEMUNHA
                </div>
              </div>
            </div>
            <RenderFooter pageStr="Página 1 de 1" />
          </div>
        </div>
      )}

      {/* ────────────────── 22. AVISO PRÉVIO INDENIZADO ────────────────── */}
      {modelo === 'avisoPrevioIndenizado' && (
        <div className={paperClass}>
          <div>
            <RenderHeader title="AVISO PREVIO INDENIZADO" />
            <div className="text-center font-bold text-xs text-neutral-900 mb-6 -mt-2 lowercase">
              de empregador para empregado
            </div>

            <div className="border border-neutral-800 text-[11px] font-sans">
              <div className="flex border-b border-neutral-800">
                <div className="p-1.5 flex-1 border-r border-neutral-800 font-bold uppercase">
                  Empresa: <span className="font-normal">{getVal(razaoSocial)}</span>
                </div>
                <div className="p-1.5 w-32 text-center">
                  {getVal(codigoEmpresaAviso)}
                </div>
              </div>
              <div className="p-1.5 border-b border-neutral-800 font-bold uppercase">
                Endereço: <span className="font-normal">{getVal(enderecoEmpresa)}</span>
              </div>
              <div className="flex border-b border-neutral-800">
                <div className="p-1.5 flex-1 border-r border-neutral-800 font-bold uppercase">
                  Funcionário: <span className="font-normal">{getVal(nome)}</span>
                </div>
                <div className="p-1.5 w-32 text-center">
                  ( {getVal(matricula)} )
                </div>
              </div>
              <div className="grid grid-cols-3">
                <div className="p-1.5 border-r border-neutral-800">
                  <div className="font-bold uppercase">CTPS</div>
                  <div>{getVal(ctpsAviso)}</div>
                </div>
                <div className="p-1.5 border-r border-neutral-800">
                  <div className="font-bold uppercase">Admissão</div>
                  <div>{getVal(admissaoAviso)}</div>
                </div>
                <div className="p-1.5">
                  <div className="font-bold uppercase">Função</div>
                  <div>{getVal(funcao)}</div>
                </div>
              </div>
            </div>

            <div className="text-[12px] font-sans text-neutral-900 my-8 text-justify">
              Nos termos dos Artigos 487 a 491 da CLT fica V.Sas. avisado que decidimos rescindir seu Contrato de Trabalho a partir desta data. Informamos que o Aviso Prévio será Indenizado devendo V.Sas. comparecer para receber as parcelas rescisórias.
            </div>

            <div className="border border-neutral-800 text-[11px] font-sans">
              <div className="flex border-b border-neutral-800 min-h-[60px]">
                <div className="p-1.5 w-32 border-r border-neutral-800">
                  <div className="font-bold">Data:</div>
                  <div className="mt-2">{getVal(dataAviso)}</div>
                </div>
                <div className="p-1.5 flex-1">
                  <div className="font-bold">Assinatura da empresa:</div>
                </div>
              </div>
              <div className="flex">
                <div className="w-32 border-r border-neutral-800 flex items-end justify-center pb-1.5 text-[9px]">
                  Impressão digital
                </div>
                <div className="flex-1 flex flex-col">
                  <div className="text-center p-1.5 border-b border-neutral-800">
                    {getVal(dataDoc)}
                  </div>
                  <div className="text-center p-1.5 text-[10px] flex-1 flex flex-col items-center justify-between min-h-[60px]">
                    <span className="font-bold pt-1">Local e Data</span>
                    <span className="pb-1">Ciente - Assinatura do empregado</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 border border-neutral-800 text-[11px] font-sans">
              <div className="p-1.5 font-bold border-b border-neutral-800">
                Testemunhas:
              </div>
              <div className="p-1.5 border-b border-neutral-800 min-h-[28px] flex items-center">
                <span className="font-bold mr-2">Nome:</span>
              </div>
              <div className="p-1.5 border-b border-neutral-800 min-h-[28px] flex items-center">
                <span className="font-bold mr-2">Ass.:</span>
              </div>
              <div className="p-1.5 border-b border-neutral-800 min-h-[28px] flex items-center">
                <span className="font-bold mr-2">Nome:</span>
              </div>
              <div className="p-1.5 min-h-[28px] flex items-center">
                <span className="font-bold mr-2">Ass.:</span>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
