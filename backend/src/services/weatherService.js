export const getWeatherByDate = async (date) => {
  try {
    const response = await fetch(
  `https://api.openweathermap.org/data/2.5/forecast?lat=-22.90&lon=-43.20&appid=${process.env.WEATHER_API_KEY}&units=metric&lang=pt_br`
);

    const data = await response.json();

    if (!data.list) return null;

    const forecast = data.list.find(item =>
      item.dt_txt.startsWith(date)
    );

    if (!forecast) return null;

    return {
      temperatura: forecast.main.temp,
      descricao: forecast.weather[0].description,
      chuva: forecast.weather[0].main === "Rain"
    };

  } catch (error) {
    return null;
  }
};