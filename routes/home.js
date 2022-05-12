const {Router} = require("express");
const router = Router();

router.get('/', (req, res) => {
    res.render('index', {
        title: 'Домашняя страница',
        isHome: true,
        isError: false
    });
})

router.get('/about', (req, res) => {
    res.render('about', {
        title: 'Информации о странице',
        isHome: true
    });

})

module.exports = router