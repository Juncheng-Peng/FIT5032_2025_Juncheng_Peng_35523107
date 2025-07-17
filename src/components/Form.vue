<template>
<!-- PrimeVue 样式 CDN -->
    <link 
      rel="stylesheet" 
      href="https://cdn.jsdelivr.net/npm/primevue@4.3.6/resources/themes/lara-light-blue/theme.css" />
    <link 
      rel="stylesheet" 
      href="https://cdn.jsdelivr.net/npm/primevue@4.3.6/resources/primevue.min.css" />
    <link 
      rel="stylesheet" 
      href="https://cdn.jsdelivr.net/npm/primeicons@7.0.0/primeicons.css" />
    

  <div class="container mt-5"> 
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <h1 class="text-center mb-4">User Information Form</h1>
        <form @submit.prevent="submitForm">
          <div class="row mb-3">
            <div class="col-md-6">
              <label for="username" class="form-label">Username</label>
              <input 
                type="text" 
                class="form-control" 
                id="username" 
                @blur="validateName(true)"
                @input="validateName(false)"
                v-model="formData.username"/>
              <div v-if="error.username" class="text-danger">{{ error.username }}</div>
            </div>
            <div class="col-md-6">
              <label for="password" class="form-label">Password</label>
              <input 
                type="password" 
                class="form-control" 
                id="password" 
                @blur="validatePassword(true)"
                @input="validatePassword(false)"
                v-model="formData.password"/>
              <div v-if="error.password" class="text-danger">{{ error.password }}</div>
            </div>
          </div>
          
          <div class="row mb-3">
            <div class="col-md-6">
              <div class="form-check">
                <input 
                  type="checkbox" 
                  class="form-check-input" 
                  id="isAustralian" 
                  @blur="validateAustralianResident(true)"
                  @input="validateAustralianResident(false)"
                  v-model="formData.isAustralian">
                <label class="form-check-label" for="isAustralian">Australian Resident?</label>
                <div v-if="error.isAustralian" class="text-danger">{{ error.isAustralian }}</div> 
              </div>
            </div>
            <div class="col-md-6">
              <label for="gender" class="form-label">Gender</label>
              <select
                class="form-select"  
                id="gender" 
                required
                @blur="validateGender(true)"
                @input="validateGender(false)"
                v-model="formData.gender">
                <option value="male">Male</option>
                <option value="female">Female</option> 
                <option value="other">Other</option>
              </select>
              <div v-if="error.gender" class="text-danger">{{ error.gender }}</div>
            </div>
          </div>
          
          <div class="mb-3">
            <label for="reason" class="form-label">Reason for joining</label>
            <textarea 
              class="form-control" 
              id="reason" 
              rows="3" 
              required
              @blur="validateReason(true)"
              @input="validateReason(false)"
              v-model="formData.reason"></textarea>
            <div v-if="error.reason" class="text-danger">{{ error.reason }}</div>
          </div>
          
          <div class="text-center">
            <button type="submit" class="btn btn-primary me-2">Submit</button>
            <button
              type="button" 
              class="btn btn-secondary"
              @click="clearForm">Clear</button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <div class="row mt-5" v-if="submittedCards.length">
   <div class="d-flex flex-wrap justify-content-start">
      <div v-for="(card, index) in submittedCards" :key="index" class="card m-2" style="width: 18rem;">
         <div class="card-header">
            User Information
         </div>
      <DataTable :value="transformUserData(card)" tableStyle="min-width: 100%" >
          <Column field="field" header="Field"></Column>
              <Column field="value" header="Value"></Column>
      </DataTable>
      </div>
   </div>

  </div>
</template>

<script setup>


import { ref } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';



const formData = ref({
    username: '',
    password: '',
    isAustralian: false,
    reason: '',
    gender: ''
});

const submittedCards = ref([]);
const clearForm = () => {
    formData.value = {
      username: '',
      password: '',
      isAustralian: false,
      reason: '',
      gender: ''
    };
};

const submitForm = () => {
    validateName(true);
   validatePassword(true);
    validateAustralianResident(true);
    validateGender(true);
    validateReason(true);
    if(!error.value.username && !error.value.password && !error.value.isAustralian && !error.value.gender && !error.value.reason) {
      submittedCards.value.push({...formData.value
      });
      clearForm();
    }
};

const error = ref({
  username:'',
  password:'',
  isAustralian:false,
  reason:'',
  gender:''
})
const validateName = (blur) => {
  if (formData.value.username.length < 3) {
    if(blur) error.value.username = 'Username must be at least 3 characters long';
  } else {
    error.value.username = null;
  } 
}

const validatePassword = (blur) => {
    const password = formData.value.password;
  const minLength = 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[\@\#\$\%\&\(\)\,\?\:\{\}\>\<\|]/.test(password);
  if (password.length < minLength) {
    if (blur) error.value.password = `Password must be at least ${minLength} characters long.`;
  }
    else if (!hasUppercase) {
    if (blur) error.value.password = "Password must contain at least one uppercase letter.";
  }
    else if (!hasLowercase) {
    if (blur) error.value.password = "Password must contain at least one lowercase letter.";
  }
    else if (!hasNumber) {
    if (blur) error.value.password = "Password must contain at least one number.";
  }
    else if (!hasSpecialChar) {
    if (blur) error.value.password = "Password must contain at least one special character.";
  }
  else {
    error.value.password = null;
  }
  };
  const validateAustralianResident = (blur) => {
    if (!formData.value.isAustralian) {
      if (blur)error.value.isAustralian = 'Please confirm if you are an Australian resident.';
    } else {
      error.value.isAustralian = null;
    }
  };
  const validateGender = (blur) => {
  const gender = formData.value.gender;
  if (!gender || gender.trim() === '') { 
    if (blur) error.value.gender = 'Gender is required.';
  } else {
    error.value.gender = null;
  }
  };

  const validateReason = (blur) => {
     const reason = formData.value.reason;
     if (blur){
    if (reason.length < 5) {
       error.value.reason = 'Reason must contain at least 5 characters long.';
    return;
    } 
  // Illegal Character Detection
  const invalidChars = /[<>{}]/; // Preventing XSS attacks
  if (invalidChars.test(reason)) {
    error.value.reason = 'Invalid characters (<, >, {, }) detected';
    return;
  }

  //  Content diversity check (avoid duplicate characters)
  const isRepetitive = /(.)\1{4,}/.test(reason); // 5 or more consecutive identical characters
  if (isRepetitive) {
    error.value.reason = 'Content appears repetitive';
    return;
  }
     }
  error.value.reason = null; // Clear any previous errors
    
  };

  const transformUserData = (user) => {
  return [
    { field: 'Username', value: user.username },
    { field: 'Password', value: user.password },
    { field: 'Australian Resident', value: user.isAustralian ? 'Yes' : 'No' },
    { field: 'Gender', value: user.gender },
    { field: 'Reason', value: user.reason }
  ];
};
</script>

<style scoped>
@import "primeicons/primeicons.css";

   .card {
   border: 1px solid #ccc;
   border-radius: 10px;
   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
   }
   .card-header {
   background-color: #275FDA;
   color: white;
   padding: 10px;
   border-radius: 10px 10px 0 0;
   }
   .list-group-item {
   padding: 10px;
   }
   @media (min-width: 576px) {
    .container {
      max-width: 576px !important;
    }
  .row.mb-3 {
    display: flex;
    flex-wrap: wrap;
  }
  
  .row.mb-3 > div {
    flex: 0 0 40%;
    max-width: 40%;
  }
  
  .text-center {
    flex-wrap: nowrap;
  }
}
</style>