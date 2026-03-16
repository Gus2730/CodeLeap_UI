const API_BASE_URL = "https://dev.codeleap.co.uk/careers/";

export interface Post {
  id: number;
  username: string;
  created_datetime: string;
  title: string;
  content: string;
}

export interface PostsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Post[];
}

export interface CreatePostData {
  username: string;
  title: string;
  content: string;
}

export interface UpdatePostData {
  title: string;
  content: string;
}

export async function getPosts(limit = 10, offset = 0): Promise<PostsResponse> {
  const response = await fetch(`${API_BASE_URL}?limit=${limit}&offset=${offset}`);
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  return response.json();
}

export async function createPost(data: CreatePostData): Promise<Post> {
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to create post");
  }
  return response.json();
}

export async function updatePost(id: number, data: UpdatePostData): Promise<Post> {
  const response = await fetch(`${API_BASE_URL}${id}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to update post");
  }
  return response.json();
}

export async function deletePost(id: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}${id}/`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete post");
  }
}
