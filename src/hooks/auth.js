import { useState } from "react";
import { post } from "../lib/api";

export const useLogin = (success, error) => {
  const [isLoading, setIsLoading] = useState(false);
  const setLogin = async (data) => {
    setIsLoading(true);
    const response = await post("/api/auth/login", data);
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
    const response = await post("/api/auth/signup", data);
    if (response.status === 200) {
      success(response.data);
    } else {
      setIsLoading(false);
      error(response.data);
    }
  };

  return [isLoading, setSignup];
};

export const useCsrf = () => {
  const [csrf, setCsrf] = useState(null);
  const setCookie = () => {
    const cookieValue = document.cookie.split('; ').find(row => row.startsWith('XSRF-TOKEN='))?.split('=')[1];
    setCsrf(cookieValue);
  }
  return [csrf, setCookie];
}