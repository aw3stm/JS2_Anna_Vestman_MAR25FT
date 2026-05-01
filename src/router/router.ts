import { renderLogin } from '../pages/login';
import { renderFeed } from '../pages/feed';
import { load } from '../utils/storage.ts';
import { renderProfile } from '../pages/profile.ts';
import { renderCreatePost } from '../components/createPost.ts';
import { renderRegister } from '../pages/register.ts';
import { renderSearch } from '../pages/search.ts';
import { renderSinglePost } from '../pages/singlepost.ts';

export function router() {
  const socialApp = document.getElementById('socialApp') as HTMLDivElement;
  if (!socialApp) return;
  const hash = window.location.hash || '#/login';
  const path = hash.split('?')[0];

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

    case '#/profile':
      if (!load('token')) {
        window.location.hash = '#/login';
        return;
      }
      renderProfile(socialApp);
      break;

    case '#/create':
      if (!load('token')) {
        window.location.hash = '#/login';
        return;
      }
      renderCreatePost(socialApp);
      break;

    case '#/register':
      if (load('token')) {
        window.location.hash = '#/feed';
        return;
      }
      renderRegister(socialApp);
      break;

    case '#/search':
      if (!load('token')) {
        window.location.hash = '#/login';
        return;
      }
      renderSearch(socialApp);
      break;

    case '#/post':
      if (!load('token')) {
        window.location.hash = '#/login';
        return;
      }
      renderSinglePost(socialApp);
      break;

    default:
      renderLogin(socialApp);
  }
}
