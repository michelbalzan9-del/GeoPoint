const URL_BASE = `http://${window.location.hostname}:3001/api/points`

export async function listarPontos() {
  const resposta = await fetch(URL_BASE)

  if (!resposta.ok) {
    throw new Error('Erro ao buscar os pontos.')
  }

  return await resposta.json()
}

export async function criarPonto(ponto) {
  const resposta = await fetch(URL_BASE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(ponto)
  })

  if (!resposta.ok) {
    throw new Error('Não foi possível cadastrar o ponto.')
  }

  return await resposta.json()
}

export async function buscarPonto(id) {
  const resposta = await fetch(`${URL_BASE}/${id}`)

  if (!resposta.ok) {
    throw new Error('Não foi possível encontrar o ponto.')
  }

  return await resposta.json()
}

export async function atualizarPonto(id, ponto) {
  const resposta = await fetch(`${URL_BASE}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(ponto)
  })

  if (!resposta.ok) {
    throw new Error('Não foi possível atualizar o ponto.')
  }

  return await resposta.json()
}

export async function excluirPonto(id) {
  const resposta = await fetch(`${URL_BASE}/${id}`, {
    method: 'DELETE'
  })

  if (!resposta.ok) {
    throw new Error('Não foi possível excluir o ponto.')
  }
}
