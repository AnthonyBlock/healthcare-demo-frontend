import React from "react";
import { Tabs, Tab, Button, Spinner } from 'react-bootstrap';


export default class EncounterDetails extends React.Component {

constructor(props) {
  super(props);

 this.state = {
    loading: true,
    encounter: null,
    oops: "",
  };

}

  /**
   * Deletes the mapped encounter and redirects back to the corresponding patient
   */
  async deleteEncounter(){
      let init = {
      method: 'DELETE',
      headers: new Headers({
      'Content-Type': 'application/json',
      'mode': 'cors',
    }),
  };
  let url2 = `http://localhost:8080/patients/${this.props.match.params.patientId}/encounters/${this.props.match.params.id}`;
  await fetch(url2, init).then((res) => {
    if (!res.status === 204) {
      this.setState({oops: 'Something went wrong on our end status: ' + res.status, loading: false})
    }
    else{
      window.location.replace(`/patients/${this.props.match.params.patientId}`)
  }
  })}

  /**
   * Fetches the corresponding encounter based on the page's url from the backend
   */
  async getEncounter() {
    let init = {
      method: 'GET',
      headers: new Headers({
      'Content-Type': 'application/json',
      'mode': 'cors',
    }),
  };

  let url2 = `http://localhost:8080/patients/${this.props.match.params.patientId}/encounters/${this.props.match.params.id}`;
  let response2 = await fetch(url2, init);
  if (!response2.ok) {
    return null;
  }
  else{
  let data2 = await response2.json();
  return data2;
  }
}

  /**
   * Calls getEncounter to make a call to the backend and passes the result, if ok, into state
   */
  async componentDidMount() {
    await this.getEncounter().then((data => {
      if (data) {
        this.setState({encounter: data, loading: false})
      }
      else {
        this.setState({oops: 'Something went wrong on our end', loading: false})
      }
    }))
    }

  


  render() {

    if (this.state.loading) {
      return <Spinner animation="border" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>
    }

    if (this.state.oops) {
      return <div style={{color: 'red'}}>{this.state.oops}</div>
    }

    else{


    return (
      <div>
            <Tabs defaultActiveKey="time/place">
            <Tab style={{margin: "2%"}} eventKey="time/place" title="Time and Place">
            <p>Date: {this.state.encounter.date}</p>
            <p>Provider: {this.state.encounter.provider}</p>
            </Tab>
            <Tab style={{margin: "2%"}} eventKey="summary" title="Summary">
            <p>Id: {this.state.encounter.id}</p>
            <p>Chief Complaint: {this.state.encounter.chiefComplaint}</p>
            <p>Notes: {this.state.encounter.notes}</p>
            <p>Icd10: {this.state.encounter.icd10}</p>
            </Tab>
            <Tab style={{margin: "2%"}} eventKey="billing" title="Billing">
            <p>Cost: {this.state.encounter.totalCost}</p>
            <p>Copay: {this.state.encounter.copay}</p>
            </Tab>
            <Tab style={{margin: "2%"}} eventKey="medical" title="Medical">
            <p>Systolic: {this.state.encounter.systolic}</p>
            <p>Diastolic: {this.state.encounter.diastolic}</p>
            <p>Pulse: {this.state.encounter.pulse}</p>
            </Tab>
          </Tabs>   
          <Button variant="secondary" style={{margin: '2%', width: '7rem', height: '2.5rem'}}
            onClick={()=> window.location.replace(`/patients/${this.props.match.params.patientId}/encounters/${this.props.match.params.id}/edit`)}>Edit</Button>
            <Button variant="secondary" style={{margin: '2%', width: '7rem', height: '2.5rem'}}
            onClick={()=> this.deleteEncounter()}>Delete</Button>
            <Button variant="secondary" style={{margin: '2%', width: '7rem', height: '2.5rem'}}
            onClick={()=> window.location.replace(`/patients/${this.props.match.params.patientId}`)}>Back</Button>
        </div>
    );
  }
}}
