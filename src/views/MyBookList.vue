<template>
    <h1>Library List</h1>
    <h2>total book number: {{ books.length }}</h2>

    <button @click="fetchBooks">Refresh List</button>
    <ul>
      <li v-for="book in books" :key="book.id">
        {{ book.name }} by {{ book.author }} (ISBN: {{ book.isbn }})

        <button @click="updateBook(book.id, book.name)" style="margin-left: 10px;">Update Name</button>
        <button @click="deleteBook(book.id)">Delete</button>
      </li>
    </ul>
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
        console.log("Books data has been successfully fetched!");
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    // function to delete book
    const deleteBook = async (bookId) => {
      if (!confirm('Are you sure you want to delete this book?')) {
        return;
      }
      try {
        const bookRef = doc(db, 'books', bookId);
        await deleteDoc(bookRef);
        alert('Book deleted successfully!');
        fetchBooks(); // Refresh the list and count after deletion
      } catch (error) {
        console.error("Error deleting book: ", error);
      }
    };

    // function to update book name
    const updateBook = async (bookId, currentName) => {
      const newName = prompt("Please enter a new name:", currentName);
      if (newName && newName !== currentName) {
        try {
          const bookRef = doc(db, 'books', bookId);
          await updateDoc(bookRef, {
            name: newName
          });
          alert('book updated successfully!');
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