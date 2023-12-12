'use client';
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Tab } from '@headlessui/react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Trip = () => {
  const [trip, setTrip] = useState({ isLoading: true, data: null });
  const params = useParams();

  useEffect(() => {
    const getData = async () => {
      const { Web5 } = await import("@web5/api/browser")
      try {
        const { web5 } = await Web5.connect();
        const response = await web5.dwn.records.query({
          message: {
            filter: {
              protocol: "https://budget-tracker-red.vercel.app/",
              schema: "https://example.com/tripsSchema",
              dataFormat: 'application/json',
              recordId: params.tripId
            }
          }
        });
        if (response.status.code === 200) {
          const singleTrip = await Promise.all(
            response.records.map(async (record) => {
              const data = await record.data.json();
              return {
                ...data,
                id: record.id
              }
            })
          );
          console.log(singleTrip[0]);
          setTrip({ isLoading: false, data: singleTrip[0] })
        } else {
          console.log(response.status);
          setTrip({ isLoading: false, data: null })
        }
      } catch (error) {
        console.log(error);
        setTrip({ isLoading: false, data: null })
      }
    };
    getData();
  }, [])

  const displayLoading = trip.isLoading;
  const displayUnavailable = Boolean(!trip.isLoading && trip.data === null);

  return (
    <div className="flex min-h-screen flex-col p-24">
      <div>
        <div>
          <p className="mb-3 font-heading font-bold text-xl">{trip.data?.name}</p>
          <p>{`${trip.data?.startDate} - ${trip.data?.endDate}`}</p>
        </div>
        <div>
          <p className="my-3 font-heading font-bold text-xl">Itinerary</p>
          {trip.data?.itinerary?.length > 0 ? (<Tab.Group>
            <Tab.List className="flex space-x-1 rounded-xl bg-secondary-bg-color p-1 mb-3">
              {trip.data?.itinerary?.map((item) => (
                <Tab key={item.id} className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                  'ring-secondary-main-color/60 ring-offset-2 ring-offset-secondary-main-color focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-secondary-bg-color text-secondary-main-color shadow'
                    : 'text-secondary-bg-color hover:bg-secondary-main-color/[0.12] hover:text-secondary-main-color'
                )
              }>
                  {item.title}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels>
              {trip.data?.itinerary?.map((note) => (
                <Tab.Panel key={note.id}>
                  <p>{note.notes}</p>
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>) : (
            <div>
              <p>No itinerary</p>
            </div>
          )}
        </div>
      </div>
      {displayUnavailable && (
        <div>
          <p> No trip </p>
        </div>
      )}
      {displayLoading && (
        <div>
          <p>Loading....</p>
        </div>
      )}
    </div>
  )
}

export default Trip