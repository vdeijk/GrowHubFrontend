# BatchApi

All URIs are relative to _http://localhost_

| Method                                    | HTTP request               | Description |
| ----------------------------------------- | -------------------------- | ----------- |
| [**apiBatchIdDelete**](#apibatchiddelete) | **DELETE** /api/Batch/{id} |             |
| [**apiBatchIdGet**](#apibatchidget)       | **GET** /api/Batch/{id}    |             |
| [**apiBatchIdPut**](#apibatchidput)       | **PUT** /api/Batch/{id}    |             |
| [**apiBatchPost**](#apibatchpost)         | **POST** /api/Batch        |             |
| [**getBatches**](#getbatches)             | **GET** /api/Batch         |             |

# **apiBatchIdDelete**

> apiBatchIdDelete()

### Example

```typescript
import { BatchApi, Configuration } from './api';

const configuration = new Configuration();
const apiInstance = new BatchApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.apiBatchIdDelete(id);
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

# **apiBatchIdGet**

> BatchItem apiBatchIdGet()

### Example

```typescript
import { BatchApi, Configuration } from './api';

const configuration = new Configuration();
const apiInstance = new BatchApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.apiBatchIdGet(id);
```

### Parameters

| Name   | Type         | Description | Notes                 |
| ------ | ------------ | ----------- | --------------------- |
| **id** | [**string**] |             | defaults to undefined |

### Return type

**BatchItem**

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

# **apiBatchIdPut**

> apiBatchIdPut()

### Example

```typescript
import { BatchApi, Configuration, BatchItem } from './api';

const configuration = new Configuration();
const apiInstance = new BatchApi(configuration);

let id: string; // (default to undefined)
let batchItem: BatchItem; // (optional)

const { status, data } = await apiInstance.apiBatchIdPut(id, batchItem);
```

### Parameters

| Name          | Type          | Description | Notes                 |
| ------------- | ------------- | ----------- | --------------------- |
| **batchItem** | **BatchItem** |             |                       |
| **id**        | [**string**]  |             | defaults to undefined |

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

# **apiBatchPost**

> apiBatchPost()

### Example

```typescript
import { BatchApi, Configuration, BatchItem } from './api';

const configuration = new Configuration();
const apiInstance = new BatchApi(configuration);

let batchItem: BatchItem; // (optional)

const { status, data } = await apiInstance.apiBatchPost(batchItem);
```

### Parameters

| Name          | Type          | Description | Notes |
| ------------- | ------------- | ----------- | ----- |
| **batchItem** | **BatchItem** |             |       |

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

# **getBatches**

> Array<BatchItem> getBatches()

### Example

```typescript
import { BatchApi, Configuration } from './api';

const configuration = new Configuration();
const apiInstance = new BatchApi(configuration);

const { status, data } = await apiInstance.getBatches();
```

### Parameters

This endpoint does not have any parameters.

### Return type

**Array<BatchItem>**

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
