import { Diagnosis, Entry } from "../../types"
import HealthCheckCmp from "./HealthCheckCmp";
import HospitalCmp from "./HospitalCmp";
import OccupationalHealthcareCmp from "./OccupationalHealthcareCmp";

interface Props {
    entry: Entry;
    diagnoses: Diagnosis[];
}

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const EntryCmp = ({entry, diagnoses}: Props): JSX.Element => {

    switch (entry.type) {
        case "HealthCheck":
            return <HealthCheckCmp entry={entry} diagnoses={diagnoses} />;
        case "Hospital":
            return <HospitalCmp entry={entry} diagnoses={diagnoses} />;
        case "OccupationalHealthcare":
            return <OccupationalHealthcareCmp entry={entry} diagnoses={diagnoses} />;
        default:
            return assertNever(entry);
    }
}

export default EntryCmp;
