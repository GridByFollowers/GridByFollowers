// Function to fetch image IDs and display random images
function fetchImages() {
    var imageContainer = document.getElementById("image-container");
    imageContainer.innerHTML = ""; // Clear existing images

    // Fetch images from the 'images' folder
    fetch('images/image-list.json')
    .then(response => response.json())
    .then(data => {
        // Shuffle image IDs randomly
        var shuffledIds = shuffleArray(data.imageIds);

        // Display random images
        shuffledIds.forEach(imageId => {
            const imageUrl = 'images/' + imageId + '.jpg';
            const imgElement = document.createElement("img");
            imgElement.src = imageUrl;
            imgElement.alt = imageId;
            imgElement.title = imageId; // Display image ID on hover
            imgElement.addEventListener('click', function() {
                window.open('https://instagram.com/' + imageId, '_blank');
            });
            imageContainer.appendChild(imgElement);
        });
    })
    .catch(error => console.error('Error fetching images:', error));
}

// Function to shuffle array randomly
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Function to search for an image
function searchImage() {
    var searchInput = document.getElementById("search").value.toLowerCase();
    var imageElements = document.querySelectorAll('#image-container img');

    // Hide all images
    imageElements.forEach(img => {
        img.style.display = 'none';
    });

    // Show images matching the searched ID
    imageElements.forEach(img => {
        if (img.alt.toLowerCase() === searchInput) {
            img.style.display = 'block';
        }
    });
}

// Function to refresh page on clicking title in nav bar
function refreshPage() {
    location.reload();
}

// Call fetchImages function on page load
fetchImages();
