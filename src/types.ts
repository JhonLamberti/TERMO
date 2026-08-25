export type ModeloTermo = 
  | 'jornada' 
  | 'promocao' 
  | 'substituicao'
  | 'advertencia'
  | 'fgts'
  | 'proposta'
  | 'desconto'
  | 'ferias'
  | 'inss'
  | 'reajuste'
  | 'posdesligamento'
  | 'dut'
  | 'checklistDemissional'
  | 'checklistAdmissional'
  | 'exercicioFuncoes'
  | 'listaPresenca'
  | 'cartoesBeneficios'
  | 'primeirosAcessos'
  | 'errataDesligamento'
  | 'alteracaoFuncao'
  | 'suspensao'
  | 'avisoPrevioIndenizado';

export interface FormState {
  logoData: string;
  modelo: ModeloTermo;
  codigo: string;
  revisao: string;
  razaoSocial: string;
  cnpjEmpresa: string;
  telEmpresa: string;
  siteEmpresa: string;
  enderecoEmpresa: string;
  dataDoc: string;
  nome: string;
  cpf: string;
  matricula: string;
  funcao: string;
  unidade: string;
  
  // Jornada fields
  escalaAtual: string;
  novaEscala: string;
  horarioAtual: string;
  novoHorario: string;
  intervalo: string;
  vigencia: string;
  
  // Promocao fields
  novaFuncao: string;
  salario: string;
  vigPromo: string;
  msgPromo: string;
  
  // Substituicao fields
  substituido: string;
  cargoSubstituido: string;
  periodoAusencia: string;
  cargoDurante: string;
  periodoSub: string;

  // Advertencia fields
  tipoAdvertencia: string;
  motivoAdvertencia: string;
  relatoAdvertencia: string;

  // FGTS fields
  competenciaFgts: string;
  dataRecolhimentoFgts: string;
  obsFgts: string;

  // Proposta fields
  telefoneCandidato: string;
  enderecoCandidato: string;
  salarioProposta: string;
  dataAdmissao: string;
  validadeContrato: string;
  tipoContrato: string;
  horarioProposta: string;
  cargaSemanal: string;
  localTrabalho: string;
  beneficiosProposta: string;

  // Desconto fields
  motivoDesconto: string;
  valorDesconto: string;
  formaDesconto: string;
  obsDesconto: string;

  // Ferias fields
  periodoFerias: string;
  inicioFerias: string;
  motivoFerias: string;

  // INSS fields
  dataAfastamento: string;
  beneficioInss: string;
  beneficiosInss: string;

  // Reajuste fields
  salarioAnterior: string;
  percentualReajuste: string;
  novoSalarioReajuste: string;
  vigenciaReajuste: string;
  msgReajuste: string;

  // Pos-desligamento fields
  dataExameDemissional: string;
  horaExameDemissional: string;
  localExameDemissional: string;
  dataDesligamento: string;
  textoExameDemissional: string;
  textoPagamentoVerbas: string;
  textoDevolucaoPertences: string;
  obsPosDesligamento: string;
  responsavelEmpresa: string;
  cargoResponsavelEmpresa: string;

  // DUT fields
  admissaoDut: string;
  ultimoDiaTrabalhadoDut: string;
  cidadeDut: string;
  dataEmissaoDut: string;
  atestadosDut: string;
  orientacoesDut: string;

  // Checklist Demissional fields
  dataDesligamentoChecklist: string;
  responsavelChecklist: string;
  observacoesChecklist: string;
  checkData1: string;
  checkStatus1: string;
  checkData2: string;
  checkStatus2: string;
  checkData3: string;
  checkStatus3: string;
  checkData4: string;
  checkStatus4: string;
  checkData5: string;
  checkStatus5: string;
  checkData6: string;
  checkStatus6: string;
  checkData7: string;
  checkStatus7: string;
  checkData8: string;
  checkStatus8: string;

  // Checklist Admissional
  setorAdmissional: string;
  dataInicioAdmissional: string;
  responsavelAdmissional: string;

  // Exercicio de Funcoes
  rgExercicio: string;
  ctpsExercicio: string;
  serieCtpsExercicio: string;
  admissaoExercicio: string;
  inicioFuncaoExercicio: string;
  setorExercicio: string;
  atividadesExercicio: string;
  cidadeExercicio: string;
  dataEmissaoExercicio: string;
  responsavelExercicio: string;

