'use client'
import { Web5 } from "@web5/api";
import { useState, useEffect } from 'react';
import Modal from "@/components/Modal";

const Trips = () => {
  const [web5, setWeb5] = useState(null);
  const [myDid, setMyDid] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const initWeb5 = async () => {
      const { web5, did } = await Web5.connect();
      setMyDid(did);
      setWeb5(web5);
    };
    initWeb5();
  }, [])

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

  return (
    <main className="flex min-h-screen flex-col p-24">
      <div className="flex justify-between">
        <h1 className="font-heading font-bold text-3xl">Trips</h1>
        <button
          className="border rounded px-2"
          onClick={() => setShow(true)}
        >
          Add a new trip
        </button>
      </div>
      <Modal
        show={show}
        onClose={() => setShow(false)}
      />
    </main>
  )
}

export default Trips