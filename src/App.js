import * as React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  TextField,
  Grid,
} from "@mui/material";
import axios from "axios";

export default function Weather() {
  const [data, setData] = React.useState({ city: "" });
  const [city, setCity] = React.useState("");
  const [weather, setWeather] = React.useState();

  const handleChange = (formName, value) => {
    setData({ ...data, [formName]: value });
  };

  const handleClick = () => {
    if (data.city.trim() !== "") {
      setCity(data.city);
      setData({ city: "" });
    }
  };

  React.useEffect(() => {
    if (!city) return;
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=f21d6a65e6f37cc3826266ab6f78fc7f`
      )
      .then((res) => setWeather([res.data]))
      .catch((err) => {
        console.error("Error found", err);
        setWeather([]);
      });
  }, [city]);

  const getBackground = (condition) => {
    switch (condition) {
      case "Clear":
        return "linear-gradient(135deg, #fceabb 0%, #f8b500 100%)"; // Sunny
      case "Clouds":
        return "linear-gradient(135deg, #d7dde8 0%, #a0a8c3 100%)"; // Cloudy
      case "Rain":
      case "Drizzle":
        return "linear-gradient(135deg, #89c2d9 0%, #468faf 100%)"; // Rainy
      case "Thunderstorm":
        return "linear-gradient(135deg, #616161 0%, #212121 100%)"; // Storm
      case "Snow":
        return "linear-gradient(135deg, #e0f7fa 0%, #80deea 100%)"; // Snowy
      default:
        return "linear-gradient(135deg, #2196F3 0%, #21CBF3 100%)"; // Default
    }
  };

  const condition = weather?.[0]?.weather?.[0]?.main || "";

  return (
    <Box >
         <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -2,
        }}
        src="https://www.pexels.com/download/video/856463/"  // <— replace with actual mp4 link
      />
      
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Card
        sx={{
          maxWidth: 450,
          width: "100%",
          borderRadius: 3,
          boxShadow: 6,
          overflow: "hidden",
          background: getBackground(condition),
          color: "#fff",
          transition: "all 0.5s ease",
          m:2,
          maxHeight:'60vh'
        }}
      >
        <CardContent>
          <Typography
            variant="h5"
            component="div"
            sx={{
              fontWeight: "bold",
              textAlign: "center",
              mb: 2,
              textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
            }}
          >
            Weather Forecast
          </Typography>

          <Grid container spacing={2} alignItems="center" mb={2}>
            <Grid size={{xs:8}}>
              <TextField
                variant="outlined"
                label="Enter city name"
                placeholder="City name"
                size="small"
                fullWidth
                name="city"
                value={data.city}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                sx={{
                  backgroundColor: "rgba(255,255,255,0.9)",
                  borderRadius: 1,
                }}
              />
            </Grid>
            <Grid size={{xs:4}}>
              <Button
                size="medium"
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleClick}
              >
                Search
              </Button>
            </Grid>
          </Grid>

          {weather?.length > 0 ? (
            weather.map((res) => (
              <Box
                key={res.id}
                sx={{
                  mt: 2,
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: "rgba(0,0,0,0.3)",
                  textAlign: "center",
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                  {res.name}, {res.sys.country}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mt: 1,
                    gap: 2,
                    flexWrap: "wrap",
                  }}
                >
                  {res.weather[0]?.icon && (
                    <img
                      src={`https://openweathermap.org/img/wn/${res.weather[0].icon}@2x.png`}
                      alt={res.weather[0].description}
                      style={{ width: 60, height: 60 }}
                    />
                  )}

                  <Box sx={{ textAlign: "left" }}>
                    <Typography variant="subtitle1">
                      Temp: {(res.main.temp - 273.15).toFixed(1)}°C | Feels : {(res.main.feels_like - 273.15).toFixed(2)}°C
                    </Typography>
                    <Typography variant="subtitle1">
                      Humidity: {res.main.humidity}%
                    </Typography>
                    <Typography variant="subtitle1">
                      Condition: {res.weather[0].main}
                    </Typography>
                    <Typography variant="subtitle1">
                      Coord: Lon - {res.coord.lon.toFixed(2)} Lat - {res.coord.lat.toFixed(2)}
                    </Typography>
                     <Typography variant="subtitle1">
                      Visibility : {(res.visibility)/1000} KM
                    </Typography>
                      <Typography variant="subtitle1">
                      Wind Speed : {res.wind.speed} km/h
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ))
          ) : (
            <Box
              sx={{
                mt: 2,
                p: 2,
                borderRadius: 2,
                backgroundColor: "rgba(0,0,0,0.3)",
                textAlign: "center",
              }}
            >
              <Typography variant="subtitle1">
                Enter a city name above and click "Search" to see the current
                weather.
              </Typography>
              <Typography variant="subtitle1">
                Weather Forecast is a simple and reliable app that provides
                real-time weather information.Stay updated on
                daily weather changes, plan your activities, and make informed
                decisions based on accurate forecasts from locations around the
                world.
              </Typography>
            </Box>
          )}
          
        </CardContent>
      </Card>
    </Box>
    </Box>
  );
}
