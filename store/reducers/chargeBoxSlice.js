import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chargeBoxIdentifier: null,
  chargeBoxName: null,
  chargeBoxStatus: null,
  chargeBoxLocation: null,
  selectedConnector: null,
};

export const chargeBoxSlice = createSlice({
  name: "chargeBox",
  initialState,
  reducers: {
    setChargeBoxIdentifier: (state, action) => {
      state.chargeBoxIdentifier = action.payload;
    },
    setChargeBoxName: (state, action) => {
      state.chargeBoxName = action.payload;
    },
    setChargeBoxStatus: (state, action) => {
      state.chargeBoxStatus = action.payload;
    },
    setChargeBoxLocation: (state, action) => {
      state.chargeBoxLocation = action.payload;
    },
    setSelectedConnector: (state, action) => {
      state.selectedConnector = action.payload;
    },

    getChargeBoxIdentifier: (state) => state.chargeBoxIdentifier,
    getChargeBoxName: (state) => state.chargeBoxName,
    getChargeBoxStatus: (state) => state.chargeBoxStatus,
    getChargeBoxLocation: (state) => state.chargeBoxLocation,
    getSelectedConnector: (state) => state.selectedConnector,
    clearChargeBoxData: (state) => {
      state.chargeBoxIdentifier = null;
      state.chargeBoxName = null;
      state.chargeBoxStatus = null;
      state.chargeBoxLocation = null;
      state.selectedConnector = null;
    },
  },
});

export const {
  setChargeBoxIdentifier,
  setChargeBoxName,
  setChargeBoxStatus,
  setChargeBoxLocation,
  getChargeBoxIdentifier,
  getChargeBoxName,
  getChargeBoxStatus,
  getChargeBoxLocation,
  clearChargeBoxData,
  setSelectedConnector,
  getSelectedConnector,
} = chargeBoxSlice.actions;

export const selectChargeBoxIdentifier = (state) =>
  state.chargeBox.chargeBoxIdentifier;
export const selectChargeBoxName = (state) => state.chargeBox.chargeBoxName;
export const selectChargeBoxStatus = (state) => state.chargeBox.chargeBoxStatus;
export const selectChargeBoxLocation = (state) =>
  state.chargeBox.chargeBoxLocation;
export const selectSelectedConnector = (state) =>
  state.chargeBox.selectedConnector;

export default chargeBoxSlice.reducer;
