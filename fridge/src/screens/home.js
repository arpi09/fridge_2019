import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import LinearProgress from '@material-ui/core/LinearProgress'
import { makeStyles } from '@material-ui/core/styles'
import { forwardRef } from 'react'
import MUIDataTable from "mui-datatables"
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';



const styles = {
  textField: {
    margin: 10,
  },
  button: {
    border: 0,
    borderRadius: 3,
    color: 'white',
    height: 48,
    margin: 10,
  },
  table: {
    width: '80%',
    minHeight: '80vh',
  },
}

const { button, textField, table } = styles

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoading: false,
      items: [],
      email: null,
      password: null,
      columns: [
        {
          name: "groceryName",
          label: "Name",
          options: {
            filter: false,
            sort: true,
          }
         },
         {
          name: "category",
          label: "Category",
          options: {
            filter: true,
            sort: false,
          }
         },
         {
          name: "expireDate",
          label: "Expire Date",
          options: {
            filter: false,
            sort: false,
          }
         },
         {
          name: "status",
          label: "Status",
          options: {
            filter: false,
            sort: false,
          }
         },
      ],
      data: [],
      tableOptions: {
        filterType: 'checkbox',
        pagination: false
      },
      value: '',
      open: false,
    }
  }

  componentDidMount() {
    console.log(this.props.logedIn)
    console.log(this.props.data)
    this.setState({
      data: this.props.data
    })
    if (!this.props.logedIn) {
      this.props.history.push('/')
    }
  }

  async logout() {
    await this.props.logout()
    this.props.history.push('/')
    console.log(this.props.logedIn)
  }

  async addItem() {
    fetch('/api/groceries/Water/100/Water/2021-02-02/1', {
      method: 'post'
    })
      .then(res => res.json())
      .then(result => {
        console.log(result)
        this.setState({
          open: true,
          value: {groceryName: "ashdoaisdhs"}
        })
      },
        (error) => {
          console.log("ERROR!")
        })
    this.setState({
      value: {groceryName: "ashdoaisdhs"}
    })
    this.setState(state => {
      const data = [...state.data, state.value];

      return {
        data,
        value: '',
      };
    });
  }

  getMuiTheme = () => createMuiTheme({
    overrides: {
      MuiPaper: {
        root: {
          width: '80%'
        }
      },
      MUIDataTableToolbarSelect : {
        root: {
          width: '100%'
        }
      }
    }
  })

  render() {
    const { error, isLoaded, items } = this.state;

    return(
      <div className="container">
        <Grid container
              direction="column"
              justify="center"
              alignItems="center"
              style={{ minHeight: '100vh' }}
              >
          <p>asdasdas</p>
          <Button variant="contained" color="primary" style={button} onClick={() => { this.logout() }}>
            Logout
          </Button>
          <MuiThemeProvider theme={this.getMuiTheme()}>
          <MUIDataTable
            title={"Employee List"}
            data={this.state.data}
            columns={this.state.columns}
            options={this.state.tableOptions}
          />
          </MuiThemeProvider>
          <Button variant="contained" color="primary" style={button} onClick={() => { this.addItem() }}>
            Add
          </Button>
          <Dialog open={this.state.open} aria-labelledby="form-dialog-title">
       <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
       <DialogContent>
         <DialogContentText>
           To subscribe to this website, please enter your email address here. We will send updates
           occasionally.
         </DialogContentText>
         <TextField
           autoFocus
           margin="dense"
           id="name"
           label="Email Address"
           type="email"
           fullWidth
         />
       </DialogContent>
       <DialogActions>
         <Button color="primary">
           Cancel
         </Button>
         <Button color="primary">
           Subscribe
         </Button>
       </DialogActions>
     </Dialog>
        </Grid>
      </div>
    )
  }
}

export default Home
