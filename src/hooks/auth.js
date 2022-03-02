import { useState } from "react";
import { post } from "../lib/api";

export const useRequest = (success, error, url) => {
  const [isLoading, setIsLoading] = useState(false);
  const setRequest = async (data) => {
    setIsLoading(true);
    const response = await post(url, data);
    if (response.status === 200) {
      success(response.data);
    } else {
      setIsLoading(false);
      error(response.data);
    }
  };

  return [isLoading, setRequest];
};

export const useCsrf = () => {
  const [csrf, setCsrf] = useState(null);
  const setCookie = () => {
    const cookieValue = document.cookie.split('; ').find(row => row.startsWith('XSRF-TOKEN='))?.split('=')[1];
    setCsrf(cookieValue);
  }
  return [csrf, setCookie];
}