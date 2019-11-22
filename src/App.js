import React from 'react';
import './assets/font-awesome/css/all.min.css';
import './assets/report-designer.css';
import './App.css';
import Tabs from './tabs/index';
import Workflows from './workflows';
 
function App() {
    
    var data = [
            { id: 'workflows', label: 'Workflows', content: { component: Workflows }},
            { id: 'action_types', label: 'Action Types', content: { component: Workflows }}
        ]
    
  return (
    <div className="panel panel-default m-t-5" style={{margin:"20px"}}>
        <div className="panel-heading separator m-b-10">
            <span style={{fontSize:"18px"}}>Tabs</span>
        </div>
        <div className="panel-body">
            <Tabs data={data} disableInactiveTabs={false} />
        </div>
    </div>
  );
}

export default App;
