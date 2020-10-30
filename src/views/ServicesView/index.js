import React, { useState, useContext } from 'react';
import ServiceCard from '../../components/ServiceCard';
import ButtonLink from '../../components/ButtonLink';
import { DataContext } from '../../context/DataContext';
import ServiceSort from '../../components/ServiceSort';
import './ServicesView.css';

const ServiceSortingType = {
  SortByName: 'SORT_BY_NAME',
  SortByService: 'SORT_BY_SERVICE',
  SortByPrice: 'SORT_BY_PRICE',
};

const ServicesView = () => {
  const dataContext = useContext(DataContext);
  const [sortType, setSortType] = useState(ServiceSortingType.SortByService);

  const displayService = service => {
    let highlightName = false;

    if (sortType === 'SORT_BY_NAME') {
      highlightName = true;
    }

    if (!service) {
      return null;
    }

    return (
      <div key={service.id}>
        <ServiceCard service={service} highlightName={highlightName} />
      </div>
    );
  };

  const getSortedServices = () => {
    const { services } = dataContext;
    let sortedServices = [...services];

    if (sortType === ServiceSortingType.SortByName) {
      sortedServices = sortedServices.sort((a, b) => {
        return a.name ? a.name.localeCompare(b.name) : 0;
      });
    } else if (sortType === ServiceSortingType.SortByService) {
      sortedServices = sortedServices.sort((a, b) => {
        return a.service ? a.service.localeCompare(b.service) : 0;
      });
    } else if (sortType === ServiceSortingType.SortByPrice) {
      sortedServices = sortedServices.sort((a, b) => {
        if (a.isFree && b.isFree) {
          return 0;
        }
        if (a.isFree) {
          return -1;
        }
        if (b.isFree) {
          return 1;
        }
        if (a.price && b.price) {
          return a.price < b.price ? -1 : 0;
        }
        if (a.price && !b.price) {
          return -1;
        }
        if (a.price && !b.price) {
          return 1;
        }
        return 0;
      });
    }

    return sortedServices.map(service => displayService(service));
  };

  return (
    <div className="main-view">
      <div>
        <ButtonLink
          to="/"
          icon="/icons/icon_arrow_back.svg"
          title="На главную"
          style={{
            width: 175,
            display: 'block',
            marginRight: 'auto',
            marginLeft: 'auto',
            marginBottom: 10,
            borderColor: 'rgba(77, 77, 77, .2)',
            borderRadius: '48px',
          }}
        />
      </div>

      <ServiceSort
        onSortTypeChange={value => setSortType(value)}
        sortType={sortType}
        sortByName={ServiceSortingType.SortByName}
        sortByService={ServiceSortingType.SortByService}
        sortByPrice={ServiceSortingType.SortByPrice}
      />

      <div className="pt-3">{getSortedServices()}</div>
    </div>
  );
};

export default ServicesView;
