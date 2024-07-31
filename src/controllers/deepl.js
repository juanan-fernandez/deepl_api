const getTranslation = async (req, res) => {
	const text = req.params.text
	const target = req.params.target

	try {
		const response = await fetch(
			`https://api.deepl.com/v2/translate?auth_key=${process.env.DEEPL_KEY}&text=${text}&target_lang=${target}`
		)
		const data = await response.json()
		res.status(200).json({
			text: data.translations[0].text
		})
	} catch (err) {
		res.status(500).json({
			text: 'ERROR: En la llamada a la API',
			error: err
		})
	}
}

module.exports = { getTranslation }
