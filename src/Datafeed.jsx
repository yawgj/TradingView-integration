import { makeApiRequest } from "./Helpers";

const configurationData = {
    supported_resolutions: ["1", "3", "5", "15", "30", "1D", "3D", "1W", "1M"],
    exchanges: [],
    symbols_types: [{ name: "crypto", value: "crypto" }],
    supports_marks: true,
  };

  const data = await makeApiRequest()
  console.log('THESE ARE THE BARS FROM OUR BACKEND', data)
const symbolData = {
    base_name: ["LINPUSS"],
    build_seconds_from_ticks: false,
    data_status: "streaming",
    description: "LINPUSS",
    exchange: "Inferno",
    full_name: "LINPUSS",
    has_intraday: true,
    has_weekly_and_monthly: false,
    is_tickbars_available: false,
    legs: ["LINPUSS"],
    minmov: 1,
    name: "LINPUSS",
    price_sources: [],
    pricescale: 100,
    pro_name: "LINPUSS",
    session: "24x7",
    supported_resolutions: ["1", "3", "5", "15", "30", "1D", "3D", "1W", "1M"],
    ticker: "LINPUSS",
    timezone: "Etc/UTC",
    type: "crypto",
    visible_plots_set: "ohlc",
    volume_precision: 2
  };

export default {
    onReady: (callback) => {
        console.log('[onReady]: Method call');
        setTimeout(() => callback(configurationData));
    },
    searchSymbols: (userInput, exchange, symbolType, onResultReadyCallback) => {
        console.log('[searchSymbols]: Method call');
    },
    resolveSymbol: (symbolName, onSymbolResolvedCallback, onResolveErrorCallback, extension) => {
        console.log('[resolveSymbol]: Method call', symbolName);
        setTimeout(
            () => {
                // Return some simple symbol information for the TEST symbol
                if (symbolName === 'LINPUSS') {
                    onSymbolResolvedCallback({
                        "name": "LINPUSS",
                        "timezone": "America/New_York",
                        "minmov": 1,
                        "minmov2": 0,
                        "pointvalue": 1,
                        "session": "24x7",
                        "has_intraday": true,
                        "visible_plots_set": "c",
                        "description": "Test Symbol",
                        "type": "stock",
                        "supported_resolutions": [
                            "D"
                        ],
                        "pricescale": 100,
                        "ticker": "LINPUSS",
                        "exchange": "Test Exchange",
                        "has_daily": true,
                        "format": "price"
                    });
                } else {
                    // Ignore all other symbols
                    onResolveErrorCallback('unknown_symbol');
                }
            },
            50
        );
    },
    getBars: (symbolInfo, resolution, periodParams, onHistoryCallback, onErrorCallback) => {
        console.log('[getBars]: Method call', symbolInfo);
        console.log(periodParams)
        // setTimeout(
        //     () => {
        //         // For this piece of code only we will only return bars for the TEST symbol
        //         if (symbolInfo.ticker === 'LINPUSS' && resolution === '1D') {
        //             // We are constructing an array for `countBack` bars.
        //             const bars = new Array(periodParams.countBack);
    
        //             // For constructing the bars we are starting from the `to` time minus 1 day, and working backwards until we have `countBack` bars.
        //             let time = new Date(periodParams.to * 1000);
        //             time.setUTCHours(0);
        //             time.setUTCMinutes(0);
        //             time.setUTCMilliseconds(0);
        //             time.setUTCDate(time.getUTCDate() - 1);
    
        //             // Fake price.
        //             let price = 100;
    
        //             for (let i = periodParams.countBack - 1; i > -1; i--) {
        //                 bars[i] = {
        //                     open: price,
        //                     high: price,
        //                     low: price,
        //                     close: price,
        //                     time: time.getTime(),
        //                 }
    
        //                 // Working out a random value for changing the fake price.
        //                 const volatility = 0.1;
        //                 const x = Math.random() - 0.5;
        //                 const changePercent = 2 * volatility * x;
        //                 const changeAmount = price * changePercent;
        //                 price = price + changeAmount;
    
        //                 // Note that this simple "-1 day" logic only works because the TEST symbol has a 24x7 session.
        //                 // For a more complex session we would need to, for example, skip weekends.
        //                 time.setUTCDate(time.getUTCDate() - 1);
        //             }
    
        //             // Once all the bars (usually countBack is around 300 bars) the array of candles is returned to the library.
        //             onHistoryCallback(bars);
        //             console.log('THESE ARE THE BARS FROM GETBARS', bars)
        //         } else {
        //             // If no result, return an empty array and specify it to the library by changing the value of `noData` to true.
        //             onHistoryCallback([], {
        //                 noData: true
        //             });
        //         }
        //     },
        //     50
        // );
        // onHistoryCallback(data)
        const bars = data.map((bar) => ({
            time: bar.time * 1000, // Convert to milliseconds as required by TradingView
            low: bar.low,
            high: bar.high,
            open: bar.open,
            close: bar.close,
        }));

        // Check if there are enough bars
        if (bars.length === 0) {
            onHistoryCallback([], { noData: true }); // Signal no data available
        } else {
            onHistoryCallback(bars, { noData: false }); // Pass the data to TradingView
        }
    },
    subscribeBars: (symbolInfo, resolution, onRealtimeCallback, subscriberUID, onResetCacheNeededCallback) => {
        console.log('[subscribeBars]: Method call with subscriberUID:', subscriberUID);
    },
    unsubscribeBars: (subscriberUID) => {
        console.log('[unsubscribeBars]: Method call with subscriberUID:', subscriberUID);
    },
};