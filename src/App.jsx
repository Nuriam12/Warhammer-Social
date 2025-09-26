import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Myroutes } from './routers/router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useThemeStore } from './Store/ThemeStore';

function App() {
  const {theme} = useThemeStore() /*llamado al zustand para aplicar el cambio de temas */
  document.documentElement.classList.toggle("dark",theme==="dark")
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Myroutes/>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App
