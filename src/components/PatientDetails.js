import React from "react";
import { Card, Button, Spinner, Jumbotron } from 'react-bootstrap';


export default class PatientDetails extends React.Component {

constructor(props) {
  super(props);

 this.state = {
    loading: true,
    patient: null,
    oops: "",
    encounters: []
  };

}

  async getPatients() {
    let init = {
      method: 'GET',
      headers: new Headers({
      'Content-Type': 'application/json',
      'mode': 'cors',
    }),
  };

  let url2 = `http://localhost:8080/patients/${this.props.match.params.id}`;
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
   * makes a GET all call to the backend, if succesful passes all rooms into state, if unsuccesful displays an error message
   */
  async componentDidMount() {
    await this.getPatients().then((data => {
      if (data) {
        this.setState({patient: data, loading: false})
      }
      else {
        this.setState({oops: 'Something went wrong on our end, we are working on fixing it', loading: false})
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
            <Jumbotron key={this.state.patient.id} fluid>
            <h1>{this.state.patient.firstName + " " + this.state.patient.lastName}
            </h1>
              <p className="mb-2 text-muted">{this.state.patient.gender}, {this.state.patient.age}</p>
              <p >
                Height: {this.state.patient.height} Inches. Weight: {this.state.patient.weight}lbs
              </p>
              <p>
                Insurance {this.state.patient.insurance}
              </p>
              <p>
                SSN: {this.state.patient.ssn}
              </p>
              <p>
                Address: {this.state.patient.street}, {this.state.patient.city}, {this.state.patient.state}, {this.state.patient.postal}
              </p>
            <Button variant="secondary" style={{margin: '2%', width: '7rem', height: '2.5rem'}}
            onClick={()=> window.location.replace(`/patients/edit/${this.state.patient.id}`)}>Edit</Button>
            <Button variant="secondary" style={{margin: '2%', width: '7rem', height: '2.5rem'}}
            onClick={()=> window.location.replace(`/patients/edit/${this.state.patient.id}`)}>Delete</Button>
          </Jumbotron>   
  
        </div>
    );
  }
}
}