import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LocationTable from './LocationTable';

const App = () => {
  return (
    <Router>
      <div>
        {/* Other routes */}
        <Route path="/lo" component={LocationTable} />
      </div>
    </Router>
  );
};

export default App;