import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { login } from '../actions/login'
import LoginScreen from '../screens/login'


const mapStateToProps = state => ({
  logedIn: state.loginReducer.logedIn,
})

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ login }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen)
