import React from 'react';
import './assets/font-awesome/css/all.min.css';
import './assets/report-designer.css';
import './App.css';
 
function App() {
    
    
    
  return (
    <div className="panel panel-default m-t-5" style={{margin:"20px"}}>
        <div className="panel-heading separator m-b-10">
            <span style={{fontSize:"18px"}}>Contacts</span>
            <div className="panel-controls">
                <a id="tools_tableexportexcel_unsubscribe" data-target="#" href="#" data-toggle="dropdown" data-backdrop="false" aria-haspopup="true" role="button" aria-expanded="false">
                    <i className="far fa-fw fa-download"></i>
                </a>
            </div>
        </div>
        <div className="panel-body">
            Hello world!
        </div>
    </div>
  );
}

export default App;
