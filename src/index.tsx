import ReactDOM from 'react-dom';
import App from './App';
import { store } from './stores/store';
import { Provider } from 'react-redux';
import { Normalize } from 'styled-normalize';

ReactDOM.render(
  <Provider store={store}>
    <Normalize />
    <App />
  </Provider>,
  document.getElementById('root'),
);
