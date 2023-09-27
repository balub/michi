import axios from "axios";

export async function signInUserWithGithub() {
  window.location.href = `${import.meta.env.VITE_BACKEND_API_URL}/auth/github`;
}

export async function signInUserWithGoogle() {
  window.location.href = `${import.meta.env.VITE_BACKEND_API_URL}/auth/google`;
}

export async function getUserDetails() {
  const res = await axios.post<{
    data?: {
      me?: {
        uid: string;
        displayName: string;
        email: string;
        photoURL: string;
        createdOn: Date;
      };
    };
    errors?: Array<{
      message: string;
    }>;
  }>(
    `${import.meta.env.VITE_BACKEND_GQL_URL}`,
    {
      query: `query Me {
      me {
        uid
    displayName
    email
    photoURL
    createdOn
      }
    }`,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );

  return res.data;
}

export async function refreshToken() {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_API_URL}/auth/refresh`,
      {
        withCredentials: true,
      }
    );
    return res.status === 200;
  } catch {
    return false;
  }
}

export async function logout() {
  await axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/auth/logout`, {
    withCredentials: true,
  });
}
