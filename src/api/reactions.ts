import { apiFetch } from './fetch';

export async function postReaction(postId: number) {
  return apiFetch(`/social/posts/${postId}/react/👍`, {
    method: 'PUT',
  });
}

export async function postComment(postId: number, textComment: string) {
  const response = await apiFetch(`/social/posts/${postId}/comment`, {
    method: 'POST',
    body: JSON.stringify({ body: textComment }),
  });

  return response;
}

export async function deleteComment(postId: number, commentId: number) {
  await apiFetch(`/social/posts/${postId}/comment/${commentId}`, {
    method: 'DELETE',
  });
}
