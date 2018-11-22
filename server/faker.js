const faker = require('faker');
const editions = ['first', 'second', 'revised', 'updated', 'third'];
let authors, books;

const generateFakeData = () => {
    authors = [];
    books = [];
    const amount = 25;

    for (let x = 1; x <= amount; x++) {    
        authors.push({
            id: x,
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            dateOfBirth: faker.date.past(100),
        });
        const booksForAuthor = faker.random.number({min:1, max: 5});

        for (let y = 1; y <= booksForAuthor; y++) {
            const book = {
                id: books.length + 1,
                title: `${faker.random.words()} ${faker.commerce.productMaterial()} ${faker.hacker.noun()}` ,
                publisher: faker.company.companyName(),
                edition: editions[faker.random.number({min: 0, max: editions.length - 1})],
                authorId: Number(x)
            };
            books.push(book)
        }
    }
};
generateFakeData();

module.exports = {
    authors,
    books,
};