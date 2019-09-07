import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import LinearProgress from '@material-ui/core/LinearProgress'
import { makeStyles } from '@material-ui/core/styles'
import { forwardRef } from 'react'
import MUIDataTable from "mui-datatables"
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import CountUp from 'react-countup'



const styles = {
  textField: {
    margin: 10,
  },
  button: {
    border: 0,
    borderRadius: 3,
    color: 'white',
    backgroundColor: '#2F323A',
    borderRadius: 30,
    height: 48,
    marginTop: 40,
    marginRight: 70,
    width: 120,
  },
  table: {
    width: '80%',
    minHeight: '80vh',
  },
  numbers: {
    bottom: 0,
    fontSize: 70,
  },
  numbersBig: {
    bottom: 0,
    fontSize: 100,
  },
  headerText: {
    bottom: 0,
    fontSize: 14,
    textAlign: 'center',
  }
}

const { button, textField, table, numbers, numbersBig, headerText } = styles

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      test: [{id: 1, groceryName: 'Test', weight: 2, category: 'test', expireDate: '2232323', }],
      out: 0,
      close: 0,
      groceryName: "",
      groceryWeight: 0,
      groceryCategory: "",
      groceryExpireDate: "",
      fridgeId: "",
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
            sortDirection: 'asc',
            filter: false,
            sort: true,
          }
         },
      ],
      tableOptions: {
        onRowsDelete: (rowsDeleted) => {
          for (let i = 0; i < rowsDeleted.data.length; i++) {
            this.props.removeGroceries(this.props.groceries[rowsDeleted.data[i].dataIndex].id)
          }
        },
        filterType: 'checkbox',
        pagination: false,
        print: false,
        download: false,
        customToolbar: () => {
          return (
            <Button color="primary" onClick={() => { this.handleForm() }}>
              ADD
            </Button>
          );
        }
      },
      open: false,
      categories: [
        {
          value: "Dairy",
        },
        {
          value: "Meat",
        },
        {
          value: "Vegetable",
        },
      ]
    }
  }

  async componentDidMount() {
    await this.props.getGroceries(1)
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
    const { groceryName, groceryWeight, groceryCategory, fridgeId, groceryExpireDate } = this.state
    console.log("ADDIN ITEM")
    await this.props.addGroceries(groceryName, groceryWeight, groceryCategory, fridgeId, groceryExpireDate)
    this.fetchGroceries()
    this.handleForm()
  }

  async deleteItem() {
    await this.props.removeGroceries(3)
    this.fetchGroceries()
  }

  async fetchGroceries() {
    await this.props.getGroceries(1)
    this.setState({
      data: this.props.groceries
    })
  }

  handleForm() {
    this.setState({
      open: !this.state.open
    })
    console.log(this.state.groceryName)
  }

  getMuiTheme = () => createMuiTheme({
    overrides: {
      MuiPaper: {
        root: {
          width: '80%',
        },
        rounded: {
          borderRadius: 25, 
        }
      },
      MUIDataTableToolbarSelect : {
        root: {
          width: '100%'
        }
      }
    }
  })

  addProgressBar() {
    for(let i = 0; i < this.props.groceries.length; i++) {
      const today = Date.now()
      const currentDate = new Date(this.props.groceries[i]['expireDate'])
      const diffTime = currentDate - today
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      if (diffDays < 0) {
        this.props.groceries[i]['status'] = 0
      } else {
        this.props.groceries[i]['status'] = diffDays
      }
    }
  }

  render() {
    const { } = this.state

    this.addProgressBar()

    console.log(this.props.groceries)

    return(
      <div className="container">
        <Grid style={{height: '10vh', width: '100%' , position: 'fixed', top: 0, left: 0, textAlign: 'right', zIndex: 100}}><Button variant="contained" color="primary" style={button} onClick={() => { this.logout() }}>
          Logout
        </Button></Grid>
        <Grid container
              direction="row"
              justify="center"
              alignItems="center"
              style={{minHeight: '100vh', position: 'fixed'}}
              >
          <Grid
                direction="row"
                alignItems="center"
                style={{minWidth: '20%', textAlign: 'center'}}
                >
            <CountUp style={numbers} end={this.state.close} duration={2}/>
            <p style={headerText}>Close</p>
          </Grid>
          <Grid
                direction="column"
                style={{minWidth: '20%', textAlign: 'center', height: 198}}
                >
            <CountUp style={numbersBig} end={this.props.groceries.length} duration={2}/>
            <p style={headerText}>Total groceries</p>
          </Grid>
          <Grid
                direction="column"
                style={{minWidth: '20%', textAlign: 'center'}}
                >
            <CountUp style={numbers} end={this.state.out} duration={2}/>
            <p style={headerText}>Out</p>
          </Grid>
        </Grid>
        <Grid container
              direction="column"
              justify="center"
              alignItems="center"
              style={{ minHeight: '100vh', top: '105vh', position: 'relative', background: 'linear-gradient(to top right, #DAE2F8, #D6A4A4)', boxShadow: "0px -4px 7px -3px rgba(0,0,0,0.46)"}}
              >
          <MuiThemeProvider theme={this.getMuiTheme()}>
          <MUIDataTable
            title={"Your Fridge"}
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
          onChange={e => this.setState({ groceryName: e.target.value })}
         />
        <TextField
          margin="dense"
          id="weight"
          label="Weight"
          type="number"
          fullWidth
          margin="normal"
          variant="outlined"
          value={this.state.groceryWeight}
          onChange={e => this.setState({ groceryWeight: e.target.value })}
        />
        <TextField
          select
          margin="dense"
          id="category"
          label="Category"
          type="text"
          fullWidth
          margin="normal"
          variant="outlined"
          value={this.state.groceryCategory}
          onChange={e => this.setState({ groceryCategory: e.target.value })}
          SelectProps={{
            MenuProps: {
              style: {
                width: 150,
                fontSize: '1.1em'
              },
            },
          }}
        >
        {this.state.categories.map(option => (
          <option key={option.value} value={option.value}>
            {option.value}
          </option>
        ))}
        </TextField>
        <TextField
          margin="dense"
          id="expireDate"
          label="Expire Date"
          type="date"
          fullWidth
          InputLabelProps={{ shrink: true }}
          margin="normal"
          variant="outlined"
          value={this.state.groceryExpireDate}
          onChange={e => this.setState({ groceryExpireDate: e.target.value })}
        />
        <TextField
          margin="dense"
          id="fridge"
          label="Fridge"
          type="text"
          fullWidth
          margin="normal"
          variant="outlined"
          value={this.state.fridgeId}
          onChange={e => this.setState({ fridgeId: e.target.value })}
         />
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={() => { this.handleForm() }}>
          Cancel
        </Button>
        <Button color="primary" onClick={() => { this.addItem() }}>
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
