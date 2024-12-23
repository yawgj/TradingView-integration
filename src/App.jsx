import React, { useEffect } from "react";
import Datafeed from "./Datafeed"; // Ensure correct path
import { widget } from "./charting_library"

const App = () => {
  useEffect(() => {
    const tvWidget = new widget({
      symbol: "LINPUSS", // Default symbol
      interval: "1", // Default interval
      fullscreen: true, // Fullscreen mode
      container: "tv_chart_container", // ID of the container div
      datafeed: Datafeed, // Custom datafeed implementation
      library_path: "/src/charting_library/", // Path to the library files
      locale: "en", // Locale setting
      disabled_features: ["use_localstorage_for_settings"], // Example of disabled features
      enabled_features: ["study_templates"], // Example of enabled features
    });

    tvWidget.onChartReady(() => {
      console.log("Chart has been initialized and is ready");
    });
  }, []);

  return <div id="tv_chart_container" style={{ height: "100vh", width: '1500px' }} />;
};

export default App;
