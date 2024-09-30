import React, { createContext, useContext, useEffect, useState } from 'react';

// Define the context type
interface GraphContextType {
  graphUrl: string;
  
}

// Create the context
const GraphContext = createContext<GraphContextType | undefined>(undefined);

// Provider component
export const ApiLookUpContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [url, setUrl] = useState('');
 
  const graphUrl = url.replace(/^\//, '')

  useEffect(() => {
    fetch('/apiurl.txt')
      .then((response) => {
        if (!response.ok) {
          throw new Error('File not found');
        }
        return response.text();
      })
      .then((text) => {
        setUrl(text);
      })
      .catch((err) => {
        const fallbackUrl = process.env.REACT_APP_GRAPH_URL || '';
        setUrl(fallbackUrl);
     
      });
  }, []);

  return (
    <GraphContext.Provider value={{ graphUrl}}>
      {graphUrl?children:<div>Loading...</div>}
    </GraphContext.Provider>
  );
};

// Custom hook to use the GraphContext
export const ApiLookUpContext = (): GraphContextType => {
  const context = useContext(GraphContext);
  if (!context) {
    throw new Error('useGraph must be used within a GraphProvider');
  }
  return context;
};
