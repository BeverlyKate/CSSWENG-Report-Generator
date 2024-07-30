import React from "react";
import { useSelector } from "react-redux";
import { selectTaskById } from "./TableApiSlice";

const Task = ({ taskId, onEditClick }) => {
  const task = useSelector((state) => selectTaskById(state, taskId));

  if (task) {
    return (
      <tr className="row">
        <td>
          <div className="col repairId">
            <strong>
              <button className="idNum" onClick={() => onEditClick(task)}>
                {task.repairId}
              </button>
            </strong>
          </div>
        </td>
        <td>
          <div className="col repairDate">
            <strong>{task.repairDate}</strong>
          </div>
        </td>
        <td>
          <div className="col repairPLNumber">
            <strong>{task.repairPLNumber}</strong>
          </div>
        </td>
        <td>
          <div className="col repairCustomer">
            <strong>{task.repairCustomer}</strong>
          </div>
        </td>
        <td>
          <div className="col repairItemModel">
            <strong>{task.repairItemModel}</strong>
          </div>
        </td>
        <td>
          <div className="col repairDescription">
            <strong>{task.repairDescription}</strong>
          </div>
        </td>
        <td>
          <div className="col repairQuantity">
            <strong>{task.repairQuantity}</strong>
          </div>
        </td>
        <td>
          <div className="col repairUOM">
            <strong>{task.repairUOM}</strong>
          </div>
        </td>
        <td>
          <div className="col repairPullOutBy">
            <strong>{task.repairPullOutBy}</strong>
          </div>
        </td>
        <td>
          <div className="col repairCategory1">
            <strong>{task.repairCategory1}</strong>
          </div>
        </td>
        <td>
          <div className="col repairCategory2">
            <strong>{task.repairCategory2}</strong>
          </div>
        </td>
        <td>
          <div className="col repairSerialNumber">
            <strong>{task.repairSerialNumber}</strong>
          </div>
        </td>
        <td>
          <div className="col repairJobOrderNumber">
            <strong>{task.repairJobOrderNumber}</strong>
          </div>
        </td>
        <td>
          <div className="col repairDateStarted">
            <strong>{task.repairDateStarted}</strong>
          </div>
        </td>
        <td>
          <div className="col repairDateFinished">
            <strong>{task.repairDateFinished}</strong>
          </div>
        </td>
        <td>
          <div className="col repairTechnician1">
            <strong>{task.repairTechnician1}</strong>
          </div>
        </td>
        <td>
          <div className="col repairTechnician2">
            <strong>{task.repairTechnician2}</strong>
          </div>
        </td>
        <td>
          <div className="col repairItemStatus">
            <strong>{task.repairItemStatus}</strong>
          </div>
        </td>
        <td>
          <div className="col repairDeliveryStatus">
            <strong>{task.repairDeliveryStatus}</strong>
          </div>
        </td>
        <td>
          <div className="col repairRemarks">
            <strong>{task.repairRemarks}</strong>
          </div>
        </td>
        <td>
          <div className="col repairCost">
            <strong>{task.repairCost}</strong>
          </div>
        </td>
        <td>
          <div className="col repairReturnFormNumber">
            <strong>{task.repairReturnFormNumber}</strong>
          </div>
        </td>
        <td>
          <div className="col repairDateReturned">
            <strong>{task.repairDateReturned}</strong>
          </div>
        </td>
        <td>
          <div className="col repairStatus">
            <strong>{task.repairStatus}</strong>
          </div>
        </td>
        <td>
          <div className="col repairDefect">
            <strong>{task.repairDefect}</strong>
          </div>
        </td>
      </tr>
    );
  } else return null;
};

export default Task;
