import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { listarPontos, excluirPonto } from '../services/api'

function ListaPontos() {
  const [pontos, setPontos] = useState([])
  const [busca, setBusca] = useState('')
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')
  const [excluindoId, setExcluindoId] = useState(null)
  const [erroExclusao, setErroExclusao] = useState('')

  useEffect(() => {
    async function carregarPontos() {
      try {
        setCarregando(true)
        setErro('')

        const dados = await listarPontos()
        setPontos(dados)
      } catch (erro) {
        setErro('Não foi possível carregar os pontos.')
      } finally {
        setCarregando(false)
      }
    }

    carregarPontos()
  }, [])

    async function confirmarExclusao(ponto) {
      if (excluindoId !== null) return

      const confirmou = window.confirm(
        `Deseja realmente excluir o ponto "${ponto.name}"?`
      )

      if (!confirmou) return

      try {
        setExcluindoId(ponto.id)
        setErroExclusao('')

        await excluirPonto(ponto.id)

        setPontos((anteriores) =>
          anteriores.filter((item) => item.id !== ponto.id)
        )
      } catch (erro) {
        setErroExclusao(erro.message)
      } finally {
        setExcluindoId(null)
      }
    }

  const pontosFiltrados = pontos.filter((ponto) =>
    ponto.name.toLowerCase().includes(busca.toLowerCase())
  )

  return (
    <section className="pagina-pontos">
      <div className="cabecalho-pagina">
        <h1>Lista de Pontos Geográficos</h1>

        <Link to="/pontos/novo" className="botao">
          + Novo Ponto
        </Link>
      </div>

      <div className="card">
        <input
          type="text"
          placeholder="Pesquisar ponto pelo nome..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="campo-busca"
        />

        <div className="tabela-container">
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Descrição</th>
                <th>Latitude</th>
                <th>Longitude</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {carregando ? (
                <tr>
                  <td colSpan={5} className="mensagem-vazia">
                    Carregando pontos...
                  </td>
                </tr>
              ) : erro ? (
                <tr>
                  <td colSpan={5} className="mensagem-vazia">
                    {erro}
                  </td>
                </tr>
              ) : pontosFiltrados.length === 0 ? (
                <tr>
                  <td colSpan={5} className="mensagem-vazia">
                    Nenhum ponto encontrado.
                  </td>
                </tr>
              ) : (
                pontosFiltrados.map((ponto) => (
                  <tr key={ponto.id}>
                    <td>
                      <Link to={`/pontos/${ponto.id}`}>
                        {ponto.name}
                      </Link>
                    </td>

                    <td>{ponto.description || '—'}</td>
                    <td>{ponto.latitude}</td>
                    <td>{ponto.longitude}</td>

                    
                        
                    <td>
                      <div className="acoes-tabela">
                        <Link to={`/pontos/${ponto.id}`}>
                          Ver
                        </Link>

                        <Link to={`/pontos/${ponto.id}/editar`}>
                          Editar
                        </Link>

                        <button
                          type="button"
                          className="botao-excluir"
                          onClick={() => confirmarExclusao(ponto)}
                          disabled={excluindoId !== null}
                        >
                          {excluindoId === ponto.id ? 'Excluindo...' : 'Excluir'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

export default ListaPontos
