# TurnoverApi

All URIs are relative to _http://localhost_

| Method                            | HTTP request          | Description |
| --------------------------------- | --------------------- | ----------- |
| [**getTurnovers**](#getturnovers) | **GET** /api/Turnover |             |

# **getTurnovers**

> Array<TurnoverItem> getTurnovers()

### Example

```typescript
import { TurnoverApi, Configuration } from './api';

const configuration = new Configuration();
const apiInstance = new TurnoverApi(configuration);

const { status, data } = await apiInstance.getTurnovers();
```

### Parameters

This endpoint does not have any parameters.

### Return type

**Array<TurnoverItem>**

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
