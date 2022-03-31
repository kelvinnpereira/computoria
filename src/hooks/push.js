import { useContext, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import Router from "next/router";
import { useSWRConfig } from "swr";

import { post, put } from "../lib/api";
import { ContextNotification } from "../contexts/notification";

export const usePush = (uri, dataDispatch = null, method = "PUT") => {
  const { auth } = useSelector(
    state => ({
      auth: state.auth
    }),
    shallowEqual
  );
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});
  const dispatch = useDispatch();
  const { mutate } = useSWRConfig();
  const { onSetNotification } = useContext(ContextNotification) ??
  { onSetNotification: () => null };

  const pushData = async (data) => {
    setIsLoading(true);
    let response;
    if (method === "POST") {
      response = await post(uri, data);
    } else {
      response = await put(uri, data);
    }
    setIsLoading(false);
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
    const result = response.data;
    setData(result);

    if (dataDispatch) {
      dispatch({
        type: dataDispatch.type,
        payload: {
          id: dataDispatch.id,
          value: result
        }
      });
      mutate(uri, result, false);
    }

    return result;
  };

  return { data, pushData, isLoading };
};
