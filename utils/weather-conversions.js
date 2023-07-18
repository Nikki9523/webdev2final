export const weatherConversions = {
    convertCeslsiusToFahrenheit(temperature){
        return (temperature * 9/5) + 32;
    },
    weatherCodeConverter(weatherCode){
        let output;
        switch (weatherCode){
            case "100":
              output = "Clear";
              break;
            case "200":
              output = "Partial clouds";
              break;
            case "300":
              output = "Cloudy";
              break;
            case "400":
              output = "Light Showers";
              break;
            case "500":
              output = "Heavy Showers";
              break;
            case "600":
              output = "Rain";
              break;
            case "700":
              output = "Snow";
              break;
            case "800":
              output = "Thunder";
              break;
            default:
              output = "Invalid value";
              break;
    }
    return output;
}
};