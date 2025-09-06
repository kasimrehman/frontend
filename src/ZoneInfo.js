import React, { useEffect, useState } from 'react';

function ZoneInfo() {
	const [zone, setZone] = useState('');
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		fetch('/zone')
			.then(res => res.json())
			.then(data => {
				setZone(data.zone || 'unknown');
				setLoading(false);
			})
			.catch(err => {
				setError('Failed to fetch zone info');
				setLoading(false);
			});
	}, []);

	if (loading) return <div style={{ padding: '0.5rem', background: '#e0e0e0' }}>Loading zone info...</div>;
	if (error) return <div style={{ padding: '0.5rem', background: '#ffe0e0', color: 'red' }}>{error}</div>;
	return (
		<div style={{ padding: '0.5rem', background: '#e0e0e0' }}>
			<strong>Zone:</strong> {zone}
		</div>
	);
}

export default ZoneInfo;
