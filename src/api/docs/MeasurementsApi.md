# MeasurementsApi

All URIs are relative to _http://localhost_

| Method                                                  | HTTP request                      | Description |
| ------------------------------------------------------- | --------------------------------- | ----------- |
| [**apiMeasurementsIdDelete**](#apimeasurementsiddelete) | **DELETE** /api/Measurements/{id} |             |
| [**apiMeasurementsIdGet**](#apimeasurementsidget)       | **GET** /api/Measurements/{id}    |             |
| [**apiMeasurementsIdPut**](#apimeasurementsidput)       | **PUT** /api/Measurements/{id}    |             |
| [**apiMeasurementsPost**](#apimeasurementspost)         | **POST** /api/Measurements        |             |
| [**getMeasurements**](#getmeasurements)                 | **GET** /api/Measurements         |             |

# **apiMeasurementsIdDelete**

> apiMeasurementsIdDelete()

### Example

```typescript
import { MeasurementsApi, Configuration } from './api';

const configuration = new Configuration();
const apiInstance = new MeasurementsApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.apiMeasurementsIdDelete(id);
```

### Parameters

| Name   | Type         | Description | Notes                 |
| ------ | ------------ | ----------- | --------------------- |
| **id** | [**number**] |             | defaults to undefined |

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

# **apiMeasurementsIdGet**

> MeasurementItem apiMeasurementsIdGet()

### Example

```typescript
import { MeasurementsApi, Configuration } from './api';

const configuration = new Configuration();
const apiInstance = new MeasurementsApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.apiMeasurementsIdGet(id);
```

### Parameters

| Name   | Type         | Description | Notes                 |
| ------ | ------------ | ----------- | --------------------- |
| **id** | [**number**] |             | defaults to undefined |

### Return type

**MeasurementItem**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/plain, application/json, text/json

### HTTP response details

| Status code | Description | Response headers |
| ----------- | ----------- | ---------------- |
| **200**     | OK          | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiMeasurementsIdPut**

> apiMeasurementsIdPut()

### Example

```typescript
import { MeasurementsApi, Configuration, MeasurementItem } from './api';

const configuration = new Configuration();
const apiInstance = new MeasurementsApi(configuration);

let id: number; // (default to undefined)
let measurementItem: MeasurementItem; // (optional)

const { status, data } = await apiInstance.apiMeasurementsIdPut(
  id,
  measurementItem,
);
```

### Parameters

| Name                | Type                | Description | Notes                 |
| ------------------- | ------------------- | ----------- | --------------------- |
| **measurementItem** | **MeasurementItem** |             |                       |
| **id**              | [**number**]        |             | defaults to undefined |

### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json, text/json, application/\*+json
- **Accept**: Not defined

### HTTP response details

| Status code | Description | Response headers |
| ----------- | ----------- | ---------------- |
| **200**     | OK          | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiMeasurementsPost**

> apiMeasurementsPost()

### Example

```typescript
import { MeasurementsApi, Configuration, MeasurementItem } from './api';

const configuration = new Configuration();
const apiInstance = new MeasurementsApi(configuration);

let measurementItem: MeasurementItem; // (optional)

const { status, data } = await apiInstance.apiMeasurementsPost(measurementItem);
```

### Parameters

| Name                | Type                | Description | Notes |
| ------------------- | ------------------- | ----------- | ----- |
| **measurementItem** | **MeasurementItem** |             |       |

### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json, text/json, application/\*+json
- **Accept**: Not defined

### HTTP response details

| Status code | Description | Response headers |
| ----------- | ----------- | ---------------- |
| **200**     | OK          | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getMeasurements**

> Array<MeasurementItem> getMeasurements()

### Example

```typescript
import { MeasurementsApi, Configuration } from './api';

const configuration = new Configuration();
const apiInstance = new MeasurementsApi(configuration);

const { status, data } = await apiInstance.getMeasurements();
```

### Parameters

This endpoint does not have any parameters.

### Return type

**Array<MeasurementItem>**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/plain, application/json, text/json

### HTTP response details

| Status code | Description | Response headers |
| ----------- | ----------- | ---------------- |
| **200**     | OK          | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)
