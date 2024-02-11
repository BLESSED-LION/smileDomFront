import { useState, useEffect } from 'react';
import { doc, updateDoc, getDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from '../config/firebaseConfig';

const usePost = (docId) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      const postRef = doc(db, 'posts', docId);
      const postSnapshot = await getDoc(postRef);

      if (postSnapshot.exists()) {
        const postData = postSnapshot.data();
        postData.docid = docId;
        postData.likesCount = postData.likes.length;
        setPost(postData);
      }
      setLoading(false);
    }

    fetchPost();
  }, [docId]);

  const likePost = async (userId) => {
    const postRef = doc(db, 'posts', docId);
    await updateDoc(postRef, {
      likes: arrayUnion(userId),
    });
  };

  const unLikePost = async (userId) => {
    const postRef = doc(db, 'posts', docId);
    await updateDoc(postRef, {
      likes: arrayRemove(userId), 
    });
  };

  const hasLikedPost = (userId) => {
    return post && post.likes.includes(userId);
  }

  return { post, loading, likePost, unLikePost, hasLikedPost };
};

export default usePost;
