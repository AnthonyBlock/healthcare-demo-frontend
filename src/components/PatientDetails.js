import React from "react";
import { Card, Button, Spinner } from 'react-bootstrap';


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
            <Card key={this.state.patient.id} style={{ width: '18rem', display: 'inline-block'}}>
            <Card.Body>
            <Card.Title>{this.state.patient.firstName + " " + this.state.patient.lastName}
            </Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{this.state.patient.gender}, {this.state.patient.age}</Card.Subtitle>
              <Card.Text >

              </Card.Text>
              <Card.Text >
                Height: {this.state.patient.height} Inches
              </Card.Text>
              <Card.Text >
                Weight: {this.state.patient.weight}lbs
              </Card.Text>
              <Card.Text >
                Insurance {this.state.patient.insurance}
              </Card.Text>
              <Card.Text >
                SSN: {this.state.patient.ssn}
              </Card.Text>
              <Card.Text >
                Address: {this.state.patient.street} {this.state.patient.city}, {this.state.patient.state}, {this.state.patient.postal}
              </Card.Text>
            </Card.Body>
          </Card>   
  
            <Button variant="secondary" style={{margin: '2%', width: '7rem', height: '2.5rem'}}
            onClick={()=> window.location.replace(`/patients/edit/${this.state.patient.id}`)}>Edit</Button>
        </div>
    );
  }
}
}