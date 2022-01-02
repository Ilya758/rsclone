import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { store } from './stores/store';
import { Provider } from 'react-redux';
import { Normalize } from 'styled-normalize';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Normalize />
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
