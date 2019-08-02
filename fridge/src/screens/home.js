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
      groceryName: null,
      groceryWeight: null,
      groceryCategory: null,
      groceryExpireDate: null,
      fridgeId: null,
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
      tableOptions: {
        filterType: 'checkbox',
        pagination: false
      },
      open: false,
    }
  }

  componentDidMount() {
    this.setState({
      data: this.props.groceries
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
    console.log("ADDIN ITEM")
    await this.props.addGroceries("Test", 23, "TestCat", 1, "2020-20-12")
    this.props.getGroceries(1)
  }

  async deleteItem() {
    await this.props.removeGroceries(2)
    this.props.getGroceries(1)
  }

  openForm() {
    this.setState({
      open: true
    })
  }

  handleTextFieldChange(fieldName) {

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
    const { } = this.state;

    return(
      <div className="container">
        <Grid container
              direction="column"
              justify="center"
              alignItems="center"
              style={{ minHeight: '100vh' }}
              >
          <p>asdasdas</p>
          <Button variant="contained" color="primary" style={button} onClick={() => { this.openForm() }}>
            Add
          </Button>
          <Button variant="contained" color="primary" style={button} onClick={() => { this.deleteItem() }}>
            Delete
          </Button>
          <Button variant="contained" color="primary" style={button} onClick={() => { this.logout() }}>
            Logout
          </Button>
          <MuiThemeProvider theme={this.getMuiTheme()}>
          <MUIDataTable
            title={"Employee List"}
            data={this.props.groceries}
            columns={this.state.columns}
            options={this.state.tableOptions}
          />
          </MuiThemeProvider>
          <Dialog open={this.state.open} aria-labelledby="form-dialog-title">
       <DialogTitle id="form-dialog-title">Add product</DialogTitle>
       <DialogContent>
         <DialogContentText>
           Enter the product information down below.
         </DialogContentText>
         <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          type="text"
          fullWidth
          margin="normal"
          variant="outlined"
          value={this.state.groceryName}
          onChange={this.handleTextFieldChange("name")}
          onKeyPress={(ev) => {
            console.log(`Pressed keyCode ${ev.key}`);
            if (ev.key === 'Enter') {
              console.log("HIT ENTER!")
              ev.preventDefault();
            }
          }}
         />
        <TextField
          margin="dense"
          id="weight"
          label="Weight"
          type="number"
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          margin="dense"
          id="category"
          label="Category"
          type="text"
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          margin="dense"
          id="expireDate"
          label="Expire Date"
          type="date"
          fullWidth
          InputLabelProps={{ shrink: true }}
          margin="normal"
          variant="outlined"
        />
        <TextField
          margin="dense"
          id="fridge"
          label="Fridge"
          type="text"
          fullWidth
          margin="normal"
          variant="outlined"
         />
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={() => { this.setState({ open: !this.state.open }) }}>
          Cancel
        </Button>
        <Button color="primary" onClick={() => { this.setState({ open: !this.state.open }) }}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
        </Grid>
      </div>
    )
  }
}

export default Home
