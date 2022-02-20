import { useState } from "react";
import { post } from "../lib/api";

export const useLogin = (success, error) => {
  const [isLoading, setIsLoading] = useState(false);
  const setLogin = async (data) => {
    setIsLoading(true);
    const response = await post("/auth/login", data);
    if (response.status === 200) {
      success(response.data);
    } else {
      setIsLoading(false);
      error(response.data);
    }
  };

  return [isLoading, setLogin];
};

export const useSignup = (success, error) => {
  const [isLoading, setIsLoading] = useState(false);
  const setSignup = async (data) => {
    setIsLoading(true);
    const response = await post("/auth/signup", data);
    if (response.status === 200) {
      success(response.data);
    } else {
      setIsLoading(false);
      error(response.data);
    }
  };

  return [isLoading, setSignup];
};
