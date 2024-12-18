const express = require("express");
const bodyParser = require("body-parser");
const xmlbuilder = require("xmlbuilder");
const path = require("path");

const app = express();
app.use(bodyParser.text({ type: "text/xml" }));

// SOAP Endpoint
app.post("/soap-service", (req, res) => {
  console.log("SOAP Request received");
  console.log(req.body); // Log the incoming SOAP request (optional for debugging)

  // Build the XML response (based on your provided structure)
  const responseXml = xmlbuilder
      .create("soap:Envelope", { encoding: "ISO-8859-6" })
      .att("xmlns:soap", "http://schemas.xmlsoap.org/soap/envelope/")
      .att("xmlns:xsi", "http://www.w3.org/2001/XMLSchema-instance")
      .att("xmlns:xsd", "http://www.w3.org/2001/XMLSchema")
      .ele("soap:Body")
      .ele("responseDA", { xmlns: "http://tempuri.org" })
      .ele("productName")
      .text("TestProduct")
      .up()
      .ele("strategy")
      .text("RFNCB")
      .up()
      .ele("signature")
      .text("PFINANCE")
      .up()
      .ele("returnCode")
      .text("0")
      .up()
      .ele("outputData")
      .ele("dictionary", { id: "RF_Outputs" })
      .ele("list", { numOfItems: "1" })
      .ele("item")
      .ele("field", { dataType: "string", name: "CAMPAIGNNAME" })
      .text("حملة التسويق الرقمية")
      .up()
      .up() // End item, list, dictionary
      .up() // End outputData
      .up() // End responseDA
      .end({ pretty: true });
      
  // Return SOAP Response
  res.set("Content-Type", "application/soap+xml; charset=ISO-8859-6");
  res.send(responseXml);
});

app.get("/wsdl", (req, res) => {
    res.sendFile(path.join(__dirname, "service.wsdl"));
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`SOAP service is running on port ${PORT}`);
});