  // Lista de Presenca
  dataIntegracao: string;
  horarioInicioIntegracao: string;
  horarioTerminoIntegracao: string;
  responsavelIntegracao: string;
  localIntegracao: string;
  // Errata
  textoErrata: string;
  // Alteração de Função
  dataAlteracaoFuncao: string;
  // Suspensão
  alineaSuspensao: string;
  relatoSuspensao: string;
  diasSuspensao: string;
  dataInicioSuspensao: string;
  dataRetornoSuspensao: string;
  // Aviso Prévio Indenizado
  codigoEmpresaAviso: string;
  ctpsAviso: string;
  admissaoAviso: string;
  dataAviso: string;
  // Cartoes Beneficios
  numCartaoVt: string;
  recebeuVt: 'SIM' | 'NÃO' | '';
  recebeuMobilidade: 'SIM' | 'NÃO' | '';
  recebeuAlimentacao: 'SIM' | 'NÃO' | '';

  // Primeiros Acessos
  usuarioWindows: string;
  senhaWindows: string;
  emailCorporativo: string;
  senhaEmail: string;
  senhaTeams: string;
  usuarioProtheus: string;
  senhaProtheus: string;
  outroSistemaNome: string;
  outroSistemaUsuario: string;
  outroSistemaSenha: string;
  msgPrimeirosAcessos: string;
}

