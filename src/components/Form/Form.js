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
import Paper from '@material-ui/core/Paper';
import withForm from '../../withForm'


const styles = theme => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin : theme.spacing(2)
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
  },
  paperPadding : {
    padding : theme.spacing(2)
  },
  input : {
    display : 'none'
  }
})

class Form extends React.Component {
  render() {
    const { 
      handleChange , 
      handleFile , 
      data , 
      handleSubmit , 
      classes 
    } = this.props;
    const titles = [
      {
        value: 'Writer',
        label: 'Writer',
      },
      {
        value: 'Publisher',
        label: 'Publisher',
      },
      {
        value: 'Editor',
        label: 'Editor',
      },
    ]
    return (
      <div className={classes.paper}>
        <Paper className={classes.paperPadding}>
          <Grid className={classes.buttonRow}>
            <label htmlFor="file-button">
              <Button variant="contained" color="secondary" component="span">
                change picture
              </Button>
            </label>
            <input accept="image/*" className={classes.input} id="file-button" type="file" onChange={handleFile} />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={!data.submitActivation}
              onClick={handleSubmit}
              className={classes.buttons}
            >
              Submit
            </Button>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                label="First Name"
                name="firstName"
                type="text"
                error = {data.errors.firstName}
                onChange={handleChange}
                value={data.firstName}
                helperText={data.errors.firstName ? "required" : ""}
                fullWidth
                autoFocus
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                name="lastName"
                label="Last Name"
                type="text"
                error = {data.errors.lastName}
                onChange={handleChange}
                value={data.lastName}
                helperText={data.errors.lastName ? "required" : ""}
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
                error = {data.errors.phone}
                onChange={handleChange}
                value={data.phone}
                helperText={data.errors.phone ? "invalid" : ""}
                
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
                error = {data.errors.email}
                onChange={handleChange}
                value={data.email}
                helperText={data.errors.email ? "invalid" : ""}
                id="email"
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                name="birthDate"
                label="Birth Date"
                type="text"
                error = {data.errors.birthDate}
                onChange={handleChange}
                value={data.birthDate}
                helperText={data.errors.birthDate ? "invalid" : ""}
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="outlined-select-title"
                select
                name="title"
                label="Title"
                variant="outlined"
                size="small"
                onChange={handleChange}
                fullWidth
              >
                {titles.map((option) => (
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
                  control={<Switch checked={data.isEmailVisible} name="isEmailVisible" onChange={handleChange} />}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} className={classes.radioRow}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup aria-label="gender" name="gender" className={classes.radioHolder} onChange={handleChange}>
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
                onChange={handleChange}
                value={data.address}
                id="address"
                fullWidth
                size="small"
              />
            </Grid>
          </Grid>
        </Paper>
      </div>
    )
  }
}

export default withForm(withStyles(styles)(Form))

