import { apiFetch } from './fetch';

export async function getPosts() {
  const result = await apiFetch('/social/posts?_author=true&_reactions=true&_comments=true');
  return result.data;
}

export async function usersProfile(username: string) {
  const result = await apiFetch(
    `/social/profiles/${username}/posts?_author=true&_reactions=true&_comments=true`,
  );
  return result.data;
}
