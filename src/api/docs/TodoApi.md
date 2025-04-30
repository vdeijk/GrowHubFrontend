# TodoApi

All URIs are relative to _http://localhost_

| Method                                  | HTTP request              | Description |
| --------------------------------------- | ------------------------- | ----------- |
| [**apiTodoIdDelete**](#apitodoiddelete) | **DELETE** /api/Todo/{id} |             |
| [**apiTodoIdGet**](#apitodoidget)       | **GET** /api/Todo/{id}    |             |
| [**apiTodoIdPut**](#apitodoidput)       | **PUT** /api/Todo/{id}    |             |
| [**apiTodoPost**](#apitodopost)         | **POST** /api/Todo        |             |
| [**getTodoItems**](#gettodoitems)       | **GET** /api/Todo         |             |

# **apiTodoIdDelete**

> apiTodoIdDelete()

### Example

```typescript
import { TodoApi, Configuration } from './api';

const configuration = new Configuration();
const apiInstance = new TodoApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.apiTodoIdDelete(id);
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

# **apiTodoIdGet**

> TodoItem apiTodoIdGet()

### Example

```typescript
import { TodoApi, Configuration } from './api';

const configuration = new Configuration();
const apiInstance = new TodoApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.apiTodoIdGet(id);
```

### Parameters

| Name   | Type         | Description | Notes                 |
| ------ | ------------ | ----------- | --------------------- |
| **id** | [**number**] |             | defaults to undefined |

### Return type

**TodoItem**

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

# **apiTodoIdPut**

> apiTodoIdPut()

### Example

```typescript
import { TodoApi, Configuration, TodoItem } from './api';

const configuration = new Configuration();
const apiInstance = new TodoApi(configuration);

let id: number; // (default to undefined)
let todoItem: TodoItem; // (optional)

const { status, data } = await apiInstance.apiTodoIdPut(id, todoItem);
```

### Parameters

| Name         | Type         | Description | Notes                 |
| ------------ | ------------ | ----------- | --------------------- |
| **todoItem** | **TodoItem** |             |                       |
| **id**       | [**number**] |             | defaults to undefined |

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

# **apiTodoPost**

> apiTodoPost()

### Example

```typescript
import { TodoApi, Configuration, TodoItem } from './api';

const configuration = new Configuration();
const apiInstance = new TodoApi(configuration);

let todoItem: TodoItem; // (optional)

const { status, data } = await apiInstance.apiTodoPost(todoItem);
```

### Parameters

| Name         | Type         | Description | Notes |
| ------------ | ------------ | ----------- | ----- |
| **todoItem** | **TodoItem** |             |       |

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

# **getTodoItems**

> Array<TodoItem> getTodoItems()

### Example

```typescript
import { TodoApi, Configuration } from './api';

const configuration = new Configuration();
const apiInstance = new TodoApi(configuration);

const { status, data } = await apiInstance.getTodoItems();
```

### Parameters

This endpoint does not have any parameters.

### Return type

**Array<TodoItem>**

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
