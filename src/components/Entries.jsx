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
import entries from "services/crud/entries"
import moment from "moment-jalaali";

const useStyles = makeStyles((theme) => ({
    mlAuto: {
        marginLeft: "auto"
    },
    container: {
        maxHeight: 310,
        width: "100%"
    }
}));

export default function Entries(props) {
    const classes = useStyles();
    const [allEntries, setAllEntries] = React.useState([]);

    React.useEffect(() => {
        entries.read()
            .then(res => {
                setAllEntries(res.data);
            })
            .catch(error => { console.log(error.message) })
    }, [])

    return (
        <React.Fragment>
            <Toolbar>
                <Typography variant="h6" color="initial">
                    هزینه ها
                </Typography>
                <IconButton aria-label="add" className={classes.mlAuto}>
                    <AddIcon />
                </IconButton>
            </Toolbar>
            <TableContainer className={classes.container}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">شناسه</TableCell>
                            <TableCell align="left">عنوان</TableCell>
                            <TableCell align="left">تاریخ</TableCell>
                            <TableCell align="left">مقدار</TableCell>
                            <TableCell align="left">دسته</TableCell>
                            <TableCell align="left"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {allEntries.map((row) => (
                            <TableRow key={row.id} hover>
                                <TableCell component="th" scope="row">
                                    {row.id}
                                </TableCell>
                                <TableCell align="left">{row.title}</TableCell>
                                <TableCell align="left">{moment(row.date).format("jYYYY/jMM/jDD")}</TableCell>
                                <TableCell align="left">{row.amount}</TableCell>
                                <TableCell align="left">{row.category.name}</TableCell>
                                <TableCell align="right">
                                    <IconButton aria-label="delete" size="small" color="secondary">
                                        <DeleteForeverIcon fontSize="small" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </React.Fragment>
    )
}
