import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { QueryClient } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import App from './App';
import './index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
});

const persister = createSyncStoragePersister({
  storage: window.localStorage,
});

ReactDOM.render(
  <PersistQueryClientProvider
    client={queryClient}
    persistOptions={{ persister }}
  >
    <App />
  </PersistQueryClientProvider>,
  document.getElementById('root')
);
