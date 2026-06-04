import { AdminUser } from "@/types/admin";

export const MOCK_ADMINS: AdminUser[] = [
  {
    id: "1",
    name: "Josivan Silva",
    email: "admin@foodfloripa.com",
    role: "SUPER_ADMIN",
    status: "ACTIVE",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Maria Admin",
    email: "maria@foodfloripa.com",
    role: "ADMIN",
    status: "ACTIVE",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];