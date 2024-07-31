const express = require('express')
const v1Router = require('./v1/routes')
const app = express()

process.loadEnvFile('.env')
// app.get('/', (request, response) => {
// 	response.send('<h1>Hello Worlddddd!</h1>')
// })

// app.get('/api/notes', (request, response) => {
// 	response.json(notes)
// })

app.use('/api/v1', v1Router)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
