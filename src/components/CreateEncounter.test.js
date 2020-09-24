import React from 'react';
import CreateEncounter from './CreateEncounter'
import {
    BrowserRouter,
  } from "react-router-dom";
  import '@testing-library/jest-dom/extend-expect';
  import { render, fireEvent } from '@testing-library/react';

  const match = {params : { patientId: 1, id: 4, utility: 'create' } }

it('Component renders properly', () => {
    const { getByText } = render(<BrowserRouter><CreateEncounter match={match}/></BrowserRouter>);
    expect(getByText('Create')).toBeInTheDocument();
  });

it('validates and creates errors when submitted', () => {
    const { getByText } = render(<BrowserRouter><CreateEncounter match={match}/></BrowserRouter>);
    fireEvent.click(getByText('Create'));
    expect(getByText('Must be a valid billing code in DDD.DDD.DDD-DD')).toBeInTheDocument();
  });

it('redirects when form is filled out correctly ', () => {
    const mockSuccessResponse = {};
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise
    });
    jest.spyOn(window, 'fetch').mockImplementation(() => mockFetchPromise);
    const { getByText, getByPlaceholderText } = render(<BrowserRouter><CreateEncounter match={match}/></BrowserRouter>);
    fireEvent.change(getByPlaceholderText('Notes'), { target: { value: 'test' } });
    fireEvent.change(getByPlaceholderText('ex. A1S 2D3'), { target: { value: 'N3W 3C3' } });
    fireEvent.change(getByPlaceholderText('Provider'), { target: { value: 'Blue Cross Blue shield' } });
    fireEvent.change(getByPlaceholderText('DDD.DDD.DDD-DD'), { target: { value: '222.222.222-11' } });
    fireEvent.change(getByPlaceholderText('ex: A20'), { target: { value: 'Z54' } });
    fireEvent.change(getByPlaceholderText('Cost in $'), { target: { value: '100' } });
    fireEvent.change(getByPlaceholderText('Copay $'), { target: { value: '10' } });
    fireEvent.change(getByPlaceholderText('Chief Complaint'), { target: { value: 'pain' } });
    fireEvent.change(getByPlaceholderText('Pulse BPM'), { target: { value: '90' } });
    fireEvent.change(getByPlaceholderText('Systolic'), { target: { value: '100' } });
    fireEvent.change(getByPlaceholderText('Diastolic'), { target: { value: '20' } });
    fireEvent.change(getByPlaceholderText('YYYY-MM-DD'), { target: { value: '2020-11-19' } });
    fireEvent.click(getByText('Create'));
    setTimeout(() => expect(getByText('Provider: New Hospital')).toBeInTheDocument(), 2000);
  });