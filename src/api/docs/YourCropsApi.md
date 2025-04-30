# YourCropsApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiYourCropsIdDelete**](#apiyourcropsiddelete) | **DELETE** /api/YourCrops/{id} | |
|[**apiYourCropsIdGet**](#apiyourcropsidget) | **GET** /api/YourCrops/{id} | |
|[**apiYourCropsIdPut**](#apiyourcropsidput) | **PUT** /api/YourCrops/{id} | |
|[**apiYourCropsPost**](#apiyourcropspost) | **POST** /api/YourCrops | |
|[**getCrops**](#getcrops) | **GET** /api/YourCrops | |

# **apiYourCropsIdDelete**
> apiYourCropsIdDelete()


### Example

```typescript
import {
    YourCropsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new YourCropsApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.apiYourCropsIdDelete(
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

# **apiYourCropsIdGet**
> YourCropItem apiYourCropsIdGet()


### Example

```typescript
import {
    YourCropsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new YourCropsApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.apiYourCropsIdGet(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] |  | defaults to undefined|


### Return type

**YourCropItem**

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

# **apiYourCropsIdPut**
> apiYourCropsIdPut()


### Example

```typescript
import {
    YourCropsApi,
    Configuration,
    YourCropItem
} from './api';

const configuration = new Configuration();
const apiInstance = new YourCropsApi(configuration);

let id: number; // (default to undefined)
let yourCropItem: YourCropItem; // (optional)

const { status, data } = await apiInstance.apiYourCropsIdPut(
    id,
    yourCropItem
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **yourCropItem** | **YourCropItem**|  | |
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

# **apiYourCropsPost**
> apiYourCropsPost()


### Example

```typescript
import {
    YourCropsApi,
    Configuration,
    YourCropItem
} from './api';

const configuration = new Configuration();
const apiInstance = new YourCropsApi(configuration);

let yourCropItem: YourCropItem; // (optional)

const { status, data } = await apiInstance.apiYourCropsPost(
    yourCropItem
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **yourCropItem** | **YourCropItem**|  | |


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

# **getCrops**
> Array<YourCropItem> getCrops()


### Example

```typescript
import {
    YourCropsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new YourCropsApi(configuration);

const { status, data } = await apiInstance.getCrops();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<YourCropItem>**

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

