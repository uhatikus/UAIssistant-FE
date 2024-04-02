import '@blueprintjs/core/lib/css/blueprint.css';
import { RecoilRoot } from 'recoil';
import ErrorBoundary from './ErrorBoundary';
import { Provider } from 'react-redux';
import { initApiClients } from './api/api-manager/api-initializer';
import { useEffect } from 'react';
import Root from './Root';
import store from './api';
import { BrowserRouter } from 'react-router-dom';

function App() {
  initApiClients();

  return (
    <RecoilRoot>
      <Provider store={store}>
        <BrowserRouter>
          {/* <ErrorBoundary> */}
          <Root />
          {/* </ErrorBoundary> */}
        </BrowserRouter>
      </Provider>
    </RecoilRoot>
  );
}

export default App;
