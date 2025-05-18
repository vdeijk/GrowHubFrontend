# CropApi

All URIs are relative to _http://localhost_

| Method                                  | HTTP request              | Description |
| --------------------------------------- | ------------------------- | ----------- |
| [**apiCropIdDelete**](#apicropiddelete) | **DELETE** /api/Crop/{id} |             |
| [**apiCropIdGet**](#apicropidget)       | **GET** /api/Crop/{id}    |             |
| [**apiCropIdPut**](#apicropidput)       | **PUT** /api/Crop/{id}    |             |
| [**apiCropPost**](#apicroppost)         | **POST** /api/Crop        |             |
| [**getCrops**](#getcrops)               | **GET** /api/Crop         |             |

# **apiCropIdDelete**

> apiCropIdDelete()

### Example

```typescript
import { CropApi, Configuration } from './api';

const configuration = new Configuration();
const apiInstance = new CropApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.apiCropIdDelete(id);
```

### Parameters

| Name   | Type         | Description | Notes                 |
| ------ | ------------ | ----------- | --------------------- |
| **id** | [**string**] |             | defaults to undefined |

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

# **apiCropIdGet**

> CropItem apiCropIdGet()

### Example

```typescript
import { CropApi, Configuration } from './api';

const configuration = new Configuration();
const apiInstance = new CropApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.apiCropIdGet(id);
```

### Parameters

| Name   | Type         | Description | Notes                 |
| ------ | ------------ | ----------- | --------------------- |
| **id** | [**string**] |             | defaults to undefined |

### Return type

**CropItem**

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

# **apiCropIdPut**

> apiCropIdPut()

### Example

```typescript
import { CropApi, Configuration, CropItem } from './api';

const configuration = new Configuration();
const apiInstance = new CropApi(configuration);

let id: string; // (default to undefined)
let cropItem: CropItem; // (optional)

const { status, data } = await apiInstance.apiCropIdPut(id, cropItem);
```

### Parameters

| Name         | Type         | Description | Notes                 |
| ------------ | ------------ | ----------- | --------------------- |
| **cropItem** | **CropItem** |             |                       |
| **id**       | [**string**] |             | defaults to undefined |

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

# **apiCropPost**

> apiCropPost()

### Example

```typescript
import { CropApi, Configuration, CropItem } from './api';

const configuration = new Configuration();
const apiInstance = new CropApi(configuration);

let cropItem: CropItem; // (optional)

const { status, data } = await apiInstance.apiCropPost(cropItem);
```

### Parameters

| Name         | Type         | Description | Notes |
| ------------ | ------------ | ----------- | ----- |
| **cropItem** | **CropItem** |             |       |

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

# **getCrops**

> Array<CropItem> getCrops()

### Example

```typescript
import { CropApi, Configuration } from './api';

const configuration = new Configuration();
const apiInstance = new CropApi(configuration);

const { status, data } = await apiInstance.getCrops();
```

### Parameters

This endpoint does not have any parameters.

### Return type

**Array<CropItem>**

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
