import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import { store, persistor } from './store/store.jsx';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
)
