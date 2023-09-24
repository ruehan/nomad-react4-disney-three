import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const queryClient = new QueryClient();

root.render(
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
        <App />
      </RecoilRoot>
      </QueryClientProvider>
);

