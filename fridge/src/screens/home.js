import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import MUIDataTable from "mui-datatables"
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import CountUp from 'react-countup'
import styled, { keyframes } from 'styled-components'
import { fadeIn } from 'react-animations'
import { Chart } from 'react-charts'



const styles = {
  textField: {
    margin: 10,
  },
  button: {
    border: 0,
    color: '#fff',
    backgroundColor: '#283048',
    borderRadius: 30,
    height: 48,
    marginTop: 35,
    marginRight: 35,
    width: 120,
  },
  table: {
    width: '80%',
    minHeight: '80vh',
  },
  numbers: {
    bottom: 0,
    fontSize: 70,
    color: '#283048'
  },
  numbersBig: {
    bottom: 0,
    fontSize: 100,
    color: '#283048'
  },
  headerText: {
    bottom: 0,
    fontSize: 14,
    textAlign: 'center',
  }
}

function MyChart({groceries}) {
  const data = React.useMemo(
    () => [
      {
        label: 'Series 1',
        data: [{ x: new Date(groceries[0]['expireDate']), y: 10 }, { x: new Date(groceries[1]['expireDate']), y: 15 }, { x: new Date(groceries[2]['expireDate']), y: 10 }]
      },
    ],
    []
  )

  const axes = React.useMemo(
    () => [
      { primary: true, type: 'time', position: 'bottom' },
      { type: 'linear', position: 'left' }
    ],
    []
  )

  return (
    <div
      style={{
        width: '80%',
        height: '300px',
        margin: '10%'
      }}
    >
      <Chart data={data} axes={axes} />
    </div>
  )
}

const { button, numbers, numbersBig, headerText } = styles

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      groceryName: "",
      groceryWeight: 0,
      groceryCategory: "",
      groceryExpireDate: "",
      fridgeId: "",
      expired: 0,
      close: 0,
      totalGroceries: 0,
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
          name: "days_left",
          label: "Days left",
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
            this.deleteItem(this.props.groceries[rowsDeleted.data[i].dataIndex].id, this.props.groceries[rowsDeleted.data[i].dataIndex].expireDate)
          }
        },
        filterType: 'checkbox',
        pagination: false,
        print: false,
        download: false,
        customToolbar: () => {
          return (
            <Button style={{color: "#3C91E6"}} onClick={ () => { this.handleForm() }}>
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
      data: this.props.groceries,
      totalGroceries: this.props.groceries.length
    })
    if (!this.props.logedIn) {
      this.props.history.push('/')
    }
    for(let i = 0; i < this.props.groceries.length; i++) {
      const today = Date.now()
      const currentDate = new Date(this.props.groceries[i]['expireDate'])
      const diffTime = currentDate - today
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      if (diffDays <= 0) {
        this.setState({expired : this.state.expired + 1})
      }
      if (diffDays < 3 && diffDays > 0) {
        this.setState({close : this.state.close + 1})
      }
    }
  }

  async logout() {
    await this.props.logout()
    this.props.history.push('/')
  }

  async addItem() {
    const { groceryName, groceryWeight, groceryCategory, groceryExpireDate } = this.state
    await this.props.addGroceries(groceryName, groceryWeight, groceryCategory, 1, groceryExpireDate)
    this.fetchGroceriesAdd()
    this.handleForm()
  }

  async deleteItem(id, expireDate) {
    await this.props.removeGroceries(id)
    this.fetchGroceriesDelete(expireDate)
  }

  async fetchGroceriesAdd() {
    await this.props.getGroceries(1)

    var { groceryName, groceryWeight, groceryCategory, groceryExpireDate } = this.state
    var today = Date.now()
    var currentDate = new Date(groceryExpireDate)
    var diffTime = currentDate - today
    var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    this.setState({
      data: this.props.groceries,
      totalGroceries: this.props.groceries.length + 1
    })
    if (diffDays < 0) {
      this.setState({expired : this.state.expired + 1})
    }
    if (diffDays < 3 && diffDays > 0) {
      this.setState({close : this.state.close + 1})
    }
  }

  async fetchGroceriesDelete(expireDate) {
    await this.props.getGroceries(1)

    var { groceryName, groceryWeight, groceryCategory, groceryExpireDate } = this.state
    var today = Date.now()
    var currentDate = new Date(expireDate)
    var diffTime = currentDate - today
    var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    this.setState({
      data: this.props.groceries,
      totalGroceries: this.props.groceries.length - 1
    })
    if (diffDays <= 0) {
      this.setState({expired : this.state.expired - 1})
    }
    if (diffDays < 3 && diffDays > 0) {
      this.setState({close : this.state.close - 1})
    }
  }

  handleForm() {
    this.setState({
      open: !this.state.open
    })
  }

  getMuiTheme = () => createMuiTheme({
    overrides: {
      MuiTableRow: {
        root: {
          height: 70,
        }
      },
      MuiTableCell: {
        root: {
          borderBottom: 0
        }
      },
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
        this.props.groceries[i]['days_left'] = 0
      } else {
        this.props.groceries[i]['days_left'] = diffDays
      }
    }
  }

  render() {
    const keyFadeIn = keyframes`${fadeIn}`

    const FadeInDiv = styled.div`
      animation: 1s ${keyFadeIn}
    `
    this.addProgressBar()

    return(
      <div className="container">
        <Grid style={{height: '10vh', width: '100%' , position: 'fixed', top: 0, left: 0, textAlign: 'right', zIndex: 100}}>
          <Button variant="contained" color="primary" style={button} onClick={() => { this.logout() }}>
            Logout
          </Button>
        </Grid>
        <FadeInDiv>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            style={{minHeight: '100vh', position: 'fixed'}}
            >
            <Grid
              style={{minWidth: '100%', justifyContent: 'center', alignItems: 'center'}}
              >
              <MyChart groceries={this.props.groceries}/>
            </Grid>
            <Grid
              style={{minWidth: '20%', textAlign: 'center'}}
              >
              <CountUp style={numbers} end={this.state.close} duration={2}/>
              <p style={headerText}>Close to Expire</p>
            </Grid>
            <Grid
              style={{minWidth: '20%', textAlign: 'center', height: 198}}
              >
              <CountUp style={numbersBig} end={this.state.totalGroceries} duration={2}/>
              <p style={headerText}>Total groceries</p>
            </Grid>
            <Grid
              style={{minWidth: '20%', textAlign: 'center'}}
              >
              <CountUp style={numbers} end={this.state.expired} duration={2}/>
              <p style={headerText}>Expired</p>
            </Grid>
          </Grid>
        </FadeInDiv>
        <Grid container
              direction="column"
              justify="center"
              alignItems="center"
              style={{ minHeight: '100vh', top: '105vh', position: 'relative', background: 'linear-gradient(to bottom left, #859398, #98858A)', boxShadow: "0px -4px 7px -3px rgba(0,0,0,0.46)"}}
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
