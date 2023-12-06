import { useState } from "react";

const Modal = ({ show, onClose, handleAddTrip }) => {
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  // const [files, setFiles] = useState([]);

  if (!show) {
    return null;
  }
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-modal-bg-color flex justify-center items-center">
      <div className="bg-modal-main-color p-8 max-w-sm rounded">
        <h3 className="mb-3 font-bold text-xl">Add a new trip</h3>
        <div className="flex flex-col gap-y-2 mb-2" onSubmit={handleAddTrip}>
          <div className="flex flex-col gap-y-2">
            <label htmlFor="name" className="font-semibold">Name</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="p-2 border rounded border-secondary-main-color" placeholder="Enter name..."/>
          </div>
          <div className="flex gap-x-2">
            <div className="flex flex-col gap-y-2">
              <label htmlFor="startDate" className="font-semibold">Start Date</label>
              <input type="date" id="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="p-2 border rounded border-secondary-main-color"/>
            </div>
            <div className="flex flex-col gap-y-2">
              <label htmlFor="endDate" className="font-semibold">End Date</label>
              <input type="date" id="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)}  className="p-2 border rounded border-secondary-main-color" />
            </div>
          </div>
          <div className="flex gap-x-4 justify-end mt-3">
            <button className="rounded py-2 px-3 border text-primary-color bg-modal-main-color" onClick={onClose}>Cancel</button>
            <button className="rounded py-2 px-3 border bg-primary-color text-modal-main-color" onClick={() => handleAddTrip(name, startDate, endDate)}>Add</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Modal;