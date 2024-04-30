import { openmrsFetch, restBaseUrl } from '@openmrs/esm-framework';

export function patientsByLocation( controller: AbortController) {
  const url = `${restBaseUrl}/visit?v=custom:(uuid,patient:(uuid,identifiers:(identifier,uuid,identifierType:(name,uuid)),person:(age,display,gender,uuid,attributes:(value,attributeType:(uuid,display)))),visitType:(uuid,name,display),location:(uuid,name,display),startDatetime,stopDatetime)&includeInactive=false&totalCount=true&location=ba685651-ed3b-4e63-9b35-78893060758a`;

  return openmrsFetch(url, {
    method: 'GET',
    signal: controller.signal,
  });
}
