import { Paper, Typography } from "@mui/material";
import { Diagnosis, HealthCheckEntry } from "../../types";
import FavoriteIcon from '@mui/icons-material/Favorite';
import MonitorHeartOutlinedIcon from '@mui/icons-material/MonitorHeartOutlined';

const HealthCheckCmp = ({entry, diagnoses}: {entry: HealthCheckEntry, diagnoses: Diagnosis[]}): JSX.Element => {

    const iconColor = ['green', 'yellow', 'orange', 'red'][entry.healthCheckRating];

    return <Paper style={{ display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div>
                    <Typography variant="subtitle1" style={{ marginRight: '10px' }} gutterBottom>
                        <MonitorHeartOutlinedIcon style={{color: 'red'}} /> {entry.date}
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
                    <div>Health check rating: <FavoriteIcon style={{color: iconColor}}/></div>
                    <Typography variant="subtitle1" gutterBottom style={{ fontStyle: 'italic' }}>
                        Diagnose by: {entry.specialist}
                    </Typography>
                </div>
            </Paper>;
}

export default HealthCheckCmp;
