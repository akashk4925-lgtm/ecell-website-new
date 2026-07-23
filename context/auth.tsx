import React, { useContext, createContext, ReactNode } from "react";
import { useCookies } from "react-cookie";

export interface AuthContextType {
  superAdminToken?: string;
  setSuperAdminToken: (newSuperAdminToken: string) => void;
  deleteSuperAdminTokenToken: () => void;
  superAdminUserName?: string;
  setSuperAdminUserName: (newName: string) => void;
  deleteSuperAdminUserName: () => void;
  logoutSuperAdmin: () => void;
}

const AuthContext = createContext<AuthContextType>({
  superAdminToken: undefined,
  setSuperAdminToken: () => {},
  deleteSuperAdminTokenToken: () => {},
  superAdminUserName: undefined,
  setSuperAdminUserName: () => {},
  deleteSuperAdminUserName: () => {},
  logoutSuperAdmin: () => {},
});

export interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [cookies, setCookies, removeCookies] = useCookies(["superAdminToken", "superAdminUserName"]);
  const [superAdminProfileName, setSuperAdminProfileName, removeSuperAdminProfileName] = useCookies(["superAdminUserName"]);
  const superAdminToken = cookies.superAdminToken;
  const superAdminUserName = superAdminProfileName.superAdminUserName || cookies.superAdminUserName;

  const setSuperAdminToken = (newSuperAdminToken: string) => setCookies("superAdminToken", newSuperAdminToken, { path: "/" });
  const setSuperAdminUserName = (newName: string) => setSuperAdminProfileName("superAdminUserName", newName, { path: "/" });
  const deleteSuperAdminTokenToken = () => removeCookies("superAdminToken");
  const deleteSuperAdminUserName = () => removeSuperAdminProfileName("superAdminUserName");
  
  function logoutSuperAdmin() {
    setSuperAdminToken("");
    removeCookies("superAdminToken");
    setSuperAdminUserName("");
    removeCookies("superAdminUserName");
  }

  return (
    <AuthContext.Provider
      value={{
        superAdminToken,
        setSuperAdminToken,
        deleteSuperAdminTokenToken,
        superAdminUserName,
        setSuperAdminUserName,
        deleteSuperAdminUserName,
        logoutSuperAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
