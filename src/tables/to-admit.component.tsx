import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { DeliveryAdd } from "@carbon/icons-react";
import {
  Layer,
  Search,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from "@carbon/react";
import { useLayoutType, ConfigurableLink } from "@openmrs/esm-framework";
import styles from "./patient-table.scss";

interface PatientListDataTable {
  patients: any;
  onChange?: (evt) => void;
}
const PatientListDataTable: React.FC<PatientListDataTable> = ({ patients }) => {
  const valueFromAttribute = (
    attributes: Array<{ attributeType: { display: string }; value: string }>,
    key: string
  ) => {
    const attribute = attributes.find(
      (attr) => attr.attributeType.display === key
    );
    return attribute?.value || "N/A";
  };

  console.log(patients, "patients");

  return (
    <>
      <TableContainer data-testid="encountersTable">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>UUID</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patients.map((el, index) => (
              <TableRow key={el.patient.uuid}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{el.patient.person.display}</TableCell>
                <TableCell>{el.patient.uuid}</TableCell>
                <TableCell>
                  <IconButton
                    label="Admit"
                    // onClick={() => printHandler(patient)}
                  >
                    <DeliveryAdd />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default PatientListDataTable;
