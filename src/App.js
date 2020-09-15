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
import CreateEncounter from './components/CreateEncounter';
import EncounterDetails from './components/EncounterDetails';
import EditEncounter from './components/EditEncounter';

class App extends React.Component {

constructor(props) {
  super(props);

  this.state = {

  }


}


render() {

  return (
    <div className="App">
        <BrowserRouter>
        <Switch>
        <Route exact path="/">
          <Patients
                createPatient={this.createPatient}
                toPatientDetails={this.toPatientDetails}
              />
          </Route>
          <Route exact path="/patients/create">
            <CreatePatient/>
          </Route>
          <Route exact path ="/patients/:id" render={(props) => (<PatientDetails {...props}/>)}/>
          
          <Route exact path ="/patients/edit/:id" render={(props) => (<EditPatient {...props}/>)}/>

          <Route exact path ="/patients/:id/encounters/create" render={(props) => (<CreateEncounter {...props}/>)}/>

          <Route exact path ="/patients/:patientId/encounters/:id/edit" render={(props) => (<EditEncounter {...props}/>)}/>

          <Route exact path ="/patients/:patientId/encounters/:id" render={(props) => (<EncounterDetails {...props}/>)}/>

          </Switch>
        </BrowserRouter>

    </div>
  );
}
}
export default App;
