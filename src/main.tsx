import { RouterProvider } from 'react-router';

import { Provider } from 'react-redux';

import { AppInitializer } from 'app/providers/AppInitializer.tsx';
import { store } from 'app/store.ts';
import { createRoot } from 'react-dom/client';

import { router } from './app/router.tsx';
import './normalize.css';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <AppInitializer>
      <RouterProvider router={router} />
    </AppInitializer>
  </Provider>
);
