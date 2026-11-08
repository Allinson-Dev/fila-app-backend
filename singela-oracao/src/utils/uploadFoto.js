const CLOUD_NAME = 'zigqostq'
const APPSCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwD30gPu_qyL_8HzIm2QQFnntT-d2fo5dmxMDKUJ7qm0rkmylYQHYO2sWnY9pOjL44K/exec'

export async function enviarFotoParaNuvem(arquivo) {
  if (!arquivo) return { sucesso: false }
  
  try {
    const formData = new FormData()
    formData.append('file', arquivo)
    formData.append('upload_preset', 'singela_oracao')
    
    const resposta = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      { method: 'POST', body: formData }
    )
    
    const dados = await resposta.json()
    if (dados.secure_url) {
      return { sucesso: true, url: dados.secure_url }
    }
    return { sucesso: false, mensagem: 'Não foi possível enviar.' }
  } catch (erro) {
    console.error('Erro:', erro)
    return { sucesso: false, mensagem: 'Erro ao enviar foto.' }
  }
}

export async function enviarParaPlanilha(chave, valor) {
  try {
    await fetch(APPSCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ [chave]: valor })
    })
    return { sucesso: true }
  } catch (erro) {
    console.error('Erro ao enviar para planilha:', erro)
    return { sucesso: false }
  }
}