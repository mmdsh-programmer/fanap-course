import React from 'react';
import './Form.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

const styles = theme => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin : theme.spacing(3)
  },
  form: {
  },
  buttonRow: {
    width : '100%',
    display : 'flex',
    justifyContent : 'space-between',
    marginBottom : theme.spacing(2)
  },
  buttons : {
    width : 'auto'
  },
  radioRow : {
    width : '100%'
  },
  radioHolder : {
    display : 'block'
  }
})

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      titles : [
        {
          value: 'Writer',
          label: 'writer',
        },
        {
          value: 'Publisher',
          label: 'publisher',
        },
        {
          value: 'Editor',
          label: 'editor',
        },
      ]
    }
  }

  render() {
    return (
      <div className={this.props.classes.paper}>
        <Grid className={this.props.classes.buttonRow}>
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="secondary"
            className={this.props.classes.buttons}
          >
            CHANGE PICTURE
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={this.props.classes.buttons}
          >
            Submit
          </Button>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              id="fname"
              label="First Name"
              name="fname"
              type="text"
              autoComplete=""
              fullWidth
              autoFocus
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              name="lname"
              label="Last Name"
              type="text"
              id="lname"
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              name="phone"
              label="Phone"
              type="tel"
              id="phone"
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              name="email"
              label="Email"
              type="email"
              id="email"
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              name="birthday"
              label="Birth Date"
              type="text"
              id="birth"
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="outlined-select-title"
              select
              label="Title"
              variant="outlined"
              size="small"
              fullWidth
            >
              {this.state.titles.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Display Email</FormLabel>
              <FormControlLabel
                control={<Switch checked={true} name="showEmail" />}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} className={this.props.classes.radioRow}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup aria-label="gender" name="gender1" className={this.props.classes.radioHolder}>
                <FormControlLabel value="female" control={<Radio style={{display:'inline'}} />} label="Female" />
                <FormControlLabel value="male" control={<Radio style={{display:'inline'}} />} label="Male" />
                <FormControlLabel value="other" control={<Radio style={{display:'inline'}} />} label="Other" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              name="address"
              label="Address"
              type="text"
              id="address"
              fullWidth
              size="small"
            />
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(Form)

