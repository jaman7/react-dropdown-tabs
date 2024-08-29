import { createRoot } from 'react-dom/client';
import { PrimeReactProvider } from 'primereact/api';
import App from './App';
import './assets/scss/main.scss';

const container = document.getElementById('app');
const root = createRoot(container!);
root.render(
  <PrimeReactProvider>
    <App />
  </PrimeReactProvider>
);
