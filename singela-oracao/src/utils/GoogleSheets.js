const SHEET_ID = '1H1kuAYqPGqIx624f4Izw-rti5wWNgZnqwixDBzAL-Os'
const SHEET_NAME = 'Planilha1'

export async function carregarDadosPlanilha() {
  try {
    const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(SHEET_NAME)}`
    const resposta = await fetch(url, { cache: 'no-store' })
    const texto = await resposta.text()
    const json = JSON.parse(texto.substring(47, texto.length - 2))
    
    const dados = {}
    json.table.rows.forEach(linha => {
      const chave = linha.c?.[0]?.v
      const valor = linha.c?.[1]?.v || ''
      if (chave) dados[chave] = valor
    })
    return dados
  } catch (erro) {
    console.error('Erro ao carregar planilha:', erro)
    return null
  }
}

export function organizarDados(dadosBrutos) {
  if (!dadosBrutos) return null
  
  // 📸 Slides do Banner
  const slides = []
  for (let i = 1; i <= 3; i++) {
    if (dadosBrutos[`banner${i}_titulo`]) {
      slides.push({
        id: i,
        titulo: dadosBrutos[`banner${i}_titulo`],
        subtitulo: dadosBrutos[`banner${i}_subtitulo`] || '',
        imagem: dadosBrutos[`banner${i}_imagem`] || ''
      })
    }
  }
  
  // ✨ Produtos — DETECTA TODOS automaticamente!
  const produtos = []
  let numero = 1
  while (dadosBrutos[`produto${numero}_nome`]) {
    produtos.push({
      id: numero,
      nome: dadosBrutos[`produto${numero}_nome`],
      desc: dadosBrutos[`produto${numero}_desc`] || '',
      preco: dadosBrutos[`produto${numero}_preco`] || '',
      img: dadosBrutos[`produto${numero}_imagem`] || ''
    })
    numero++ // Continua procurando até não encontrar mais
  }
  
  return {
    slides,
    modelos: produtos,
    contato: {
      whatsapp: dadosBrutos.whatsapp || '',
      endereco: dadosBrutos.endereco || ''
    },
    logo: {
      url: dadosBrutos.logo_url || '/logo.png'
    }
  }
}