import { useState, useEffect, useCallback } from 'react'
import {
  Menu, X, ChevronRight, Phone, ChevronLeft, Upload, Save, RefreshCw, Image, Edit3
} from 'lucide-react'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

const PRODUTOS_POR_SLIDE = 4
const INTERVALO_ROTACAO = 5000

// Dados padrão - armazenamento local
const DADOS_INICIAIS = {
  whatsapp: '',
  endereco: '',
  banner1_titulo: 'Com Fé e Carinho',
  banner1_subtitulo: 'Terços artesanais feitos com amor e devoção',
  banner1_imagem: '',
  banner2_titulo: 'Feitos à Mão',
  banner2_subtitulo: 'Peças únicas, cheias de significado',
  banner2_imagem: '',
  banner3_titulo: 'Sua Oração Sempre Presente',
  banner3_subtitulo: 'Personalizados do seu jeito',
  banner3_imagem: '',
  produto1_nome: 'Terço Tradicional',
  produto1_desc: 'Contas em madeira, feito à mão',
  produto1_preco: 'R$ 45,00',
  produto1_imagem: '',
  produto2_nome: 'Terço Personalizado',
  produto2_desc: 'Com nome e cor à sua escolha',
  produto2_preco: 'R$ 65,00',
  produto2_imagem: '',
  produto3_nome: 'Terço de Pedras',
  produto3_desc: 'Pedras naturais e detalhes em metal',
  produto3_preco: 'R$ 85,00',
  produto3_imagem: '',
  produto4_nome: 'Terço Infantil',
  produto4_desc: 'Colorido e delicado para crianças',
  produto4_preco: 'R$ 38,00',
  produto4_imagem: '',
  produto5_nome: 'Terço Especial',
  produto5_desc: 'Detalhes em prata e acabamento refinado',
  produto5_preco: 'R$ 120,00',
  produto5_imagem: ''
}

