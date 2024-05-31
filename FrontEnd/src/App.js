import { useEffect, useState } from 'react';
import styles from './App.module.css'
import axios from 'axios';
import BarChart from './Components/BarChart.js';
function App() {

  // Table Selectors
  const [row, setRows] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('03'); // Default value is January (01)
  const [searchTerm, setSearchTerm] = useState(''); //For searching it by name or cost
  const [pageNumber, setPageNumber] = useState(1);
  
  

  useEffect(()=>{
    const fetchData = async ()=>{
      try{
        const response = await axios.get(`http://localhost:9000/transaction/gettransactions?searchTerm=${searchTerm}&page=${pageNumber}&month=${selectedMonth}`); // Replace with your API endpoint
        console.log("Fetched data");
        setRows(response.data.msg);
        console.log(response.data.msg);
      }catch(err){
        console.error('Error in fetching data');
      }
    };

    
    // Call the function to fetch
    fetchData();
  }, [selectedMonth, searchTerm, pageNumber]); // Empty dependency array means this effect runs once


  // Stats hooks
  const [statsMonth, setStatsMonth] = useState('03');
  const [statisticsData, setStatisticsData] = useState([]);
  useEffect(()=>{
    const fetchData = async ()=>{
      try{
        const response = await axios.get(`http://localhost:9000/transaction/getStatistics?month=${statsMonth}`); // Replace with your API endpoint
        console.log("Fetched data");
        setStatisticsData(response.data.msg);
        console.log(response.data.msg);
      }catch(err){
        console.error('Error in fetching data');
      }
    };

    
    
    // Call the function to fetch
    fetchData();
  }, [statsMonth]); // Empty dependency array means this effect runs once
  


  // Make API call for bar chart
  const [barChart , setBarChart] = useState({});
  useEffect(()=>{
    const fetchData = async ()=>{
      try{
        const response = await axios.get(`http://localhost:9000/transaction/getBarGraphStats?month=${selectedMonth}`); // Replace with your API endpoint
        console.log("Fetched data");
        setBarChart(response.data.msg);
        console.log(response.data.msg);
      }catch(err){
        console.error('Error in fetching data');
      }
    };

    // Call the function to fetch
    fetchData();
  }, [selectedMonth]); // Empty dependency array means this effect runs once


  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const searchTermHandler = (event)=>{
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
  }
  
  

  const handleNextPage = ()=>{
    if (pageNumber === 10){
      return
    }
    setPageNumber(pageNumber+1);
  }

  const handPreviousPage = ()=>{
    if(pageNumber === 1){
      return
    }
    setPageNumber(pageNumber-1);
  }


  // To change the month of the statistics
  const handleStatsMonthChange = (event)=>{
    const newMonth = event.target.value;
    setStatsMonth(newMonth);
  }

  return (
    <>
    <div className={styles.TransactionDashboard}>Transaction <br/>Dashboard</div>
    {/* For providing a way to filter the table */}
    <div className={styles.flexDisplay}>
      <input type="text" className={styles.inputField} placeholder="Enter text..." onChange={searchTermHandler}/>
      
      <label className={styles.choseMonthFont}>Choose a month:</label>
      <select id="month" name="month" value={selectedMonth} onChange={handleMonthChange}>
        <option value="01">January</option>
        <option value="02">February</option>
        <option value="03">March</option>
        <option value="04">April</option>
        <option value="05">May</option>
        <option value="06">June</option>
        <option value="07">July</option>
        <option value="08">August</option>
        <option value="09">September</option>
        <option value="10">October</option>
        <option value="11">November</option>
        <option value="12">December</option>
      </select>
    </div>

    {/* The actual table for stats */}
    <table className={styles.table}>
      <tr>
        <th className={styles.th}>ID</th>
        <th className={styles.th}>Title</th>
        <th className={styles.th}>Description</th>
        <th className={styles.th}>Price</th>
        <th className={styles.th}>Category</th>
        <th className={styles.th}>Sold</th>
        <th className={styles.th}>Image</th>
      </tr>
      <tbody>
        {
          row.map(row=>(
            <tr key={row.id}>
              <td className={styles.td}>{row.id}</td>
              <td className={styles.td}>{row.title}</td>
              <td className={styles.td}>{row.description}</td>
              <td className={styles.td}>{row.price}</td>
              <td className={styles.td}>{row.category}</td>
              <td className={styles.td}>{row.sold ? 'Yes' : 'No'}</td>
              <td className={`${styles.td} ${styles.image}`}><img src={row.image} className={styles.image} id={row.id} alt={row.image}/></td>
            </tr>
          ))
        }
      </tbody>
    </table>
    <div className={styles.flexDisplay}>
      <span>Page: {pageNumber}</span>
      <button onClick={handPreviousPage} className={styles.button}>Previous</button>
      <button onClick={handleNextPage} className={styles.button}>Next</button>
      <span>Per Page: 10</span>
    </div>

    
    {/* For Transaction stats */}
    <div className={styles.statisticsHeading}>
      <span>Statistics:</span>
      <select id="month" name="month" value={statsMonth} className={styles.statsMonth} onChange={handleStatsMonthChange}>
        <option value="01">January</option>
        <option value="02">February</option>
        <option value="03">March</option>
        <option value="04">April</option>
        <option value="05">May</option>
        <option value="06">June</option>
        <option value="07">July</option>
        <option value="08">August</option>
        <option value="09">September</option>
        <option value="10">October</option>
        <option value="11">November</option>
        <option value="12">December</option>
      </select>
    </div>
    <div className={styles.statisticsBox}>
      <div className={styles.statisticsBoxFields}>
        <span>Total Sale:</span>      
        <span>{statisticsData.totalPrice}</span>
      </div>
      <div className={styles.statisticsBoxFields}>
        <span>Total Sold Items: </span>  
        <span>{statisticsData.sold}</span>
      </div>
      <div className={styles.statisticsBoxFields}>
        <span>Total Unsold Items:</span> 
        <span>{statisticsData.unsold} </span>  
      </div>   
    </div>
    <BarChart dataObj={barChart} />
    </>
  );
}

export default App;
