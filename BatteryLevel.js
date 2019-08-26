async function getDevice() {
    const devices = await navigator.bluetooth
        .requestDevice({filters: [{services: [0x180f]}]});
    const connectDevice = await devices.gatt.connect();
    const service = await connectDevice.getPrimaryService(0x180f);
    const characteristic = await service.getCharacteristic(0x2a19);
    characteristic.startNotifications().then(notification => {
        notification.addEventListener(
            'characteristicvaluechanged',
            handleBatteryLevelChanged
        );
        return notification.readValue();
    })
}
function handleBatteryLevelChanged(event) {
    let batteryLevel = event.target.value.getUint8(0);
    document.write('Battery percentage is ' + batteryLevel);
}
