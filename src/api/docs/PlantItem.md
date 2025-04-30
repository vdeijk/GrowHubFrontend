# PlantItem

## Properties

| Name                | Type                                      | Description | Notes                             |
| ------------------- | ----------------------------------------- | ----------- | --------------------------------- |
| **commonName**      | **string**                                |             | [optional] [default to undefined] |
| **id**              | **number**                                |             | [optional] [default to undefined] |
| **sunPreference**   | [**SunPreference**](SunPreference.md)     |             | [optional] [default to undefined] |
| **waterNeeds**      | [**WaterNeeds**](WaterNeeds.md)           |             | [optional] [default to undefined] |
| **soilType**        | [**SoilType**](SoilType.md)               |             | [optional] [default to undefined] |
| **soilPH**          | [**SoilPH**](SoilPH.md)                   |             | [optional] [default to undefined] |
| **pruning**         | [**Pruning**](Pruning.md)                 |             | [optional] [default to undefined] |
| **climateZone**     | [**ClimateZone**](ClimateZone.md)         |             | [optional] [default to undefined] |
| **plantType**       | [**PlantType**](PlantType.md)             |             | [optional] [default to undefined] |
| **growthRate**      | [**GrowthRate**](GrowthRate.md)           |             | [optional] [default to undefined] |
| **fertilizerNeeds** | [**FertilizerNeeds**](FertilizerNeeds.md) |             | [optional] [default to undefined] |

## Example

```typescript
import { PlantItem } from './api';

const instance: PlantItem = {
  commonName,
  id,
  sunPreference,
  waterNeeds,
  soilType,
  soilPH,
  pruning,
  climateZone,
  plantType,
  growthRate,
  fertilizerNeeds,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
