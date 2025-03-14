import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadGlobalData } from "../redux/globalActions";
import ErrorModal from "./ErrorModal";

const MainWrapper = ({ children }) => {
  const dispatch = useDispatch();
  const { apiError, errorMessage } = useSelector((state) => state.global);

  // useEffect(() => {
  //   dispatch(loadGlobalData());
  // }, [dispatch]);

  return (
    <>
      {apiError && <ErrorModal message={errorMessage} />}
      {children}
    </>
  );
};

export default MainWrapper;
