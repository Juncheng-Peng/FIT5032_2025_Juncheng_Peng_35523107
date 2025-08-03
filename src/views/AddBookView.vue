<template>
  <div>
    <h1>图书列表</h1>

    <button @click="fetchBooks">fresh name</button>
    <ul>
      <li v-for="book in books" :key="book.id">
        {{ book.name }} (ISBN: {{ book.isbn }})

        <button @click="updateBook(book.id, book.name)" style="margin-left: 10px;">update name</button>
        <button @click="deleteBook(book.id)">delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import db from '../firebase/init';
import { collection, getDocs, query, doc, deleteDoc, updateDoc } from 'firebase/firestore';

export default {
  setup() {
    const books = ref([]);


    const fetchBooks = async () => {
      try {
        const q = query(collection(db, 'books')); 
        const querySnapshot = await getDocs(q);
        const booksArray = [];
        querySnapshot.forEach((doc) => {
          booksArray.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        books.value = booksArray;
        console.log("get it");
      } catch (error) {
        console.error("error:", error);
      }
    };

    // 删除书籍
    const deleteBook = async (bookId) => {
      if (!confirm('Delete book?')) {
        return;
      }
      try {
        const bookRef = doc(db, 'books', bookId);
        await deleteDoc(bookRef);
        alert('Book deleted successfully!');
        fetchBooks(); // 删除后刷新列表
      } catch (error) {
        console.error("Error deleting book: ", error);
      }
    };

    // 更新书籍名称的函数
    const updateBook = async (bookId, currentName) => {
      const newName = prompt("Please enter the new name:", currentName);
      if (newName && newName !== currentName) {
        try {
          const bookRef = doc(db, 'books', bookId);
          await updateDoc(bookRef, {
            name: newName
          });
          alert('Book updated successfully!');
          fetchBooks(); 
        } catch (error) {
          console.error("Error updating book: ", error);
        }
      }
    };

    onMounted(() => {
      fetchBooks();
    });

    return {
      books,
      fetchBooks,
      deleteBook,
      updateBook,
    };
  }
};
</script>

<style scoped>
  li {
    list-style: none;
    padding: 10px;
    border-bottom: 1px solid #ccc;
  }
  button {
    margin: 0 5px;
  }
</style>