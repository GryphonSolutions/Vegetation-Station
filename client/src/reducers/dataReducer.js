import { createSlice } from '@reduxjs/toolkit';
import { getCatalog, getOffers, getPlants, getUsers } from '../actions';

const initialState = {
  activeUser: {
    id: 1,
    username: 'Matt',
    profilePicture:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQu9Phe4zkjG0oyvuH5rGMSl1vpKHyXzqquqg&usqp=CAU',
    tradeCount: 12,
    location: {
      city: 'Long Beach',
      state: 'CA',
      longitude: 33.7701,
      latitude: 118.1937,
      zip: 90712,
    },
  },
  selectedUser: {
    id: 1,
    username: 'Matt',
    profilePicture:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQu9Phe4zkjG0oyvuH5rGMSl1vpKHyXzqquqg&usqp=CAU',
    tradeCount: 12,
    location: {
      city: 'Long Beach',
      state: 'CA',
      longitude: 33.7701,
      latitude: 118.1937,
      zip: 90712,
    },
  },
  catalog: [],
  offers: [],
  plants: [],
  users: [],
};

const dataSlice = createSlice({
  name: 'Station Data',
  initialState,
  reducers: {
    updateActiveUser: (state, action) => {
      state.activeUser = action.payload;
    },
    updateSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCatalog.fulfilled, (state, action) => {
        state.catalog = action.payload;
      })
      .addCase(getCatalog.rejected, (state, action) => {
        console.log(`Catalog rejected with error: ${action.payload.message}`);
      })
      .addCase(getOffers.fulfilled, (state, action) => {
        state.offers = action.payload;
      })
      .addCase(getOffers.rejected, (state, action) => {
        console.log(`Offers rejected with error: ${action.payload.message}`);
      })
      .addCase(getPlants.fulfilled, (state, action) => {
        state.plants = action.payload;
      })
      .addCase(getPlants.rejected, (state, action) => {
        console.log(`Plants rejected with error: ${action.payload.message}`);
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        console.log(`Users rejected with error: ${action.payload.message}`);
      });
  },
});

export const { updateActiveUser, updateSelectedUser } = dataSlice.actions;

export const dataReducer = dataSlice.reducer;
