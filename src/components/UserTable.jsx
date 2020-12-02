import React from "react"
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { useForm, Controller } from "react-hook-form";
import users from "services/crud/users"

const useStyles = makeStyles((theme) => ({
    mlAuto: {
        marginLeft: "auto"
    },
    container: {
        maxHeight: 200
    }
}));

export default function UserTable(props) {
    const classes = useStyles();
    const { control } = useForm();
    const [select, setSelected] = React.useState("");
    const [userTable, setUserTable] = React.useState([]);

    React.useEffect(() => {
        users.read()
            .then(res => {
                setUserTable(res.data);
            })
            .catch(error => { console.log(error.message) })
    }, [])

    return (
        <React.Fragment>
            <Toolbar>
                <Typography variant="h6" color="initial">
                    کاربران
                            </Typography>
                <IconButton aria-label="add" className={classes.mlAuto}>
                    <AddIcon />
                </IconButton>
            </Toolbar>
            <TableContainer className={classes.container}>
                <Controller
                    render={(props) => (
                        <RadioGroup
                            name="users"
                            value={select}
                            onChange={(e) => props.onChange(setSelected(e.target.value))}
                        >
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell></TableCell>
                                        <TableCell align="left">شناسه</TableCell>
                                        <TableCell align="left">نام</TableCell>
                                        <TableCell align="left">نام کاربری</TableCell>
                                        <TableCell align="left"></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {userTable.map((row) => (
                                        <TableRow key={row.id} hover selected={select === row.id}>
                                            <TableCell component="th" scope="row">
                                                <Radio value={row.id} />
                                            </TableCell>
                                            <TableCell align="left">{row.id}</TableCell>
                                            <TableCell align="left">{row.name}</TableCell>
                                            <TableCell align="left">{row.userName}</TableCell>
                                            <TableCell align="right">
                                                <IconButton aria-label="delete" size="small" color="secondary">
                                                    <DeleteForeverIcon fontSize="small" />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </RadioGroup>
                    )}
                    name="users"
                    control={control}
                />
            </TableContainer>
        </React.Fragment>
    )
}
