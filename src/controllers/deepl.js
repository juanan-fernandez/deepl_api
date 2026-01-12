// function encodeURLString(input) {
// 	return input.replace(/[!*'();:@&=+$,/?%#\[\]]/g, function (match) {
// 		return encodeURIComponent(match)
// 	})
// }

// Ejemplo de uso:

//deprecada desde 15-01-2026 => refactorizar y eliminar código inutil en fechas posteriores
const getTranslation = async (req, res) => {
	const text = req.params.text
	const target = req.params.target

	//const originalString = "Hola! ¿cómo estás? Me llamo Escarlata O'Hara";
	//const encodedString = encodeURLString(originalString);

	try {
		const response = await fetch(
			`https://api.deepl.com/v2/translate?auth_key=${process.env.DEEPL_KEY}&text=${text}&target_lang=${target}`
		)
		const data = await response.json()
		res.status(200).json({
			text: data.translations[0].text
		})
	} catch (err) {
		console.log(err)
		res.status(500).json({
			text: 'ERROR: En la llamada a la API',
			error: err
		})
	}
}

//petición válida desde 15-01-2026
const getTranslationV2 = async (req, res) => {
	const url = 'https://api.deepl.com/v2/translate'
	const authKey = process.env.DEEPL_KEY
	try {
		const requestBody = { text: [req.params.text], target_lang: req.params.target }
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				// La especificación pide la clave directamente en Authorization
				Authorization: `DeepL-Auth-Key ${authKey}`,
				'Content-Type': 'application/json',
				'User-Agent': 'Samar/1.2.3'
			},
			body: JSON.stringify(requestBody)
		})

		if (!response.ok) {
			const errDetail = await response.text()
			throw new Error(`No funcionó la peticición a la api - ${response.status} - ${errDetail}`)
		}

		const data = await response.json()
		console.log(data)
		res.status(200).json({
			text: data.translations[0].text
		})
	} catch (err) {
		console.error(err)
		res.status(500).json({
			text: 'ERROR: En la llamada a la API',
			error: err
		})
	}
}

module.exports = { getTranslation, getTranslationV2 }
