document.getElementById("btnGet").addEventListener('click', getVal);

async function getVal() {
  let user_stock = await document.getElementById("stock").value;
  let interval = document.getElementById("interval").value;
  const chartProperties = {
    timeScale: {
      timeVisible:true,
      secondsVisible:false,
    }
  }

  const domElement = document.getElementById("myChart");
  const chart = LightweightCharts.createChart(domElement, chartProperties);
  const candleSeries = chart.addCandlestickSeries();

  fetch(`https://api.binance.com/api/v3/klines?symbol=${user_stock}USDT&interval=${interval}&limit=1000`)
    .then(res => res.json())
    .then(data => {
      const cdata = data.map(d => {
        return {time:d[0]/1000, open:parseFloat(d[1]), high:parseFloat(d[2]), low:parseFloat(d[3]), close:parseFloat(d[4])}
      });
      candleSeries.setData(cdata);
    })
    .catch(err => console.log(err));
}