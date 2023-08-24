/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				"color-primary": "#098DFF",
				"color-primary-light": "#CAE6FF",
				"color-white": "#fff",
				"color-black": "#0D0E0F",
				"color-dark": " #666869",
				"color-dark-1": "#404243",
				"color-grey": "#ededed",
				"color-grey-1": "#D9D9D9",
				"color-blue": "#0660FE",
				"color-blue-1": "#0556E5",
				"color-blue-light": "#098DFF2B",
				"color-green-light": "#09b47c",
				"border-radius": "8px",
				"border-radius-lg": "20px",
			},
			screens: {
				screens: {
					sm: "640px",
					// => @media (min-width: 640px) { ... }

					md: "768px",
					// => @media (min-width: 768px) { ... }

					lg: "1024px",
					// => @media (min-width: 1024px) { ... }

					xl: "1280px",
					// => @media (min-width: 1280px) { ... }

					"2xl": "1536px",
					// => @media (min-width: 1536px) { ... }
					"sm:landscape": {
						raw: "(orientation: landscape) and (min-width: 640px)",
					},
					"md:landscape": {
						raw: "(orientation: landscape) and (min-width: 768px)",
					},
					"lg:landscape": {
						raw: "(orientation: landscape) and (min-width: 1024px)",
					},
					"xl:landscape": {
						raw: "(orientation: landscape) and (min-width: 1280px)",
					},
					"2xl:landscape": {
						raw: "(orientation: landscape) and (min-width: 1536px)",
					},
				},
			},
		},
	},
	plugins: [],
};
