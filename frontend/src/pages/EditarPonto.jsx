import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import FormPonto from '../components/FormPonto'
import { buscarPonto, atualizarPonto } from '../services/api'

function EditarPonto() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [dados, setDados] = useState({
    name: '',
    description: '',
    latitude: '',
    longitude: ''
  })

  const [carregando, setCarregando] = useState(true)
  const [salvando, setSalvando] = useState(false)
  const [erro, setErro] = useState('')

  useEffect(() => {
    let ativo = true

    async function carregarPonto() {
      try {
        const ponto = await buscarPonto(id)

        if (ativo) {
          setDados({
            name: ponto.name,
            description: ponto.description || '',
            latitude: String(ponto.latitude),
            longitude: String(ponto.longitude)
          })
        }
      } catch (erro) {
        if (ativo) setErro(erro.message)
      } finally {
        if (ativo) setCarregando(false)
      }
    }

    carregarPonto()

    return () => {
      ativo = false
    }
  }, [id])

  function atualizarCampo(evento) {
    const { name, value } = evento.target

    setDados((anterior) => ({
      ...anterior,
      [name]: value
    }))
  }

  async function enviarFormulario(evento) {
    evento.preventDefault()

    if (salvando) return

    setErro('')

    const latitude = Number(dados.latitude)
    const longitude = Number(dados.longitude)

    if (!dados.name.trim() || dados.name.length > 100) {
      setErro('Informe um nome com até 100 caracteres.')
      return
    }

    if (dados.description.length > 255) {
      setErro('A descrição deve ter até 255 caracteres.')
      return
    }

    if (
      dados.latitude.trim() === '' ||
      dados.longitude.trim() === '' ||
      !Number.isFinite(latitude) ||
      !Number.isFinite(longitude) ||
      latitude < -90 ||
      latitude > 90 ||
      longitude < -180 ||
      longitude > 180
    ) {
      setErro('Latitude ou longitude inválida.')
      return
    }

    try {
      setSalvando(true)

      await atualizarPonto(id, {
        name: dados.name.trim(),
        description: dados.description.trim(),
        latitude,
        longitude
      })

      navigate('/pontos')
    } catch (erro) {
      setErro(erro.message)
    } finally {
      setSalvando(false)
    }
  }

  if (carregando) {
    return <p>Carregando ponto...</p>
  }

  if (erro && !dados.name) {
    return (
      <section>
        <p className="mensagem-erro">{erro}</p>
        <Link to="/pontos">Voltar para a lista</Link>
      </section>
    )
  }

  return (
    <section>
      <h1>Editar Ponto Geográfico</h1>

      <div className="card card-formulario">
        <FormPonto
          dados={dados}
          onChange={atualizarCampo}
          onSubmit={enviarFormulario}
          salvando={salvando}
          textoBotao="Salvar Alterações"
        />

        {erro && <p className="mensagem-erro">{erro}</p>}
      </div>
    </section>
  )
}

export default EditarPonto
