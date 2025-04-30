# WeatherApi

All URIs are relative to _http://localhost_

| Method                                              | HTTP request                  | Description |
| --------------------------------------------------- | ----------------------------- | ----------- |
| [**apiWeatherForecastGet**](#apiweatherforecastget) | **GET** /api/Weather/forecast |             |

# **apiWeatherForecastGet**

> apiWeatherForecastGet()

### Example

```typescript
import { WeatherApi, Configuration } from './api';

const configuration = new Configuration();
const apiInstance = new WeatherApi(configuration);

let city: string; // (optional) (default to undefined)
let days: number; // (optional) (default to undefined)

const { status, data } = await apiInstance.apiWeatherForecastGet(city, days);
```

### Parameters

| Name     | Type         | Description | Notes                            |
| -------- | ------------ | ----------- | -------------------------------- |
| **city** | [**string**] |             | (optional) defaults to undefined |
| **days** | [**number**] |             | (optional) defaults to undefined |

### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined

### HTTP response details

| Status code | Description | Response headers |
| ----------- | ----------- | ---------------- |
| **200**     | OK          | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)
