// npm install @material-ui/pickers
// npm install date-fns @date-io/date-fns@1
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import deLocale from 'date-fns/locale/de';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { TextField, MenuItem } from '@mui/material';

import styles from './RoomFilteringWizard.module.scss';
import { EVENT_TYPES } from '../../../data/roomData';
import { WizardData } from '../../../store/useWizardStore';

const eventType = [
	{
		value: EVENT_TYPES.all,
		label: 'Alle auswählen',
	},
	{
		value: EVENT_TYPES.concert,
		label: 'Konzert',
	},
	{
		value: EVENT_TYPES.apero,
		label: 'Apero',
	},
	{
		value: EVENT_TYPES.congress,
		label: 'Kongress',
	},
	{
		value: EVENT_TYPES.fair,
		label: 'Messe',
	},
	{
		value: EVENT_TYPES.exhibition,
		label: 'Ausstellung',
	},
	{
		value: EVENT_TYPES.meeting,
		label: 'Meeting',
	},
	{
		value: EVENT_TYPES.workshop,
		label: 'Workshop',
	},
];

interface RoomFilteringWizardProps {
	handleChange: (value: any, inputField: any) => void;
	wizardData: WizardData;
}

const RoomFilteringWizard = ({ handleChange, wizardData }: RoomFilteringWizardProps) => {
	const handleNumberInput = (value: string, inputField: string) => {
		const onlyNums: string = value.replace(/[^0-9]/g, '');
		const onlyNumValue = onlyNums.length === 0 ? '' : onlyNums;
		handleChange(onlyNumValue, inputField);
	};

	const handleDateInput = (date: Date | null, inputField: string) => {
		console.log(date);
		handleChange(date, inputField);
	};

	return (
		<div className={styles.container}>
			<TextField
				id='outlined-select-eventType'
				select
				label='Art des Events'
				value={wizardData.eventType}
				onChange={(e) => handleChange(e.target.value, 'eventType')}
				variant='outlined'
				fullWidth
			>
				{eventType.map((option) => (
					<MenuItem key={option.value} value={option.value}>
						<div style={{ textAlign: 'left' }}>{option.label}</div>
					</MenuItem>
				))}
			</TextField>

			<TextField
				id='outlined-select-personNum'
				label='Anzahl Teilnehmer'
				value={wizardData.personNum}
				onChange={(e) => handleNumberInput(e.target.value, 'personNum')}
				variant='outlined'
				fullWidth
			/>

			<LocalizationProvider dateAdapter={AdapterDateFns} locale={deLocale}>
				<div className={styles.datePicker__wrapper}>
					<DatePicker
						mask='__.__.____'
						label='Startdatum'
						minDate={new Date()}
						maxDate={wizardData.endDate !== null ? wizardData.endDate : null}
						value={wizardData.startDate}
						onChange={(date: any) => handleDateInput(date, 'startDate')}
						renderInput={(params) => <TextField {...params} />}
					/>
					<DatePicker
						mask='__.__.____'
						label='Enddatum'
						minDate={wizardData.startDate !== null ? wizardData.startDate : new Date()}
						value={wizardData.endDate}
						onChange={(date: any) => handleDateInput(date, 'endDate')}
						renderInput={(params) => <TextField {...params} />}
					/>
				</div>
			</LocalizationProvider>
		</div>
	);
};

export default RoomFilteringWizard;
