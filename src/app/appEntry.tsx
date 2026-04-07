import { RouterProvider } from 'react-router';

import { Provider } from 'react-redux';

import { createRoot } from 'react-dom/client';

import { store } from '@app/appStore';
import { router } from '@app/router';
import '@app/styles/normalize.css';

import { AppInitializer } from './providers/AppInitializer';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <AppInitializer>
      <RouterProvider router={router} />
    </AppInitializer>
  </Provider>
);
