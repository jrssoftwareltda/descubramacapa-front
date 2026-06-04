export type UserRole = "SUPER_ADMIN" | "ADMIN" | "EDITOR";

export type AdminStatus = "ACTIVE" | "INACTIVE";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: AdminStatus;
  createdAt: string;
  updatedAt: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: UserRole;
  };
}