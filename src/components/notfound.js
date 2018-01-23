import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = (props) => {
  return (
    <div>
      <video
        autoPlay
        loop
        src='https://media.giphy.com/media/hEc4k5pN17GZq/giphy.mp4' />
      <h4>something went wrong…</h4>
      <Link to='/'>Go to Home</Link>
    </div>
  )
}

export default NotFound;