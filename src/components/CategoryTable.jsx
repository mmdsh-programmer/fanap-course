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
import TableRow from '@material-ui/core/TableRow';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { useForm, Controller } from "react-hook-form";
import category from "services/crud/categories"

const useStyles = makeStyles((theme) => ({
    mlAuto: {
        marginLeft: "auto"
    },
    container: {
        maxHeight: 310
    }
}));

export default function CategoryTable(props) {
    const classes = useStyles();
    const { control } = useForm();
    const [select, setSelected] = React.useState("");
    const [categoryTable, setCategoryTable] = React.useState([]);

    React.useEffect(() => {
        category.read()
            .then(res => {
                setCategoryTable(res.data);
            })
            .catch(error => { console.log(error.message) })
    }, [])

    return (
        <React.Fragment>
            <Toolbar>
                <Typography variant="h6" color="initial">
                    دسته بندی ها
                </Typography>
                <IconButton aria-label="add" className={classes.mlAuto}>
                    <AddIcon />
                </IconButton>
            </Toolbar>
            <TableContainer className={classes.container}>
                <Controller
                    render={(props) => (
                        <RadioGroup
                            name="categories"
                            value={select}
                            onChange={(e) => props.onChange(setSelected(e.target.value))}
                        >
                            <Table size="small">
                                <TableBody>
                                    {categoryTable.map((row) => (
                                        <TableRow key={row.id} hover selected={select === row.id}>
                                            <TableCell scope="row">
                                                <Radio value={row.id} />
                                            </TableCell>
                                            <TableCell align="left">{row.name}</TableCell>
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
