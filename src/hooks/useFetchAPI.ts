import axios from 'axios';
import { useEffect, useState } from 'react';

const useFetchAPI = (url: string) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await axios.get(url);
        setData(response.data);
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          setError(error.message);
          console.log('API Error:', {
            status: error.response?.status,
            url: error.config?.url,
            method: error.config?.method,
            message: error.message,
          });
        } else if (error instanceof Error) {
          setError(error.message);
          console.log('Unexpected error:', error.message);
        } else {
          setError('An unknown error occurred');
          console.log('Unknown error:', error);
        }
      } finally {
        setLoading(false);
        setError(null);
      }
    };

    fetchData();
  }, [url]);

  return {
    data,
    loading,
    error,
  };
};

export default useFetchAPI;
