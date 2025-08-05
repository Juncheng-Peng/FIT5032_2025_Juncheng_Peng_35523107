<template>
  <div>
    <h1>all book:</h1>
    <p>json format:</p>

    
    <!-- <pre>tage can save the space and line break in the text -->
    <pre class="json-output">{{ booksJSON }}</pre>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import db from '../firebase/init'; 
import { collection, getDocs, query } from 'firebase/firestore';


const books = ref([]);


const booksJSON = computed(() => {
  return JSON.stringify(books.value, null, 2);
});


const fetchAllBooks = async () => {
  try {
    const booksCollection = collection(db, 'books');
    const q = query(booksCollection);
    const querySnapshot = await getDocs(q);
    
 
    const booksArray = [];
    querySnapshot.forEach((doc) => {
      booksArray.push({
        id: doc.id, 
        ...doc.data(), 
      });
    });
    

    books.value = booksArray;
    console.log("has all ready!");

  } catch (error) {
    console.error("error for get books : ", error);
    books.value = [{ error: "can't load books data", message: error.message }];
  }
};


onMounted(() => {
  fetchAllBooks();
});
</script>

<style scoped>
.json-output {
  background-color: #2e3440; 
  color: #d8dee9;
  border: 1px solid #4c566a;
  padding: 20px;
  border-radius: 8px;
  white-space: pre-wrap;      
  word-wrap: break-word;
  font-family: 'Courier New', Courier, monospace;
  text-align: left; 
}

h1, p {
  text-align: left;
}
</style>