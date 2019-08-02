import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { logout } from '../actions/login'
import { getGroceries, addGroceries, removeGroceries } from '../actions/groceries'
import HomeScreen from '../screens/home'


const mapStateToProps = state => ({
  logedIn: state.loginReducer.logedIn,
  data: state.loginReducer.data,
  groceries: state.groceriesReducer.groceries,
})

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ logout, getGroceries, addGroceries, removeGroceries }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen)
