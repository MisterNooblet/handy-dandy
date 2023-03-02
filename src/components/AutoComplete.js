import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function ComboBox({ label, array }) {
    return (
        <Autocomplete
            disablePortal

            options={array}
            fullWidth
            renderInput={(params) => <TextField id={label}
                name={label}{...params} label={label} />}
        />
    );
}
