/* tslint:disable */
/* eslint-disable */
/**
 * Entry Point
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import type { Configuration } from './configuration';
import type { AxiosPromise, AxiosInstance, RawAxiosRequestConfig } from 'axios';
import globalAxios from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import {
  DUMMY_BASE_URL,
  assertParamExists,
  setApiKeyToObject,
  setBasicAuthToObject,
  setBearerAuthToObject,
  setOAuthToObject,
  setSearchParams,
  serializeDataIfNeeded,
  toPathString,
  createRequestFunction,
} from './common';
import type { RequestArgs } from './base';
// @ts-ignore
import {
  BASE_PATH,
  COLLECTION_FORMATS,
  BaseAPI,
  RequiredError,
  operationServerMap,
} from './base';

/**
 *
 * @export
 * @interface AppointmentItem
 */
export interface AppointmentItem {
  /**
   *
   * @type {string}
   * @memberof AppointmentItem
   */
  time?: string | null;
  /**
   *
   * @type {string}
   * @memberof AppointmentItem
   */
  title?: string | null;
  /**
   *
   * @type {string}
   * @memberof AppointmentItem
   */
  description?: string | null;
}
/**
 *
 * @export
 * @interface Plant
 */
export interface Plant {
  /**
   *
   * @type {number}
   * @memberof Plant
   */
  id?: number;
  /**
   *
   * @type {string}
   * @memberof Plant
   */
  commonName?: string | null;
  /**
   *
   * @type {string}
   * @memberof Plant
   */
  scientificName?: string | null;
  /**
   *
   * @type {string}
   * @memberof Plant
   */
  genus?: string | null;
  /**
   *
   * @type {string}
   * @memberof Plant
   */
  sunPreference?: string | null;
  /**
   *
   * @type {string}
   * @memberof Plant
   */
  waterNeeds?: string | null;
  /**
   *
   * @type {string}
   * @memberof Plant
   */
  soilType?: string | null;
  /**
   *
   * @type {string}
   * @memberof Plant
   */
  soilPH?: string | null;
  /**
   *
   * @type {string}
   * @memberof Plant
   */
  pruning?: string | null;
  /**
   *
   * @type {string}
   * @memberof Plant
   */
  temperatureRange?: string | null;
  /**
   *
   * @type {string}
   * @memberof Plant
   */
  plantType?: string | null;
  /**
   *
   * @type {string}
   * @memberof Plant
   */
  growthRate?: string | null;
  /**
   *
   * @type {string}
   * @memberof Plant
   */
  matureSize?: string | null;
  /**
   *
   * @type {string}
   * @memberof Plant
   */
  bloomTime?: string | null;
  /**
   *
   * @type {string}
   * @memberof Plant
   */
  fertilizerNeeds?: string | null;
}
/**
 *
 * @export
 * @interface TodoItem
 */
export interface TodoItem {
  /**
   *
   * @type {number}
   * @memberof TodoItem
   */
  id?: number;
  /**
   *
   * @type {string}
   * @memberof TodoItem
   */
  title?: string | null;
  /**
   *
   * @type {boolean}
   * @memberof TodoItem
   */
  isCompleted?: boolean;
  /**
   *
   * @type {string}
   * @memberof TodoItem
   */
  dueDate?: string;
  /**
   *
   * @type {string}
   * @memberof TodoItem
   */
  priority?: string | null;
  /**
   *
   * @type {string}
   * @memberof TodoItem
   */
  category?: string | null;
  /**
   *
   * @type {string}
   * @memberof TodoItem
   */
  description?: string | null;
}
/**
 *
 * @export
 * @interface TurnoverItem
 */
export interface TurnoverItem {
  /**
   *
   * @type {string}
   * @memberof TurnoverItem
   */
  date?: string | null;
  /**
   *
   * @type {number}
   * @memberof TurnoverItem
   */
  amount?: number;
}
/**
 *
 * @export
 * @interface WeatherForecastItem
 */
export interface WeatherForecastItem {
  /**
   *
   * @type {string}
   * @memberof WeatherForecastItem
   */
  date?: string;
  /**
   *
   * @type {number}
   * @memberof WeatherForecastItem
   */
  temperatureC?: number;
  /**
   *
   * @type {number}
   * @memberof WeatherForecastItem
   */
  temperatureF?: number;
  /**
   *
   * @type {string}
   * @memberof WeatherForecastItem
   */
  summary?: string | null;
}

/**
 * AppointmentApi - axios parameter creator
 * @export
 */
