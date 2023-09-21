import axios from 'axios';

export const fetchAllCharacters = async () => {
  try {
    const response = await axios.get('https://disney_api.nomadcoders.workers.dev/characters');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchCharacterDetail = async (id: string) => {
  try {
    const response = await axios.get(`https://disney_api.nomadcoders.workers.dev/characters/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
