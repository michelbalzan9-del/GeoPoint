
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FormPonto from '../components/FormPonto'
import { criarPonto } from '../services/api'

function CadastroPonto() {
  const navigate = useNavigate()

  const [dados, setDados] = useState({
    name: '',
    description: '',
    latitude: '',
    longitude: ''
  })

  const [erro, setErro] = useState('')
  const [salvando, setSalvando] = useState(false)

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
      setErro('Informe uma latitude e longitude válidas.')
      return
    }

    const novoPonto = {
      name: dados.name.trim(),
      description: dados.description.trim(),
      latitude,
      longitude
    }

    try {
      setSalvando(true)

      await criarPonto(novoPonto)

      navigate('/pontos')
    } catch (erro) {
      setErro(erro.message)
    } finally {
      setSalvando(false)
    }
  }

  return (
    <section>
      <h1>Cadastrar Novo Ponto</h1>

      <div className="card card-formulario">
        <FormPonto
          dados={dados}
          onChange={atualizarCampo}
          onSubmit={enviarFormulario}
          salvando={salvando}
        />

        {erro && (
          <p className="mensagem-erro">{erro}</p>
        )}
      </div>
    </section>
  )
}

export default CadastroPonto
