const express = require('express')
const v1Router = require('./v1/routes')

const app = express()

process.loadEnvFile('.env')

app.use('/api/v1', v1Router)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	console.log(`Deepl Client running on port ${PORT}`)
})
