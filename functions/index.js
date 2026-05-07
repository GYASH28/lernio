const functions = require("firebase-functions");

exports.ai = functions.https.onRequest((req, res) => {
  // 1. Tell the browser "Everyone is welcome!"
  res.set("Access-Control-Allow-Origin", "*");

  // 2. Handle the "Pre-check" (The browser sends this first)
  if (req.method === "OPTIONS") {
    res.set("Access-Control-Allow-Methods", "GET, POST");
    res.set("Access-Control-Allow-Headers", "Content-Type");
    res.set("Access-Control-Max-Age", "3600");
    res.status(204).send("");
    return;
  }

  // 3. Your actual response
  res.json({message: "Backend working! AI is ready."});
});