export const INITIAL_VALUES: FormState = {
  logoData: '',
  modelo: 'jornada',
  codigo: 'RH-001',
  revisao: '00',
  razaoSocial: 'FTA PRODUTOS E SERVIÇOS INDUSTRIAIS LTDA',
  cnpjEmpresa: '09.433.059/0001-48',
  telEmpresa: '(27) 3063-8313',
  siteEmpresa: 'www.grupofta.com.br',
  enderecoEmpresa: 'Rua Alberto de Oliveira Santos, 42, Centro, Vitória - ES',
  dataDoc: 'Vitória - ES, 14 de junho de 2026',
  nome: 'NOME DO COLABORADOR',
  cpf: '000.000.000-00',
  matricula: '000000',
  funcao: 'FUNÇÃO ATUAL',
  unidade: 'CONTRATO / UNIDADE',
  
  // Jornada fields
  escalaAtual: '2x2',
  novaEscala: '4x4',
  horarioAtual: '07:00 às 19:00',
  novoHorario: '07:00 às 19:00 / 19:00 às 07:00',
  intervalo: '1 hora',
  vigencia: '16/03/2026',
  
  // Promocao fields
  novaFuncao: 'SUPERVISOR II',
  salario: 'R$ 4.984,20',
  vigPromo: '02/2026',
  msgPromo: 'Sua jornada no Grupo FTA tem sido marcada por dedicação, competência e comprometimento. Esta promoção representa o reconhecimento pela sua contribuição e pelo seu crescimento profissional.',
  
  // Substituicao fields
  substituido: 'NOME DO SUBSTITUÍDO',
  cargoSubstituido: 'CARGO',
  periodoAusencia: '__/__/____ a __/__/____',
  cargoDurante: 'LÍDER',
  periodoSub: '__/__/____ a __/__/____',

  // Advertencia
  tipoAdvertencia: 'Desídia no desempenho das respectivas funções',
  motivoAdvertencia: 'Não comunicação imediata do ocorrido',
  relatoAdvertencia: 'Descreva aqui, de forma objetiva, o ocorrido, informando data, horário, local, conduta observada e demais informações relevantes.',

  // FGTS
  competenciaFgts: '__/____',
  dataRecolhimentoFgts: '__/__/____',
  obsFgts: 'Declaramos, para os devidos fins, que os recolhimentos de FGTS foram realizados conforme informações constantes nos registros da empresa.',

  // Proposta
  telefoneCandidato: '',
  enderecoCandidato: '',
  salarioProposta: 'R$ 0,00',
  dataAdmissao: '__/__/____',
  validadeContrato: '__/__/____',
  tipoContrato: 'Determinado',
  horarioProposta: '07:00 às 17:00',
  cargaSemanal: '44 horas',
  localTrabalho: 'Unidade / Contrato',
  beneficiosProposta: 'Vale-alimentação/refeição; Vale-transporte; Plano de saúde; Plano odontológico; Seguro de vida.',

  // Desconto
  motivoDesconto: 'Adiantamento salarial',
  valorDesconto: 'R$ 0,00',
  formaDesconto: 'Parcela única',
  obsDesconto: 'Descreva a origem do desconto e as condições acordadas entre as partes.',

  // Ferias
  periodoFerias: '__/__/____ a __/__/____',
  inicioFerias: '__/__/____',
  motivoFerias: 'O cancelamento ocorre em razão do encerramento do vínculo empregatício, mediante rescisão contratual, tornando incompatível a concessão do período de férias anteriormente comunicado.',

  // INSS
  dataAfastamento: '__/__/____',
  beneficioInss: '',
  beneficiosInss: 'Vale-alimentação/refeição: conforme política interna; Vale-transporte: suspenso durante afastamento; Plano de saúde: conforme política interna; Plano odontológico: conforme política interna; Seguro de vida: mantido conforme apólice vigente.',

  // Reajuste
  salarioAnterior: 'R$ 0,00',
  percentualReajuste: '0%',
  novoSalarioReajuste: 'R$ 0,00',
  vigenciaReajuste: '__/__/____',
  msgReajuste: 'Este reajuste representa o reconhecimento pelo comprometimento, dedicação, desempenho profissional e contribuição para os resultados da empresa.',

  // Pos-desligamento
  dataExameDemissional: '__/__/____',
  horaExameDemissional: '____',
  localExameDemissional: 'CLÍNICA / LOCAL DO EXAME',
  dataDesligamento: '__/__/____',
  textoExameDemissional: 'Deverá ser realizado no dia {data}, às {hora}, em {local}.',
  textoPagamentoVerbas: 'O pagamento será realizado no prazo legal de até 10 (dez) dias corridos, contados a partir da data do desligamento.',
  textoDevolucaoPertences: 'O(A) colaborador(a) deverá realizar a devolução de todos os pertences da empresa que estejam sob sua responsabilidade, incluindo, quando aplicável: crachá, chaves, uniformes, EPIs, ferramentas, equipamentos, documentos e quaisquer outros bens pertencentes à empresa.',
  obsPosDesligamento: 'Após a conclusão dos procedimentos, o(a) colaborador(a) receberá os documentos rescisórios e demais orientações pertinentes, quando aplicável.',
  responsavelEmpresa: 'RESPONSÁVEL PELA EMPRESA',
  cargoResponsavelEmpresa: 'RH / RESPONSÁVEL',

  // DUT
  admissaoDut: '__/__/____',
  ultimoDiaTrabalhadoDut: '__/__/____',
  cidadeDut: 'FUNDÃO',
  dataEmissaoDut: '26 de MAIO de 2026',
  atestadosDut: '1º - Atestado: 23/05/2026 a 21/06/2026 – 30 dias | CID S82 | Dra. YASMIN CARVALHO ALVES - CRM 23774 - ES\n1º - Laudo: 23/05/2026 a 21/06/2026 – 30 dias | CID S82 | Dra. YASMIN CARVALHO ALVES - CRM 23774 - ES',
  orientacoesDut: 'A perícia pode ser agendada pelo site do INSS ou pelo aplicativo Meu INSS, ou ainda ligando na Central do INSS (135).\n\nO empregado deve apresentar ao INSS no dia da perícia: documento de identificação oficial com foto (RG, CNH ou CTPS), CPF, documentos médicos decorrentes do tratamento de saúde e declaração assinada pelo empregador informando a data do último dia trabalhado.\n\nÉ de responsabilidade do trabalhador informar a empresa quanto ao andamento e atualizações do benefício.',

  // Checklist Demissional
  dataDesligamentoChecklist: '__/__/____',
  responsavelChecklist: 'RESPONSÁVEL PELO PROCESSO',
  observacoesChecklist: 'Registre aqui observações relevantes sobre o processo demissional.',
  checkData1: '__/__/____',
  checkStatus1: 'Pendente',
  checkData2: '__/__/____',
  checkStatus2: 'Pendente',
  checkData3: '__/__/____',
  checkStatus3: 'Pendente',
  checkData4: '__/__/____',
  checkStatus4: 'Pendente',
  checkData5: '__/__/____',
  checkStatus5: 'Pendente',
  checkData6: '__/__/____',
  checkStatus6: 'Pendente',
  checkData7: '__/__/____',
  checkStatus7: 'Pendente',
  checkData8: '__/__/____',
  checkStatus8: 'Pendente',

  // Checklist Admissional
  setorAdmissional: 'NOME DO SETOR',
  dataInicioAdmissional: '__/__/____',
  responsavelAdmissional: 'NOME DO RESPONSÁVEL RH',

  // Exercicio de Funcoes
  rgExercicio: '0.000.000',
  ctpsExercicio: '0000000',
  serieCtpsExercicio: '00',
  admissaoExercicio: '__/__/____',
  inicioFuncaoExercicio: '__/__/____',
  setorExercicio: 'NOME DO SETOR',
  atividadesExercicio: '• Manutenção no sistema supervisório da Fábrica;\n• Manutenção nas máquinas-ferramenta com comando CNC;\n• Elaboração do cronograma de Manutenção Preventiva;\n• Programação de PLC´s do Setor;\n• Preparar equipamento.',
  cidadeExercicio: 'NOME DA CIDADE',
  dataEmissaoExercicio: 'DIA de MÊS de 20__',
  responsavelExercicio: 'NOME DO RESPONSÁVEL',

  // Lista de Presenca
  dataIntegracao: '__/__/____',
  horarioInicioIntegracao: '00:00',
  horarioTerminoIntegracao: '00:00',
  responsavelIntegracao: 'NOME DO RESPONSÁVEL',
  localIntegracao: 'LOCAL DA INTEGRAÇÃO',
  // Errata
  textoErrata: 'Por meio deste documento, a empresa informa que o Aviso de Desligamento por Término de Contrato anteriormente entregue ao colaborador continha erro material na data informada.\n\nEsclarecemos que o equívoco refere-se exclusivamente à data constante no aviso, não havendo qualquer alteração na efetiva data de encerramento do contrato de trabalho.\n\nO desligamento do colaborador ocorreu em {dataDesligamento}, em razão do término do contrato, conforme previsto, sendo esta a data considerada para todos os efeitos legais, inclusive para o encerramento do vínculo empregatício, apuração da jornada, fechamento do ponto e cálculo das verbas rescisórias.\n\nDessa forma, fica retificada apenas a data constante no aviso anteriormente emitido, permanecendo inalteradas todas as demais informações e os efeitos decorrentes do desligamento.\n\nPara que produza os devidos efeitos, firma-se a presente errata.',
  // Alteração de Função
  dataAlteracaoFuncao: '__/__/____',
  // Suspensão
  alineaSuspensao: 'h',
  relatoSuspensao: 'Em __/__/____ colaborador se ausentou do local de trabalho antes do término da jornada do dia, sem autorização da liderança e sem prévia comunicação.\nTal atitude caracteriza descumprimento das obrigações contratuais e traz impactos negativos ao andamento das atividades operacionais da Empresa.',
  diasSuspensao: '3',
  dataInicioSuspensao: '__/__/____',
  dataRetornoSuspensao: '__/__/____ (sexta-feira)',
  // Aviso Prévio Indenizado
  codigoEmpresaAviso: '( 00989 )',
  ctpsAviso: '00000000 / 00000',
  admissaoAviso: '__/__/____',
  dataAviso: '__/__/____',
  // Cartoes Beneficios
  numCartaoVt: '00000000000000-0',
  recebeuVt: 'SIM',
  recebeuMobilidade: 'NÃO',
  recebeuAlimentacao: 'SIM',

  // Primeiros Acessos
  usuarioWindows: '',
  senhaWindows: '',
  emailCorporativo: '',
  senhaEmail: '',
  senhaTeams: '',
  usuarioProtheus: '',
  senhaProtheus: '',
  outroSistemaNome: '',
  outroSistemaUsuario: '',
  outroSistemaSenha: '',
  msgPrimeirosAcessos: 'Seja bem-vindo(a)!\nAbaixo estão os acessos necessários para iniciar suas atividades.',
};
