/**
 * From here, the application is pretty typical React, but with lots of
 * support from `@openmrs/esm-framework`. Check out `Greeter` to see
 * usage of the configuration system, and check out `PatientGetter` to
 * see data fetching using the OpenMRS FHIR API.
 *
 * Check out the Config docs:
 *   https://openmrs.github.io/openmrs-esm-core/#/main/config
 */
import BedManagementHeader from "./header/bed-management-header.component";
import { Button, Layer } from "@carbon/react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Resources from "./resources/resources.component";
import styles from "./root.scss";
import ToAdmitPatients from "./tables/to-admit.component";
import { patientsByLocation } from "./api.resource";

interface Patient {
  uuid: string;
  person: {
    display: string;
    gender: string;
  };
  nid: string;
  phone: string;
  attributes: Array<{ attributeType: { display: string }; value: string }>;
}


const Root: React.FC = () => {
  const { t } = useTranslation();
  const [selectedButton, setSelectedButton] = useState("toAdmit");
  const [patients, setPatients] = useState<Patient[]>([]);

  const onClickHandler = async (buttonName: string) => {
    setSelectedButton(buttonName);

    try {
      const controller = new AbortController();
      const response = await patientsByLocation(controller);
      setPatients(response.data.results);
      console.log(response.data.results)
    } catch (error) {
      console.error("Failed to fetch patients:", error);
      setPatients([]);
    }
  };

  return (
    <div>
      <BedManagementHeader title={t("home", "Home")} />

      <div>
        <Button
          kind={selectedButton === "toAdmit" ? "primary" : "tertiary"}
          onClick={() => onClickHandler("toAdmit")}
        >
          To Admit
        </Button>
        <Button
          kind={selectedButton === "admitted" ? "primary" : "tertiary"}
          onClick={() => onClickHandler("admitted")}
        >
          Admitted
        </Button>
        <Button
          kind={selectedButton === "all" ? "primary" : "tertiary"}
          onClick={() => onClickHandler("all")}
        >
          All
        </Button>
        <div>
          <ToAdmitPatients patients={patients}/>
        </div>
      </div>
    </div>
  );
};

export default Root;
