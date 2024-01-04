import { Paper, Typography } from "@mui/material";
import { Diagnosis, OccupationalHealthcareEntry } from "../../types";
import MedicalInformationOutlinedIcon from '@mui/icons-material/MedicalInformationOutlined';

const OccupationalHealthcareCmp = ({entry, diagnoses}: {entry: OccupationalHealthcareEntry, diagnoses: Diagnosis[]}): JSX.Element => {
    return <Paper style={{ display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div>
                    <Typography variant="subtitle1" style={{ marginRight: '10px' }} gutterBottom>
                        <MedicalInformationOutlinedIcon style={{color: 'blue'}} /> {entry.date} {entry.employerName}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom style={{ fontStyle: 'italic' }}>
                        Description: {entry.description}
                    </Typography>
                    </div>
                    {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
                    <div>
                        <ul>
                        {entry.diagnosisCodes.map((code, codeIndex) => (
                            <li key={codeIndex}>{code} {diagnoses.find(d => d.code === code)?.name ?? 'Diagnosis Name Not Found'}</li>
                        ))}
                        </ul>
                    </div>
                    )}
                    <Typography variant="subtitle2">
                        {entry.sickLeave ? `Sick leave: ${entry.sickLeave?.startDate} - ${entry.sickLeave?.endDate}` : ''}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom style={{ fontStyle: 'italic' }}>
                        Diagnose by: {entry.specialist}
                    </Typography>
                </div>
            </Paper>;
}

export default OccupationalHealthcareCmp;
