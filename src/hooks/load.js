import { useContext, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import Router from "next/router";

import { get } from "../lib/api";
import { ContextNotification } from "../contexts/notification";

export const useLoad = (uri, dataDispatch = null) => {
  const { auth } = useSelector(
    state => ({
      auth: state.auth
    }),
    shallowEqual
  );
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});
  const dispatch = useDispatch();
  const { onSetNotification } = useContext(ContextNotification) ??
  { onSetNotification: () => null };

  const loadData = async (query = "") => {
    setIsLoading(true);
    const response = await get(`${uri}?${query}`);
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
    }

    return result;
  };

  return { data, loadData, isLoading };
};
