import React, { useState } from "react";
import apiClient from "../../app/api/apiClient";

const EditTaskForm = ({ task, handleClose }) => {
  const [formData, setFormData] = useState({
    repairId: task.repairId || "",
    repairDate: task.repairDate || "",
    repairPLNumber: task.repairPLNumber || "",
    repairCustomer: task.repairCustomer || "",
    repairItemModel: task.repairItemModel || "",
    repairCategory1: task.repairCategory1 || "",
    repairCategory2: task.repairCategory2 || "",
    repairQuantity: task.repairQuantity || "",
    repairUOM: task.repairUOM || "",
    repairPullOutBy: task.repairPullOutBy || "",
    repairDescription: task.repairDescription || "",
    repairSerialNumber: task.repairSerialNumber || "",
    repairJobOrderNumber: task.repairJobOrderNumber || "",
    repairDateStarted: task.repairDateStarted || "",
    repairDateFinished: task.repairDateFinished || "",
    repairCost: task.repairCost || "",
    repairTechnician1: task.repairTechnician1 || "",
    repairTechnician2: task.repairTechnician2 || "",
    repairItemStatus: task.repairItemStatus || "",
    repairDeliveryStatus: task.repairDeliveryStatus || "",
    repairRemarks: task.repairRemarks || "",
    repairReturnFormNumber: task.repairReturnFormNumber || "",
    repairDateReturned: task.repairDateReturned || "",
    repairStatus: task.repairStatus || "",
    repairDefect: task.repairDefect || "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    apiClient
      .patch(`/api/tasks/update/${formData.repairId}`, formData)
      .then((response) => {
        console.log("Updated Task:", response.data);
        handleClose();
      })
      .catch((error) => {
        console.error("There was an error updating the task!", error);
      });
  };

  const handleDelete = () => {
    apiClient
      .delete(`/api/tasks/delete/${formData.repairId}`)
      .then((response) => {
        console.log("Deleted Task:", response.data);
        handleClose();
      })
      .catch((error) => {
        console.error("There was an error deleting the task!", error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Repair ID</label>
        <input
          type="text"
          name="repairId"
          value={formData.repairId}
          onChange={handleChange}
          readOnly
        />
      </div>
      <div>
        <label>Repair Date</label>
        <input
          type="text"
          name="repairDate"
          value={formData.repairDate}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>PL #</label>
        <input
          type="text"
          name="repairPLNumber"
          value={formData.repairPLNumber}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Customer</label>
        <input
          type="text"
          name="repairCustomer"
          value={formData.repairCustomer}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Item Model</label>
        <select
          name="repairItemModel"
          value={formData.repairItemModel}
          onChange={handleChange}
        >
          <option value="default">(Item)</option>
          <option value="FRAME EZ-112A">FRAME EZ-112A</option>
          <option value="FRAME EZ-206A">FRAME EZ-206A</option>
          <option value="FRAME EZ-406A">FRAME EZ-406A</option>
          <option value="FRAME HLT12X">FRAME HLT12X</option>
          <option value="FRAME K-10A">FRAME K-10A</option>
          <option value="FRAME K3">FRAME K3</option>
          <option value="FRAME KIRA 288">FRAME KIRA 288</option>
          <option value="FRAME LC-12N">FRAME LC-12N</option>
          <option value="FRAME LX-18">FRAME LX-18</option>
          <option value="FRAME LX-212A">FRAME LX-212A</option>
          <option value="FRAME LXD-7000">FRAME LXD-7000</option>
          <option value="FRAME V12A">FRAME V12A</option>
          <option value="FRAME VPX COMBI">FRAME VPX COMBI</option>
          <option value="FRAME VPX-310">FRAME VPX-310</option>
          <option value="FRAME VPX-312 (TOP)">FRAME VPX-312 (TOP)</option>
          <option value="FRAME VRX932A">FRAME VRX932A</option>
          <option value="FRAME VTX-12">FRAME VTX-12</option>
          <option value="FRAME VTX-935">FRAME VTX-935</option>
          <option value="HF-203 TRANSFORMER">HF-203 TRANSFORMER</option>
          <option value="HORN H3002">HORN H3002</option>
          <option value="HORN H310">HORN H310</option>
          <option value="HORN H315">HORN H315</option>
          <option value="HORN H7003">HORN H7003</option>
          <option value="MC-02SP BLACK (100M)">MC-02SP BLACK (100M)</option>
          <option value="MC-02SP D.BLUE (100M)">MC-02SP D.BLUE (100M)</option>
          <option value="MS-3">MS-3</option>
          <option value="NB-908">NB-908</option>
          <option value="PL CONNECTOR (MONO)">PL CONNECTOR (MONO)</option>
          <option value="RJ-45 CONNECTOR">RJ-45 CONNECTOR</option>
          <option value="SP-1">SP-1</option>
          <option value="SP-2">SP-2</option>
          <option value="SPEAKON">SPEAKON</option>
          <option value="SPW14">SPW14</option>
          <option value="SS-5 SPEAKER STAND">SS-5 SPEAKER STAND</option>
          <option value="SS-8 SPEAKER STAND">SS-8 SPEAKER STAND</option>
          <option value="THX-12">THX-12</option>
          <option value="VC-100">VC-100</option>
          <option value="XLR (F)">XLR (F)</option>
          <option value="XLR (M)">XLR (M)</option>
        </select>
      </div>
      <div>
        <label>Category 1</label>
        <select
          name="repairCategory1"
          value={formData.repairCategory1}
          onChange={handleChange}
        >
          <option value="default">(Category)</option>
          <option value="ACCESSORIES">ACCESSORIES</option>
          <option value="AGR/MIRACLE 8 ITEM">AGR/MIRACLE 8 ITEM</option>
          <option value="CAR SPEAKER">CAR SPEAKER</option>
          <option value="CEILING SPEAKER">CEILING SPEAKER</option>
          <option value="HORN SPEAKER">HORN SPEAKER</option>
          <option value="KARAOKE SPEAKERS">KARAOKE SPEAKERS</option>
          <option value="MOULDED SPEAKERS">MOULDED SPEAKERS</option>
          <option value="PA & PRO SPEAKER SYSTEM">
            PA & PRO SPEAKER SYSTEM
          </option>
          <option value="WALL MOUNT SPEAKERS">WALL MOUNT SPEAKERS</option>
          <option value="WOOFERS">WOOFERS</option>
          <option value="CONFERENCE SYSTEM">CONFERENCE SYSTEM</option>
          <option value="FULL RANGE ITEMS">FULL RANGE ITEMS</option>
          <option value="KARAOKE & PA AMPLIFIERS">
            KARAOKE & PA AMPLIFIERS
          </option>
          <option value="LINE ARRAY">LINE ARRAY</option>
          <option value="MIC & WIRELESS MICROPHONE">
            MIC & WIRELESS MICROPHONE
          </option>
          <option value="MIXER">MIXER</option>
          <option value="PHASED OUT">PHASED OUT</option>
          <option value="PODIUM LECTERN">PODIUM LECTERN</option>
          <option value="POWER AMPLIFIERS">POWER AMPLIFIERS</option>
          <option value="PRO WOOFERS">PRO WOOFERS</option>
          <option value="PROCESSORS">PROCESSORS</option>
          <option value="REPAIR CHARGES">REPAIR CHARGES</option>
          <option value="SOUND DIMENSION ITEMS">SOUND DIMENSION ITEMS</option>
          <option value="SPAREPARTS">SPAREPARTS</option>
          <option value="TWEETERS">TWEETERS</option>
        </select>
      </div>
      <div>
        <label>Category 2</label>
        <input
          type="text"
          name="repairCategory2"
          value={formData.repairCategory2}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Quantity</label>
        <input
          type="text"
          name="repairQuantity"
          value={formData.repairQuantity}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>UOM</label>
        <select
          name="repairUOM"
          value={formData.repairUOM}
          onChange={handleChange}
        >
          <option value="pc">pc</option>
          <option value="set">set</option>
        </select>
      </div>
      <div>
        <label>Pull Out By</label>
        <input
          type="text"
          name="repairPullOutBy"
          value={formData.repairPullOutBy}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Description</label>
        <input
          type="text"
          name="repairDescription"
          value={formData.repairDescription}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Serial Number</label>
        <input
          type="text"
          name="repairSerialNumber"
          value={formData.repairSerialNumber}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Job Order Number</label>
        <input
          type="text"
          name="repairJobOrderNumber"
          value={formData.repairJobOrderNumber}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Date Started</label>
        <input
          type="text"
          name="repairDateStarted"
          value={formData.repairDateStarted}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Date Finished</label>
        <input
          type="text"
          name="repairDateFinished"
          value={formData.repairDateFinished}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Cost</label>
        <input
          type="text"
          name="repairCost"
          value={formData.repairCost}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Technician 1</label>
        <select
          name="repairTechnician1"
          value={formData.repairTechnician1}
          onChange={handleChange}
        >
          <option value="default">(Technician)</option>
          <option value="CHRISTIAN">CHRISTIAN</option>
          <option value="DANIEL">DANIEL</option>
          <option value="DREX">DREX</option>
          <option value="MJ">MJ</option>
          <option value="NEIL">NEIL</option>
          <option value="OMER">OMER</option>
        </select>
      </div>
      <div>
        <label>Technician 2</label>
        <select
          name="repairTechnician2"
          value={formData.repairTechnician2}
          onChange={handleChange}
        >
          <option value="default">(Technician)</option>
          <option value="CHRISTIAN">CHRISTIAN</option>
          <option value="DANIEL">DANIEL</option>
          <option value="DREX">DREX</option>
          <option value="MJ">MJ</option>
          <option value="NEIL">NEIL</option>
          <option value="OMER">OMER</option>
        </select>
      </div>
      <div>
        <label>Item Status</label>
        <select
          name="repairItemStatus"
          value={formData.repairItemStatus}
          onChange={handleChange}
        >
          <option value="DONE">DONE</option>
          <option value="OUT">OUT</option>
        </select>
      </div>
      <div>
        <label>Delivery Status</label>
        <select
          name="repairDeliveryStatus"
          value={formData.repairDeliveryStatus}
          onChange={handleChange}
        >
          <option value="FORWARDED">FORWARDED</option>
          <option value="DELIVERED">DELIVERED</option>
        </select>
      </div>
      <div>
        <label>Remarks</label>
        <input
          type="text"
          name="repairRemarks"
          value={formData.repairRemarks}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Return Form Number</label>
        <input
          type="text"
          name="repairReturnFormNumber"
          value={formData.repairReturnFormNumber}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Date Returned</label>
        <input
          type="text"
          name="repairDateReturned"
          value={formData.repairDateReturned}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Status</label>
        <select
          name="repairStatus"
          value={formData.repairStatus}
          onChange={handleChange}
        >
          <option value="Repair">Repair</option>
          <option value="Replace">Replace</option>
          <option value="Return">Return</option>
          <option value="QA">QA</option>
        </select>
      </div>
      <div>
        <label>Defect</label>
        <select
          name="repairDefect"
          value={formData.repairDefect}
          onChange={handleChange}
        >
          <option value="NO POWER">NO POWER</option>
          <option value="NO SOUND / NO AUDIO">NO SOUND / NO AUDIO</option>
          <option value="DISTORTED SOUND">DISTORTED SOUND</option>
          <option value="NO USB DISPLAY">NO USB DISPLAY</option>
          <option value="DAMAGED CABINET">DAMAGED CABINET</option>
          <option value="FAN HEADERS NOT PLUGGED IN">
            FAN HEADERS NOT PLUGGED IN
          </option>
          <option value="NO COMPLAINT WRITTEN">NO COMPLAINT WRITTEN</option>
        </select>
      </div>
      <button type="submit">Save</button>
      <button type="button" onClick={handleDelete}>
        Delete
      </button>
    </form>
  );
};

export default EditTaskForm;
