import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import LocationFinderReactQuery from './components/LocationFinderReactQuery';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import MoviesFinder from './components/MoviesFinder';
import { HelmetProvider } from 'react-helmet-async';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: Infinity, // Daten, die einmal im Cache sind, werden nicht nochmal geladen
			gcTime: Infinity, // Zeit, nach der unbenutzte Daten aus dem Cache gelöscht werden. Default sind 5 Minuten.
		},
	},
});

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<HelmetProvider>
				{/* <LocationFinderReactQuery /> */}
				<MoviesFinder />
				<ReactQueryDevtools initialIsOpen={false} />
			</HelmetProvider>
		</QueryClientProvider>
	</React.StrictMode>
);
