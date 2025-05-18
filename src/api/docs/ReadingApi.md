# ReadingApi

All URIs are relative to _http://localhost_

| Method                                        | HTTP request                 | Description |
| --------------------------------------------- | ---------------------------- | ----------- |
| [**apiReadingIdDelete**](#apireadingiddelete) | **DELETE** /api/Reading/{id} |             |
| [**apiReadingIdGet**](#apireadingidget)       | **GET** /api/Reading/{id}    |             |
| [**apiReadingIdPut**](#apireadingidput)       | **PUT** /api/Reading/{id}    |             |
| [**apiReadingPost**](#apireadingpost)         | **POST** /api/Reading        |             |
| [**getReadings**](#getreadings)               | **GET** /api/Reading         |             |

# **apiReadingIdDelete**

> apiReadingIdDelete()

### Example

```typescript
import { ReadingApi, Configuration } from './api';

const configuration = new Configuration();
const apiInstance = new ReadingApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.apiReadingIdDelete(id);
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

# **apiReadingIdGet**

> ReadingItem apiReadingIdGet()

### Example

```typescript
import { ReadingApi, Configuration } from './api';

const configuration = new Configuration();
const apiInstance = new ReadingApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.apiReadingIdGet(id);
```

### Parameters

| Name   | Type         | Description | Notes                 |
| ------ | ------------ | ----------- | --------------------- |
| **id** | [**string**] |             | defaults to undefined |

### Return type

**ReadingItem**

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

# **apiReadingIdPut**

> apiReadingIdPut()

### Example

```typescript
import { ReadingApi, Configuration, ReadingItem } from './api';

const configuration = new Configuration();
const apiInstance = new ReadingApi(configuration);

let id: string; // (default to undefined)
let readingItem: ReadingItem; // (optional)

const { status, data } = await apiInstance.apiReadingIdPut(id, readingItem);
```

### Parameters

| Name            | Type            | Description | Notes                 |
| --------------- | --------------- | ----------- | --------------------- |
| **readingItem** | **ReadingItem** |             |                       |
| **id**          | [**string**]    |             | defaults to undefined |

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

# **apiReadingPost**

> apiReadingPost()

### Example

```typescript
import { ReadingApi, Configuration, ReadingItem } from './api';

const configuration = new Configuration();
const apiInstance = new ReadingApi(configuration);

let readingItem: ReadingItem; // (optional)

const { status, data } = await apiInstance.apiReadingPost(readingItem);
```

### Parameters

| Name            | Type            | Description | Notes |
| --------------- | --------------- | ----------- | ----- |
| **readingItem** | **ReadingItem** |             |       |

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

# **getReadings**

> Array<ReadingItem> getReadings()

### Example

```typescript
import { ReadingApi, Configuration } from './api';

const configuration = new Configuration();
const apiInstance = new ReadingApi(configuration);

const { status, data } = await apiInstance.getReadings();
```

### Parameters

This endpoint does not have any parameters.

### Return type

**Array<ReadingItem>**

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
