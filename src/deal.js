const express = require("express");
const { exec } = require("child_process");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.post("/create-deal", (req, res) => {
  const { provider, httpUrl } = req.body;

  // Calculate CommP
  exec(`lotus client commp "${httpUrl}"`, (err, stdout, stderr) => {
    if (err) {
      console.error(`Error calculating CommP: ${err}`);
      return res.status(500).send({ error: "Internal server error" });
    }
    const commp = stdout.trim();

    // Get CAR size
    exec(`curl -sI "${httpUrl}" | awk '/Content-Length/ {print $2}' | tr -d '\r'`, (err, stdout, stderr) => {
      if (err) {
        console.error(`Error getting CAR size: ${err}`);
        return res.status(500).send({ error: "Internal server error" });
      }
      const carSize = stdout.trim();

      // Calculate payload CID
      exec(`boost car create "${httpUrl}" | jq -r '.cid'`, (err, stdout, stderr) => {
        if (err) {
          console.error(`Error calculating payload CID: ${err}`);
          return res.status(500).send({ error: "Internal server error" });
        }
        const payloadCid = stdout.trim();

        // Make storage deal
        exec(`boost -vv deal --provider="${provider}" --http-url="${httpUrl}" --commp="${commp}" --car-size="${carSize}" --piece-size="262144" --payload-cid="${payloadCid}"`, (err, stdout, stderr) => {
          if (err) {
            console.error(`Error making storage deal: ${err}`);
            return res.status(500).send({ error: "Internal server error" });
          }
          const dealId = stdout.trim();
          return res.send({ dealId });
        });
      });
    });
  });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
