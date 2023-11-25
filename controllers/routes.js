const router 

router.get('/', async (req, res) => {
    //send text
    //res.send('Hello World');

    //send json
    res.json({ message: 'Hello World' });
    //send html

});