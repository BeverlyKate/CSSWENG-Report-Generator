import React, { useState } from "react";
import { useGetTasksQuery } from "./TableApiSlice";
import Task from "./Table";
import Modal from "../../components/Modal.js";
import EditTaskForm from "./EditTaskForm";

const TasksList = () => {
  const {
    data: tasks,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTasksQuery();
  const [showModal, setShowModal] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  const handleEditClick = (task) => {
    setCurrentTask(task);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentTask(null);
  };

  let content;

  if (isLoading) content = <p>Loading...</p>;

  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>;
  }

  if (isSuccess) {
    const { ids } = tasks;

    const tableContent = ids?.length
      ? ids.map((taskId) => (
          <Task key={taskId} taskId={taskId} onEditClick={handleEditClick} />
        ))
      : null;

    content = (
      <div className="table-holder">
        <table className="dataTable">
          <thead>
            <tr className="row">
              <th className="col">Id</th>
              <th className="col">Date</th>
              <th className="col">PL #</th>
              <th className="col">Customer</th>
              <th className="col">Item model</th>
              <th className="col">Description</th>
              <th className="col">Quantity</th>
              <th className="col">UOM</th>
              <th className="col">PullOutBy</th>
              <th className="col">Category 1</th>
              <th className="col">Category 2</th>
              <th className="col">SerialNumber</th>
              <th className="col">JobOrderNumber</th>
              <th className="col">DateStarted</th>
              <th className="col">DateFinished</th>
              <th className="col">Technician 1</th>
              <th className="col">Technician 2</th>
              <th className="col">Item Status</th>
              <th className="col">Delivery Status</th>
              <th className="col">Remarks</th>
              <th className="col">Cost</th>
              <th className="col">Return Form Number</th>
              <th className="col">Date Returned</th>
              <th className="col">Status</th>
              <th className="col">Defect</th>
            </tr>
          </thead>
          <tbody>{tableContent}</tbody>
        </table>
        <Modal show={showModal} handleClose={handleCloseModal}>
          <EditTaskForm task={currentTask} handleClose={handleCloseModal} />
        </Modal>
      </div>
    );
  }

  return content;
};

export default TasksList;
