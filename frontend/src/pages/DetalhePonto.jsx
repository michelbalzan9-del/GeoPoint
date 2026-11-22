import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { buscarPonto, excluirPonto } from '../services/api'

function DetalhePonto() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [ponto, setPonto] = useState(null)
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')
  const [excluindo, setExcluindo] = useState(false)
  const [erroExclusao, setErroExclusao] = useState('')

  useEffect(() => {
    let ativo = true

    async function carregarPonto() {
      try {
        setCarregando(true)
        setErro('')

        const dados = await buscarPonto(id)

        if (ativo) {
          setPonto(dados)
        }
      } catch (erro) {
        if (ativo) {
          setErro(erro.message)
        }
      } finally {
        if (ativo) {
          setCarregando(false)
        }
      }
    }

    carregarPonto()

    return () => {
      ativo = false
    }
  }, [id])

  async function confirmarExclusao() {
    if (!ponto || excluindo) return

    const confirmou = window.confirm(
      `Deseja realmente excluir o ponto "${ponto.name}"?`
    )

    if (!confirmou) return

    try {
      setExcluindo(true)
      setErroExclusao('')

      await excluirPonto(id)

      navigate('/pontos')
    } catch (erro) {
      setErroExclusao(erro.message)
    } finally {
      setExcluindo(false)
    }
  }

  if (carregando) {
    return <p>Carregando ponto...</p>
  }

  if (erro || !ponto) {
    return (
      <section>
        <p className="mensagem-erro">
          {erro || 'Ponto não encontrado.'}
        </p>

        <Link to="/pontos">
          Voltar para a lista
        </Link>
      </section>
    )
  }

  return (
    <section>
      <h1>Detalhes do Ponto</h1>

      <div className="card card-formulario detalhe-ponto">
        <h2>{ponto.name}</h2>

        <p>
          <strong>Descrição:</strong>{' '}
          {ponto.description || 'Sem descrição'}
        </p>

        <p>
          <strong>Latitude:</strong> {ponto.latitude}
        </p>

        <p>
          <strong>Longitude:</strong> {ponto.longitude}
        </p>

        <div className="acoes-detalhe">
          <Link
            to={`/pontos/${id}/editar`}
            className="botao"
          >
            Editar
          </Link>

          <button
            type="button"
            className="botao-excluir-detalhe"
            onClick={confirmarExclusao}
            disabled={excluindo}
          >
            {excluindo ? 'Excluindo...' : 'Excluir'}
          </button>

          <Link to="/pontos" className="botao">
            Voltar
          </Link>
        </div>

        {erroExclusao && (
          <p className="mensagem-erro" role="alert">
            {erroExclusao}
          </p>
        )}
      </div>
    </section>
  )
}

export default DetalhePonto
