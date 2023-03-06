import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

interface IChildDetailsProps {
  firstName: string;
  lastName: string;
  age: number;
}

function ChildDetails({ firstName, lastName, age }: IChildDetailsProps) {
  const details = [
    { key: 'First Name', value: firstName },
    { key: 'Last Name', value: lastName },
    { key: 'Age', value: age },
  ];

  return (
    <List>
      {details.map((detail, index) => (
        <ListItem key={index}>
          <ListItemText primary={detail.key} secondary={detail.value} />
        </ListItem>
      ))}
    </List>
  );
}

export default ChildDetails;
