import {
  FormControl, InputLabel, MenuItem, Select,
} from '@mui/material';
import { getYearsArray } from 'constant';

interface Props {
    lable: string;
    selectedYear: string;
    onSelect: (year: string) => void;
    isTo?: boolean
}

export const YearSelect = ({
  lable, selectedYear, onSelect, isTo,
}: Props) => {
  const yearsArray = getYearsArray();
  return (
    <FormControl>
      <InputLabel id="from-label">{lable}</InputLabel>
      <Select
        labelId="from-label"
        id="from"
        value={selectedYear}
        label={lable}
      >
        {isTo && (
        <MenuItem
          value="To Present"
          onClick={() => onSelect('To Present')}
        >
          To Present
        </MenuItem>
        )}
        {yearsArray.map((year) => (
          <MenuItem
            key={year}
            value={year}
            onClick={() => onSelect(`${year}`)}
          >
            {year}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
