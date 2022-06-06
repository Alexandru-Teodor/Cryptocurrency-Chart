document.getElementById("btnGet").addEventListener('click', drawChart);

async function drawChart() {
  let user_coin = await document.getElementById("coin").value;

  let aux = document.getElementById("interval");
  let interval = aux.options[aux.selectedIndex].value;

  const chartProperties = {
    timeScale: {
      timeVisible:true,
      secondsVisible:false,
    }
  }

  const domElement = document.getElementById("myChart");
  const chart = LightweightCharts.createChart(domElement, chartProperties);
  domElement.removeChild(domElement.firstChild);
  const candleSeries = chart.addCandlestickSeries();

  fetch(`https://api.binance.com/api/v3/klines?symbol=${user_coin}USDT&interval=${interval}&limit=1000`)
    .then(res => res.json())
    .then(data => {
      const cdata = data.map(d => {
        return {time:d[0]/1000, open:parseFloat(d[1]), high:parseFloat(d[2]), low:parseFloat(d[3]), close:parseFloat(d[4])}
      });
      candleSeries.setData(cdata);
    })
    .catch(err => console.log(err));


}