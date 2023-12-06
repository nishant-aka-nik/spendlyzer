// CSVDataContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const CSVDataContext = createContext();

export function useCSVData() {
    return useContext(CSVDataContext);
}

export function CSVDataProvider({ children }) {
    const [csvData, setCsvData] = useState({});

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

                // Convert the CSV data to an object with modified keys
                const csvObject = {};

                csvArray.forEach((row) => {
                    if (row.length < 2) {
                        return;
                    }
                    const key = row[0].trim().replace(/ /g, '_'); // Replace spaces with underscores
                    const value = row[1].trim();
                    csvObject[key] = value;
                });

                setCsvData(csvObject);
            } catch (error) {
                console.error('Error fetching CSV:', error);
            }
        }

        fetchData();
    }, []);

    return (
        <CSVDataContext.Provider value={csvData}>
            {children}
        </CSVDataContext.Provider>
    );
}
