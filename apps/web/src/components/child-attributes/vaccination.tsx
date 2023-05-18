import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  FormControlLabel,
  Grid,
  Stack,
  Switch,
  TextField,
} from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import { useChild } from '../../hooks/children/use-child';
import { useSetAttributes } from '../../hooks/children/use-update-attribute';

interface IVaccinationUpdate {
  childId: string;
}

interface Vaccination {
  month: string;
  type: string;
  date: string;
  done: boolean;
}

const ChildVaccinationUpdate = ({ childId }: IVaccinationUpdate) => {
  const child = useChild(childId);
  const [vaccinations, setVaccinations] = useState<Vaccination[]>([]);

  const handleVaccinationChange = (
    index: number,
    field: keyof Vaccination,
    value: string | boolean
  ) => {
    const updatedVaccinations = [...vaccinations];
    updatedVaccinations[index][field] = value;
    setVaccinations(updatedVaccinations);
  };

  const handleSwitchChange =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.checked;
      handleVaccinationChange(index, 'done', value);
    };

  const handleFieldChange =
    (index: number, field: keyof Vaccination) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      handleVaccinationChange(index, field, value);
    };

  const setAttributeMutation = useSetAttributes(childId, 'vaccination');

  useEffect(() => {
    if (child.data) {
      setVaccinations(
        child.data.attributes.vaccination
          ? child.data.attributes.vaccination
          : []
      );
    }
  }, [child.data, child.isSuccess]);

  const handleAttributeUpdate = async () => {
    await setAttributeMutation.mutateAsync(vaccinations);
  };

  const renderVaccinations = () => {
    return vaccinations.map((vaccination, index) => (
      <Box key={index} mb={3}>
        <Stack spacing={2}>
          <TextField
            label="Month"
            value={vaccination.month}
            onChange={handleFieldChange(index, 'month')}
          />
          <TextField
            label="Type"
            value={vaccination.type}
            onChange={handleFieldChange(index, 'type')}
          />
          <TextField
            value={vaccination.date}
            type="date"
            onChange={handleFieldChange(index, 'date')}
          />
          <FormControlLabel
            control={
              <Switch
                checked={vaccination.done}
                onChange={handleSwitchChange(index)}
              />
            }
            label="Done"
          />
        </Stack>

        <Divider />
      </Box>
    ));
  };

  return (
    <div>
      <Grid container spacing={2} columns={16}></Grid>

      {child.data && (
        <Box mb={3} mt={3}>
          {renderVaccinations()}
          <Button
            variant="contained"
            onClick={() =>
              setVaccinations([
                ...vaccinations,
                { month: '', type: '', date: '', done: false },
              ])
            }
          >
            Add Vaccination
          </Button>
        </Box>
      )}
      <LoadingButton
        variant="contained"
        fullWidth
        onClick={handleAttributeUpdate}
        loading={setAttributeMutation.isLoading}
      >
        Save
      </LoadingButton>
    </div>
  );
};

export default ChildVaccinationUpdate;
