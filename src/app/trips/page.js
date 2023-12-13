'use client'
import { useState, useEffect } from 'react';
import Link from "next/link";
import { useGlobalContext } from "../context/store";
import Modal from '@/components/Modal';
import { v4 as uuidv4 } from 'uuid';
import Skeleton from '@/components/Skeleton';

const Trips = () => {
  const { setMyDid, myWeb5, setMyWeb5 } = useGlobalContext();
  const [show, setShow] = useState(false);
  const [tripsList, setTripsList] = useState({ isLoading: true, data: [] });

  useEffect(() => {
    const initWeb5 = async () => {
      const { Web5 } = await import("@web5/api/browser")
      const { web5, did } = await Web5.connect({ sync: "5s" });
      setMyDid(did);
      setMyWeb5(web5);
      if (web5 && did) {
        await configureProtocol(web5, did);
        getRecords(web5);
      }
    };
    initWeb5();
  }, []);



  // query local protocal
  const queryLocalProtocol = async (web5) => {
    return await web5.dwn.protocols.query({
      message: {
        filter: {
          protocol: "https://budget-tracker-red.vercel.app",
        },
      },
    });
  };

    // query remote protocal
  const queryRemoteProtocol = async (web5, did) => {
    return await web5.dwn.protocols.query({
      from: did,
      message: {
        filter: {
          protocol: "https://budget-tracker-red.vercel.app",
        },
      },
    });
  };

    // install local protocal
  const installLocalProtocol = async (web5, protocolDefinition) => {
    return await web5.dwn.protocols.configure({
      message: {
        definition: protocolDefinition,
      },
    });
  };

    // install remote protocal
  const installRemoteProtocol = async (web5, did, protocolDefinition) => {
    const { protocol } = await web5.dwn.protocols.configure({
      message: {
        definition: protocolDefinition,
      },
    });
    return await protocol.send(did);
  };

  // configure protocol
  const configureProtocol = async (web5, did) => {
    const protocolDefinition = defineNewProtocol();
    const protocolUrl = protocolDefinition.protocol;

    const { protocols: localProtocols, status: localProtocolStatus } = await queryLocalProtocol(web5, protocolUrl);
    if (localProtocolStatus.code !== 200 || localProtocols.length === 0) {
      const result = await installLocalProtocol(web5, protocolDefinition);
      console.log({ result })
      console.log("Protocol installed locally");
    }

    const { protocols: remoteProtocols, status: remoteProtocolStatus } = await queryRemoteProtocol(web5, did, protocolUrl);
    if (remoteProtocolStatus.code !== 200 || remoteProtocols.length === 0) {
      const result = await installRemoteProtocol(web5, did, protocolDefinition);
      console.log({ result })
      console.log("Protocol installed remotely");
    }
   };

  // define protocol
  const defineNewProtocol = () => {
    return {
      protocol: "https://budget-tracker-red.vercel.app/",
      published: true,
      types: {
        trips: {
          schema: "https://example.com/tripsSchema",
          dataFormats: ["application/json"],
        },
      },
      structure: {
        trips: {
          $actions: [
            { who: "anyone", can: "write" },
            { who: "anyone", can: "read" },
          ],
        },
      },
    };
  };

  const getRecords = async (web5) => {
    try {
      const response = await web5.dwn.records.query({
        message: {
          filter: {
            protocol: "https://budget-tracker-red.vercel.app/",
            schema: "https://example.com/tripsSchema"
          },
          dateSort: 'createdDescending'
        }
      });
      if (response.status.code === 200) {
        const allTrips = await Promise.all(
          response.records.map(async (record) => {
            const data = await record.data.json();
            return {
              ...data,
              id: record.id
            }
          })
        );
        console.log(allTrips);
        setTripsList({ isLoading: false, data: allTrips });
      } else {
        console.log(response.status);
        setTripsList({ isLoading: false, data: [] });
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleAddTrip = async (values) => {
    const updatedItinerary = values.itinerary.map((option) => {
      const properties = {
        title: option.title,
        notes: option.notes,
        id: uuidv4()
      }
      return properties;
    })
    const trip = {
      name: values.name,
      startDate: values.startDate,
      endDate: values.endDate,
      itinerary: updatedItinerary
    };
    console.log('trip', trip);
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
        getRecords(myWeb5);
      } else {
        throw new Error('Failed to create trip');
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleDeleteTrip = async (id) => {
    try {
      const response = await myWeb5.dwn.records.delete({
        message: {
          recordId: id
        }
      });
      if (response.status.code === 202) {
        console.log('deleted successfully');
        getRecords(myWeb5);
      } else {
        console.log(response.status);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const displayLoading = tripsList.isLoading;
  // const displayError = Boolean(!tripsList.isLoading && tripsList.error);
  const displayUnavailable = Boolean(!tripsList.isLoading && !tripsList?.data.length);

  return (
    <main className="flex min-h-screen flex-col p-24">
      <div className="flex justify-between">
        <h1 className="font-heading font-bold text-3xl">Trips</h1>
        <button
          className="border-transparent rounded px-3 py-2 bg-primary-color text-modal-main-color"
          onClick={() => setShow(true)}
        >
          Plan a new trip
        </button>
      </div>
      <div className="p-6">
        <div className="flex flex-col gap-y-4">
          {tripsList.data?.map((trip) => (
            <div
              key={trip.id}
              className="flex border-secondary-main-color border-2 px-4 py-10 gap-x-4 justify-between"
            >
              <div>
                <p className="font-semibold">{trip.name}</p>
                <p>{`${trip.startDate} - ${trip.endDate}`}</p>
              </div>
              <div className="flex gap-x-6">
                {/* <button className="text-primary-color">Edit</button> */}
                <button className="hover:text-primary-color">
                  <Link href={`trips/${trip.id}`}>View</Link>
                </button>
                <button className="hover:text-primary-color" onClick={() => handleDeleteTrip(trip.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
        {displayUnavailable && (
          <div>
            <p> No trips </p>
          </div>
        )}
        {displayLoading && (
          <Skeleton />
        )}
      </div>
      <Modal
        show={show}
        onClose={() => setShow(false)}
        handleAddTrip={handleAddTrip}
      />
    </main>
  )
}

export default Trips