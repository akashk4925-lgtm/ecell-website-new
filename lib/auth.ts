import { getSession } from "next-auth/react";

export interface SessionUser {
  id?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  roles?: string[];
  [key: string]: unknown;
}

// Get the currently logged-in user from NextAuth session
export const getStoredUser = async (): Promise<SessionUser | null> => {
  try {
    const session = await getSession();
    return (session?.user as SessionUser) || null;
  } catch (error) {
    console.error("Error getting session user:", error);
    return null;
  }
};

// Get user ID from session
export const getCurrentUserId = async (): Promise<string | null> => {
  const user = await getStoredUser();
  return user?.id || null;
};

// Get user roles (STUDENT, RECRUITER, AMBASSADOR)
export const getCurrentUserRole = async (): Promise<string[]> => {
  const user = await getStoredUser();
  const roles: string[] = [];

  if (!user) return roles;

  if (user.roles?.includes("STUDENT")) roles.push("STUDENT");
  if (user.roles?.includes("RECRUITER")) roles.push("RECRUITER");
  if (user.roles?.includes("AMBASSADOR")) roles.push("AMBASSADOR");

  return roles;
};

// Check if user is authenticated
export const isAuthenticated = async (): Promise<boolean> => {
  const user = await getStoredUser();
  return !!user;
};

// Logout utility
export const logout = async (): Promise<void> => {
  const { signOut } = await import("next-auth/react");
  await signOut();
};

// Get student ID (uses user.id for now)
export const getStudentId = async (): Promise<string | null> => {
  const user = await getStoredUser();
  return user?.id || null;
};

// Get recruiter ID (uses user.id for now)
export const getRecruiterId = async (): Promise<string | null> => {
  const user = await getStoredUser();
  return user?.id || null;
};
