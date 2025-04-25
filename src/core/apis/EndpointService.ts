import axios from 'axios';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { makeObservable, observable, runInAction } from 'mobx';

export class EndpointService {
  private BASE_URL = import.meta.env.VITE_BASE_URL;
  private endpoint: string;
  private url: string;
  public isLoading = false;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
    this.url = `${this.BASE_URL}${endpoint}`;

    makeObservable(this, {
      isLoading: observable,
    });
  }

  public getData = async <T>(id?: string, params?: Record<string, unknown>) => {
    this.setIsLoading(true);

    try {
      const url = id ? `${this.url}${id}` : this.url;
      const response = await axios.get(url, { params });

      return response.data as T;
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      this.setIsLoading(false);
    }
  };

  public postData = async <T>(data: T) => {
    this.setIsLoading(true);

    try {
      const response = await axios.post(`${this.url}`, data);

      toast.success('Data addded successfully!');

      return response.data as T;
    } catch (error) {
      this.handleError('post', error);
    } finally {
      this.setIsLoading(false);
    }
  };

  public putData = async <T>(id: string, data: T) => {
    this.setIsLoading(true);

    try {
      const response = await axios.put(`${this.url}${id}`, data);

      toast.success('Data updated successfully!');

      return response.data as T;
    } catch (error) {
      this.handleError('put', error);
    } finally {
      this.setIsLoading(false);
    }
  };

  public deleteData = async (id: number) => {
    this.setIsLoading(true);

    try {
      await axios.delete(this.url, {
        params: { id },
      });

      toast.success('Data deleted successfully!');
    } catch (error) {
      this.handleError('delete', error);
    } finally {
      this.setIsLoading(false);
    }
  };

  private setIsLoading(isLoading: boolean) {
    runInAction(() => {
      this.isLoading = isLoading;
    });
  }

  private handleError(action: string, error: unknown): never {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      console.error(
        `Axios error during ${action} at ${this.endpoint}:`,
        axiosError,
      );
      throw axiosError;
    } else {
      console.error(
        `Non-Axios error during ${action} at ${this.endpoint}:`,
        error,
      );
      toast.error(`Unexpected error occurred during ${action}.`);
      throw error;
    }
  }
}
