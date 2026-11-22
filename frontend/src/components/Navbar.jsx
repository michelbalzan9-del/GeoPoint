import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-conteudo">
        <h2>GeoPoint</h2>

        <nav>
          <NavLink to="/pontos">Lista de Pontos</NavLink>
          <NavLink to="/pontos/novo">Cadastrar Ponto</NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
