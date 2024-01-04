import { Paper, Typography } from "@mui/material";
import { Diagnosis, HospitalEntry } from "../../types";
import MedicalServicesOutlinedIcon from '@mui/icons-material/MedicalServicesOutlined';

const HospitalCmp = ({entry, diagnoses}: {entry: HospitalEntry, diagnoses: Diagnosis[]}): JSX.Element => {
    return <Paper style={{ display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div>
                    <Typography variant="subtitle1" style={{ marginRight: '10px' }} gutterBottom>
                        <MedicalServicesOutlinedIcon /> {entry.date}
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
                        {entry.discharge.date} - {entry.discharge.criteria}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom style={{ fontStyle: 'italic' }}>
                        Diagnose by: {entry.specialist}
                    </Typography>
                </div>
            </Paper>;
}

export default HospitalCmp;
