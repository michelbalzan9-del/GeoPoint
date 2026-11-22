import { Routes, Route, Navigate, Link } from 'react-router-dom'
import Navbar from './components/Navbar'
import ListaPontos from './pages/ListaPontos'
import CadastroPonto from './pages/CadastroPonto'
import DetalhePonto from './pages/DetalhePonto'
import EditarPonto from './pages/EditarPonto'

function App() {
  return (
    <>
      <Navbar />

      <main className="container">
        <Routes>
          <Route
            path="/"
            element={<Navigate to="/pontos" replace />}
          />

          <Route
            path="/pontos"
            element={<ListaPontos />}
          />

          <Route
            path="/pontos/novo"
            element={<CadastroPonto />}
          />

          <Route
            path="/pontos/:id"
            element={<DetalhePonto />}
          />

          <Route
            path="/pontos/:id/editar"
            element={<EditarPonto />}
          />

          <Route
            path="*"
            element={
              <div>
                <h1>Página não encontrada</h1>
                <Link to="/pontos">Voltar para a lista</Link>
              </div>
            }
          />
        </Routes>
      </main>
    </>
  )
}

export default App
