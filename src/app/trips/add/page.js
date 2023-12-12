'use client'

import { useState, useEffect } from "react";
import { useFormik } from "formik";

const AddTrip = () => {
  const { myWeb5, setMyWeb5 } = useState(null);

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
    }
  });

  useEffect(() => {
    const initWeb5 = async () => {
      const { Web5 } = await import("@web5/api/browser");
      const { web5 } = await Web5.connect();
      setMyWeb5(web5);
      // setMyDid(did);
    }
    initWeb5();
  }, [])

  const handleAddTrip = async (values) => {
    const trip = {
      name: values.name,
      startDate: values.startDate,
      endDate: values.endDate,
      itinerary: values.itinerary
    };
    try {
      const { record } = await myWeb5.dwn.records.create({
        data: trip,
        message: {
          protocol: "https://budget-tracker-red.vercel.app/",
          protocolPath: "trips",
          schema: "https://example.com/tripsSchema",
        }
      })
      if (record) {
        console.log(record);
      } else {
        throw new Error('Failed to create trip');
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleCancel = () => {
    console.log('cancel');
  }

  const handleAddItinerary = () => {
    formik.setFieldValue('itinerary', [
      ...formik.values.itinerary, {
        title: '', notes: ''
      }
    ]);
  }
  return (
    <div className="flex min-h-screen flex-col p-24 w-full">
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
        <button className="rounded py-2 px-3 border text-primary-color bg-modal-main-color" onClick={handleCancel}>Cancel</button>
        <button className="rounded py-2 px-3 border bg-primary-color text-modal-main-color" onClick={() => formik.handleSubmit()}>Add</button>
      </div>
    </div>
  )
}

export default AddTrip