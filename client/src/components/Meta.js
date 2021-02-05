import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({ title, description, keywords }) => {
	return (
		<Helmet>
			<title>{title}</title>
			<meta name='description' content={description} />
			<meta name='keywords' content={keywords} />
		</Helmet>
	)
}

Meta.defaultProps = {
	title       : 'meezlist',
	keywords    : 'kitchen gear, used kitchen gear, culinary equipment',
	description : 'A secondary marketplace for culinary gear'
}

export default Meta
