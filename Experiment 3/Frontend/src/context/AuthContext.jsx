import {
  createContext,
  useContext,
  useState
} from "react";

import api
from "../services/api";

const AuthContext =
  createContext();

export const AuthProvider =
  ({
    children
  }) => {

    const savedUser =
      localStorage.getItem(
        "user"
      );

    const [
      user,
      setUser
    ] = useState(
      savedUser
        ? JSON.parse(
            savedUser
          )
        : null
    );

    const login =
      async (
        email,
        password
      ) => {

        const response =
          await api.post(
            "/auth/login",
            {
              email,
              password
            }
          );

        const {
          accessToken,
          refreshToken,
          user
        } =
          response.data;

        localStorage.setItem(
          "accessToken",
          accessToken
        );

        localStorage.setItem(
          "refreshToken",
          refreshToken
        );

        localStorage.setItem(
          "user",
          JSON.stringify(
            user
          )
        );

        setUser(
          user
        );

        return user;
      };

    const logout =
      async () => {

        const refreshToken =
          localStorage.getItem(
            "refreshToken"
          );

        try {

          if (
            refreshToken
          ) {

            await api.post(
              "/auth/logout",
              {
                refreshToken
              }
            );
          }

        } catch (
          error
        ) {

          console.log(
            "Backend logout request failed."
          );
        }

        localStorage.clear();

        setUser(
          null
        );
      };

    return (

      <AuthContext.Provider
        value={{
          user,
          login,
          logout
        }}
      >

        {children}

      </AuthContext.Provider>
    );
  };

export const useAuth =
  () => {
    return useContext(
      AuthContext
    );
  };