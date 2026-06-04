import { MOCK_ADMINS } from "@/mocks/admins";
import { getStorageItem, setStorageItem } from "@/lib/storage";
import { AdminUser } from "@/types/admin";

const STORAGE_KEY = "foodfloripa.console.admins";

function loadAdmins(): AdminUser[] {
  const stored = getStorageItem<AdminUser[]>(STORAGE_KEY, []);

  if (stored.length) return stored;

  setStorageItem(STORAGE_KEY, MOCK_ADMINS);
  return MOCK_ADMINS;
}

export const adminService = {
  async findAll(): Promise<AdminUser[]> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return loadAdmins();
  },

  async findById(id: string): Promise<AdminUser | undefined> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return loadAdmins().find((item) => item.id === id);
  },

  async create(payload: Omit<AdminUser, "id" | "createdAt" | "updatedAt">) {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const current = loadAdmins();
    const now = new Date().toISOString();

    const newAdmin: AdminUser = {
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
      ...payload,
    };

    const updated = [newAdmin, ...current];
    setStorageItem(STORAGE_KEY, updated);

    return newAdmin;
  },

  async update(id: string, payload: Partial<AdminUser>) {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const current = loadAdmins();
    const updated = current.map((item) =>
      item.id === id
        ? { ...item, ...payload, updatedAt: new Date().toISOString() }
        : item
    );

    setStorageItem(STORAGE_KEY, updated);
    return updated.find((item) => item.id === id);
  },
};