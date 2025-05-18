# FieldApi

All URIs are relative to _http://localhost_

| Method                                    | HTTP request               | Description |
| ----------------------------------------- | -------------------------- | ----------- |
| [**apiFieldIdDelete**](#apifieldiddelete) | **DELETE** /api/Field/{id} |             |
| [**apiFieldIdGet**](#apifieldidget)       | **GET** /api/Field/{id}    |             |
| [**apiFieldIdPut**](#apifieldidput)       | **PUT** /api/Field/{id}    |             |
| [**apiFieldPost**](#apifieldpost)         | **POST** /api/Field        |             |
| [**getFields**](#getfields)               | **GET** /api/Field         |             |

# **apiFieldIdDelete**

> apiFieldIdDelete()

### Example

```typescript
import { FieldApi, Configuration } from './api';

const configuration = new Configuration();
const apiInstance = new FieldApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.apiFieldIdDelete(id);
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

# **apiFieldIdGet**

> FieldItem apiFieldIdGet()

### Example

```typescript
import { FieldApi, Configuration } from './api';

const configuration = new Configuration();
const apiInstance = new FieldApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.apiFieldIdGet(id);
```

### Parameters

| Name   | Type         | Description | Notes                 |
| ------ | ------------ | ----------- | --------------------- |
| **id** | [**string**] |             | defaults to undefined |

### Return type

**FieldItem**

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

# **apiFieldIdPut**

> apiFieldIdPut()

### Example

```typescript
import { FieldApi, Configuration, FieldItem } from './api';

const configuration = new Configuration();
const apiInstance = new FieldApi(configuration);

let id: string; // (default to undefined)
let fieldItem: FieldItem; // (optional)

const { status, data } = await apiInstance.apiFieldIdPut(id, fieldItem);
```

### Parameters

| Name          | Type          | Description | Notes                 |
| ------------- | ------------- | ----------- | --------------------- |
| **fieldItem** | **FieldItem** |             |                       |
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

# **apiFieldPost**

> apiFieldPost()

### Example

```typescript
import { FieldApi, Configuration, FieldItem } from './api';

const configuration = new Configuration();
const apiInstance = new FieldApi(configuration);

let fieldItem: FieldItem; // (optional)

const { status, data } = await apiInstance.apiFieldPost(fieldItem);
```

### Parameters

| Name          | Type          | Description | Notes |
| ------------- | ------------- | ----------- | ----- |
| **fieldItem** | **FieldItem** |             |       |

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

# **getFields**

> Array<FieldItem> getFields()

### Example

```typescript
import { FieldApi, Configuration } from './api';

const configuration = new Configuration();
const apiInstance = new FieldApi(configuration);

const { status, data } = await apiInstance.getFields();
```

### Parameters

This endpoint does not have any parameters.

### Return type

**Array<FieldItem>**

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
