import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { GlobalHistory } from './components/commoms/GlobalHistory';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const container = document.getElementById('root')!;
const root = createRoot(container);
// Create a client
const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalHistory />
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <App />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
