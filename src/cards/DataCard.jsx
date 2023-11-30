import React, { useState, useEffect } from 'react';

function DataCard() {
  const [csvData, setCsvData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
          const response = await fetch(
              'https://docs.google.com/spreadsheets/d/e/2PACX-1vSL5rWRNBVPraADWCly6joVjt421bVmFeTQZOGQP2EhI_0nqqoCERt7psHhMuSSxHilco2wc8Nf974Y/pub?gid=512857818&single=true&output=csv'
          );

          // const response = 1;

          if (!response.ok) {
              throw new Error('Network response was not ok');
          }

          const csvText = await response.text();
          const csvArray = csvText.split('\n').map((row) => row.split(','));
          console.log('csvArrayx--x--x-x-x--x-----x-x-x-',csvArray)

          // Convert the CSV data to an object with modified keys
          const csvObject = {};

          csvArray.forEach((row) => {
              if (row.length >= 2) {
                  const key = row[0].trim().replace(/ /g, '_'); // Replace spaces with underscores
                  const value = row[1].trim();
                  csvObject[key] = value;
              }
          });

          setCsvData(csvObject);
          console.log('my 0-0-0-0-0-0-0-0-',csvObject)
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
          {
            Object.entries(csvData).map(([key, value], index) => (
              <tr key={index}>
                <td>{key}</td>
                <td>{value}</td>
                {/* Add more cells as needed */}
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default DataCard;