function App() {
  const [formDados, setFormDados] = useState({})
  const [dadosCarregados, setDadosCarregados] = useState(null)
  const [painelAberto, setPainelAberto] = useState(false)
  const [abaAtiva, setAbaAtiva] = useState('textos')
  const [salvando, setSalvando] = useState(false)
  const [mensagemSalvo, setMensagemSalvo] = useState('')
  const [arquivoSelecionado, setArquivoSelecionado] = useState(null)
  const [fotoPrevia, setFotoPrevia] = useState('')
  const [localEscolhido, setLocalEscolhido] = useState('')
  const [enviandoFoto, setEnviandoFoto] = useState(false)
  const [cliquesLogo, setCliquesLogo] = useState(0)

  // Carregar dados do localStorage
  useEffect(() => {
    const salvos = localStorage.getItem('singela_dados')
    const dados = salvos ? JSON.parse(salvos) : DADOS_INICIAIS
    setFormDados(dados)
    setDadosCarregados(dados)
  }, [])

  const ativarPainelCliques = () => {
    setCliquesLogo(prev => {
      const novosCliques = prev + 1
      if (novosCliques >= 5) {
        setPainelAberto(true)
        return 0
      }
      return novosCliques
    })
  }

  const alterarCampo = (campo, valor) => {
    setFormDados(p => ({ ...p, [campo]: valor }))
    setMensagemSalvo('')
  }

  const salvarTextos = async () => {
    setSalvando(true)
    localStorage.setItem('singela_dados', JSON.stringify(formDados))
    await new Promise(r => setTimeout(r, 500))
    setSalvando(false)
    setMensagemSalvo('✅ Salvo! Recarregue para ver.')
    setTimeout(() => setMensagemSalvo(''), 3000)
    setDadosCarregados({ ...formDados })
  }

  const aoSelecionarArquivo = (e) => {
    const arq = e.target.files[0]
    if (arq) {
      if (fotoPrevia) URL.revokeObjectURL(fotoPrevia)
      setArquivoSelecionado(arq)
      setFotoPrevia(URL.createObjectURL(arq))
    }
  }

  const enviarESalvarFoto = async () => {
    if (!arquivoSelecionado || !localEscolhido) return
    setEnviandoFoto(true)

    const leitor = new FileReader()
    leitor.onload = () => {
      const novosDados = { ...formDados, [localEscolhido]: leitor.result }
      setFormDados(novosDados)
      localStorage.setItem('singela_dados', JSON.stringify(novosDados))
      setDadosCarregados(novosDados)
      alert('✅ Foto enviada!')
      limparFoto()
      setEnviandoFoto(false)
    }
    leitor.readAsDataURL(arquivoSelecionado)
  }

  const limparFoto = () => {
    if (fotoPrevia) URL.revokeObjectURL(fotoPrevia)
    setArquivoSelecionado(null)
    setFotoPrevia('')
    setLocalEscolhido('')
  }

  const gerarOpcoesFoto = () => [
    { nome: 'Banner 1 - Imagem', valor: 'banner1_imagem' },
    { nome: 'Banner 2 - Imagem', valor: 'banner2_imagem' },
    { nome: 'Banner 3 - Imagem', valor: 'banner3_imagem' },
    { nome: 'Produto 1 - Foto', valor: 'produto1_imagem' },
    { nome: 'Produto 2 - Foto', valor: 'produto2_imagem' },
    { nome: 'Produto 3 - Foto', valor: 'produto3_imagem' },
    { nome: 'Produto 4 - Foto', valor: 'produto4_imagem' },
    { nome: 'Produto 5 - Foto', valor: 'produto5_imagem' }
  ]

  const renderizarProdutos = useCallback(() => {
    if (!dadosCarregados) return null

    const modelos = [
      { id: 1, nome: dadosCarregados.produto1_nome, desc: dadosCarregados.produto1_desc, preco: dadosCarregados.produto1_preco, img: dadosCarregados.produto1_imagem },
      { id: 2, nome: dadosCarregados.produto2_nome, desc: dadosCarregados.produto2_desc, preco: dadosCarregados.produto2_preco, img: dadosCarregados.produto2_imagem },
      { id: 3, nome: dadosCarregados.produto3_nome, desc: dadosCarregados.produto3_desc, preco: dadosCarregados.produto3_preco, img: dadosCarregados.produto3_imagem },
      { id: 4, nome: dadosCarregados.produto4_nome, desc: dadosCarregados.produto4_desc, preco: dadosCarregados.produto4_preco, img: dadosCarregados.produto4_imagem },
      { id: 5, nome: dadosCarregados.produto5_nome, desc: dadosCarregados.produto5_desc, preco: dadosCarregados.produto5_preco, img: dadosCarregados.produto5_imagem }
    ]

    const contato = { whatsapp: dadosCarregados.whatsapp }
    const precisaCarrossel = modelos.length > PRODUTOS_POR_SLIDE

    const ProdutoCard = ({ p }) => (
      <div className="group bg-white rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1 border border-amber-100/40">
        <img
          src={p.img || 'https://via.placeholder.com/400x500/F9F5F0/D4A5A5?text=Sem+Imagem'}
          alt={p.nome}
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="p-4">
          <h3 className="font-serif text-lg text-stone-800 group-hover:text-rose-600">
            {p.nome || 'Sem nome'}
          </h3>
          <p className="text-sm text-stone-600/70 mb-2">{p.desc}</p>
          <p className="font-medium text-rose-600 text-lg">{p.preco || '—'}</p>
          <a
            href={contato.whatsapp ? `https://wa.me/${contato.whatsapp.replace(/\D/g, '')}?text=Olá! Gostaria de ${encodeURIComponent(p.nome || 'produto')}` : '#'}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-block text-sm text-stone-700 hover:text-rose-600 underline"
          >
            Pedir →
          </a>
        </div>
      </div>
    )

    if (!precisaCarrossel) return (
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {modelos.map(p => <ProdutoCard key={p.id} p={p} />)}
      </div>
    )

    const grupos = []
    for (let i = 0; i < modelos.length; i += PRODUTOS_POR_SLIDE) {
      grupos.push(modelos.slice(i, i + PRODUTOS_POR_SLIDE))
    }
    return (
      <Carousel
        showArrows showThumbs={false} showIndicators infiniteLoop
        autoPlay interval={INTERVALO_ROTACAO}
        renderArrowNext={(ch) => (
          <button onClick={ch} className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-rose-500/90 text-white p-2 rounded-full hover:bg-rose-600">
            <ChevronRight size={20} />
          </button>
        )}
        renderArrowPrev={(ch) => (
          <button onClick={ch} className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-rose-500/90 text-white p-2 rounded-full hover:bg-rose-600">
            <ChevronLeft size={20} />
          </button>
        )}
      >
        {grupos.map((g, i) => (
          <div key={i} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 px-1">
            {g.map(p => <ProdutoCard key={p.id} p={p} />)}
          </div>
        ))}
      </Carousel>
    )
  }, [dadosCarregados])

  const Painel = () => (
    <div className="fixed inset-0 z-50 flex flex-col bg-amber-50 overflow-hidden">
      <div className="bg-amber-800 text-white py-3 px-4 flex justify-between items-center">
        <h2 className="font-serif text-xl">⚙️ Painel — Singela Oração</h2>
        <div className="flex items-center gap-4">
          <button onClick={() => window.location.reload()} className="flex items-center gap-1 text-sm hover:text-amber-200">
            <RefreshCw size={14} /> Atualizar
          </button>
          <button onClick={() => setPainelAberto(false)} className="flex items-center gap-2 text-sm hover:text-amber-200">
            <X size={16} /> Fechar
          </button>
        </div>
      </div>

      <div className="flex border-b border-amber-200 bg-white">
        <button
          onClick={() => setAbaAtiva('textos')}
          className={`px-6 py-3 text-sm ${abaAtiva === 'textos' ? 'border-b-2 border-rose-500 text-rose-600 font-medium' : 'text-stone-500 hover:text-stone-700'}`}
        >
          <Edit3 size={16} className="inline mr-1" /> Textos e Valores
        </button>
        <button
          onClick={() => setAbaAtiva('fotos')}
          className={`px-6 py-3 text-sm ${abaAtiva === 'fotos' ? 'border-b-2 border-rose-500 text-rose-600 font-medium' : 'text-stone-500 hover:text-stone-700'}`}
        >
          <Image size={16} className="inline mr-1" /> Enviar Fotos
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {abaAtiva === 'textos' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="bg-white p-5 rounded-lg shadow-sm border border-amber-100">
              <h3 className="font-serif text-lg mb-4 text-amber-800">📞 Contato</h3>
              <div className="space-y-3">
                <label className="block">
                  <span className="text-sm text-stone-600">WhatsApp</span>
                  <input
                    type="text" value={formDados.whatsapp || ''}
                    onChange={e => alterarCampo('whatsapp', e.target.value)}
                    className="w-full mt-1 px-4 py-2 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
                  />
                </label>
                <label className="block">
                  <span className="text-sm text-stone-600">Endereço/Cidade</span>
                  <input
                    type="text" value={formDados.endereco || ''}
                    onChange={e => alterarCampo('endereco', e.target.value)}
                    className="w-full mt-1 px-4 py-2 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
                  />
                </label>
              </div>
            </div>

            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white p-5 rounded-lg shadow-sm border border-amber-100">
                <h3 className="font-serif text-lg mb-4 text-amber-800">📸 Banner {i}</h3>
                <div className="space-y-3">
                  <label className="block">
                    <span className="text-sm text-stone-600">Título</span>
                    <input
                      type="text" value={formDados[`banner${i}_titulo`] || ''}
                      onChange={e => alterarCampo(`banner${i}_titulo`, e.target.value)}
                      className="w-full mt-1 px-4 py-2 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm text-stone-600">Subtítulo</span>
                    <input
                      type="text" value={formDados[`banner${i}_subtitulo`] || ''}
                      onChange={e => alterarCampo(`banner${i}_subtitulo`, e.target.value)}
                      className="w-full mt-1 px-4 py-2 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
                    />
                  </label>
                </div>
              </div>
            ))}

            <div className="bg-white p-5 rounded-lg shadow-sm border border-amber-100">
              <h3 className="font-serif text-lg mb-4 text-amber-800">✨ Produtos</h3>
              {[1, 2, 3, 4, 5].map(num => (
                <div key={num} className="mb-5 pb-4 border-b border-amber-50 last:border-0">
                  <p className="text-sm font-medium text-stone-500 mb-2">Produto {num}</p>
                  <div className="space-y-3">
                    <label className="block">
                      <span className="text-xs text-stone-500">Nome</span>
                      <input
                        type="text" value={formDados[`produto${num}_nome`] || ''}
                        onChange={e => alterarCampo(`produto${num}_nome`, e.target.value)}
                        placeholder="Nome do produto"
                        className="w-full mt-1 px-3 py-2 border border-amber-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rose-400"
                      />
                    </label>
                    <label className="block">
                      <span className="text-xs text-stone-500">Descrição</span>
                      <input
                        type="text" value={formDados[`produto${num}_desc`] || ''}
                        onChange={e => alterarCampo(`produto${num}_desc`, e.target.value)}
                        placeholder="Breve descrição"
                        className="w-full mt-1 px-3 py-2 border border-amber-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rose-400"
                      />
                    </label>
                    <label className="block">
                      <span className="text-xs text-stone-500">Preço</span>
                      <input
                        type="text" value={formDados[`produto${num}_preco`] || ''}
                        onChange={e => alterarCampo(`produto${num}_preco`, e.target.value)}
                        placeholder="R$ 0,00"
                        className="w-full mt-1 px-3 py-2 border border-amber-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rose-400"
                      />
                    </label>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={salvarTextos}
                disabled={salvando}
                className="px-6 py-3 bg-rose-500 text-white rounded-lg hover:bg-rose-600 disabled:opacity-50 flex items-center gap-2 cursor-pointer"
              >
                <Save size={18} /> {salvando ? 'Salvando...' : 'Salvar Alterações'}
              </button>
              {mensagemSalvo && <span className="text-green-600 text-sm">{mensagemSalvo}</span>}
            </div>
          </div>
        )}

        {abaAtiva === 'fotos' && (
          <div className="max-w-md mx-auto space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-amber-100">
              <h3 className="font-serif text-lg mb-4 text-amber-800">📤 Enviar Foto</h3>

              <label className="block mb-4">
                <span className="text-sm text-stone-600">Onde aparecerá</span>
                <select
                  value={localEscolhido}
                  onChange={e => setLocalEscolhido(e.target.value)}
                  className="w-full mt-1 px-4 py-2 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
                >
                  <option value="">Selecione...</option>
                  {gerarOpcoesFoto().map(opt => (
                    <option key={opt.valor} value={opt.valor}>{opt.nome}</option>
                  ))}
                </select>
              </label>

              <div className="block mb-4">
                <span className="text-sm text-stone-600">Escolher imagem do computador</span>
                <div className="mt-2 border-2 border-dashed border-amber-200 rounded-lg p-6 text-center hover:border-rose-400 transition-colors cursor-pointer">
                  <input type="file" accept="image/*" onChange={aoSelecionarArquivo} className="hidden" id="file-input" />
                  <label htmlFor="file-input" className="cursor-pointer block">
                    <Upload className="mx-auto text-amber-500 mb-2" size={36} />
                    <span className="text-sm text-stone-500">Clique para selecionar</span>
                  </label>
                </div>
              </div>

              {fotoPrevia && (
                <div className="mb-4">
                  <p className="text-sm text-stone-500 mb-2">Pré-visualização:</p>
                  <img src={fotoPrevia} alt="Prévia" className="w-full h-48 object-cover rounded-lg" />
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={enviarESalvarFoto}
                  disabled={enviandoFoto || !arquivoSelecionado || !localEscolhido}
                  className="flex-1 py-3 bg-rose-500 text-white rounded-lg hover:bg-rose-600 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {enviandoFoto ? 'Enviando...' : 'Enviar Foto'}
                </button>
                <button
                  onClick={limparFoto}
                  className="px-4 py-3 bg-stone-200 text-stone-700 rounded-lg hover:bg-stone-300 transition-colors cursor-pointer"
                >
                  Limpar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-amber-50 text-stone-800">
      {/* Cabeçalho com Logo */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={ativarPainelCliques} className="cursor-pointer">
            <img src="/logo.png" alt="Singela Oração" className="h-16 w-auto object-contain" />
          </button>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#inicio" className="text-stone-600 hover:text-rose-600 transition-colors">Início</a>
            <a href="#produtos" className="text-stone-600 hover:text-rose-600 transition-colors">Terços</a>
            <a href="#sobre" className="text-stone-600 hover:text-rose-600 transition-colors">Sobre</a>
            <a href="#contato" className="bg-rose-500 text-white px-5 py-2 rounded-full hover:bg-rose-600 transition-colors">
              Pedir Orçamento
            </a>
          </nav>

          <button className="md:hidden text-stone-700">
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* Seção Hero / Carrossel de Banners */}
      <section id="inicio">
        <Carousel
          showArrows={true}
          showThumbs={false}
          showStatus={false}
          infiniteLoop={true}
          autoPlay={true}
          interval={5000}
          transitionTime={600}
        >
          {[1, 2, 3].map(idx => {
            const titulo = formDados[`banner${idx}_titulo`] || DADOS_INICIAIS[`banner${idx}_titulo`]
            const subtitulo = formDados[`banner${idx}_subtitulo`] || DADOS_INICIAIS[`banner${idx}_subtitulo`]
            const imagem = formDados[`banner${idx}_imagem`] || ''
            return (
              <div key={idx} className="relative h-[80vh] max-h-[700px]">
                <img
                  src={imagem || `https://via.placeholder.com/1200x700/F9F5F0/D4A5A5?text=${encodeURIComponent(titulo)}`}
                  alt={`Banner ${idx}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="text-center text-white px-6 max-w-3xl">
                    <h2 className="font-serif text-3xl md:text-5xl font-bold mb-4">{titulo}</h2>
                    <p className="text-lg md:text-xl mb-8">{subtitulo}</p>
                    <a href="#produtos" className="inline-block bg-rose-500 text-white px-8 py-3 rounded-full text-lg hover:bg-rose-600 transition-colors">
                      Conhecer Modelos
                    </a>
                  </div>
                </div>
              </div>
            )
          })}
        </Carousel>
      </section>

      {/* Seção Produtos */}
      <section id="produtos" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-amber-900 mb-3">Nossos Terços</h2>
            <p className="text-stone-600 max-w-2xl mx-auto">Peças únicas, feitas à mão com todo carinho para acompanhar você em momentos de fé e oração.</p>
          </div>

          {renderizarProdutos()}
        </div>
      </section>

      {/* Seção Sobre */}
      <section id="sobre" className="py-20 bg-amber-100/50 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-3xl font-bold text-amber-900 mb-6">Sobre a Singela Oração</h2>
          <p className="text-lg text-stone-700 mb-4 leading-relaxed">
            Cada terço é criado com fé, dedicação e muito amor. Acreditamos que um terço não é apenas um objeto,
            mas uma companhia nas suas orações, um laço entre você e o divino.
          </p>
          <p className="text-lg text-stone-700 leading-relaxed">
            Feitos à mão, personalizados e cheios de significado. Que cada peça traga paz e proteção para sua vida.
          </p>
        </div>
      </section>

      {/* Rodapé / Contato */}
      <footer id="contato" className="bg-amber-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <img src="/logo.png" alt="Singela Oração" className="h-20 w-auto mx-auto mb-6 opacity-90" />
          <h3 className="font-serif text-2xl mb-4">Fale Conosco</h3>
          <p className="text-amber-200 mb-6">Faça seu pedido ou personalize seu terço</p>

          {dadosCarregados?.whatsapp && (
            <a
              href={`https://wa.me/${dadosCarregados.whatsapp.replace(/\D/g, '')}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 px-6 py-3 rounded-full text-lg hover:bg-green-600 transition-colors mb-6"
            >
              <Phone size={20} /> Conversar no WhatsApp
            </a>
          )}

          <p className="text-amber-300 text-sm mt-8">
            © 2026 Singela Oração — Terços Artesanais. Feitos com fé e amor.
          </p>
        </div>
      </footer>

      {/* Painel de Controle */}
      {painelAberto && <Painel />}
    </div>
  )
}

export default App