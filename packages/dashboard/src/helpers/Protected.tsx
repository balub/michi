import React, { useEffect } from "react";
import { getUserDetails, refreshToken } from "./auth";
import { useUserStore } from "@/store/userStore";
import { redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";

interface IProps {
  children: React.ReactChild;
}

function Protected({ children }: IProps) {
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    async function meQuery() {
      const res = await getUserDetails();
      const error = res.errors && res.errors[0];

      // no cookies sent. so the user is not logged in
      if (error && error.message === "auth/cookies_not_found") {
        setUser(null);
        navigate("/login");
      }

      // cookies sent, but it is expired, we need to refresh the token
      if (error && error.message === "Unauthorized") {
        const isRefreshSuccess = await refreshToken();

        if (isRefreshSuccess) {
          navigate("/");
        } else {
          setUser(null);
          navigate("/login");
        }

        return;
      }

      // no errors, we have a valid user
      if (res.data && res.data.me) {
        const hoppBackendUser = res.data.me;
        setUser(hoppBackendUser);
        navigate("/");
      }
    }

    meQuery();
  }, []);

  return children;
}

export default Protected;
