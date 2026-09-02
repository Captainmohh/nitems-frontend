import axios from "axios";

const BASE =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://api.erp.nitda.gov.ng/api/v1";

export const api = axios.create({ baseURL: BASE });

// Attach access token from localStorage on every request
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("accessToken");
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Unwrap the backend { success, data, ?meta } envelope
api.interceptors.response.use((r) => {
  const body = r.data;
  if (body && typeof body === "object" && "success" in body) {
    r.data =
      body.meta !== undefined
        ? { data: body.data, meta: body.meta } // paginated
        : body.data; // single / plain
  }
  return r;
});

// Auto-refresh on 401
api.interceptors.response.use(
  (r) => r,
  async (err) => {
    const original = err.config;
    if (err.response?.status === 401 && !original._retry) {
      original._retry = true;
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        try {
          const { data } = await axios.post(`${BASE}/auth/token/refresh`, {
            refreshToken,
          });
          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem("refreshToken", data.refreshToken);
          original.headers.Authorization = `Bearer ${data.accessToken}`;
          return api(original);
        } catch {
          localStorage.clear();
          window.location.href = "/auth/sign-in";
        }
      }
    }
    return Promise.reject(err);
  }
);

// ── Auth ──────────────────────────────────────────────────────────────────────
export const authApi = {
  signIn: (body: { email: string; password: string }) =>
    api.post("/auth/sign-in", body).then((r) => r.data),
  logout: () => api.post("/auth/logout").then((r) => r.data),
  requestPasswordReset: (email: string) =>
    api.post("/auth/password-reset/request", { email }).then((r) => r.data),
  resetPassword: (userId: string, token: string, newPassword: string) =>
    api.post("/auth/password-reset/reset", { userId, token, newPassword }).then((r) => r.data),
};

// ── Users ─────────────────────────────────────────────────────────────────────
export const userApi = {
  getMe: () => api.get("/users/me").then((r) => r.data),
  getMyStats: () => api.get("/users/me/stats").then((r) => r.data),
  updateProfile: (body: { firstName?: string; lastName?: string }) =>
    api.patch("/users/me/profile", body).then((r) => r.data),
  changePassword: (body: { currentPassword: string; newPassword: string }) =>
    api.patch("/users/me/password", body).then((r) => r.data),
  findAll: (params?: Record<string, unknown>) =>
    api.get("/users", { params }).then((r) => r.data),
  create: (body: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role?: string;
    departmentId?: string;
  }) => api.post("/users", body).then((r) => r.data),
  update: (
    userId: string,
    body: { firstName?: string; lastName?: string; role?: string }
  ) => api.patch(`/users/${userId}`, body).then((r) => r.data),
  ban: (userId: string) =>
    api.patch(`/users/${userId}/ban`).then((r) => r.data),
  unban: (userId: string) =>
    api.patch(`/users/${userId}/unban`).then((r) => r.data),
  delete: (userId: string) =>
    api.delete(`/users/${userId}`).then((r) => r.data),
  verify: (userId: string) =>
    api.put(`/users/${userId}/verify`).then((r) => r.data),
  adminResetPassword: (userId: string, newPassword: string) =>
    api.patch(`/users/${userId}/reset-password`, { newPassword }).then((r) => r.data),
};

// ── Analytics ─────────────────────────────────────────────────────────────────
export const analyticsApi = {
  overview: () => api.get("/analytics/overview").then((r) => r.data),
  admin: () => api.get("/analytics/admin").then((r) => r.data),
  myDepartment: () => api.get("/analytics/my-department").then((r) => r.data),
};

// ── Departments ───────────────────────────────────────────────────────────────
export const departmentApi = {
  findAll: (params?: Record<string, unknown>) =>
    api.get("/departments", { params }).then((r) => r.data),
  findById: (id: string) =>
    api.get(`/departments/${id}`).then((r) => r.data),
  create: (body: { name: string; description?: string }) =>
    api.post("/departments", body).then((r) => r.data),
  update: (id: string, body: { name?: string; description?: string }) =>
    api.patch(`/departments/${id}`, body).then((r) => r.data),
  delete: (id: string) =>
    api.delete(`/departments/${id}`).then((r) => r.data),
  listStaff: (id: string) =>
    api.get(`/departments/${id}/staff`).then((r) => r.data),
  assignStaff: (id: string, userId: string) =>
    api.post(`/departments/${id}/staff`, { userId }).then((r) => r.data),
  removeStaff: (id: string, userId: string) =>
    api.delete(`/departments/${id}/staff/${userId}`).then((r) => r.data),
};

export const auditApi = {
  findAll: (params?: Record<string, unknown>) =>
    api.get("/audit", { params }).then((r) => r.data),
  findOne: (id: string) =>
    api.get(`/audit/${id}`).then((r) => r.data),
};
