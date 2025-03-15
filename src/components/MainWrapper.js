import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeagues,clearApiError } from "../redux/globalActions";
import ErrorModal from "./ErrorModal";

const MainWrapper = ({ children }) => {
  const dispatch = useDispatch();
  const { apiError, errorMessage } = useSelector((state) => state.global);
  const leagueteamownerId = useSelector((state) => state.global.leagueteamownerId) || localStorage.getItem("leagueteamownerId");

  const [showErrorModal, setShowErrorModal] = useState(apiError);

  useEffect(() => {
    if (leagueteamownerId) {
      dispatch(fetchLeagues(leagueteamownerId)); // Fetch league data
    }
  }, [dispatch, leagueteamownerId]);

  useEffect(() => {
    setShowErrorModal(apiError);
  }, [apiError]);

  return (
    <>
      {showErrorModal && <ErrorModal message={errorMessage} onClose={() => dispatch(clearApiError())}  />}
      {children}
    </>
  );
};

export default MainWrapper;
