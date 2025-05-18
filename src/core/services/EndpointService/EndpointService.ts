import axios from 'axios';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { makeObservable, observable, runInAction } from 'mobx';
import i18next from 'i18next';

export class EndpointService {
  private BASE_URL = import.meta.env.VITE_BASE_URL;
  private endpoint: string;
  private url: string;
  public isLoading = false;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
    this.url = `${this.BASE_URL}/${endpoint}/`;

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
      this.handleError('get', error);
    } finally {
      this.setIsLoading(false);
    }
  };

  public postData = async <T>(data: T) => {
    this.setIsLoading(true);

    try {
      const response = await axios.post(`${this.url}`, data);

      toast.success(i18next.t('endpointService.success.add'));

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

      toast.success(i18next.t('endpointService.success.update'));

      return response.data as T;
    } catch (error) {
      this.handleError('put', error);
    } finally {
      this.setIsLoading(false);
    }
  };

  public deleteData = async (id: string) => {
    this.setIsLoading(true);

    try {
      await axios.delete(`${this.url}${id}`);

      toast.success(i18next.t('endpointService.success.delete'));
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
      toast.error(i18next.t('endpointService.error.unexpected', { action }));
      throw axiosError;
    } else {
      console.error(
        `Non-Axios error during ${action} at ${this.endpoint}:`,
        error,
      );
      toast.error(i18next.t('endpointService.error.unexpected', { action }));
      throw error;
    }
  }
}
