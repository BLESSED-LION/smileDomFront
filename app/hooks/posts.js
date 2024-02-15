import { useState, useEffect } from 'react';
import { collection, doc, getDocs, query } from "firebase/firestore";
import { db } from '../config/firebaseConfig';

const usePosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const postsRef = collection(db, 'posts');
      const postSnapshot = await getDocs(postsRef);

      const docs = await Promise.all(postSnapshot.docs.map(async postDoc => {
        const postData = postDoc.data();
        postData.id = postDoc.id;
        postData.createdAt = postData.publishDate.toDate().toDateString();

        // Fetch comments count for each post
        const commentsRef = collection(db, 'posts', postData.id, 'comments');
        const commentsSnapshot = await getDocs(commentsRef);
        postData.commentsCount = commentsSnapshot.size;

        // count likes array
        postData.likesCount = postData.likes.length;

        return postData;
      }));

      setPosts(docs);
    }

    fetchPosts();
  }, []);

  return posts;
};

export default usePosts;
