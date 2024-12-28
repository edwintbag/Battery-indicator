function updateBatteryStatus(battery) {
  const batteryLevel = document.getElementById('batteryLevel');
  const batteryLabel = document.getElementById('batteryLabel');
  const batteryPercentage = document.getElementById('batteryPercentage');
  const chargingStatus = document.getElementById('chargingStatus');

  const level = battery.level * 100; // Convert to percentage
  batteryLevel.style.width = `${level}%`;
  batteryLabel.textContent = `${Math.round(level)}%`;
  batteryPercentage.textContent = `${Math.round(level)}%`;

  // Update charging status
  if (battery.charging) {
    chargingStatus.textContent = 'Charging';
    batteryLevel.style.backgroundColor = '#2196f3'; // Blue for charging
  } else {
    chargingStatus.textContent = 'Not Charging';
    // Change color based on level
    if (level > 50) {
      batteryLevel.style.backgroundColor = '#4caf50'; // Green
    } else if (level > 20) {
      batteryLevel.style.backgroundColor = '#ffc107'; // Yellow
    } else {
      batteryLevel.style.backgroundColor = '#f44336'; // Red
    }
  }
}

// Monitor battery status
navigator.getBattery().then(battery => {
  updateBatteryStatus(battery);

  // Event listeners for updates
  battery.addEventListener('levelchange', () => updateBatteryStatus(battery));
  battery.addEventListener('chargingchange', () => updateBatteryStatus(battery));
});