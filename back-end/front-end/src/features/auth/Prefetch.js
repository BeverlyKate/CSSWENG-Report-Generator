import { store } from "../../app/store";
import { tasksApiSlice } from "../Table/TableApiSlice";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const Prefetch = () => {
  useEffect(() => {
    console.log("subscribing");
    const tasks = store.dispatch(tasksApiSlice.endpoints.getTasks.initiate());

    return () => {
      console.log("unsubscribing");
      tasks.unsubscribe();
    };
  }, []);

  return <Outlet />;
};
export default Prefetch;
