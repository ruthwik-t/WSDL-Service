const express = require("express");
const bodyParser = require("body-parser");
const xmlbuilder = require("xmlbuilder");

const app = express();
app.use(bodyParser.text({ type: "text/xml" }));

// SOAP Endpoint
app.post("/soap-service", (req, res) => {
  console.log("SOAP Request received");
  console.log(req.body); // Log the incoming SOAP request (optional for debugging)

  // Build XML Response
  const responseXml = xmlbuilder
    .create("soap:Envelope", { encoding: "UTF-8" })
    .att("xmlns:soap", "http://schemas.xmlsoap.org/soap/envelope/")
    .ele("soap:Body")
    .ele("Response", { xmlns: "http://example.com/wsdl" })
    .ele("Output")
    .text("Here is your XML response!")
    .end({ pretty: true });

  // Return SOAP Response
  res.set("Content-Type", "text/xml");
  res.send(responseXml);
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`SOAP service is running on port ${PORT}`);
});
