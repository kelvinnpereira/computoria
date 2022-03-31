import useSWR from "swr";
import Router from "next/router";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useContext } from "react";

import { get } from "../lib/api";
import { ContextNotification } from "../contexts/notification";

export const useFetch = (
  url, options = null,
  dataDispatch = null) => {
  const { auth } = useSelector(
    state => ({
      auth: state.auth
    }),
    shallowEqual
  );
  const dispatch = useDispatch();

  const { onSetNotification } = useContext(ContextNotification) ??
  { onSetNotification: () => null };

  const fetcher = async (url) => {
    if (url.includes("undefined")) {
      return;
    }
    const response = await get(url);
    if (response.status === 401 && !auth?.user) {
      dispatch({ type: "LOGOUT" });
      Router.push("/auth/login");
      return;
    }

    if (response.status === 500) {
      if (response?.data?.error?.message) {
        onSetNotification(response?.data?.error?.message);
      }
      if (response?.data?.error) {
        onSetNotification(response?.data?.error);
      }
      if (response?.data?.data?.message) {
        onSetNotification(response?.data?.data?.message);
      }
    }

    if (dataDispatch) {
      dispatch({
        type: dataDispatch.type,
        payload: {
          id: dataDispatch.id,
          value: response.data
        }
      });
    }
    return response.data;
  };

  const { data, error, mutate, isValidating } = useSWR(url, fetcher, options);

  const isLoading = !data;

  const reValidate = async (dataToRevalidate = null) => {
    await mutate(dataToRevalidate, !dataToRevalidate);
  };

  return { data, error, isLoading, reValidate, isValidating };
};
