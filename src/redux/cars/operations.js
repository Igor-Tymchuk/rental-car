import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.baseURL = "https://car-rental-api.goit.global/";

export const getBrands = createAsyncThunk(
  "cars/getBrands",
  async (_, thunkAPI) => {
    try {
      const response = await axios(`brands`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const getCars = createAsyncThunk(
  "cars/getCars",
  async (
    { brand, rentalPrice, minMileage, maxMileage, limit, page },
    thunkAPI
  ) => {
    try {
      const response = await axios(`cars`, {
        params: { brand, rentalPrice, minMileage, maxMileage, limit, page },
      });
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const getCarDetails = createAsyncThunk(
  "cars/getCarDetails",
  async (id, thunkAPI) => {
    try {
      const response = await axios(`cars/${id}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
