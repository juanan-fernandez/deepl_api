const deepl = require('deepl-node')

//petición válida desde 15-01-2026
const getTranslationV2 = async (req, res) => {
	//const url = 'https://api.deepl.com/v2/translate'
	const authKey = process.env.DEEPL_KEY
	const deeplClient = new deepl.Translator(authKey)

	try {
		let target = req.params.target
		if (target.toUpperCase().startsWith('EN')) target = 'en-gb'
		const result = await deeplClient.translateText(req.params.text, 'es', target)
		console.log(result)
		res.status(200).json({
			text: result.text
		})
		// const requestBody = { text: [req.params.text], target_lang: req.params.target }
		// const response = await fetch(url, {
		// 	method: 'POST',
		// 	headers: {
		// 		// La especificación pide la clave directamente en Authorization
		// 		Authorization: `DeepL-Auth-Key ${authKey}`,
		// 		'Content-Type': 'application/json',
		// 		'User-Agent': 'Samar/1.2.3'
		// 	},
		// 	body: JSON.stringify(requestBody)
		// })

		// if (!response.ok) {
		// 	const errDetail = await response.text()
		// 	throw new Error(`No funcionó la peticición a la api - ${response.status} - ${errDetail}`)
		// }

		// const data = await response.json()
		// console.log(data)
		// res.status(200).json({
		// 	text: data.translations[0].text
		// })
	} catch (err) {
		console.error(err)
		res.status(500).json({
			text: 'ERROR: En la llamada a la API',
			error: err
		})
	}
}

module.exports = { getTranslationV2 }
