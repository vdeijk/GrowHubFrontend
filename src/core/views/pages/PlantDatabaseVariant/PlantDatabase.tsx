// import * as React from 'react';
// import styles from './PlantDatabase.module.css';
// import Heading from '../../reusables/Heading/Heading';
// import Table from '../../reusables/Table/Table';
// import SearchBar from '../../containers/SearchBar/SearchBar';
// import plantsStore from '../../../stores/PlantsStore';
// import { observer } from 'mobx-react-lite';
// import Button from '../../reusables/Button/Button';
// import { ButtonProps } from '../../reusables/Button/Button';
// import { useNavigate } from 'react-router-dom';

// const PlantDatabase: React.FC = observer(() => {
//   const searchBarProps = {
//     searchQuery: plantsStore.searchQuery,
//     setSearchQuery: plantsStore.setSearchQuery,
//     filterCriteria: plantsStore.filterCriteria,
//     setFilterCriteria: plantsStore.setFilterCriteria,
//     sunPreferenceOptions: plantsStore.sunPreferenceOptions,
//   };

//   const navigate = useNavigate();

//   const buttonProps: ButtonProps = {
//     type: 'button',
//     label: 'Add a Plant',
//     onClick: () => navigate('/add-plant'),
//   };

//   return (
//     <section className={styles.section}>
//       <Heading level={1} text="Plant Database" />
//       <SearchBar {...searchBarProps} />
//       <Table
//         headers={plantsStore.tableHeaders}
//         data={plantsStore.filteredPlants}
//       />
//       <Button {...buttonProps} />
//     </section>
//   );
// });

// export default PlantDatabase;
