import React, { useState, useEffect } from 'react';

function DataCard() {
  const [csvData, setCsvData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          'https://docs.google.com/spreadsheets/d/e/2PACX-1vSL5rWRNBVPraADWCly6joVjt421bVmFeTQZOGQP2EhI_0nqqoCERt7psHhMuSSxHilco2wc8Nf974Y/pub?gid=1790736599&single=true&output=csv'
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const csvText = await response.text();
        // Parse the CSV text into an array of arrays
        const csvArray = csvText.split('\n').map((row) => row.split(','));
        console.log(csvArray)
        setCsvData(csvArray);
      } catch (error) {
        console.error('Error fetching CSV:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1>CSV Data</h1>
      <table>
        <thead>
          <tr>
            <th>Column 1</th>
            <th>Column 2</th>
            {/* Add more headers as needed */}
          </tr>
        </thead>
        <tbody>
          {csvData.map((row, index) => (
            <tr key={index}>
              <td>{row[0]}</td>
              <td>{row[1]}</td>
              {/* Add more cells as needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataCard;
