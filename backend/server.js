const express = require('express')
const cors = require('cors')
const fs = require('node:fs/promises')
const path = require('node:path')

const app = express()
const PORTA = 3001

app.use(cors())
app.use(express.json())

const arquivo = path.join(__dirname, 'data', 'pontos.json')

app.get('/api/points', async (req, res) => {
  try {
    const conteudo = await fs.readFile(arquivo, 'utf-8')
    const pontos = JSON.parse(conteudo)

    res.json(pontos)
  } catch (erro) {
    res.status(500).json({
      message: 'Erro ao carregar os pontos.'
    })
  }
})

app.post('/api/points', async (req, res) => {
  try {
    const { name, description = '', latitude, longitude } = req.body || {}

    if (
      typeof name !== 'string' ||
      !name.trim() ||
      name.length > 100 ||
      typeof description !== 'string' ||
      description.length > 255 ||
      typeof latitude !== 'number' ||
      !Number.isFinite(latitude) ||
      latitude < -90 ||
      latitude > 90 ||
      typeof longitude !== 'number' ||
      !Number.isFinite(longitude) ||
      longitude < -180 ||
      longitude > 180
    ) {
      return res.status(400).json({
        message: 'Dados do ponto inválidos.'
      })
    }

    const conteudo = await fs.readFile(arquivo, 'utf-8')
    const pontos = JSON.parse(conteudo)

    const novoPonto = {
      id: require('node:crypto').randomUUID(),
      name: name.trim(),
      description: description.trim(),
      latitude,
      longitude
    }

    pontos.push(novoPonto)

    await fs.writeFile(
      arquivo,
      JSON.stringify(pontos, null, 2),
      'utf-8'
    )

    res.status(201).json(novoPonto)
  } catch (erro) {
    res.status(500).json({
      message: 'Erro ao cadastrar ponto.'
    })
  }
})

app.get('/api/points/:id', async (req, res) => {
  try {
    const conteudo = await fs.readFile(arquivo, 'utf-8')
    const pontos = JSON.parse(conteudo)

    const ponto = pontos.find(
      (item) => item.id === req.params.id
    )

    if (!ponto) {
      return res.status(404).json({
        message: 'Ponto não encontrado.'
      })
    }

    res.json(ponto)
  } catch (erro) {
    res.status(500).json({
      message: 'Erro ao buscar o ponto.'
    })
  }
})

app.put('/api/points/:id', async (req, res) => {
  try {
    const {
      name,
      description = '',
      latitude,
      longitude
    } = req.body || {}

    if (
      typeof name !== 'string' ||
      !name.trim() ||
      name.length > 100 ||
      typeof description !== 'string' ||
      description.length > 255 ||
      typeof latitude !== 'number' ||
      !Number.isFinite(latitude) ||
      latitude < -90 ||
      latitude > 90 ||
      typeof longitude !== 'number' ||
      !Number.isFinite(longitude) ||
      longitude < -180 ||
      longitude > 180
    ) {
      return res.status(400).json({
        message: 'Dados do ponto inválidos.'
      })
    }

    const conteudo = await fs.readFile(arquivo, 'utf-8')
    const pontos = JSON.parse(conteudo)

    const indice = pontos.findIndex(
      (ponto) => ponto.id === req.params.id
    )

    if (indice === -1) {
      return res.status(404).json({
        message: 'Ponto não encontrado.'
      })
    }

    const pontoAtualizado = {
      id: pontos[indice].id,
      name: name.trim(),
      description: description.trim(),
      latitude,
      longitude
    }

    pontos[indice] = pontoAtualizado

    await fs.writeFile(
      arquivo,
      JSON.stringify(pontos, null, 2),
      'utf-8'
    )

    res.status(200).json(pontoAtualizado)
  } catch (erro) {
    res.status(500).json({
      message: 'Erro ao atualizar ponto.'
    })
  }
})

app.delete('/api/points/:id', async (req, res) => {
  try {
    const conteudo = await fs.readFile(arquivo, 'utf-8')
    const pontos = JSON.parse(conteudo)

    const indice = pontos.findIndex(
      (ponto) => ponto.id === req.params.id
    )

    if (indice === -1) {
      return res.status(404).json({
        message: 'Ponto não encontrado.'
      })
    }

    pontos.splice(indice, 1)

    await fs.writeFile(
      arquivo,
      JSON.stringify(pontos, null, 2),
      'utf-8'
    )

    res.status(204).send()
  } catch (erro) {
    res.status(500).json({
      message: 'Erro ao excluir ponto.'
    })
  }
})

app.listen(PORTA, () => {
  console.log(`GeoPoint API rodando em http://localhost:${PORTA}`)
})
