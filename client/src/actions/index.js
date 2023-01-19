import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const getData = async ({ url, params = {} }, { rejectWithValue }) => {
  try {
    const results = await axios({
      url: `http://ec2-54-177-159-203.us-west-1.compute.amazonaws.com:8080/api/${url}`,
      method: 'GET',
    });
    return results.data;
  } catch (err) {
    return rejectWithValue(err);
  }
};

const getCatalog = createAsyncThunk('catalog/listings', getData);
// const getMessages = createAsyncThunk('messages/data', getData);
const getOffers = createAsyncThunk('offers/archive', getData);
const getPlants = createAsyncThunk('plants/details', getData);
const getUsers = createAsyncThunk('users/info', getData);

export { getCatalog, getOffers, getPlants, getUsers };
