import { SyntheticEvent, useState } from 'react';
import { Button, TextField, Select, MenuItem, FormControl, InputLabel, Box, Alert, Input } from '@mui/material';
import { Diagnosis, EntryTypes, EntryWithoutId, HealthCheckRating } from '../../types';

interface Props {
    error?: string,
    onSubmit: (entry: EntryWithoutId) => void,
    diagnoses: Diagnosis[];
}

const EntryForm = ({ error, onSubmit, diagnoses }: Props) => {
  const [entryType, setEntryType] = useState<EntryTypes>('HealthCheck');
  const [formData, setFormData] = useState({
    description: '',
    date: '',
    specialist: '',
    diagnosisCodes: [],
    healthCheckRating: 0,
    discharge: { date: '', criteria: '' },
    employerName: '',
    sickLeave: { startDate: '', endDate: '' },
  });

  const diagnosesCodes: Array<Diagnosis['code']> = diagnoses.map(diagnosis => {
    return diagnosis.code;
  })

  const healthCheckKeys: string[] = Object.values(HealthCheckRating).filter(value => typeof value === 'string') as string[];

  const handleInputChange = (field: string, value: unknown) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleSubmit = (event: SyntheticEvent) => {

    event.preventDefault();

    onSubmit({...formData, type: entryType});
    setFormData({
        description: '',
        date: '',
        specialist: '',
        diagnosisCodes: [],
        healthCheckRating: 0,
        discharge: { date: '', criteria: '' },
        employerName: '',
        sickLeave: { startDate: '', endDate: '' },
    });
  };

  return (
    <Box
        sx={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '16px',
            maxWidth: '600px',
        }}
        >
        {error && <Alert severity="error">{error}</Alert>}
        <form>
        <Box sx={{ marginBottom: 2 }}>
            <FormControl fullWidth>
            <InputLabel id="entry-type-label">Entry Type</InputLabel>
            <Select
                labelId="entry-type-label"
                id="entry-type"
                value={entryType}
                onChange={(e) => setEntryType(e.target.value as EntryTypes)}
            >
                <MenuItem value="HealthCheck">HealthCheck</MenuItem>
                <MenuItem value="Hospital">Hospital</MenuItem>
                <MenuItem value="OccupationalHealthcare">OccupationalHealthcare</MenuItem>
            </Select>
            </FormControl>
        </Box>

        <TextField
            fullWidth
            label="Description"
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
        />

        <InputLabel htmlFor="date">Date</InputLabel>
        <Input
            fullWidth
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) => handleInputChange('date', e.target.value)}
        />

        <TextField
            fullWidth
            label="Specialist"
            value={formData.specialist}
            onChange={(e) => handleInputChange('specialist', e.target.value)}
        />

        {/* Common fields for all entry types */}
        <FormControl fullWidth>
            <InputLabel id="diagnosis-codes-label">Diagnosis Codes</InputLabel>
            <Select
                labelId="diagnosis-codes-label"
                id="diagnosis-codes"
                multiple
                value={formData.diagnosisCodes}
                onChange={(e) => handleInputChange('diagnosisCodes', e.target.value)}
                renderValue={(selected) => selected.join(', ')}
            >
                {diagnosesCodes.map((code) => (
                    <MenuItem key={code} value={code}>
                        {code}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>

        {/* Entry-specific fields */}
        {entryType === 'HealthCheck' && (
            <FormControl fullWidth>
            <InputLabel id="health-check-rating-label">Health Check Rating</InputLabel>
            <Select
                labelId="health-check-rating-label"
                id="health-check-rating"
                value={formData.healthCheckRating}
                onChange={(e) => handleInputChange('healthCheckRating', e.target.value)}
            >
                {healthCheckKeys.map((key: string) => (
                    <MenuItem key={key} value={HealthCheckRating[key as keyof typeof HealthCheckRating]}>
                        {key}
                    </MenuItem>
                ))}
            </Select>
            </FormControl>
        )}

        {entryType === 'Hospital' && (
            <>
            <InputLabel htmlFor="dis-date">Discharge Date</InputLabel>
            <Input
                fullWidth
                id="dis-date"
                type="date"
                value={formData.discharge.date}
                onChange={(e) => handleInputChange('discharge', { ...formData.discharge, date: e.target.value })}
            />

            <TextField
                fullWidth
                label="Discharge Criteria"
                value={formData.discharge.criteria}
                onChange={(e) => handleInputChange('discharge', { ...formData.discharge, criteria: e.target.value })}
            />
            </>
        )}

        {entryType === 'OccupationalHealthcare' && (
            <>
            <TextField
                fullWidth
                label="Employer Name"
                value={formData.employerName}
                onChange={(e) => handleInputChange('employerName', e.target.value)}
            />

            <InputLabel htmlFor="start-date">Sick Leave Start Date</InputLabel>
            <Input
                fullWidth
                id="start-date"
                type="date"
                value={formData.sickLeave.startDate}
                onChange={(e) =>
                    handleInputChange('sickLeave', { ...formData.sickLeave, startDate: e.target.value })
                }
            />

            <InputLabel htmlFor="end-date">Sick Leave End Date</InputLabel>
            <Input
                fullWidth
                id="end-date"
                type="date"
                value={formData.sickLeave.endDate}
                onChange={(e) =>
                    handleInputChange('sickLeave', { ...formData.sickLeave, endDate: e.target.value })
                }
            />
            </>
        )}

        <Button variant="contained" color="primary" onClick={handleSubmit}>
            Add Entry
        </Button>
        </form>
    </Box>
  );
};

export default EntryForm;
