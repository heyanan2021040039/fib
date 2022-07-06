import { useState } from 'react'
import { useEffect } from 'react';
import style from './index.css';
function App() {
  const [posts, setPosts] = useState([])
  const basicURL = "https://hacker-news.firebaseio.com/v0/";
  useEffect(() => {
    fetch(`${basicURL}topstories.json?print=pretty`).then(res => res.json()).then(json => {
      const list = json.slice(0, 10)
      const posts = Promise.all(list.map(id => fetch(`${basicURL}item/${id}.json?print=pretty`).then(res => res.json())))
      return posts
    }).then(posts => setPosts(posts))
  }, [])
  return (
    <div >
      <ul>
        {posts.map((post, index) =>
          <li className="news-item" key={index}>
            <span className='score'>{post.score}</span>
            <span >
              <a href={post.url}>{post.title}</a>
            </span>
            <br/>
            <span>   </span>
            <span>  by {post.by}</span>
            <span className='time'> 
            |{Math.floor( new Date().getTime()/1000)-post.time} seconds ago |</span>
            < a href='#' > {`${Object.getOwnPropertyNames(post).length} comments`} </ a>
          </li>)}
      </ul>
    </div>

  )
}

export default App