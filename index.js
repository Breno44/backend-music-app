/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express')
const axios = require('axios')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3002

app.use(cors())

app.get('/tracks', async (req, res) => {
  try {
    const response = await axios.get('https://api.deezer.com/chart/0/tracks')
    res.status(200).json(response.data)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erro ao buscar dados da API do Deezer.' })
  }
})

app.get('/artists/:limit', async (req, res) => {
  try {
    const limit = req.params.limit
    const response = await axios.get(`https://api.deezer.com/chart/0/artists?limit=${limit}`)
    res.status(200).json(response.data)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erro ao buscar dados da API do Deezer.' })
  }
})

app.get('/search/:query', async (req, res) => {
  try {
    const query = req.params.query
    const responseTracks = await axios.get(`https://api.deezer.com/search/track?q=${query}&limit=5`)
    const responseAlbums = await axios.get(`https://api.deezer.com/search/album?q=${query}&limit=5`)
    const responseArtists = await axios.get(`https://api.deezer.com/search/artist?q=${query}&limit=5`)

    res.status(200).json({
      tracks: responseTracks.data.data,
      albums: responseAlbums.data.data,
      artists: responseArtists.data.data
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erro ao buscar dados da API do Deezer.' })
  }
})

// Inicie o servidor
app.listen(port, () => {
  console.log(`Servidor está ouvindo na porta ${port}`)
})
