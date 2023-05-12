import ReactDOM from 'react-dom/client'
import App from './Entry/App'
import './index.css'
import './sass/main.scss'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistedStore, store } from './store/app/store'
import { QueryClientProvider, QueryClient } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import AutoLogout from './components/AutoLogout'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider store={store}>
        <QueryClientProvider client={queryClient}>
            <AutoLogout>
                <App />
            </AutoLogout>
            <ReactQueryDevtools position='bottom-right' />
        </QueryClientProvider>
    </Provider>
)
