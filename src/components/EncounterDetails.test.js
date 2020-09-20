import React from 'react';
import {
    BrowserRouter,
  } from "react-router-dom";
  import '@testing-library/jest-dom/extend-expect';
  import {render, waitForElement} from '@testing-library/react';
  import {unmountComponentAtNode } from "react-dom";
  import { act } from "react-dom/test-utils";
import EncounterDetails from './EncounterDetails.js';

let container = null;
const match = {params : { id: 3, patientId: 1} }

beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});


it('renders with loading spinner', () => {
    const { getByText } = render(<BrowserRouter><EncounterDetails match={match}/></BrowserRouter>);
    expect(getByText('Loading...')).toBeInTheDocument();
  });



  it("renders with encounter data", async () => {
    const fakeEncounter = {
    billingCode: "123.456.789-00",
    chiefComplaint: "chiefComplaint",
    copay: 10,
    date: "2020-09-19",
    diastolic: 100,
    icd10: "Z99",
    id: 3,
    notes: "new encounter",
    patientId: 1,
    provider: "New Hospital",
    pulse: 100,
    systolic: 100,
    totalCost: 100,
    visitCode: "N3W 3C3",
    }
  ;
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(fakeEncounter)
      })
    );
  
    // Use the asynchronous version of act to apply resolved promises
    await act(async () => {
      render(<EncounterDetails match={match}/>, container);
    });

    // remove the mock to ensure tests are completely isolated
    global.fetch.mockRestore();
  });