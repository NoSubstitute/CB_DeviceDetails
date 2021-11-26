function doGet(e){
  
  var passedInSerial = e.parameter.sn;

  if (passedInSerial == "") 
  {
    // return HtmlService.createHtmlOutput("Du glömde ange ett serienummer")

  var t = HtmlService.createTemplateFromFile("pageNoSerial");
  return t.evaluate().setTitle("CB_DeviceDetails No Serial");

  }
  var serialNumber = passedInSerial;
  // console.log(serialNumber);
  // Logger.log(serialNumber);

  var userProperties = PropertiesService.getUserProperties();
  PropertiesService.getUserProperties().setProperty("serialNumberProp", serialNumber);
  // var number = PropertiesService.getUserProperties().getProperty("serialNumberProp");
  // console.log(number);
  // Logger.log(number);

  // return HtmlService.createHtmlOutput(number)
  var t = HtmlService.createTemplateFromFile("pageSerial");
  return t.evaluate().setTitle("CB_DeviceDetails").setFaviconUrl('https://docs.google.com/drawings/d/1z6XM6zDn9tT8NKmaSephC_VUL87tCIdrid_ghJmE1_8/export/png');
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}
