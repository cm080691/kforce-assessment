import React, { useState } from 'react'
import {
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom'
import Filmstrip from '../components/Filmstrip.jsx';
import FilmCardDetails from '../components/FilmCardDetails.jsx';

const slidingWindowSize = 4;

const App = () => {
  let navigate = useNavigate();
  const [data, setData] = useState([]);
  const [currentWindowData, setCurrentWindowData] = useState([])
  const [currentWindowStartIndex, setCurrentWindowStartIndex] = useState(0);
  const [currentWindowEndIndex, setCurrentWindowEndIndex] = useState(slidingWindowSize);
  // selected template
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  React.useEffect(() => {
    fetch('/templates')
      .then(res => res.json())
      .then(data => {
        setData(data);
        console.log(data);
        setCurrentWindowData(data.slice(currentWindowStartIndex, currentWindowEndIndex));
      });
  }, []);

  React.useEffect(() => {
    if (data.length > 0) {
      setSelectedTemplate(data[0]);
      navigate(`/templates/${data[0].id}`);
    }
  }, [data]);


  const handleNext = () => {
    const nextWindowData = data.slice(currentWindowEndIndex, currentWindowEndIndex + slidingWindowSize);
    setCurrentWindowData(nextWindowData);
    setCurrentWindowStartIndex(currentWindowEndIndex);
    setCurrentWindowEndIndex(currentWindowEndIndex + slidingWindowSize);
    setSelectedTemplate(nextWindowData[0]);
    navigate(`/templates/${nextWindowData[0].id}`);
  }

  const handlePrevious = () => {
    const previousWindowData = data.slice(currentWindowStartIndex - slidingWindowSize, currentWindowStartIndex);
    setCurrentWindowData(previousWindowData);
    setCurrentWindowStartIndex(currentWindowStartIndex - slidingWindowSize);
    setCurrentWindowEndIndex(currentWindowEndIndex - slidingWindowSize);
    setSelectedTemplate(previousWindowData[0]);
    navigate(`/templates/${previousWindowData[0].id}`);
  };
    
    


  return (
    <div className="App" id="container">
      <header>
		    Code Development Project
      </header>
      <div id="main" role="main">
        <Routes>
          <Route 
            path="/templates/:id" 
            exact 
            element={<FilmCardDetails
              selectedTemplate={selectedTemplate}
              currentWindowData={currentWindowData}
              />} />
        </Routes>
        <Filmstrip 
          data={currentWindowData}
          hasNextDisabled={currentWindowEndIndex >= data.length}
          hasPreviousDisabled={currentWindowStartIndex === 0}
          onHandleNext={handleNext}
          onHandlePrevious={handlePrevious}
          />
      </div>
    </div>
  )
}

export default App;
