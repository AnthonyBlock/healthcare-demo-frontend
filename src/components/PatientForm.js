import React, { Component } from 'react';
import { Form, Button, InputGroup, Col, Spinner,  } from 'react-bootstrap'

class PatientForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      patient: "",
      validated: false,
      firstNameErrors: "",
      lastNameErrors: "",
      ssnErrors: "",
      emailErrors: "",
      streetErrors: "",
      cityErrors: "",
      stateErrors: "",
      postalErrors: "",
      ageErrors: "",
      heightErrors: "",
      weightErrors: "",
      insuranceErrors: "",
      genderErrors: "",
      oops: "",

      inputs:{
      id: null,
      firstName: '',
      lastName: '',
      ssn: null,
      email: '',
      street: '',
      city: '',
      state: '',
      postal: '',
      age: null,
      height: null,
      weight: null,
      insurance: '',
      gender: ''
      }

    }
 }

 /**Validates input values, if they all pass, calls handleUpdatePatient
  * 
  * @param {*} event 
  */
  handleSubmit(event) {

    let isReadytoSubmit = true;

    if (!/^(?!\s*$).+/.test(this.state.inputs.firstName)){
      this.setState({firstNameErrors: "Must not be blank or whitespace"})
      event.preventDefault();
      event.stopPropagation();
      isReadytoSubmit = false;
    }
    else{
      this.setState({firstNameErrors: ""})
    }

    if (!/^(?!\s*$).+/.test(this.state.inputs.lastName)){
      this.setState({lastNameErrors: "Must not be blank or whitespace"})
      event.preventDefault();
      event.stopPropagation();
      isReadytoSubmit = false;
    }
    else{
      this.setState({lastNameErrors: ""})
    }

    if (!/^\d{3}-?\d{2}-?\d{4}$/.test(this.state.inputs.ssn)){
      this.setState({ssnErrors: "Must a valid social security number in XXX-XX-XXXX format"})
      event.preventDefault();
      event.stopPropagation();
      isReadytoSubmit = false;
    }
    else{
      this.setState({ssnErrors: ""})
    }

    if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(this.state.inputs.email)){
      this.setState({emailErrors: "Must be a valid email in x@x.x format"})
      event.preventDefault();
      event.stopPropagation();
      isReadytoSubmit = false;
    }
    else{
      this.setState({emailErrors: ""})
    }

    
    if (!/^(?!\s*$).+/.test(this.state.inputs.street)){
      this.setState({streetErrors: "Must not be blank or whitespace"})
      event.preventDefault();
      event.stopPropagation();
      isReadytoSubmit = false;
    }
    else{
      this.setState({streetErrors: ""})
    }

    if (!/^(?!\s*$).+/.test(this.state.inputs.city)){
      this.setState({cityErrors: "Must not be blank or whitespace"})
      event.preventDefault();
      event.stopPropagation();
      isReadytoSubmit = false;
    }
    else{
      this.setState({cityErrors: ""})
    }

    if (!/^(?!\s*$).+/.test(this.state.inputs.state)){
      this.setState({stateErrors: "Please select a state"})
      event.preventDefault();
      event.stopPropagation();
      isReadytoSubmit = false;
    }
    else{
      this.setState({stateErrors: ""})
    }

    if (!/^\d{5}(?:-\d{4})?$/.test(this.state.inputs.postal)){
      this.setState({postalErrors: "Must a valid zipcode in XXXXX or XXXXX-XXXX format"})
      event.preventDefault();
      event.stopPropagation();
      isReadytoSubmit = false;
    }
    else{
      this.setState({postalErrors: ""})
    }
    
    if(!/^[0-9]*[1-9][0-9]*$/.test(this.state.inputs.age)){
      this.setState({ageErrors: "Must be number greater than zero"})
      event.preventDefault();
      event.stopPropagation();
      isReadytoSubmit = false;

    }
    else{
      this.setState({ageErrors: ""})
    }

    if(!/^[0-9]*[1-9][0-9]*$/.test(this.state.inputs.height)){
      this.setState({heightErrors: "Must be number greater than zero"})
      event.preventDefault();
      event.stopPropagation();
      isReadytoSubmit = false;

    }
    else{
      this.setState({heightErrors: ""})
    }

    if(!/^[0-9]*[1-9][0-9]*$/.test(this.state.inputs.weight)){
      this.setState({weightErrors: "Must be number greater than zero"})
      event.preventDefault();
      event.stopPropagation();
      isReadytoSubmit = false;

    }
    else{
      this.setState({weightErrors: ""})
    }

    if (!/^(?!\s*$).+/.test(this.state.inputs.insurance)){
      this.setState({insuranceErrors: "Must not be blank or whitespace"})
      event.preventDefault();
      event.stopPropagation();
      isReadytoSubmit = false;
    }
    else{
      this.setState({insuranceErrors: ""})
    }

    if (!/^(?!\s*$).+/.test(this.state.inputs.gender)){
      this.setState({genderErrors: "Please select a gender"})
      event.preventDefault();
      event.stopPropagation();
      isReadytoSubmit = false;
    }
    else{
      this.setState({genderErrors: ""})
    }


    if (isReadytoSubmit) {
      event.preventDefault();
      this.setState({validated: true})
      if (this.props.match.params.utility === 'create'){
        this.handleCreatePatient(this.state.inputs)
    }
    if (this.props.match.params.utility === 'edit'){
        this.handleUpdatePatient(this.state.inputs)
    }
    }
    }

     /**Takes inputs from handleSubmit and makes post call. If receives a 201, redirects, otherwise shows an error message
   * 
   * @param {*} inputs 
   */
  async handleCreatePatient(inputs){
    this.setState({loading: true})

    let init = {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        'mode': 'cors'}),
      body: JSON.stringify(inputs)
    };
    await fetch('http://localhost:8080/patients', init).then((res) => {
      this.setState({loading: false})
      if (res.status === 201) {
        window.location.replace('/');
      }
      else {
        this.setState({oops: 'Oops something went wrong on our end, status ' + res.status, loading: false})
      }
    })}

    /**Redirects to the appropriate page on click of the "Back" button
     * 
     * @param {} inputs 
     */
    backHandler = () => {
        if (this.props.match.params.utility === 'create') {
            window.location.replace(`/`)
        }
        if (this.props.match.params.utility === 'edit') {
            window.location.replace(`/patientDetails/${this.props.match.params.id}`)
        }
    }

  /**Takes inputs from handleSubmit and makes post call. If receives a 201, redirects, otherwise shows an error message
   * 
   * @param {*} inputs 
   */
  async handleUpdatePatient(inputs){
    this.setState({loading: true})

    let init = {
      method: 'PUT',
      headers: new Headers({
        'Content-Type': 'application/json',
        'mode': 'cors'}),
      body: JSON.stringify(inputs)
    };
    await fetch(`http://localhost:8080/patients/${this.props.match.params.id}`, init).then((res) => {
      this.setState({loading: false})
      if (res.status === 200) {
        window.location.replace(`/patients/${this.props.match.params.id}`);
      }
      else {
        this.setState({oops: 'Oops something went wrong on our end, status ' + res.status, loading: false})
      }
    })}
  
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
        if (this.props.match.params.utility === 'create'){
            this.setState({loading: false})
        }
        if (this.props.match.params.utility ==='edit') {
        await this.getPatients().then((data => {
          if (data) {
            this.setState({patient: data, loading: false, inputs: 
              {
                firstName: data.firstName,
                lastName: data.lastName,
                ssn: data.ssn,
                email: data.email,
                street: data.street,
                city: data.city,
                state: data.state,
                postal: data.postal,
                age: data.age,
                height: data.height,
                weight: data.weight,
                insurance: data.insurance,
                gender: data.gender,
                id: this.props.match.params.id
              }})
          }
          else {
            this.setState({oops: 'Something went wrong on our end, we are working on fixing it', loading: false})
          }
        }))
        }
      }

