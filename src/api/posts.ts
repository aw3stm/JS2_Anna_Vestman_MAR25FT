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

interface createPostData {
  title?: string;
  body: string;
  media?: {
    url: string;
    alt: string;
  };
}

export async function newPost(postData: createPostData) {
  const result = await apiFetch('/social/posts', {
    method: 'POST',
    body: JSON.stringify(postData),
  });
  return result.data;
}

export async function deletePost(postId: number) {
  await apiFetch(`/social/posts/${postId}`, {
    method: 'DELETE',
  });
}

export async function updatePost(postId: number, postData: any) {
  const result = await apiFetch(`/social/posts/${postId}`, {
    method: 'PUT',
    body: JSON.stringify(postData),
  });
  return result.data;
}

export async function postSearch(query: string) {
  const result = await apiFetch(
    `/social/posts/search?q=${query}&_author=true&_reactions=true&_comments=true`,
  );
  return result.data;
}

export async function followUser(name: string) {
  const response = await apiFetch(`/social/profiles/${name}/follow`, {
    method: 'PUT',
  });
  return response;
}

export async function unfollowUser(name: string) {
  const response = await apiFetch(`/social/profiles/${name}/unfollow`, {
    method: 'PUT',
  });
  return response;
}

export async function myProfile(name: string) {
  return await apiFetch(`/social/profiles/${name}?_following=true`);
}
