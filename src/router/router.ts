import { renderLogin } from '../pages/login';
import { renderFeed } from '../pages/feed';
import { load } from '../utils/storage.ts';

export function router() {
  const socialApp = document.getElementById('socialApp') as HTMLDivElement;
  if (!socialApp) return;
  const path = window.location.hash;

  switch (path) {
    case '#/feed':
      if (!load('token')) {
        window.location.hash = '#/login';
        return;
      }

      renderFeed(socialApp);
      break;

    case '#/login':
      if (load('token')) {
        window.location.hash = '#/feed';
        return;
      }
      renderLogin(socialApp);
      break;

    default:
      renderLogin(socialApp);
  }
}
