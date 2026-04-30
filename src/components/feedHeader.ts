import { load } from '../utils/storage';

export function feedHeader() {
  const profile = load('profile');

  const name = profile?.name || 'User';

  return `
<div class="welcome-message">
<p class="welcome-text">Welcome back, <span>${name}!</span></p>
</div>
`;
}
