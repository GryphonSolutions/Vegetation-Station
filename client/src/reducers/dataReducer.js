import { createSlice } from '@reduxjs/toolkit';
import { getCatalog, getOffers, getPlants, getUsers } from '../actions';
import testCatalog from '../../../server/data/catalog.js';
import testChatMessages from '../../../server/data/chatMessages.js';
import testChats from '../../../server/data/chats.js';
import testOffers from '../../../server/data/offers.js';
import testPlants from '../../../server/data/plants.js';
import testUsers from '../../../server/data/users.js';

const initialState = {
  activeUser: testUsers[0],
  selectedUser: testUsers[1],
  currentPlant: testCatalog[0],
  currentOffers: testOffers.filter((item) => {
    return (
      item.buyer.id === testUsers[0].id || item.seller.id === testUsers[0].id
    );
  }),
  currentPosts: testCatalog.filter((item) => {
    return item.isPosted === true || item.isTraded === false;
  }),
  catalog: testCatalog,
  filteredCatalog: testCatalog,
  offers: testOffers,
  plants: testPlants,
  users: testUsers,
  chatMessages: testChatMessages,
  chats: testChats,
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
    updateCurrentPlant: (state, action) => {
      state.currentPlant = action.payload;
    },
    updateCurrentPosts: (state, action) => {
      state.currentPosts = action.payload;
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

export const {
  updateActiveUser,
  updateSelectedUser,
  updateCurrentPlant,
  updateCurrentPosts,
} = dataSlice.actions;

export const dataReducer = dataSlice.reducer;
