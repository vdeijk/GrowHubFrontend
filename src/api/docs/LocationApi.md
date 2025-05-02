# LocationApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiLocationGet**](#apilocationget) | **GET** /api/Location | |
|[**apiLocationIdDelete**](#apilocationiddelete) | **DELETE** /api/Location/{id} | |
|[**apiLocationIdGet**](#apilocationidget) | **GET** /api/Location/{id} | |
|[**apiLocationIdPut**](#apilocationidput) | **PUT** /api/Location/{id} | |
|[**apiLocationPost**](#apilocationpost) | **POST** /api/Location | |

# **apiLocationGet**
> Array<LocationItem> apiLocationGet()


### Example

```typescript
import {
    LocationApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new LocationApi(configuration);

const { status, data } = await apiInstance.apiLocationGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<LocationItem>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: text/plain, application/json, text/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiLocationIdDelete**
> apiLocationIdDelete()


### Example

```typescript
import {
    LocationApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new LocationApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.apiLocationIdDelete(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] |  | defaults to undefined|


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiLocationIdGet**
> LocationItem apiLocationIdGet()


### Example

```typescript
import {
    LocationApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new LocationApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.apiLocationIdGet(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] |  | defaults to undefined|


### Return type

**LocationItem**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: text/plain, application/json, text/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiLocationIdPut**
> apiLocationIdPut()


### Example

```typescript
import {
    LocationApi,
    Configuration,
    LocationItem
} from './api';

const configuration = new Configuration();
const apiInstance = new LocationApi(configuration);

let id: number; // (default to undefined)
let locationItem: LocationItem; // (optional)

const { status, data } = await apiInstance.apiLocationIdPut(
    id,
    locationItem
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **locationItem** | **LocationItem**|  | |
| **id** | [**number**] |  | defaults to undefined|


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json, text/json, application/*+json
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiLocationPost**
> apiLocationPost()


### Example

```typescript
import {
    LocationApi,
    Configuration,
    LocationItem
} from './api';

const configuration = new Configuration();
const apiInstance = new LocationApi(configuration);

let locationItem: LocationItem; // (optional)

const { status, data } = await apiInstance.apiLocationPost(
    locationItem
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **locationItem** | **LocationItem**|  | |


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json, text/json, application/*+json
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

