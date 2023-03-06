import { LoadingButton } from '@mui/lab';
import { CircularProgress, Grid, TextField } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import { useChild } from '../../hooks/children/use-child';
import { useSetAttributes } from '../../hooks/children/use-update-attribute';

interface IChildAttributeUpdate {
  type: 'height' | 'weight';
  childId: string;
}
const ChildAttributeUpdate = ({ type, childId }: IChildAttributeUpdate) => {
  const child = useChild(childId);
  const [values, setValues] = useState<undefined | any>();
  const setAttributeMutation = useSetAttributes(childId, type);

  const handleMonthValueChange = (month: string, newValue: number) => {
    const newData = values
      ? values.map((item: { month: string }) =>
          item.month === month ? { ...item, value: newValue } : item
        )
      : [];
    setValues(newData);
  };

  useEffect(() => {
    if (child.data) {
      setValues(child.data.attributes[type]);
    }
  }, [child.isSuccess]);

  const handleAttributeUpdate = async () => {
    await setAttributeMutation.mutateAsync(values);
  };

  return (
    <div>
      <Grid container spacing={2} columns={16}>
        {values ? (
          <>
            {values.map(
              ({ month, value }: { month: string; value: number }) => (
                <MonthValueField
                  key={month}
                  month={month}
                  value={value}
                  onChange={handleMonthValueChange}
                />
              )
            )}
          </>
        ) : (
          <CircularProgress sx={{ m: 2 }} />
        )}
      </Grid>

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

const MonthValueField = ({ month, value, onChange }: any) => {
  const [state, setState] = useState(value);

  const handleChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const newValue = Number(event.target.value);
    setState(newValue);
    onChange(month, newValue);
  };

  return (
    <Grid item xs={8} sx={{ mb: 2 }}>
      <TextField
        label={month}
        fullWidth
        variant="outlined"
        value={state}
        type="number"
        onChange={handleChange}
      />
    </Grid>
  );
};

export default ChildAttributeUpdate;
