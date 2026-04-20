import { apiFetch } from './fetch';

export async function postReaction(postId: number) {
  return apiFetch(`/social/posts/${postId}/react/👍`, {
    method: 'PUT',
  });
}
