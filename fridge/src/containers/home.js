import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { logout } from '../actions/login'
import HomeScreen from '../screens/home'


const mapStateToProps = state => ({
  logedIn: state.loginReducer.logedIn,
  data: state.loginReducer.data,
})

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ logout }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen)
