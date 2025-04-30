# TodoItem

## Properties

| Name            | Type                            | Description | Notes                             |
| --------------- | ------------------------------- | ----------- | --------------------------------- |
| **id**          | **number**                      |             | [optional] [default to undefined] |
| **title**       | **string**                      |             | [optional] [default to undefined] |
| **todoStatus**  | [**TodoStatus**](TodoStatus.md) |             | [optional] [default to undefined] |
| **dueDate**     | **string**                      |             | [optional] [default to undefined] |
| **priority**    | [**Priority**](Priority.md)     |             | [optional] [default to undefined] |
| **category**    | [**Category**](Category.md)     |             | [optional] [default to undefined] |
| **description** | **string**                      |             | [optional] [default to undefined] |

## Example

```typescript
import { TodoItem } from './api';

const instance: TodoItem = {
  id,
  title,
  todoStatus,
  dueDate,
  priority,
  category,
  description,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
