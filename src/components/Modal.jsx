import { useFormik } from "formik";

const Modal = ({ show, onClose, handleAddTrip }) => {

  const formik = useFormik({
    initialValues: {
      name: '',
      startDate: '',
      endDate: '',
      itinerary: [{ title: '', notes: '' }]
    },
    onSubmit: (values) => {
      console.log('values', values);
      handleAddTrip(values);
      formik.resetForm();
      onClose();
    }
  });

  const handleAddItinerary = () => {
    formik.setFieldValue('itinerary', [
      ...formik.values.itinerary, {
        title: '', notes: ''
      }
    ]);
  }

  if (!show) {
    return null;
  }
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-modal-bg-color flex justify-center items-center overflow-y-auto">
      <div className="bg-modal-main-color p-8 max-w-3xl rounded overflow-y-auto">
        <h3 className="mb-3 font-heading font-bold text-3xl">Plan a new trip</h3>
        <h2 className="mb-3 font-heading font-bold text-xl">Trip Details</h2>
        <div className="flex gap-x-2 mb-4">
          <div className="flex flex-col gap-y-4 w-full">
            <label htmlFor="name" className="font-semibold">Name</label>
            <input type="text" id="name" value={formik.values.name} onChange={formik.handleChange} className="p-2 border rounded border-secondary-main-color" placeholder="Enter name..."/>
          </div>
          <div className="flex gap-x-2">
            <div className="flex flex-col gap-y-4">
              <label htmlFor="startDate" className="font-semibold">Start Date</label>
              <input type="date" id="startDate" value={formik.values.startDate} onChange={formik.handleChange} className="p-2 border rounded border-secondary-main-color"/>
            </div>
            <div className="flex flex-col gap-y-4">
              <label htmlFor="endDate" className="font-semibold">End Date</label>
              <input type="date" id="endDate" value={formik.values.endDate} onChange={formik.handleChange}  className="p-2 border rounded border-secondary-main-color" />
            </div>
          </div>
        </div>
        <hr className="text-secondary-main-color my-4"/>
        <div className="flex justify-between">
          <h2 className="mb-3 font-heading font-bold text-xl">Itinerary</h2>
          <button onClick={handleAddItinerary} className="rounded py-2 px-3 border text-primary-color bg-modal-main-color">+ Add Itinerary</button>
        </div>
        {formik.values.itinerary.map((item, index) => (
          <div key={index} className="flex flex-col gap-y-4">
            <div className="flex flex-col gap-y-4">
              <label htmlFor='title' className="font-semibold">Title</label>
              <input type="text" id="title" placeholder="Enter itinerary title.."
                value={item.title}
                onChange={formik.handleChange}
                className="p-2 border rounded border-secondary-main-color"
                name={`itinerary[${index}].title`}
              />
            </div>
            <div className="flex flex-col gap-y-4">
              <label htmlFor="notes" className="font-semibold">Notes</label>
              <textarea
                value={item.notes}
                id="notes" rows="5"
                className="p-2 border rounded border-secondary-main-color"
                onChange={formik.handleChange}
                name={`itinerary[${index}].notes`}
              ></textarea>
            </div>
            {formik.values.itinerary.length > 1 && (<hr className="text-secondary-main-color my-4"/>)}
          </div>
        ))}
        <div className="flex gap-x-4 justify-end mt-3">
          <button className="rounded py-2 px-3 border text-primary-color bg-modal-main-color" onClick={onClose}>Cancel</button>
          <button className="rounded py-2 px-3 border bg-primary-color text-modal-main-color" onClick={() => formik.handleSubmit()}>Add</button>
        </div>
      </div>
    </div>
  );
};
export default Modal;