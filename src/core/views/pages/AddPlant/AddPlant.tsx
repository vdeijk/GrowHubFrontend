import React from 'react';
import plantsStore from '../../../stores/PlantsStore';
import TextInput, { TextInputProps } from '../../reusables/TextInput/TextInput';
import Heading from '../../reusables/Heading/Heading';
import { useNavigate } from 'react-router-dom';
import addPlantStore from '../../../stores/AddPlantStore';
import Button, { ButtonProps } from '../../reusables/Button/Button';
import styles from './AddPlant.module.css';
import { observer } from 'mobx-react-lite';

const AddPlant: React.FC = observer(() => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPlant = {
      name: addPlantStore.name,
      sunPreference: addPlantStore.sunPreference as
        | 'Full Sun'
        | 'Partial Sun'
        | 'Shade',
      waterNeeds: addPlantStore.waterNeeds,
      soilType: addPlantStore.soilType,
      soilPH: addPlantStore.soilPH,
      matureSize: addPlantStore.matureSize,
      bloomTime: addPlantStore.bloomTime,
      fertilizerNeeds: addPlantStore.fertilizerNeeds,
      pruning: addPlantStore.pruning,
      temperatureRange: addPlantStore.temperatureRange,
      plantType: addPlantStore.plantType,
      growthRate: addPlantStore.growthRate,
    };
    plantsStore.addPlant(newPlant);
    addPlantStore.resetForm();
    navigate('/');
  };

  const nameProps: TextInputProps = {
    value: addPlantStore.name,
    onChange: (value: string) => addPlantStore.updateField('name', value),
    placeholder: 'Name',
    label: 'Name',
    required: true,
  };

  const sunPreferenceProps: TextInputProps = {
    value: addPlantStore.sunPreference,
    onChange: (value: string) =>
      addPlantStore.updateField('sunPreference', value),
    placeholder: 'Sun Preference',
    label: 'Sun Preference',
    required: true,
  };

  const waterNeedsProps: TextInputProps = {
    value: addPlantStore.waterNeeds,
    onChange: (value: string) => addPlantStore.updateField('waterNeeds', value),
    placeholder: 'Water Needs',
    label: 'Water Needs',
    required: true,
  };

  const soilTypeProps: TextInputProps = {
    value: addPlantStore.soilType,
    onChange: (value: string) => addPlantStore.updateField('soilType', value),
    placeholder: 'Soil Type',
    label: 'Soil Type',
    required: true,
  };

  const soilPHProps: TextInputProps = {
    value: addPlantStore.soilPH,
    onChange: (value: string) => addPlantStore.updateField('soilPH', value),
    placeholder: 'Soil PH',
    label: 'Soil PH',
    required: true,
  };

  const matureSizeProps: TextInputProps = {
    value: addPlantStore.matureSize,
    onChange: (value: string) => addPlantStore.updateField('matureSize', value),
    placeholder: 'Mature Size',
    label: 'Mature Size',
    required: true,
  };

  const bloomTimeProps: TextInputProps = {
    value: addPlantStore.bloomTime,
    onChange: (value: string) => addPlantStore.updateField('bloomTime', value),
    placeholder: 'Bloom Time',
    label: 'Bloom Time',
    required: true,
  };

  const fertilizerNeedsProps: TextInputProps = {
    value: addPlantStore.fertilizerNeeds,
    onChange: (value: string) =>
      addPlantStore.updateField('fertilizerNeeds', value),
    placeholder: 'Fertilizer Needs',
    label: 'Fertilizer Needs',
    required: true,
  };

  const buttonProps: ButtonProps = {
    type: 'submit',
    label: 'Add Plant',
  };

  return (
    <section className={styles.section}>
      <Heading level={1} text="Add New Plant" />
      <form onSubmit={handleSubmit} className={styles.form}>
        <TextInput {...nameProps} />
        <TextInput {...sunPreferenceProps} />
        <TextInput {...waterNeedsProps} />
        <TextInput {...soilTypeProps} />
        <TextInput {...soilPHProps} />
        <TextInput {...matureSizeProps} />
        <TextInput {...bloomTimeProps} />
        <TextInput {...fertilizerNeedsProps} />
        <Button {...buttonProps} />
      </form>
    </section>
  );
});

export default AddPlant;
