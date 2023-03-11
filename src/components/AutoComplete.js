import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function ComboBox({ label, array, visibility, setCategory, title, categories }) {



    React.useEffect(() => {
        if (categories) {


        }
    }, [categories])

    return (
        <Autocomplete sx={{ visibility: visibility, m: setCategory ? '20px 0' : '0' }}
            onChange={(e) => setCategory && setCategory(prev => prev = e.target.innerHTML)}
            clearOnBlur='true'
            disablePortal
            options={array}
            defaultValue=''
            fullwidth='true'
            renderInput={(params) => <TextField id={label} title={title}
                name={label}{...params} label={label} />}
        />
    );
}
