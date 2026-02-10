// Map initialization function
function initializeMap(mapToken, locationName) {
  // Default coordinates for Mumbai
  const defaultLat = 28.6139;
  const defaultLon = 77.2088;

  fetch(
    `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
      locationName
    )}&apiKey=${mapToken}`
  )
    .then((response) => response.json())
    .then((data) => {
      let lat = defaultLat;
      let lon = defaultLon;
      let popupContent = `<b>Mumbai (Default)</b><br>Exact location not found.`;

      // Check if API returned a valid location
      if (data.features && data.features.length > 0) {
        lat = data.features[0].properties.lat;
        lon = data.features[0].properties.lon;
        popupContent = `<b>${locationName}</b><br>Exact location provided after booking.`;
      } else {
        console.log("Location not found, defaulting to Mumbai.");
      }

      // Initialize Map with attribution control disabled
      var map = L.map("map", { attributionControl: false }).setView(
        [lat, lon],
        13
      );

      L.tileLayer(
        `https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey=${mapToken}`,
        {
          maxZoom: 20,
          id: "osm-bright",
        }
      ).addTo(map);

      L.marker([lat, lon]).addTo(map).bindPopup(popupContent).openPopup();
    })
    .catch((error) => {
      console.error("Error fetching coordinates:", error);
      // Fallback to Mumbai on error with attribution disabled
      var map = L.map("map", { attributionControl: false }).setView(
        [defaultLat, defaultLon],
        13
      );
      L.tileLayer(
        `https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey=${mapToken}`,
        {
          maxZoom: 20,
          id: "osm-bright",
        }
      ).addTo(map);
      L.marker([defaultLat, defaultLon])
        .addTo(map)
        .bindPopup("<b>Mumbai (Default)</b><br>Map service unavailable.");
    });
}
