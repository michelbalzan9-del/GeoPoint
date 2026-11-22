function FormPonto({
  dados,
  onChange,
  onSubmit,
  salvando = false,
  textoBotao = 'Cadastrar Ponto'
}) {

  return (
    <form className="formulario-ponto" onSubmit={onSubmit}>
      <div className="campo-form">
        <label htmlFor="name">Nome do ponto *</label>
        <input
          type="text"
          id="name"
          name="name"
          value={dados.name}
          onChange={onChange}
          maxLength={100}
          placeholder="Ex: Praça Central"
          required
        />
      </div>

      <div className="campo-form">
        <label htmlFor="description">Descrição</label>
        <textarea
          id="description"
          name="description"
          value={dados.description}
          onChange={onChange}
          maxLength={255}
          placeholder="Descreva o ponto geográfico"
          rows={4}
        />
      </div>

      <div className="grade-coordenadas">
        <div className="campo-form">
          <label htmlFor="latitude">Latitude *</label>
          <input
            type="number"
            id="latitude"
            name="latitude"
            value={dados.latitude}
            onChange={onChange}
            min="-90"
            max="90"
            step="any"
            placeholder="Ex: -28.2825"
            required
          />
        </div>

        <div className="campo-form">
          <label htmlFor="longitude">Longitude *</label>
          <input
            type="number"
            id="longitude"
            name="longitude"
            value={dados.longitude}
            onChange={onChange}
            min="-180"
            max="180"
            step="any"
            placeholder="Ex: -52.7869"
            required
          />
        </div>
      </div>

      <button
          type="submit"
          className="botao"
          disabled={salvando}
          >
          {salvando ? 'Salvando...' : textoBotao}
          </button>
          </form> )
          }

export default FormPonto
