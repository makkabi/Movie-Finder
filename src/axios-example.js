import axios from 'redaxios';

const fetchLocations = axios.create({
	baseURL: 'http://localhost:8000',
	params: {
		apiKey: '123',
	},
});

async function fetchExample(search) {
	try {
		/* const { data } = await axios('http://localhost:8000', {
			params: {
				search,
			},
		}); */

		const { data } = fetchLocations('', { params: { search } });

		console.log(data);
	} catch (error) {
		console.log(error);
	}
}

fetchExample('109');
