'use client'
import { Web5 } from "@web5/api";
import { useState, useEffect } from 'react';
import Modal from "@/components/Modal";

const Trips = () => {
  const [myWeb5, setMyWeb5] = useState(null);
  const [myDid, setMyDid] = useState(null);
  const [show, setShow] = useState(false);
  const [tripsList, setTripsList] = useState({ isLoading: true, data: [] });

  useEffect(() => {
    const initWeb5 = async () => {
      const { web5, did } = await Web5.connect();
      setMyDid(did);
      setMyWeb5(web5);
      if (web5 && did) {
        await configureProtocol(web5, did);
        try {
          const response = await web5.dwn.records.query({
            message: {
              filter: {
                protocol: "https://budget-tracker-red.vercel.app/",
                schema: "https://example.com/tripsSchema"
              },
              dateSort: 'createdAscending'
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
          // records.map((record) => {
          //   const data = record.data.json();
          //   const trip = { record, data, id: record.id };
          //   console.log('trip formatted', trip);
          // })
        } catch (error) {
          console.log(error);
          setTripsList({ isLoading: false, data: [] })
        }
      }
    };
    initWeb5();
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const { records } = await myWeb5.dwn.records.query({
  //       message: {
  //         filter: {
  //           protocol: "",
  //           schema: "https://example.com/tripsSchema"
  //         },
  //         dateSort: 'createdAscending'
  //       }
  //     });
  //     console.log('records', records);
  //   };
  //   fetchData();
  // }, [])

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

  const handleAddTrip = async (name, startDate, endDate) => {
    console.log(name, startDate, endDate);
    const trip = {
      name: name,
      startDate: startDate,
      endDate: endDate
    };
    try {
      const tripsProtocol = defineNewProtocol();
      const { record } = await myWeb5.dwn.records.create({
        data: trip,
        message: {
          protocol: tripsProtocol.protocol,
          protocolPath: "trips",
          schema: tripsProtocol.types.trips.schema,
          recipient: myDid
        }
      })
      const data = await record.data.json();
      console.log('data', data);
    } catch (error) {
      console.log(error);
    }
  }

  // const displayLoading = tripsList.isLoading;
  // const displayError = Boolean(!tripsList.isLoading && tripsList.error);
  // const displayUnavailable = Boolean(!tripsList.isLoading && !tripsList?.data.length);

  return (
    <main className="flex min-h-screen flex-col p-24">
      <div className="flex justify-between">
        <h1 className="font-heading font-bold text-3xl">Trips</h1>
        <button
          className="border-transparent rounded px-3 py-2 bg-primary-color text-modal-main-color"
          onClick={() => setShow(true)}
        >
          Add a new trip
        </button>
      </div>
      <div className="p-6">
        <div className="flex flex-col gap-y-4">
          {tripsList.data.length > 0 ? (tripsList.data?.map((trip) => (
            <div
              key={trip.id}
              className="flex border-secondary-main-color border-2 px-4 py-10 gap-x-4"
            >
              <p className="font-semibold">{trip.name}</p>
              <p>{`${trip.startDate} - ${trip.endDate}`}</p>
              <div className="flex gap-x-4">
                <button>Edit</button>
                <button>View</button>
                <button>Delete</button>
              </div>
            </div>
          ))) : (
            <div>
              <p> No trips </p>
            </div>
          )}
        </div>
        {/* {displayUnavailable && (
          <div>
            <p> No trips </p>
          </div>
        )}
        {displayLoading && (
          <div>
            <p>Loading...</p>
          </div>
        )} */}
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