import React, { Component } from 'react';
import { Form, Button, InputGroup, Col, Spinner,  } from 'react-bootstrap'

class CreatePatient extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
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

 /**Validates input values, if they all pass, calls handlecreateRoom
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
      this.setState({validated: true})
      this.handleCreatePatient(this.state.inputs)
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
        this.setState({oops: 'Oops something went wrong on our end, we are working to fix it', loading: false})
      }
    })}
  
    /**
     * removes the loading wheel after first render
     */
  async componentDidMount() {
    this.setState({loading: false})
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
            onChange={(e) => this.setState({inputs: {...this.state.inputs, state: e.target.value} })}
          >
          <option value=""></option>
          <option value="AL">Alabama</option>
          <option value="AK">Alaska</option>
          <option value="AZ">Arizona</option>
          <option value="AR">Arkansas</option>
          <option value="CA">California</option>
          <option value="CO">Colorado</option>
          <option value="CT">Connecticut</option>
          <option value="DE">Delaware</option>
          <option value="DC">District Of Columbia</option>
          <option value="FL">Florida</option>
          <option value="GA">Georgia</option>
          <option value="HI">Hawaii</option>
          <option value="ID">Idaho</option>
          <option value="IL">Illinois</option>
          <option value="IN">Indiana</option>
          <option value="IA">Iowa</option>
          <option value="KS">Kansas</option>
          <option value="KY">Kentucky</option>
          <option value="LA">Louisiana</option>
          <option value="ME">Maine</option>
          <option value="MD">Maryland</option>
          <option value="MA">Massachusetts</option>
          <option value="MI">Michigan</option>
          <option value="MN">Minnesota</option>
          <option value="MS">Mississippi</option>
          <option value="MO">Missouri</option>
          <option value="MT">Montana</option>
          <option value="NE">Nebraska</option>
          <option value="NV">Nevada</option>
          <option value="NH">New Hampshire</option>
          <option value="NJ">New Jersey</option>
          <option value="NM">New Mexico</option>
          <option value="NY">New York</option>
          <option value="NC">North Carolina</option>
          <option value="ND">North Dakota</option>
          <option value="OH">Ohio</option>
          <option value="OK">Oklahoma</option>
          <option value="OR">Oregon</option>
          <option value="PA">Pennsylvania</option>
          <option value="RI">Rhode Island</option>
          <option value="SC">South Carolina</option>
          <option value="SD">South Dakota</option>
          <option value="TN">Tennessee</option>
          <option value="TX">Texas</option>
          <option value="UT">Utah</option>
          <option value="VT">Vermont</option>
          <option value="VA">Virginia</option>
          <option value="WA">Washington</option>
          <option value="WV">West Virginia</option>
          <option value="WI">Wisconsin</option>
          <option value="WY">Wyoming</option>
          </Form.Control>
          <div style={{color: 'red', margin: '0rem'}}>{this.state.stateErrors}</div>
        </Form.Group>

        <Form.Group as={Col} md="4">
          <Form.Label>Zipcode</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Zipcode"
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
            onChange={(e) => this.setState({inputs: ({...this.state.inputs, weight: (e.target.value)}) })}
          />
        <div style={{color: 'red', margin: '0rem'}}>{this.state.weightErrors}</div>

        </Form.Group>

        <Form.Group as={Col} md="4" >
          <Form.Label>Insurance</Form.Label>
            <Form.Control
              type="text"
              placeholder="Insurance"
              onChange={(e) => this.setState({inputs: {...this.state.inputs, insurance: e.target.value} })}
            />
            <div style={{color: 'red', margin: '0rem'}}>{this.state.insuranceErrors}</div>
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} md="6" >
          <Form.Label>Gender</Form.Label>
          <Form.Control as="select" required value={this.state.gender}
              onChange={(e) => this.setState({inputs: {...this.state.inputs, gender: e.target.value} })}>
                <option value={""}></option>
                <option value={'Male'} key={'male'}>Male</option>
                <option value={'Female'} key={'female'}>Female</option>
                <option value={'Other'} key={'other'}>Other</option>
          </Form.Control>
          <div style={{color: 'red', margin: '0rem'}}>{this.state.genderErrors}</div>

        </Form.Group>
      </Form.Row>
      <Button variant="secondary" type='submit'>Create</Button>
    </Form>
    </div>
  )
  }
}
export default CreatePatient;