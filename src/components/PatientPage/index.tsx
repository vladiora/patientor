import { Paper, Typography, Avatar } from '@mui/material';
import { Diagnosis, Gender, Patient } from '../../types';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import LockPersonIcon from '@mui/icons-material/LockPerson';


interface Props {
	patient: Omit<Patient, "id"> | null;
	diagnoses: Diagnosis[];
}

const PatientPage = ({ patient, diagnoses }: Props): JSX.Element => {

	if (!patient) {
		return <div>Patient does not exist</div>;
	}

	let genderIcon = <LockPersonIcon />;
	if (patient?.gender === Gender.Male)
		genderIcon = <MaleIcon />;
	else if (patient?.gender === Gender.Female)
		genderIcon = <FemaleIcon />;

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
			SSN: {patient?.ssn ?? 'Not available'}
			</Typography>
		</div>
		<div style={{ marginTop: '10px' }}>
			<Typography variant="h5" style={{ marginRight: '10px' }}>
			Entries
			</Typography>
		</div>
		<div style={{ marginTop: '10px' }}>
			{patient?.entries.map((entry, index) => (
			<div key={index} style={{ display: 'flex', flexDirection: 'column' }}>
				<div style={{ display: 'flex', justifyContent: 'flex-start' }}>
				<Typography variant="subtitle1" style={{ marginRight: '10px' }} gutterBottom>
					{entry.date}
				</Typography>
				<Typography variant="subtitle1" gutterBottom style={{ fontStyle: 'italic' }}>
					{entry.description}
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
			</div>
			))}
		</div>
		</Paper>
	);
};

export default PatientPage;
