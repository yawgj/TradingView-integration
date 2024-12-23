const url = 'http://13.60.221.32:8080/swap/transactions?symbol=AED&interval=kline_5m&endTime=1734712411&limit=300&order=asc'
export async function makeApiRequest() {
    const response = await fetch(url)
    const data = await response.json()
    const BarsData = data.sort((a, b) => a.time - b.time);
    return BarsData
}