export const UPLOAD_PATHS = {
  userAvatar: (userId: string) => `users/${userId}/avatar`,
  userCover: (userId: string) => `users/${userId}/cover`,
  postImage: (postId: string) => `posts/${postId}/image`,
  replyImage: (replyId: string) => `replies/${replyId}/image`,
}