render(){

      
  if (this.state.loading) {
    return <Spinner animation="border" role="status">
    <span className="sr-only">Loading...</span>
  </Spinner>
  }


  return (
    <div>
      <div style={{color: 'red'}}>{this.state.oops}</div>

    <Form noValidate validated={this.state.validated} onSubmit={(e) => this.handleSubmit(e)}>
      <Form.Row>
        <Form.Group as={Col} md="4">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="First Name"
            defaultValue={this.state.patient.firstName}
            onChange={(e) => this.setState({inputs: {...this.state.inputs, firstName: e.target.value} })}
          />
          <div style={{color: 'red', margin: '0rem'}}>{this.state.firstNameErrors}</div>
        </Form.Group>

        <Form.Group as={Col} md="4">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Last Name"
            defaultValue={this.state.patient.lastName}
            onChange={(e) => this.setState({inputs: {...this.state.inputs, lastName: e.target.value} })}
          />
          <div style={{color: 'red', margin: '0rem'}}>{this.state.lastNameErrors}</div>
        </Form.Group>

        <Form.Group as={Col} md="4">
          <Form.Label>SSN</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="XXX-XX-XXXX"
            defaultValue={this.state.patient.ssn}
            onChange={(e) => this.setState({inputs: {...this.state.inputs, ssn: e.target.value} })}
          />
          <div style={{color: 'red', margin: '0rem'}}>{this.state.ssnErrors}</div>
        </Form.Group>

        <Form.Group as={Col} md="4">
          <Form.Label>Email</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="x@x.com"
            defaultValue={this.state.patient.email}
            onChange={(e) => this.setState({inputs: {...this.state.inputs, email: e.target.value} })}
          />
          <div style={{color: 'red', margin: '0rem'}}>{this.state.emailErrors}</div>
        </Form.Group>

        <Form.Group as={Col} md="4">
          <Form.Label>Street Address</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Street Address"
            defaultValue={this.state.patient.street}
            onChange={(e) => this.setState({inputs: {...this.state.inputs, street: e.target.value} })}
          />
          <div style={{color: 'red', margin: '0rem'}}>{this.state.streetErrors}</div>
        </Form.Group>

        <Form.Group as={Col} md="4">
          <Form.Label>City</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="City"
            defaultValue={this.state.patient.city}
            onChange={(e) => this.setState({inputs: {...this.state.inputs, city: e.target.value} })}
          />
          <div style={{color: 'red', margin: '0rem'}}>{this.state.cityErrors}</div>
        </Form.Group>

        <Form.Group as={Col} md="4">
          <Form.Label>State</Form.Label>
          <Form.Control
            required
            as="select"
            placeholder="State"
            defaultValue={this.state.patient.state}
            onChange={(e) => this.setState({inputs: {...this.state.inputs, state: e.target.value} })}
          >
          <option value=""></option>
          <option value="AL">AL</option>
          <option value="AK">AK</option>
          <option value="AZ">AZ</option>
          <option value="AR">AR</option>
          <option value="CA">CA</option>
          <option value="CO">CO</option>
          <option value="CT">CT</option>
          <option value="DE">DE</option>
          <option value="DC">DC</option>
          <option value="FL">FL</option>
          <option value="GA">GA</option>
          <option value="HI">HI</option>
          <option value="ID">Id</option>
          <option value="IL">IL</option>
          <option value="IN">IN</option>
          <option value="IA">IA</option>
          <option value="KS">KS</option>
          <option value="KY">KY</option>
          <option value="LA">LA</option>
          <option value="ME">ME</option>
          <option value="MD">MD</option>
          <option value="MA">MA</option>
          <option value="MI">MI</option>
          <option value="MN">MN</option>
          <option value="MS">MS</option>
          <option value="MO">MO</option>
          <option value="MT">MT</option>
          <option value="NE">NE</option>
          <option value="NV">NV</option>
          <option value="NH">NH</option>
          <option value="NJ">NJ</option>
          <option value="NM">NM</option>
          <option value="NY">NY</option>
          <option value="NC">NC</option>
          <option value="ND">ND</option>
          <option value="OH">OH</option>
          <option value="OK">OK</option>
          <option value="OR">OR</option>
          <option value="PA">PA</option>
          <option value="RI">RI</option>
          <option value="SC">SC</option>
          <option value="SD">SD</option>
          <option value="TN">TN</option>
          <option value="TX">TX</option>
          <option value="UT">UT</option>
          <option value="VT">VT</option>
          <option value="VA">VA</option>
          <option value="WA">WA</option>
          <option value="WV">WV</option>
          <option value="WI">WI</option>
          <option value="WY">WY</option>
          </Form.Control>
          <div style={{color: 'red', margin: '0rem'}}>{this.state.stateErrors}</div>
        </Form.Group>

        <Form.Group as={Col} md="4">
          <Form.Label>Zipcode</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Zipcode"
            defaultValue={this.state.patient.postal}
            onChange={(e) => this.setState({inputs: {...this.state.inputs, postal: e.target.value} })}
          />
          <div style={{color: 'red', margin: '0rem'}}>{this.state.postalErrors}</div>
        </Form.Group>

        <Form.Group as={Col} md="4">
          <Form.Label>Age</Form.Label>
          <Form.Control
            required
            min='0'
            type="number"
            placeholder="Age/Years"
            defaultValue={this.state.patient.age}
            onChange={(e) => this.setState({inputs: ({...this.state.inputs, age: (e.target.value)}) })}
          />
        <div style={{color: 'red', margin: '0rem'}}>{this.state.ageErrors}</div>

        </Form.Group>

        <Form.Group as={Col} md="4">
          <Form.Label>Height</Form.Label>
          <Form.Control
            required
            min='0'
            type="number"
            placeholder="Height/Inches"
            defaultValue={this.state.patient.height}
            onChange={(e) => this.setState({inputs: ({...this.state.inputs, height: (e.target.value)}) })}
          />
        <div style={{color: 'red', margin: '0rem'}}>{this.state.heightErrors}</div>

        </Form.Group>

        <Form.Group as={Col} md="4">
          <Form.Label>Weight</Form.Label>
          <Form.Control
            required
            min='0'
            type="number"
            placeholder="Weight/Pounds"
            defaultValue={this.state.patient.weight}
            onChange={(e) => this.setState({inputs: ({...this.state.inputs, weight: (e.target.value)}) })}
          />
        <div style={{color: 'red', margin: '0rem'}}>{this.state.weightErrors}</div>

        </Form.Group>

        <Form.Group as={Col} md="4" >
          <Form.Label>Insurance</Form.Label>
            <Form.Control
              type="text"
              placeholder="Insurance"
              defaultValue={this.state.patient.insurance}
              onChange={(e) => this.setState({inputs: {...this.state.inputs, insurance: e.target.value} })}
            />
            <div style={{color: 'red', margin: '0rem'}}>{this.state.insuranceErrors}</div>
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} md="6" >
          <Form.Label>Gender</Form.Label>
          <Form.Control as="select" required value={this.state.gender}
          defaultValue={this.state.patient.gender}
              onChange={(e) => this.setState({inputs: {...this.state.inputs, gender: e.target.value} })}>
                <option value={""}></option>
                <option value={'Male'} key={'male'}>Male</option>
                <option value={'Female'} key={'female'}>Female</option>
                <option value={'Other'} key={'other'}>Other</option>
          </Form.Control>
          <div style={{color: 'red', margin: '0rem'}}>{this.state.genderErrors}</div>

        </Form.Group>
      </Form.Row>
      {this.props.match.params.utility === 'create' && <Button variant="secondary" type='submit'>Create</Button>}

      {this.props.match.params.utility === 'edit' && <Button variant="secondary" type='submit'>Update</Button>}

      <Button variant="secondary" style={{margin: '2%'}}
        onClick={this.backHandler}>Back</Button>
    </Form>

    </div>
  )
  }
}
export default PatientForm;