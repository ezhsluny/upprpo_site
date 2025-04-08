document.getElementById('uploadButton').addEventListener('click', function() {
    const photoInput = document.getElementById('photoInput');
    const file = photoInput.files[0];

    if (file) {
        // Simulate processing the photo and finding recipes
        // In a real application, you would send the file to a server and get the recipes
        const formData = new FormData();
        formData.append('photo', file);

        fetch('/upload', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            // Redirect to the ingredients page
            // window.location.href = '/ingredients_page';
        })
        .catch(error => {
            console.error('Error:', error);
        });
        const foundRecipes = [
            { name: 'Рецепт 1', url: 'recipe1.html' },
            { name: 'Рецепт 2', url: 'recipe2.html' },
            { name: 'Рецепт 3', url: 'recipe3.html' }
        ];

        // Populate the dish list
        const dishList = document.getElementById('dish-list');
        dishList.innerHTML = '';
        foundRecipes.forEach(recipe => {
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.href = recipe.url;
            link.textContent = recipe.name;
            listItem.appendChild(link);
            dishList.appendChild(listItem);
        });

        // Redirect to the first recipe page (or a results page)
        // window.location.href = foundRecipes[0].url;
    } else {
        alert('Пожалуйста, выберите фото для загрузки.');
    }
});


// document.addEventListener('DOMContentLoaded', function() {
//     document.getElementById('uploadButton').addEventListener('click', function() {
//         const photoInput = document.getElementById('photoInput');
//         const file = photoInput.files[0];

//         console.log('Upload button clicked');
//         console.log('Selected file:', file);

//         if (file) {
//             const formData = new FormData();
//             formData.append('photo', file);

//             fetch('/upload', {
//                 method: 'POST',
//                 body: formData
//             })
//             .then(response => response.json())
//             .then(data => {
//                 console.log('Success:', data);
//                 // Redirect to the ingredients page
//                 // window.location.href = '/ingredients_page';
//             })
//             .catch(error => {
//                 console.error('Error:', error);
//             });
//         } else {
//             alert('Пожалуйста, выберите фото для загрузки.');
//         }
//     });
// });
