import globals from 'globals'
import pluginJs from '@eslint/js'

export default [
	{ files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } },
	{ languageOptions: { globals: globals.node } },
	{
		rules: {
			'no-undef': 'warn',
			'no-unused-vars': [
				'warn',
				{
					vars: 'all'
				}
			]
		}
	},
	pluginJs.configs.recommended
]
