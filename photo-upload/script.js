// File upload elements
const fileInput = document.getElementById('fileInput');
const initialBtn = document.getElementById('initialBtn');
const actionButtons = document.getElementById('actionButtons');
const changeBtn = document.getElementById('changeBtn');
const submitBtn = document.getElementById('submitBtn');
const fileInfo = document.getElementById('fileInfo');

// Recipe elements
const dishList = document.getElementById('dish-list');

// Initial file upload setup
initialBtn.addEventListener('click', () => fileInput.click());

fileInput.addEventListener('change', function(e) {
  if (this.files.length > 0) {
    const file = this.files[0];
    
    // Show file info
    fileInfo.innerHTML = `
      Выбран файл: <strong>${file.name}</strong><br>
      Размер: ${(file.size / 1024).toFixed(2)} KB
    `;
    
    // Switch button visibility
    initialBtn.style.display = 'none';
    actionButtons.style.display = 'flex';
  }
});

// Change file button
changeBtn.addEventListener('click', () => {
  fileInput.value = '';
  fileInput.click();
});

// Submit file button (now with recipe processing)
submitBtn.addEventListener('click', function() {
  if (fileInput.files.length === 0) {
    alert('Пожалуйста, выберите фото для загрузки.');
    return;
  }

  const file = fileInput.files[0];
  
  // Show loading state
  const originalText = this.innerHTML;
  this.innerHTML = '<i class="icon">⏳</i> Обработка...';
  this.disabled = true;

  // In a real app, this would be a fetch request to your server
  simulateFileProcessing(file)
    .then(foundRecipes => {
      // Display found recipes
      displayRecipes(foundRecipes);
      
      // Reset button state
      this.innerHTML = originalText;
      this.disabled = false;
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Произошла ошибка при обработке фото.');
      this.innerHTML = originalText;
      this.disabled = false;
    });
});

// Simulate server processing (replace with actual fetch in production)
function simulateFileProcessing(file) {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      const foundRecipes = [
        { name: 'Рецепт 1', url: 'recipe1.html' },
        { name: 'Рецепт 2', url: 'recipe2.html' },
        { name: 'Рецепт 3', url: 'recipe3.html' }
      ];
      resolve(foundRecipes);
    }, 1500);
  });
}

// Display recipes in the list
function displayRecipes(recipes) {
  dishList.innerHTML = '';
  
  if (recipes.length === 0) {
    dishList.innerHTML = '<li>Рецепты не найдены</li>';
    return;
  }

  recipes.forEach(recipe => {
    const listItem = document.createElement('li');
    const link = document.createElement('a');
    link.href = recipe.url;
    link.textContent = recipe.name;
    listItem.appendChild(link);
    dishList.appendChild(listItem);
  });
  
  // Show the recipes section (make sure it's not hidden)
  document.getElementById('recipes-section').style.display = 'block';
}

// For actual server implementation (uncomment and modify as needed)
/*
function uploadFileToServer(file) {
  const formData = new FormData();
  formData.append('photo', file);

  return fetch('/upload', {
    method: 'POST',
    body: formData
  })
  .then(response => {
    if (!response.ok) throw new Error('Network error');
    return response.json();
  });
}
*/