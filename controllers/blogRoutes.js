const router = require('express').Router();
const { Blog, User, Comment } = require('../models/index');

// Handle errors and send a response with the error status
const handleResponse = (res, data, template, extraData = {}) => {
    try {
        if (data) {
            const formattedData = data.get({ plain: true });
            res.render(template, { ...extraData, ...formattedData, loggedIn: req.session.loggedIn });
        } else {
            res.status(404).end();
        }
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
};

// GET homepage
router.get('/', async (req, res) => {
    try {
        const blogData = await Blog.findAll({ include: [User] });
        const blogs = blogData.map((blog) => blog.get({ plain: true }));
        res.render('homepage', { blogs, loggedIn: req.session.loggedIn });
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
});

// GET blog page
router.get('/blog/:id', async (req, res) => {
    try {
        const blogData = await Blog.findByPk(req.params.id, {
            include: [
                User,
                {
                    model: Comment,
                    include: [User],
                },
            ],
        });
        handleResponse(res, blogData, 'blog');
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
});

// GET login page
router.get('/login', (req, res) => {
    try {
        if (req.session.loggedIn) {
            res.redirect('/');
            return;
        }
        res.render('login');
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
});

module.exports = router;
