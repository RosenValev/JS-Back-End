const router = require('express').Router();
const { extractErrorMessage } = require('../utils/errorHelper.js');
const { isAuth } = require('../middlewares/authorizationMiddleware.js');
const bookService = require('../services/bookService.js')


//CATALOG

router.get('/catalog', async (req, res) => {
    try {
        const books = await bookService.getAll().lean();
        res.render('books/catalog', { books });

    } catch (err) {
        const errorMessages = extractErrorMessage(err);
        res.render('books/catalog', { errorMessages });

    }
});

//CREATE

router.get('/create', isAuth, (req, res) => {
    try {
        res.render('books/create');
    } catch (err) {
        const errorMessages = extractErrorMessage(err);
        res.render('books/create', { errorMessages });
    }
});

router.post('/create', isAuth, async (req, res) => {
    const { title, author, genre, stars, image, bookReview } = req.body;

    try {
        await bookService.create({ title, author, genre, stars, image, bookReview, owner: req.user._id });
        res.redirect('/books/catalog');
    } catch (err) {
        const errorMessages = extractErrorMessage(err);
        res.render('books/create', { errorMessages, title, author, genre, stars, image, bookReview })
    }
});

//DETAILS

router.get('/:bookId/details', async (req, res) => {
    const bookId = req.params.bookId;
    const userId = req.user?._id;
    let isBookWishedToRead = false;

    try {
        const book = await bookService.getById(bookId).lean();
        const isOwner = req.user?._id == book.owner._id;

        if (JSON.parse(JSON.stringify(book.wishingList)).includes(userId)) {
            isBookWishedToRead = true;
        }

        res.render('books/details', { book, isOwner, isBookWishedToRead });
    } catch (err) {
        const errorMessages = extractErrorMessage(err);
        res.render('books/details', { errorMessages });
    }
});

//WISH TO READ

router.get('/:bookId/wish-to-read', isAuth, async (req, res) => {
    const bookId = req.params.bookId;
    const userId = req.user?._id;

    try {
        await bookService.wishToRead(bookId, userId);
        res.redirect(`/books/${bookId}/details`);

    } catch (err) {
        const errorMessages = extractErrorMessage(err);
        res.render('books/details', { errorMessages });
    }
});

//EDIT
router.get('/:bookId/edit', isAuth, async (req, res) => {
    const bookId = req.params.bookId;

    try {
        const book = await bookService.getById(bookId).lean();
        const isOwner = req.user?._id == book.owner._id;
        if (!isOwner) {
            return res.redirect(`/books/${bookId}/details`);   // Dont have acces if it is not the owner
        }

        res.render('books/edit', { book })
    } catch (err) {
        const errorMessages = extractErrorMessage(err);
        res.redirect('/', { errorMessages });
    }
});

router.post('/:bookId/edit', isAuth, async (req, res) => {
    const bookId = req.params.bookId;
    const bookData = req.body;

    try {
        await bookService.edit(bookId, bookData);
        res.redirect(`/books/${bookId}/details`);

    } catch (err) {
        const errorMessages = extractErrorMessage(err);
        res.render('books/edit', { errorMessages });
    }
});


//DELETE
router.get('/:bookId/delete', isAuth, async (req, res) => {
    const bookId = req.params.bookId;

    try {
        await bookService.delete(bookId);
        res.redirect('/books/catalog');
    } catch (err) {
        const errorMessages = extractErrorMessage(err);
        res.redirect(`/books/${bookId}/details`, { errorMessages });
    }
});


module.exports = router;

