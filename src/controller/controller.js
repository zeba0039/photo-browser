import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const fetchAlbums = async ({ params }) => {
  try {
    const response = await axios.get(`${API_URL}/albums`, {
      params,
    });
    const payload = response.data;
    return { data: payload, count: response.headers['x-total-count'] };
  } catch (error) {
    console.log('Error', error);
  }
};

export const fetchUserById = async ({ userId }) => {
  try {
    const response = await axios.get(`${API_URL}/users/${userId}`);
    const payload = response.data;
    return payload;
  } catch (error) {
    console.log('Error', error);
  }
};

export const fetchPhotos = async ({ id, params }) => {
  try {
    const response = await axios.get(`${API_URL}/albums/${id}/photos`, {
      params,
    });
    const payload = response.data;
    return { data: payload, count: response.headers['x-total-count'] };
  } catch (error) {
    console.log('Error', error);
  }
};

export const fetchAllPhotos = async ({ params }) => {
  try {
    const response = await axios.get(`${API_URL}/photos`, {
      params,
    });
    const payload = response.data;
    return { data: payload, count: response.headers['x-total-count'] };
  } catch (error) {
    console.log('Error', error);
  }
};

export const fetchPhotoById = async ({ id }) => {
  try {
    const response = await axios.get(`${API_URL}/photos/${id}`);
    const payload = response.data;
    return payload;
  } catch (error) {
    console.log('Error', error);
  }
};
