import { useEffect } from "react";

import { useAppDispatch } from "../../shared/store/hooks";
import {
  authInitialized,
  logout,
  restoreAuth,
} from "../../shared/features/auth/authSlice";
import { getCurrentUser } from "../../shared/services/auth/auth.service";


function AuthInitializer() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const initializeAuth = async () => {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");

      // No token
      if (!accessToken) {
        dispatch(authInitialized());
        return;
      }

      try {
        const user = await getCurrentUser(accessToken);

        dispatch(
          restoreAuth({
            user,
            accessToken,
            refreshToken,
          }),
        );
      } catch (error) {
        console.error("Auth restoration failed:", error);

        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        dispatch(logout());
      } finally {
        dispatch(authInitialized());
      }
    };

    initializeAuth();
  }, [dispatch]);

  return null;
}

export default AuthInitializer;