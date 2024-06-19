window.onload = async () => {
  try {
    const map = L.map('map').setView([-2.5489, 118.0149], 5); // Center of Indonesia
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const response = await fetch('https://data.bmkg.go.id/DataMKG/TEWS/gempaterkini.json');
    const data = await response.json();
    const earthquakes = data.Infogempa.gempa;

    earthquakes.forEach(quake => {
      const coordinates = parseFloat(quake.Coordinates)
      const lat = parseFloat(quake.Lintang.replace(' LS', '')) * -1;
      const lon = parseFloat(quake.Bujur.replace(' BT', ''));
      const magnitude = quake.Magnitude;
      const location = quake.Wilayah;

      L.marker([lat, lon])
        .addTo(map)
        .bindPopup(`<b>Location:</b> ${location}<br><b>Magnitude:</b> ${magnitude}`);
    });
  } catch (error) {
    console.error('Error fetching earthquake data:', error);
  }
}
