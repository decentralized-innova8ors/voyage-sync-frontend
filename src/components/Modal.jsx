const Modal = ({ show, onClose }) => {
  if (!show) {
    return null;
  }
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-modal-bg-color flex justify-center items-center">
      <div className="bg-modal-main-color p-8 max-w-sm rounded">
        <h3 className="mb-3 font-bold text-xl">Add a new trip</h3>
        <form className="flex flex-col gap-y-2 mb-2">
          <div className="flex flex-col gap-y-2">
            <label htmlFor="name" className="font-semibold">Name</label>
            <input type="text" id="name" className="p-2 border rounded border-secondary-main-color" placeholder="Enter name..."/>
          </div>
          <div className="flex gap-x-2">
            <div className="flex flex-col gap-y-2">
              <label htmlFor="startDate" className="font-semibold">Start Date</label>
              <input type="date" id="startDate" className="p-2 border rounded border-secondary-main-color"/>
            </div>
            <div className="flex flex-col gap-y-2">
              <label htmlFor="endDate" className="font-semibold">End Date</label>
              <input type="date" id="endDate" className="p-2 border rounded border-secondary-main-color" />
            </div>
          </div>
        </form>
        <button className="rounded p-2 border" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};
export default Modal;