import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function ComboBox({ label, array, visibility, setCategory, title }) {
    return (
        <Autocomplete sx={{ visibility: visibility }}
            disablePortal
            options={array}
            fullwidth='true'
            renderInput={(params) => <TextField id={label} title={title}
                name={label}{...params} label={label} onChange={(e) => setCategory(prev => e.target.value)} />}
        />
    );
}
