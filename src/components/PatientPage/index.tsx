import { Paper, Typography, Avatar } from '@mui/material';
import { Diagnosis, Entry, EntryWithoutId, Gender, Patient } from '../../types';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import EntryCmp from './EntryCmp';
import EntryForm from '../AddEntryForm';
import patientService from "../../services/patients";
import { useState } from 'react';
import axios from 'axios';

interface Props {
	patient: Patient | null;
	diagnoses: Diagnosis[];
}

const PatientPage = ({ patient, diagnoses }: Props): JSX.Element => {
	const [error, setError] = useState<string>();
	const [entries, setEntries] = useState<Entry[]>(patient?.entries ?? []);

	if (!patient) {
		return <div>Patient does not exist</div>;
	}

	if (entries.length === 0) {
		setEntries(patient.entries);
	}

	let genderIcon = <LockPersonIcon />;
	if (patient?.gender === Gender.Male)
		genderIcon = <MaleIcon />;
	else if (patient?.gender === Gender.Female)
		genderIcon = <FemaleIcon />;

	const submitNewEntry = async (entry: EntryWithoutId) => {

		try {
			const newEntry = await patientService.addEntry(entry, patient?.id);
			setEntries(patient.entries.concat(newEntry));
		} catch (e: unknown) {

			if (axios.isAxiosError(e)) {

				if (e?.response?.data && typeof e?.response?.data === "string") {
					const message = e.response.data.replace('Something went wrong. Error: ', '');
					console.error(message);
					setError(message);
				} else {
					setError("Unrecognized axios error");
				}

			} else {

				console.error("Unknown error", e);
				setError("Unknown error");
			}
		}
	};

	return (
		<Paper style={{ display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
		<div style={{ display: 'flex', alignItems: 'center' }}>
			<Typography variant="h4" style={{ marginRight: '10px' }}>
			{patient?.name}
			</Typography>
			<Avatar>
			{genderIcon}
			</Avatar>
		</div>
		<div style={{ marginTop: '10px' }}>
			<Typography variant="subtitle1" gutterBottom>
			Occupation: {patient?.occupation}
			</Typography>
			<Typography variant="subtitle1" gutterBottom>
			ssn: {patient?.ssn ?? 'Not available'}
			</Typography>
		</div>
		<EntryForm error={error} onSubmit={submitNewEntry} diagnoses={diagnoses} />
		<div style={{ marginTop: '10px' }}>
			<Typography variant="h5" style={{ marginRight: '10px' }}>
			Entries
			</Typography>
		</div>
		<div style={{ marginTop: '10px' }}>
			{entries.map((entry) => (
			<div key={entry.id}>
				<EntryCmp entry={entry} diagnoses={diagnoses} />
			</div>
			))}
		</div>
		</Paper>
	);
};

export default PatientPage;
