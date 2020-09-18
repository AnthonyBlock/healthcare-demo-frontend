import React from 'react';
import CreatePatient from './CreatePatients'
import {
    BrowserRouter,
  } from "react-router-dom";
  import '@testing-library/jest-dom/extend-expect';
  import { render, fireEvent } from '@testing-library/react';

it('Component renders properly', () => {
    const { getByText } = render(<BrowserRouter><CreatePatient/></BrowserRouter>);
    expect(getByText('Create')).toBeInTheDocument();
  });

it('validates and creates errors when submitted', () => {
    const { getByText } = render(<BrowserRouter><CreatePatient /></BrowserRouter>);
    fireEvent.click(getByText('Create'));
    expect(getByText('Must a valid social security number in XXX-XX-XXXX format')).toBeInTheDocument();
  });

it('redirects when form is filled out correctly ', () => {
    const mockSuccessResponse = {};
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise
    });
    jest.spyOn(window, 'fetch').mockImplementation(() => mockFetchPromise);
    const { getByText, getByPlaceholderText } = render(<BrowserRouter><CreatePatient /></BrowserRouter>);
    fireEvent.change(getByPlaceholderText('First Name'), { target: { value: 'Test' } });
    fireEvent.change(getByPlaceholderText('Last Name'), { target: { value: 'Test' } });
    fireEvent.change(getByPlaceholderText('XXX-XX-XXXX'), { target: { value: '111-11-1111' } });
    fireEvent.change(getByPlaceholderText('x@x.com'), { target: { value: 'x@x.com' } });
    fireEvent.change(getByPlaceholderText('Street Address'), { target: { value: '500 South South Street' } });
    fireEvent.change(getByPlaceholderText('City'), { target: { value: 'Streeterville' } });
    fireEvent.change(getByPlaceholderText('Zipcode'), { target: { value: '11111' } });
    fireEvent.change(getByPlaceholderText('Age/Years'), { target: { value: '30' } });
    fireEvent.change(getByPlaceholderText('Height/Inches'), { target: { value: '90' } });
    fireEvent.change(getByPlaceholderText('Weight/Pounds'), { target: { value: '100' } });
    fireEvent.change(getByPlaceholderText('Insurance'), { target: { value: 'Test' } });
    fireEvent.click(getByText('Create'));
    setTimeout(() => expect(getByText('Provider: New Hospital')).toBeInTheDocument(), 2000);
  });