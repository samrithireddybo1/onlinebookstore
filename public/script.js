document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/books')
        .then(response => response.json())
        .then(data => {
            const bookList = document.getElementById('book-list');
            data.forEach(book => {
                const bookDiv = document.createElement('div');
                bookDiv.classList.add('book');
                bookDiv.innerHTML = `
                    <h3>${book.title}</h3>
                    <p><strong>Author:</strong> ${book.author}</p>
                    <p><strong>Genre:</strong> ${book.genre}</p>
                    <p><strong>Price:</strong> $${book.price}</p>
                    <p><strong>Availability:</strong> ${book.availability ? 'In Stock' : 'Out of Stock'}</p>
                    <button onclick="addToCart('${book._id}')">Add to Cart</button>
                `;
                bookList.appendChild(bookDiv);
            });
        })
        .catch(error => console.error('Error fetching books:', error));
});

function addToCart(bookId) {
    // Implement logic to add the book to the shopping cart
    console.log('Book added to cart:', bookId);
}
