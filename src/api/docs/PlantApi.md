# PlantApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiPlantIdDelete**](#apiplantiddelete) | **DELETE** /api/Plant/{id} | |
|[**apiPlantIdGet**](#apiplantidget) | **GET** /api/Plant/{id} | |
|[**apiPlantIdPut**](#apiplantidput) | **PUT** /api/Plant/{id} | |
|[**apiPlantPost**](#apiplantpost) | **POST** /api/Plant | |
|[**getPlants**](#getplants) | **GET** /api/Plant | |

# **apiPlantIdDelete**
> apiPlantIdDelete()


### Example

```typescript
import {
    PlantApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PlantApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.apiPlantIdDelete(
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

# **apiPlantIdGet**
> PlantItem apiPlantIdGet()


### Example

```typescript
import {
    PlantApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PlantApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.apiPlantIdGet(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] |  | defaults to undefined|


### Return type

**PlantItem**

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

# **apiPlantIdPut**
> apiPlantIdPut()


### Example

```typescript
import {
    PlantApi,
    Configuration,
    PlantItem
} from './api';

const configuration = new Configuration();
const apiInstance = new PlantApi(configuration);

let id: number; // (default to undefined)
let plantItem: PlantItem; // (optional)

const { status, data } = await apiInstance.apiPlantIdPut(
    id,
    plantItem
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **plantItem** | **PlantItem**|  | |
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

# **apiPlantPost**
> apiPlantPost()


### Example

```typescript
import {
    PlantApi,
    Configuration,
    PlantItem
} from './api';

const configuration = new Configuration();
const apiInstance = new PlantApi(configuration);

let plantItem: PlantItem; // (optional)

const { status, data } = await apiInstance.apiPlantPost(
    plantItem
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **plantItem** | **PlantItem**|  | |


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

# **getPlants**
> Array<PlantItem> getPlants()


### Example

```typescript
import {
    PlantApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PlantApi(configuration);

const { status, data } = await apiInstance.getPlants();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<PlantItem>**

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

