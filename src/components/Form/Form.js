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
import Avatar from '@material-ui/core/Avatar';
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
  constructor(props) {
    super(props);
  }

  render() {
    const { handleChange , handleFile , data , handleSubmit } = this.props;
    const phoneValidation = new RegExp('09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}');
    const emailValidation = new RegExp('[^@]+@[^.]+..+');
    const birthDayValidation = new RegExp('^[0-9]{4}([- /.])(((0[13578]|(10|12))\\1(0[1-9]|[1-2][0-9]|3[0-1]))|(02\\1(0[1-9]|[1-2][0-9]))|((0[469]|11)\\1(0[1-9]|[1-2][0-9]|30)))$');
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
      <div className={this.props.classes.paper}>
        <Paper className={this.props.classes.paperPadding}>
          <Grid className={this.props.classes.buttonRow}>
            <label htmlFor="file-button">
              <Button variant="contained" color="secondary" component="span">
                change picture
              </Button>
            </label>
            <input accept="image/*" className={this.props.classes.input} id="file-button" type="file" onChange={handleFile} />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              className={this.props.classes.buttons}
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
                error = {data.firstName === undefined}
                onChange={handleChange}
                value={data.firstName}
                helperText={data.firstName === undefined ? "required" : ""}
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
                error = {data.lastName === undefined}
                onChange={handleChange}
                value={data.lastName}
                helperText={data.lastName === undefined ? "required" : ""}
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
                error = {(!phoneValidation.test(data.phone) && data.phone) || data.phone === undefined}
                onChange={handleChange}
                value={data.phone}
                helperText={!phoneValidation.test(data.phone) && data.phone ? "not valid" : ""}
                
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
                error = {(!emailValidation.test(data.email) && data.email) || data.email === undefined}
                onChange={handleChange}
                value={data.email}
                helperText={!emailValidation.test(data.email) && data.email ? "not valid" : ""}
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
                error = {(!birthDayValidation.test(data.birthDate) && data.birthDate) || data.birthDate === undefined}
                onChange={handleChange}
                value={data.birthDate}
                helperText={!birthDayValidation.test(data.birthDate) && data.birthDate ? "not valid" : ""}
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
            <Grid item xs={12} sm={6} className={this.props.classes.radioRow}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup aria-label="gender" name="gender" className={this.props.classes.radioHolder} onChange={handleChange}>
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

