import React from 'react';
import {
  
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
import CreatePatient from './components/CreatePatients';
import Patients from './components/Patients';
import PatientDetails from './components/PatientDetails'
import EditPatient from './components/EditPatient';
import EncounterDetails from './components/EncounterDetails';
import EncounterForm from './components/EncounterForm';
import PatientForm from './components/PatientForm';

class App extends React.Component {


render() {

  return (
    <div className="App">
        <BrowserRouter>
        <Switch>
        <Route exact path="/">
          <Patients/>
          </Route>
          <Route exact path ="/patients/:utility/" render={(props) => (<PatientForm {...props}/>)}/>

          <Route exact path ="/patientDetails/:id" render={(props) => (<PatientDetails {...props}/>)}/>
          
          <Route exact path ="/patients/:utility/:id" render={(props) => (<PatientForm {...props}/>)}/>

          <Route exact path ="/patients/:patientId/encounters/:utility" render={(props) => (<EncounterForm {...props}/>)}/>

          <Route exact path ="/patients/:patientId/encounters/:id/:utility" render={(props) => (<EncounterForm {...props}/>)}/>

          <Route exact path ="/patients/:patientId/detailedEncounter/:id" render={(props) => (<EncounterDetails {...props}/>)}/>

          </Switch>
        </BrowserRouter>

    </div>
  );
}
}
export default App;
