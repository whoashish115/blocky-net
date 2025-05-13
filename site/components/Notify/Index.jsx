import * as React from "react";
import { DataContext } from "../../store/GlobalState";
import Loader from "./Loader";
import Toast from "./Toast";

const Index = () => {
  const { state } = React.useContext(DataContext);
  const { notify } = state;

  return (
    <>
      {notify.loading && <Loader />}

      {notify.error && <Toast message={notify.error} type="error" />}
      {notify.success && <Toast message={notify.success} type="success" />}
      {notify.warning && <Toast message={notify.warning} type="warning" />}
    </>
  );
};

export default Index;
