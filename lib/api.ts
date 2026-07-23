// Helper functions for API calls

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "";

// Auth API
export const authAPI = {
  login: async (email: string, password: string): Promise<Response> => {
    return fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  },
};

// Posts API
export const postsAPI = {
  getAll: async <T = any>(): Promise<T> => {
    const response = await fetch(`${BACKEND_URL}/posts/getinfo`);

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || "Failed to fetch posts");
    }

    return await response.json();
  },

  getById: async (id: string): Promise<Response> => {
    return fetch(`${BACKEND_URL}/posts/getpost/${id}`);
  },

  create: async <T = any>(postData: T): Promise<Response> => {
    return fetch(`${BACKEND_URL}/posts/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });
  },

  update: async <T = any>(id: string, postData: T): Promise<Response> => {
    return fetch(`${BACKEND_URL}/posts/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });
  },

  delete: async (id: string): Promise<Response> => {
    return fetch(`${BACKEND_URL}/posts/delete/${id}`, {
      method: "DELETE",
    });
  },
};

// Applications API
export const applicationsAPI = {
  getAll: async <T = any>(filters: Record<string, string> = {}): Promise<T> => {
    const queryParams = new URLSearchParams(filters).toString();
    const response = await fetch(
      `${BACKEND_URL}/applications/getinfo${queryParams ? `?${queryParams}` : ""}`
    );

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || "Failed to fetch applications");
    }

    return await response.json();
  },

  getById: async (id: string): Promise<Response> => {
    return fetch(`${BACKEND_URL}/applications/getone/${id}`);
  },

  create: async <T = any>(applicationData: T): Promise<Response> => {
    return fetch(`${BACKEND_URL}/applications/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(applicationData),
    });
  },

  updateStatus: async (id: string, status: string): Promise<Response> => {
    return fetch(`${BACKEND_URL}/applications/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });
  },

  withdraw: async (id: string): Promise<Response> => {
    return fetch(`${BACKEND_URL}/applications/delete/${id}`, {
      method: "DELETE",
    });
  },
};

// Students API
export const studentsAPI = {
  getProfile: async (id: string): Promise<Response> => {
    return fetch(`${BACKEND_URL}/students/getinfo/${id}`);
  },

  updateProfile: async <T = any>(id: string, profileData: T): Promise<Response> => {
    return fetch(`${BACKEND_URL}/students/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profileData),
    });
  },
};

// Recruiters API
export const recruitersAPI = {
  getProfile: async <T = any>(id: string): Promise<T> => {
    const response = await fetch(`${BACKEND_URL}/recruiters/getinfo/${id}`);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch profile with status: ${response.status}`
      );
    }

    const data = await response.json();
    return data;
  },

  updateProfile: async <T = any>(id: string, profileData: T): Promise<Response> => {
    return fetch(`${BACKEND_URL}/recruiters/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profileData),
    });
  },
};