export const AppointmentApiAxiosParamCreator = function (
  configuration?: Configuration,
) {
  return {
    /**
     *
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getAppointments: async (
      options: RawAxiosRequestConfig = {},
    ): Promise<RequestArgs> => {
      const localVarPath = `/api/Appointment`;
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = {
        method: 'GET',
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
  };
};

/**
 * AppointmentApi - functional programming interface
 * @export
 */
export const AppointmentApiFp = function (configuration?: Configuration) {
  const localVarAxiosParamCreator =
    AppointmentApiAxiosParamCreator(configuration);
  return {
    /**
     *
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async getAppointments(
      options?: RawAxiosRequestConfig,
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string,
      ) => AxiosPromise<Array<AppointmentItem>>
    > {
      const localVarAxiosArgs =
        await localVarAxiosParamCreator.getAppointments(options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath =
        operationServerMap['AppointmentApi.getAppointments']?.[
          localVarOperationServerIndex
        ]?.url;
      return (axios, basePath) =>
        createRequestFunction(
          localVarAxiosArgs,
          globalAxios,
          BASE_PATH,
          configuration,
        )(axios, localVarOperationServerBasePath || basePath);
    },
  };
};

/**
 * AppointmentApi - factory interface
 * @export
 */
export const AppointmentApiFactory = function (
  configuration?: Configuration,
  basePath?: string,
  axios?: AxiosInstance,
) {
  const localVarFp = AppointmentApiFp(configuration);
  return {
    /**
     *
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getAppointments(
      options?: RawAxiosRequestConfig,
    ): AxiosPromise<Array<AppointmentItem>> {
      return localVarFp
        .getAppointments(options)
        .then((request) => request(axios, basePath));
    },
  };
};

/**
 * AppointmentApi - object-oriented interface
 * @export
 * @class AppointmentApi
 * @extends {BaseAPI}
 */
export class AppointmentApi extends BaseAPI {
  /**
   *
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AppointmentApi
   */
  public getAppointments(options?: RawAxiosRequestConfig) {
    return AppointmentApiFp(this.configuration)
      .getAppointments(options)
      .then((request) => request(this.axios, this.basePath));
  }
}

/**
 * PlantApi - axios parameter creator
 * @export
 */
export const PlantApiAxiosParamCreator = function (
  configuration?: Configuration,
) {
  return {
    /**
     *
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getPlants: async (
      options: RawAxiosRequestConfig = {},
    ): Promise<RequestArgs> => {
      const localVarPath = `/api/Plant`;
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = {
        method: 'GET',
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
  };
};

/**
 * PlantApi - functional programming interface
 * @export
 */
export const PlantApiFp = function (configuration?: Configuration) {
  const localVarAxiosParamCreator = PlantApiAxiosParamCreator(configuration);
  return {
    /**
     *
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async getPlants(
      options?: RawAxiosRequestConfig,
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<Plant>>
    > {
      const localVarAxiosArgs =
        await localVarAxiosParamCreator.getPlants(options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath =
        operationServerMap['PlantApi.getPlants']?.[localVarOperationServerIndex]
          ?.url;
      return (axios, basePath) =>
        createRequestFunction(
          localVarAxiosArgs,
          globalAxios,
          BASE_PATH,
          configuration,
        )(axios, localVarOperationServerBasePath || basePath);
    },
  };
};

/**
 * PlantApi - factory interface
 * @export
 */
export const PlantApiFactory = function (
  configuration?: Configuration,
  basePath?: string,
  axios?: AxiosInstance,
) {
  const localVarFp = PlantApiFp(configuration);
  return {
    /**
     *
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getPlants(options?: RawAxiosRequestConfig): AxiosPromise<Array<Plant>> {
      return localVarFp
        .getPlants(options)
        .then((request) => request(axios, basePath));
    },
  };
};

/**
 * PlantApi - object-oriented interface
 * @export
 * @class PlantApi
 * @extends {BaseAPI}
 */
export class PlantApi extends BaseAPI {
  /**
   *
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof PlantApi
   */
  public getPlants(options?: RawAxiosRequestConfig) {
    return PlantApiFp(this.configuration)
      .getPlants(options)
      .then((request) => request(this.axios, this.basePath));
  }
}

/**
 * TodoApi - axios parameter creator
 * @export
 */
export const TodoApiAxiosParamCreator = function (
  configuration?: Configuration,
) {
  return {
    /**
     *
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getTodoItems: async (
      options: RawAxiosRequestConfig = {},
    ): Promise<RequestArgs> => {
      const localVarPath = `/api/Todo`;
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = {
        method: 'GET',
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
  };
};

/**
 * TodoApi - functional programming interface
 * @export
 */
export const TodoApiFp = function (configuration?: Configuration) {
  const localVarAxiosParamCreator = TodoApiAxiosParamCreator(configuration);
  return {
    /**
     *
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async getTodoItems(
      options?: RawAxiosRequestConfig,
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string,
      ) => AxiosPromise<Array<TodoItem>>
    > {
      const localVarAxiosArgs =
        await localVarAxiosParamCreator.getTodoItems(options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath =
        operationServerMap['TodoApi.getTodoItems']?.[
          localVarOperationServerIndex
        ]?.url;
      return (axios, basePath) =>
        createRequestFunction(
          localVarAxiosArgs,
          globalAxios,
          BASE_PATH,
          configuration,
        )(axios, localVarOperationServerBasePath || basePath);
    },
  };
};

/**
 * TodoApi - factory interface
 * @export
 */
export const TodoApiFactory = function (
  configuration?: Configuration,
  basePath?: string,
  axios?: AxiosInstance,
) {
  const localVarFp = TodoApiFp(configuration);
  return {
    /**
     *
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getTodoItems(
      options?: RawAxiosRequestConfig,
    ): AxiosPromise<Array<TodoItem>> {
      return localVarFp
        .getTodoItems(options)
        .then((request) => request(axios, basePath));
    },
  };
};

/**
 * TodoApi - object-oriented interface
 * @export
 * @class TodoApi
 * @extends {BaseAPI}
 */
export class TodoApi extends BaseAPI {
  /**
   *
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof TodoApi
   */
  public getTodoItems(options?: RawAxiosRequestConfig) {
    return TodoApiFp(this.configuration)
      .getTodoItems(options)
      .then((request) => request(this.axios, this.basePath));
  }
}

/**
 * TurnoverApi - axios parameter creator
 * @export
 */
export const TurnoverApiAxiosParamCreator = function (
  configuration?: Configuration,
) {
  return {
    /**
     *
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getTurnovers: async (
      options: RawAxiosRequestConfig = {},
    ): Promise<RequestArgs> => {
      const localVarPath = `/api/Turnover`;
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = {
        method: 'GET',
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
  };
};

/**
 * TurnoverApi - functional programming interface
 * @export
 */
export const TurnoverApiFp = function (configuration?: Configuration) {
  const localVarAxiosParamCreator = TurnoverApiAxiosParamCreator(configuration);
  return {
    /**
     *
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async getTurnovers(
      options?: RawAxiosRequestConfig,
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string,
      ) => AxiosPromise<Array<TurnoverItem>>
    > {
      const localVarAxiosArgs =
        await localVarAxiosParamCreator.getTurnovers(options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath =
        operationServerMap['TurnoverApi.getTurnovers']?.[
          localVarOperationServerIndex
        ]?.url;
      return (axios, basePath) =>
        createRequestFunction(
          localVarAxiosArgs,
          globalAxios,
          BASE_PATH,
          configuration,
        )(axios, localVarOperationServerBasePath || basePath);
    },
  };
};

/**
 * TurnoverApi - factory interface
 * @export
 */
export const TurnoverApiFactory = function (
  configuration?: Configuration,
  basePath?: string,
  axios?: AxiosInstance,
) {
  const localVarFp = TurnoverApiFp(configuration);
  return {
    /**
     *
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getTurnovers(
      options?: RawAxiosRequestConfig,
    ): AxiosPromise<Array<TurnoverItem>> {
      return localVarFp
        .getTurnovers(options)
        .then((request) => request(axios, basePath));
    },
  };
};

/**
 * TurnoverApi - object-oriented interface
 * @export
 * @class TurnoverApi
 * @extends {BaseAPI}
 */
export class TurnoverApi extends BaseAPI {
  /**
   *
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof TurnoverApi
   */
  public getTurnovers(options?: RawAxiosRequestConfig) {
    return TurnoverApiFp(this.configuration)
      .getTurnovers(options)
      .then((request) => request(this.axios, this.basePath));
  }
}

/**
 * WeatherApi - axios parameter creator
 * @export
 */
export const WeatherApiAxiosParamCreator = function (
  configuration?: Configuration,
) {
  return {
    /**
     *
     * @param {string} [city]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    apiWeatherCurrentGet: async (
      city?: string,
      options: RawAxiosRequestConfig = {},
    ): Promise<RequestArgs> => {
      const localVarPath = `/api/Weather/current`;
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = {
        method: 'GET',
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      if (city !== undefined) {
        localVarQueryParameter['city'] = city;
      }

      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
  };
};

/**
 * WeatherApi - functional programming interface
 * @export
 */
export const WeatherApiFp = function (configuration?: Configuration) {
  const localVarAxiosParamCreator = WeatherApiAxiosParamCreator(configuration);
  return {
    /**
     *
     * @param {string} [city]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async apiWeatherCurrentGet(
      city?: string,
      options?: RawAxiosRequestConfig,
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>
    > {
      const localVarAxiosArgs =
        await localVarAxiosParamCreator.apiWeatherCurrentGet(city, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath =
        operationServerMap['WeatherApi.apiWeatherCurrentGet']?.[
          localVarOperationServerIndex
        ]?.url;
      return (axios, basePath) =>
        createRequestFunction(
          localVarAxiosArgs,
          globalAxios,
          BASE_PATH,
          configuration,
        )(axios, localVarOperationServerBasePath || basePath);
    },
  };
};

/**
 * WeatherApi - factory interface
 * @export
 */
export const WeatherApiFactory = function (
  configuration?: Configuration,
  basePath?: string,
  axios?: AxiosInstance,
) {
  const localVarFp = WeatherApiFp(configuration);
  return {
    /**
     *
     * @param {string} [city]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    apiWeatherCurrentGet(
      city?: string,
      options?: RawAxiosRequestConfig,
    ): AxiosPromise<void> {
      return localVarFp
        .apiWeatherCurrentGet(city, options)
        .then((request) => request(axios, basePath));
    },
  };
};

/**
 * WeatherApi - object-oriented interface
 * @export
 * @class WeatherApi
 * @extends {BaseAPI}
 */
export class WeatherApi extends BaseAPI {
  /**
   *
   * @param {string} [city]
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof WeatherApi
   */
  public apiWeatherCurrentGet(city?: string, options?: RawAxiosRequestConfig) {
    return WeatherApiFp(this.configuration)
      .apiWeatherCurrentGet(city, options)
      .then((request) => request(this.axios, this.basePath));
  }
}

/**
 * WeatherForecastApi - axios parameter creator
 * @export
 */
export const WeatherForecastApiAxiosParamCreator = function (
  configuration?: Configuration,
) {
  return {
    /**
     *
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getWeatherForecast: async (
      options: RawAxiosRequestConfig = {},
    ): Promise<RequestArgs> => {
      const localVarPath = `/api/WeatherForecast`;
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = {
        method: 'GET',
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
  };
};

/**
 * WeatherForecastApi - functional programming interface
 * @export
 */
export const WeatherForecastApiFp = function (configuration?: Configuration) {
  const localVarAxiosParamCreator =
    WeatherForecastApiAxiosParamCreator(configuration);
  return {
    /**
     *
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async getWeatherForecast(
      options?: RawAxiosRequestConfig,
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string,
      ) => AxiosPromise<Array<WeatherForecastItem>>
    > {
      const localVarAxiosArgs =
        await localVarAxiosParamCreator.getWeatherForecast(options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath =
        operationServerMap['WeatherForecastApi.getWeatherForecast']?.[
          localVarOperationServerIndex
        ]?.url;
      return (axios, basePath) =>
        createRequestFunction(
          localVarAxiosArgs,
          globalAxios,
          BASE_PATH,
          configuration,
        )(axios, localVarOperationServerBasePath || basePath);
    },
  };
};

/**
 * WeatherForecastApi - factory interface
 * @export
 */
export const WeatherForecastApiFactory = function (
  configuration?: Configuration,
  basePath?: string,
  axios?: AxiosInstance,
) {
  const localVarFp = WeatherForecastApiFp(configuration);
  return {
    /**
     *
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getWeatherForecast(
      options?: RawAxiosRequestConfig,
    ): AxiosPromise<Array<WeatherForecastItem>> {
      return localVarFp
        .getWeatherForecast(options)
        .then((request) => request(axios, basePath));
    },
  };
};

/**
 * WeatherForecastApi - object-oriented interface
 * @export
 * @class WeatherForecastApi
 * @extends {BaseAPI}
 */
export class WeatherForecastApi extends BaseAPI {
  /**
   *
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof WeatherForecastApi
   */
  public getWeatherForecast(options?: RawAxiosRequestConfig) {
    return WeatherForecastApiFp(this.configuration)
      .getWeatherForecast(options)
      .then((request) => request(this.axios, this.basePath));
  }
}
