import React from 'react';

const PartnerLogosBanner: React.FC = () => {
	const images: React.CSSProperties = {
		display: 'flex',
		justifyContent: 'space-between',
		marginBottom: '1em',
	};

	return (
		<div style={images}>
			<img src={'/images/partners/sanbi.svg'} />
			<img src={'/images/partners/africa-cdc.svg'} />
			<img src={'/images/partners/african-union.svg'} />
			<img src={'/images/partners/gates-foundation.svg'} />
		</div>
	);
};

export default PartnerLogosBanner;
