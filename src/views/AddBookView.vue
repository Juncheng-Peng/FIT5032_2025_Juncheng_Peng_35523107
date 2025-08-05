<template>
    <div>
        <h1>Add Book</h1>
        <form @submit.prevent="addBook">
            <div>
                <label for="isbn">ISBN:</label>
                <input type="text" v-model="isbn" id="isbn" required />
            </div>
            <div>
                <label for="name">Name:</label>
                <input type="text" v-model="name" id="name" required />
            </div>
            <div>
                <label for="author">Author:</label>
                <input type="text" v-model="author" id="author" required />
            </div>
            <button type="submit">Add Book</button>
        </form>
    </div>
    <MyBookList />
</template>

<script>
import {ref} from 'vue';
import db from '../firebase/init';
import {collection, addDoc} from 'firebase/firestore';
import MyBookList from '../views/MyBookList.vue';
export default {
    setup() {
        const isbn = ref('');
        const name = ref('');
        const author = ref('');
        const addBook = async () => {
            try {
                const isbnNumber = Number(isbn.value);
                if(isNaN(isbnNumber)) {
                    alert('ISBN must be a number');
                    return;
                }
                await addDoc(collection(db, 'books'), {
                    isbn: isbnNumber,
                    name: name.value,
                    author: author.value
                });
                isbn.value = '';
                name.value = '';
                author.value = '';
                alert('Book added successfully');
            }catch(error) {
                console.error('Error adding book: ', error);
            }
};

return { 
    isbn,
    name,
    addBook,
    author
};},
components: {
    MyBookList
}
};
</script>