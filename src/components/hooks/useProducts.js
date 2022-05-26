import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useLocation } from "react-router-dom";
import auth from "../firebase.init";

const useTools = (reload, reloadModal) => {

  //Declaring State
  const [tools, setTools] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [authUser] = useAuthState(auth);

  const { pathname } = useLocation();

  useEffect(() => {
    setIsLoading(true);
    fetch("https://fast-springs-48095.herokuapp.com/products", {
      headers: {
        "Content-Type": "application/json",
        email: `${authUser?.email}`,
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setTools(json);
        setIsLoading(false);
      });
  }, [pathname, authUser, reload, reloadModal]);

  return [tools, setTools, isLoading];
};

export default useTools;
