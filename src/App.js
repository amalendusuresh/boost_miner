import React, { useState } from "react";

function App() {
  const [providerAddress, setProviderAddress] = useState("");
  const [httpUrl, setHttpUrl] = useState("");
  const [payloadCid, setPayloadCid] = useState("");
  const [commp, setCommp] = useState("");
  const [carSize, setCarSize] = useState("");
  const [pieceSize, setPieceSize] = useState("");

  // const handleCreateDeal = async () => {
  //   const response = await fetch("/create-deal", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       providerAddress,
  //       httpUrl,
  //       payloadCid,
  //       commp,
  //       carSize,
  //       pieceSize,
  //     }),
  //   });
  //   const data = await response.json();
  //   console.log(data);
  // };

  const handleCreateDeal = async () => {
    const response = await fetch("http://localhost:3000/create-deal", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        provider: "f01907556",
        httpUrl: "https://C:\Users\aswathy.7PRIDE\boostmonermain\src\carfile\bafybeiaeqgca4v6cv4fkceu32amc3hqukh24nzbeommsopdjdzgi5dbsqe.car",
      }),
    });
    const data = await response.json();
    console.log(data.dealId);
  };
  

  return (
    <div>
      <input
        type="text"
        placeholder="Provider Address"
        value={providerAddress}
        onChange={(e) => setProviderAddress(e.target.value)}
      />
      <input
        type="text"
        placeholder="HTTP URL"
        value={httpUrl}
        onChange={(e) => setHttpUrl(e.target.value)}
      />
      <input
        type="text"
        placeholder="Payload CID"
        value={payloadCid}
        onChange={(e) => setPayloadCid(e.target.value)}
      />
      <input
        type="text"
        placeholder="CommP"
        value={commp}
        onChange={(e) => setCommp(e.target.value)}
      />
      <input
        type="text"
        placeholder="CAR Size"
        value={carSize}
        onChange={(e) => setCarSize(e.target.value)}
      />
      <input
        type="text"
        placeholder="Piece Size"
        value={pieceSize}
        onChange={(e) => setPieceSize(e.target.value)}
      />
      <button onClick={handleCreateDeal}>Create Deal</button>
    </div>
  );
}

export default App;
