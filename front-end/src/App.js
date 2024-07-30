import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Public from "./components/Public";
import Login from "./features/auth/Login";
import DashLayout from "./components/DashLayout";
import Welcome from "./features/auth/Welcome";
import Home from "./features/auth/Home";
import NotesList from "./features/notes/NotesList";
import UsersList from "./features/users/UsersList";
import TasksList from "./features/Table/TableList";
import Report from "./features/auth/Report"

function App() {
  console.log("App component rendered");
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />

        <Route path="dash" element={<DashLayout />}>
          {/* <Route index element={<Welcome />} /> */}
          <Route index element={<Home />} />

          <Route path="report">
            <Route index element={<Report />} />
          </Route>

          <Route path="notes">
            <Route index element={<NotesList />} />
          </Route>

          <Route path="users">
            <Route index element={<UsersList />} />
          </Route>

          <Route path="table">
            <Route index element={<TasksList />} />
          </Route>
        </Route>
        {/* End Dash */}
      </Route>
    </Routes>
  );
}

export default App;
