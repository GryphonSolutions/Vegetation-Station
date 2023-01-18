import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const getData = async ({ url, params = {} }, { rejectWithValue }) => {
  try {
    const results = await axios({
      url: `http://localhost:3000/api/${url}`,
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

export {
  getCatalog,
  // getMessages,
  getOffers,
  getPlants,
  getUsers,
};
