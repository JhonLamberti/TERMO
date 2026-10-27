import sys

def main():
    with open('src/components/DocumentPaper.tsx', 'r') as f:
        content = f.read()

    insertion = """
      {/* ────────────────── 17. MODÊLO CARTÕES DE BENEFÍCIOS ────────────────── */}
      {modelo === 'cartoesBeneficios' && (
        <div className={paperClass}>
          <div>
            <RenderDocumentHeader />
            <div className="text-center font-serif text-[18px] font-bold text-neutral-900 uppercase tracking-widest mt-6 mb-8">
              TERMO DE RECEBIMENTO DE CARTÕES DE BENEFÍCIOS
            </div>

            <div className="text-[14px] font-sans text-neutral-800 space-y-8">
              <div className="font-bold">
                {getVal(razaoSocial)}<br />
                CNPJ: {getVal(cnpjEmpresa)}
              </div>

              <div className="leading-relaxed">
                Eu, {getVal(nome)}<br />
                CPF: {getVal(cpf)} &nbsp;&nbsp;&nbsp;&nbsp; Função: {getVal(funcao)}
              </div>

              <div className="space-y-4 text-justify">
                <p>
                  Declaro ainda estar ciente de que, em caso de perda, extravio ou dano dos cartões, os custos
                  para emissão de segunda via serão de minha responsabilidade.
                </p>
                <p>
                  Estou ciente também de que o uso indevido, empréstimo a terceiros, comercialização ou venda
                  dos benefícios poderá ser considerado falta grave, sujeito às medidas disciplinares cabíveis.
                </p>
              </div>

              <div className="space-y-10 mt-8">
                <div>
                  <p className="font-bold">CARTÃO VALE TRANSPORTE</p>
                  <p>Número do Cartão: {getVal(numCartaoVt)}</p>
                  <p>RECEBIMENTO DO CARTÃO: ( {recebeuVt === 'SIM' ? 'X' : ' '} ) SIM &nbsp;&nbsp; ( {recebeuVt === 'NÃO' ? 'X' : ' '} ) NÃO</p>
                  
                  <div className="flex justify-center mt-12">
                    <div className="w-[300px] text-center border-t border-neutral-800 pt-2 text-[12px] font-bold">
                      Assinatura do Colaborador
                    </div>
                  </div>
                </div>

                <div>
                  <p className="font-bold">CARTÃO MOBILIDADE</p>
                  <p>RECEBIMENTO DO CARTÃO: ( {recebeuMobilidade === 'SIM' ? 'X' : ' '} ) SIM &nbsp;&nbsp; ( {recebeuMobilidade === 'NÃO' ? 'X' : ' '} ) NÃO</p>
                  
                  <div className="flex justify-center mt-12">
                    <div className="w-[300px] text-center border-t border-neutral-800 pt-2 text-[12px] font-bold">
                      Assinatura do Colaborador
                    </div>
                  </div>
                </div>

                <div>
                  <p className="font-bold">CARTÃO ALIMENTAÇÃO / DESJEJUM</p>
                  <p>RECEBIMENTO DO CARTÃO: ( {recebeuAlimentacao === 'SIM' ? 'X' : ' '} ) SIM &nbsp;&nbsp; ( {recebeuAlimentacao === 'NÃO' ? 'X' : ' '} ) NÃO</p>
                  
                  <div className="flex justify-center mt-12">
                    <div className="w-[300px] text-center border-t border-neutral-800 pt-2 text-[12px] font-bold">
                      Assinatura do Colaborador
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-right mt-16 text-[14px]">
                LOCAL, DATA: {getVal(dataDoc)}
              </div>
            </div>
          </div>
        </div>
      )}
"""

    # We need to extract state variables used
    vars = "numCartaoVt, recebeuVt, recebeuMobilidade, recebeuAlimentacao"
    if vars not in content:
        content = content.replace("localIntegracao,", f"localIntegracao, {vars},")

    if "modelo === 'cartoesBeneficios'" not in content:
        content = content.replace("    </div>\n  );\n}\n", insertion + "    </div>\n  );\n}\n")

    with open('src/components/DocumentPaper.tsx', 'w') as f:
        f.write(content)
    print("Paper patched")

if __name__ == '__main__':
    main()
