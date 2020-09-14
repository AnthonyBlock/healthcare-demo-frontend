import React, { Component } from 'react';
import { Form, Button, InputGroup, Col, Spinner,  } from 'react-bootstrap'

class CreateEncounter extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      validated: false,
      patientIdErrors: null,
      notesErrors: "",
      visitCodeErrors: "",
      providerErrors: "",
      billingCodeErrors: "",
      icd10Errors: "",
      totalCostErrors: null,
      copayErrors: null,
      chiefComplaintErrors: "",
      pulseErrors: null,
      systolicErrors: null,
      diastolicErrors: null,
      dateErrors: null,
      oops: "",

      inputs:{

        patientId: null,
        notes: "",
        visitCode: "",
        provider: "",
        billingCode: "",
        icd10: "",
        totalCost: null,
        copay: null,
        chiefComplaint: "",
        pulse: "",
        systolic: "",
        diastolic: "",
        date: "",

        
      }

    }
 }

 /**Validates input values, if they all pass, calls handlecreateRoom
  * 
  * @param {*} event 
  */
  handleSubmit(event) {

    let isReadytoSubmit = true;

    if (!/^([A-Za-z]\d[A-Za-z][" "]\d[A-Za-z]\d)/.test(this.state.inputs.visitCode)){
      this.setState({visitCodeErrors: "Must be in the format of LDL DLD"})
      event.preventDefault();
      event.stopPropagation();
      isReadytoSubmit = false;
    }
    else{
      this.setState({visitCodeErrors: ""})
    }

    if (!/^(?!\s*$).+/.test(this.state.inputs.provider)){
      this.setState({providerErrors: "Must not be blank or whitespace"})
      event.preventDefault();
      event.stopPropagation();
      isReadytoSubmit = false;
    }
    else{
      this.setState({providerErrors: ""})
    }

    if (!/^\d{3}.\d{3}.\d{3}-\d{2}/.test(this.state.inputs.billingCode)){
      this.setState({billingCodeErrors: "Must be a valid billing code in DDD.DDD.DDD-DD"})
      event.preventDefault();
      event.stopPropagation();
      isReadytoSubmit = false;
    }
    else{
      this.setState({billingCodeErrors: ""})
    }

    if (!/^[A-Za-z]\d{2}/.test(this.state.inputs.icd10)){
      this.setState({icd10Errors: "Must be in LDD format"})
      event.preventDefault();
      event.stopPropagation();
      isReadytoSubmit = false;
    }
    else{
      this.setState({icd10Errors: ""})
    }

    
    if(!/^[0-9]*[1-9][0-9]*$/.test(this.state.inputs.totalCost)){
      this.setState({totalCostErrors: "Must be number greater than zero"})
      event.preventDefault();
      event.stopPropagation();
      isReadytoSubmit = false;

    }
    else{
      this.setState({totalCostErrors: ""})
    }

    if(!/^[0-9]*[1-9][0-9]*$/.test(this.state.inputs.copay)){
      this.setState({copayErrors: "Must be number greater than zero"})
      event.preventDefault();
      event.stopPropagation();
      isReadytoSubmit = false;

    }
    else{
      this.setState({copayErrors: ""})
    }

    if (!/^(?!\s*$).+/.test(this.state.inputs.chiefComplaint)){
      this.setState({chiefComplaintErrors: "Must not be blank or whitespace"})
      event.preventDefault();
      event.stopPropagation();
      isReadytoSubmit = false;
    }
    else{
      this.setState({chiefComplaintErrors: ""})
    }
    
    if(!/^$|^[0-9]*[1-9][0-9]*$/.test(this.state.inputs.systolic)){
      this.setState({systolicErrors: "Must be number greater than zero"})
      event.preventDefault();
      event.stopPropagation();
      isReadytoSubmit = false;

    }
    else{
      this.setState({systolicErrors: ""})
    }

    if(!/^$|^[0-9]*[1-9][0-9]*$/.test(this.state.inputs.pulse)){
      this.setState({pulseErrors: "Must be number greater than zero"})
      event.preventDefault();
      event.stopPropagation();
      isReadytoSubmit = false;

    }
    else{
      this.setState({pulseErrors: ""})
    }

    if(!/^$|^[0-9]*[1-9][0-9]*$/.test(this.state.inputs.diastolic)){
      this.setState({diastolicErrors: "Must be number greater than zero"})
      event.preventDefault();
      event.stopPropagation();
      isReadytoSubmit = false;

    }
    else{
      this.setState({diastolicErrors: ""})
    }



    if (!/^(?!\s*$).+/.test(this.state.inputs.date)){
      this.setState({dateErrors: "Please select a date"})
      event.preventDefault();
      event.stopPropagation();
      isReadytoSubmit = false;
    }
    else{
      this.setState({dateErrors: ""})
    }


    if (isReadytoSubmit) {
      this.setState({validated: true})
      this.handleCreateEncounter(this.state.inputs)
    }
    }

  /**Takes inputs from handleSubmit and makes post call. If receives a 201, redirects, otherwise shows an error message
   * 
   * @param {*} inputs 
   */
  async handleCreateEncounter(inputs){
    this.setState({loading: true})

    let init = {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        'mode': 'cors'}),
      body: JSON.stringify(inputs)
    };
    await fetch(`http://localhost:8080/patients/${this.props.match.params.id}/encounters`, init).then((res) => {
      this.setState({loading: false})
      if (res.status === 201) {
        window.location.replace('/');
      }
      else {
        this.setState({oops: 'Oops something went wrong on our end, status ' + res.status, loading: false})
      }
    })}
  
    /**
     * removes the loading wheel after first render
     */
  async componentDidMount() {
    this.setState({inputs: {...this.state.inputs, patientId: this.props.match.params.id}, loading: false})
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
          <Form.Label>Notes</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Notes"
            onChange={(e) => this.setState({inputs: {...this.state.inputs, notes: e.target.value} })}
          />
          <div style={{color: 'red', margin: '0rem'}}>{this.state.notesErrors}</div>
        </Form.Group>

        <Form.Group as={Col} md="4">
          <Form.Label>Visit Code</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="ex. A1S 2D3"
            onChange={(e) => this.setState({inputs: {...this.state.inputs, visitCode: e.target.value} })}
          />
          <div style={{color: 'red', margin: '0rem'}}>{this.state.visitCodeErrors}</div>
        </Form.Group>

        <Form.Group as={Col} md="4">
          <Form.Label>Provider</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Provider"
            onChange={(e) => this.setState({inputs: {...this.state.inputs, provider: e.target.value} })}
          />
          <div style={{color: 'red', margin: '0rem'}}>{this.state.providerErrors}</div>
        </Form.Group>

        <Form.Group as={Col} md="4">
          <Form.Label>Billing Code</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="DDD.DDD.DDD-DD"
            onChange={(e) => this.setState({inputs: {...this.state.inputs, billingCode: e.target.value} })}
          />
          <div style={{color: 'red', margin: '0rem'}}>{this.state.billingCodeErrors}</div>
        </Form.Group>

        <Form.Group as={Col} md="4">
          <Form.Label>ICD10</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="ex: A20"
            onChange={(e) => this.setState({inputs: {...this.state.inputs, icd10: e.target.value} })}
          >
          </Form.Control>
          <div style={{color: 'red', margin: '0rem'}}>{this.state.icd10Errors}</div>
        </Form.Group>

        <Form.Group as={Col} md="4">
          <Form.Label>Total Cost</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder="Cost in $"
            onChange={(e) => this.setState({inputs: {...this.state.inputs, totalCost: e.target.value} })}
          />
          <div style={{color: 'red', margin: '0rem'}}>{this.state.totalCostErrors}</div>
        </Form.Group>

        <Form.Group as={Col} md="4">
          <Form.Label>Copay</Form.Label>
          <Form.Control
            required
            min='0'
            type="number"
            placeholder="Copay $"
            onChange={(e) => this.setState({inputs: ({...this.state.inputs, copay: (e.target.value)}) })}
          />
        <div style={{color: 'red', margin: '0rem'}}>{this.state.copayErrors}</div>

        </Form.Group>

        <Form.Group as={Col} md="4">
          <Form.Label>Chief Complaint</Form.Label>
          <Form.Control
            required
            type="textarea"
            placeholder="Chief Complaint"
            onChange={(e) => this.setState({inputs: ({...this.state.inputs, chiefComplaint: (e.target.value)}) })}
          />
        <div style={{color: 'red', margin: '0rem'}}>{this.state.chiefComplaintErrors}</div>

        </Form.Group>

        <Form.Group as={Col} md="4">
          <Form.Label>Pulse</Form.Label>
          <Form.Control
            min='0'
            type="number"
            placeholder="Pulse BPM"
            onChange={(e) => this.setState({inputs: ({...this.state.inputs, pulse: (e.target.value)}) })}
          />
        <div style={{color: 'red', margin: '0rem'}}>{this.state.pulseErrors}</div>

        </Form.Group>

        <Form.Group as={Col} md="4" >
          <Form.Label>Systolic</Form.Label>
            <Form.Control
              type="number"
              placeholder="Systolic"
              onChange={(e) => this.setState({inputs: {...this.state.inputs, systolic: e.target.value} })}
            />
            <div style={{color: 'red', margin: '0rem'}}>{this.state.systolicErrors}</div>
        </Form.Group>
        <Form.Group as={Col} md="4" >
          <Form.Label>Diastolic</Form.Label>
            <Form.Control
              type="number"
              placeholder="Diastolic"
              onChange={(e) => this.setState({inputs: {...this.state.inputs, diastolic: e.target.value} })}
            />
            <div style={{color: 'red', margin: '0rem'}}>{this.state.diastolicErrors}</div>
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} md="6" >
          <Form.Label>Date</Form.Label>
          <Form.Control type="date" format="yyyy-mm-dd" required value={this.state.date}
              onChange={(e) => this.setState({inputs: {...this.state.inputs, date: e.target.value} })}>
          </Form.Control>
          <div style={{color: 'red', margin: '0rem'}}>{this.state.dateErrors}</div>
        </Form.Group>
      </Form.Row>
      <Button variant="secondary" type='submit'>Create</Button>
    </Form>
    </div>
  )
  }
}
export default CreateEncounter;