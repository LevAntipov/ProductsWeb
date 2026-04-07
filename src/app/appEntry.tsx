import { RouterProvider } from 'react-router';

import { Provider } from 'react-redux';

import { AppInitializer } from 'app/providers/AppInitializer.tsx';
import { createRoot } from 'react-dom/client';

import { store } from '@app/appStore';
import { router } from '@app/router';
import '@app/styles/normalize.css';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <AppInitializer>
      <RouterProvider router={router} />
    </AppInitializer>
  </Provider>
);
