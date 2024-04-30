import React, { useContext } from 'react';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { DatePicker, DatePickerInput, Dropdown } from '@carbon/react';
import { Location } from '@carbon/react/icons';
import { useSession } from '@openmrs/esm-framework';
// import { useAppointmentServices } from '../hooks/useAppointmentService';
import BedManagementIllustration from './bed-management-illustration.component';
import styles from './bed-management-header.scss';

interface AppointmentHeaderProps {
  title: string;
  appointmentServiceType?: string;
  onChange?: (evt) => void;
}

const BedManagementHeader: React.FC<AppointmentHeaderProps> = ({ title, appointmentServiceType, onChange }) => {
  const { t } = useTranslation();
  const session = useSession();
  const location = session?.sessionLocation?.display;
  // const { serviceTypes } = useAppointmentServices();

  return (
    <div className={styles.header} data-testid="search-patient-header">
      <div className={styles['left-justified-items']}>
        <BedManagementIllustration />
        <div className={styles['page-labels']}>
          <p>{t('bedManagement', 'Bed Management')}</p>
          <p className={styles['page-name']}>{title}</p>
        </div>
      </div>
    </div>
  );
};

export default BedManagementHeader;
