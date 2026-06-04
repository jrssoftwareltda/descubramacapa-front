import { LoginResponse } from "@/types/admin";

const AUTH_KEY = "foodfloripa.console.auth";

export const authService = {
  async login(email: string, password: string): Promise<LoginResponse> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (!email || !password) {
      throw new Error("Email e senha são obrigatórios.");
    }

    const response: LoginResponse = {
      token: "mock-token",
      user: {
        id: "1",
        name: "Admin Master",
        email,
        role: "SUPER_ADMIN",
      },
    };

    if (typeof window !== "undefined") {
      localStorage.setItem(AUTH_KEY, JSON.stringify(response));
    }

    return response;
  },

  logout() {
    if (typeof window !== "undefined") {
      localStorage.removeItem(AUTH_KEY);
    }
  },

  getSession(): LoginResponse | null {
    if (typeof window === "undefined") return null;
    const raw = localStorage.getItem(AUTH_KEY);
    return raw ? JSON.parse(raw) : null;
  },
};