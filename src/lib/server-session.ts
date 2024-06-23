"use server";

import { __VARS } from "@/app/const/vars";
import { UserType } from "@/types/user";
import { cookies } from "next/headers";
import axiosInstance from "./axios";

export type UserSession = {
  isAuthenticated: boolean;
  data?: {
    user: UserType;
    accessToken: string;
  };
};

export async function getServerToken() {
  const token = cookies().get(__VARS.tokenCookieKey)?.value || "";
  return {
    token,
    isAuthenticated: !!token,
  };
}

export default async function getServerSession<T = UserSession>() {
  const token = cookies().get(__VARS.tokenCookieKey)?.value || "";

  if (!token)
    return {
      data: undefined,
      isAuthenticated: false,
    };

  let user;
  try {
    const res = await axiosInstance.get<UserType>(`/users/me`, {
      headers: {
        ["Authorization"]: `Bearer ${token}`,
      },
    });
    user = res.data;
  } catch (e) {}

  const isAuthenticated = !!token;

  return {
    isAuthenticated: !!isAuthenticated,
    data: {
      user,
      accessToken: token,
    },
  } as T;
}
