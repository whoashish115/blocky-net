import { createContext, useReducer, useEffect } from "react";
import reducers from "./reducers/Reducers";
import { getData } from "../utils/fetchData";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const initialState = {
    theme: "light",
    auth: {},
    notify: {},
    reportblog: { blog: "" },
    reportcomment: { comment: "" },
    categories: [],
    navigations: [],
    navigationCategories: [],
    // admin 
    users: [],
    pages: [],
    blogs: [],
  };

  const [state, dispatch] = useReducer(reducers, initialState);
  const { auth } = state;

  // Theme
  useEffect(() => {
    dispatch({ type: "NOTIFY", payload: { loading: true } });
    const theme = localStorage.getItem("theme");
    if (theme == "light" || theme == "dark") {
      dispatch({ type: "THEME", payload: theme });
    }
    dispatch({ type: "NOTIFY", payload: {} });
  }, []);

  // Non Auth User 
  useEffect(() => {
    getData("category").then((res) => {
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });
      dispatch({ type: "ADD_CATEGORIES", payload: res.categories });
    });
    getData("navigation").then((res) => {
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });
      dispatch({ type: "ADD_NAVIGATIONS", payload: res.navigations });
    });
    getData("navigationCategory").then((res) => {
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });
      dispatch({ type: "ADD_NAVIGATION_CATEGORIES", payload: res.navigationCategories });
    });
    getData("page").then((res) => {
      if (res.err) return dispatch({ type: "NOTIFY", payload: { error: res.err } });
      dispatch({ type: "ADD_PAGES", payload: res.pages });
    });
  }, []);

  // Auth User
  useEffect(() => {
    dispatch({ type: "NOTIFY", payload: { loading: true } });
    const firstLogin = localStorage.getItem("firstLogin");
    if (firstLogin) {
      getData("auth/accessToken").then((res) => {
        if (res.err) return localStorage.removeItem("firstLogin");
        dispatch({ type: "AUTH", payload: { token: res.access_token, user: res.user }});
      });
    }
    dispatch({ type: "NOTIFY", payload: {} });
  }, []);

  // Admin Auth User
  useEffect(() => {
    if (auth.token) {
      if (auth.user.role === "admin") {
        dispatch({ type: "NOTIFY", payload: { loading: true } });

        getData("admin/user", auth.token).then((res) => {
          if (res.err)
            return dispatch({ type: "NOTIFY", payload: { error: res.err } });
          dispatch({ type: "ADD_USERS", payload: res.users });
        });

        getData("admin/blog", auth.token).then((res) => {
          if (res.err)
            return dispatch({ type: "NOTIFY", payload: { error: res.err } });
          dispatch({ type: "ADD_BLOGS", payload: res.blogs });
        });


        dispatch({ type: "NOTIFY", payload: {} });
      }
    } else {
      dispatch({ type: "ADD_USERS", payload: [] });
      dispatch({ type: "ADD_BLOGS", payload: [] });
    }
  }, [auth.token]);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};
