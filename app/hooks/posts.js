import { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_ALL_POSTS = gql`
  query GetAllPosts {
    getAllPosts {
      id
      title
      puid,
      image,
      content,
      likesCount
      hasLiked,
      hasFollowedAuthor,
      likesCount
      createdAt
      author {
        id
        name
        image
      }
    }
  }
`;

const usePosts = () => {
  const [posts, setPosts] = useState([]);
  
  const { loading: postsLoading, error: postsError, data: postsData } = useQuery(GET_ALL_POSTS);

  useEffect(() => {
    if(!postsLoading && !postsError){
      setPosts(postsData.getAllPosts)
    }
  })

  return posts;
};

export default usePosts;
