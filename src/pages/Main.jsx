import React from 'react'
import Typography from '@material-ui/core/Typography';
import { AuthContext } from "helpers/AuthContext"

export default function Main() {
    const { user } = React.useContext(AuthContext);

    return (
        <Typography>
            {"نام : " + user.name}
        </Typography>
    )
}
