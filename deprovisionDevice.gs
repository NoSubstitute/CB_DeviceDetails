function deprovisionCB(sernum) {
  var serno = sernum;
  // Since we provided serial numbers, convert each to device-id
  // Logger.log(serno);
  var sernoquery = "id:" + serno;
  // Use AdminSDK API to check if the cros device exists. Else the update will fail
  var chromebooklist = AdminDirectory.Chromeosdevices.list('my_customer', { query: sernoquery }).chromeosdevices;
  if (!chromebooklist) {
    Logger.log([serno, "not found"]);
  } else if (chromebooklist.length !== 1) {
    Logger.log([serno, chromebooklist.length + " found"]);
  } else {
    var id = chromebooklist[0].deviceId;
    // Logger.log(id);
    // For each line, try to update the device with given data, and log the result
    try {
      AdminDirectory.Chromeosdevices.update({ orgUnitPath: "/_Chromebooks/_deprovisioned_chromebooks", notes: "Deprovisioned" }, 'my_customer', id);
    } catch (err) {
      Logger.log([serno, err]);
      return [serno, "kunde inte flyttas", '#ffc90e'];
    }
    // Logger.log([serno, 'moved']);
    try {
      AdminDirectory.Customer.Devices.Chromeos.issueCommand({ 'commandType': ('REMOTE_POWERWASH') }, 'my_customer', id)
    } catch (err) {
      Logger.log([serno, err]);
      return [serno, 'kunde inte rensas', '#ffc90e'];
    }
    // Logger.log([serno, 'powerwashed']);
    try {
      AdminDirectory.Chromeosdevices.action({ 'action': 'deprovision', 'deprovisionReason': 'retiring_device' }, 'my_customer', id);
      // If the update fails for some reason, log the error
    } catch (err) {
      Logger.log([serno, err]);
      return [serno, 'kunde inte avregistreras', '#ffc90e'];
    }
    // Logger.log([new Date(), serno, "Device deprovisioned"]);
  }
  // Logger.log('Move, Wipe and Deprovision of ' + serno + ' successful')
  return [serno, "har blivit flyttad och avregistrerad, rensning beställd", '#ba68c8'];
}
