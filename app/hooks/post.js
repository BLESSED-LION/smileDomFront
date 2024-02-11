import { useState, useEffect } from 'react';
import { doc, updateDoc, getDoc, getDocs, arrayUnion, arrayRemove, collection, addDoc } from "firebase/firestore";
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
  
  const getComments = async () => {
    try {
      const commentsRef = collection(db, 'posts', docId, 'comments');
      const commentsSnapshot = await getDocs(commentsRef);
      const comments = commentsSnapshot.docs.map(comment => {
        return {
          id: comment.id,
          ...comment.data(),
        }
      });
      return comments;
    } catch (error) {
        console.error("Error fetching comments:", error);
        throw error;
    }
}

  

  const addComment = async(comment, userId, name) => {
    let commentsRef = collection(db, 'posts', docId, 'comments');
    const newComment = {
      body: comment,
      userId: userId,
      name: name,
      createdAt: new Date(),
    }

    await addDoc(commentsRef, newComment);
  }

  return { post, loading, likePost, unLikePost, hasLikedPost, getComments, addComment};
};

export default usePost;
