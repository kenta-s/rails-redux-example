import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchPostsIfNeeded } from '../actions'
import Posts from '../components/Posts'
import AddPost from './AddPost'

class App extends Component {
  constructor(props) {
    super(props)
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchPostsIfNeeded())
  }

  // componentWillReceiveProps(nextProps) {
  //   if(!nextProps.isFetching && this.props.isFetching){
  //     const { dispatch } = nextProps
  //     dispatch(fetchPostsIfNeeded())
  //   }
  // }


  handleRefreshClick(e) {
    e.preventDefault()

    const { dispatch } = this.props
    dispatch(fetchPostsIfNeeded())
  }

  render() {
    const { posts, isFetching } = this.props
    const isEmpty = posts.length === 0
    return (
      <div>
        <AddPost />
        <p>
          {!isFetching &&
            <a href="#"
               onClick={this.handleRefreshClick}>
              Refresh
            </a>
          }
        </p>
        {isEmpty
          ? (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
          : <div style={{ opacity: isFetching ? 0.5 : 1 }}>
              <Posts posts={posts} />
            </div>
        }
      </div>
    )
  }
}

App.propTypes = {
  posts: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const {
    isFetching,
    items: posts
  } = state.posts || {
    isFetching: true,
    items: []
  }

  return {
    posts,
    isFetching
  }
}

export default connect(mapStateToProps)(App)
