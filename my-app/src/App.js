import './App.css';
import {useState,useRef} from 'react'
import axios from "axios";
import { Chart } from "react-google-charts";


function App() {
  
  const [data,setData] = useState(false);
  const [apiError,setApiError] = useState(false);
  const marketRef = useRef()

  function callApi(){
    const marketInput = marketRef.current.value;
    if (marketInput === ''){
      return 
    } 
    
    console.log(marketInput)

    marketRef.current.value = null;
    const url = "http://127.0.0.1:8000/binance/"+marketInput+"/15"
    axios.get(url).then((response) => {
      console.log(response)
      let time = [];
      let close = [];
      for (var i = 0; i < response.data.length; i++) {
        time.push(response.data[i][0]/1000); // convert to seconds
        close.push(response.data[i][2])
      }
      setApiError('')
      console.log(time)
      setData([['Time','Close'],time,close]);
    }).catch((e)=>{
      setApiError(e.message)
      console.log(e)
    });

  }
  return (<>
    <input type="text" ref={marketRef}/>
    <button onClick={callApi}>Search Market</button>
    <p>{apiError}</p>
    <Chart
      chartType="ScatterChart"
      data={data}
      width="100%"
      height="400px"
      legendToggle
    />
    
  </>
  );
}

export default App;
