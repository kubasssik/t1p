'use strict'

window.onload = function () {
    const $parallax = document.querySelector('.parallax');
    console.log($parallax.children);
    if ($parallax) {
        const $content = document.querySelector('.parallax__container');
        const $img_1 = document.querySelector('.images-parallax__image1');
        const $form = document.querySelector('.form');
        const $img_3 = document.querySelector('.images-parallax__image3');
        //коэффециэнт
        const for_img1 = 40;
        const for_img2 = 20;
        const for_img3 = 10;
        //анимация
        const speed = 0.05;

        let positionX = 0, positionY = 0;
        let coordXprocent = 0, coordYprocent = 0;

        function setMouseParallaxStyle() {
            const distX = coordXprocent - positionX;
            const distY = coordYprocent - positionY;

            positionX = positionX + (distX * speed);
            positionY = positionY + (distY * speed);

            //передаем стили
            $img_1.style.cssText = `transform: translate(${positionX / for_img1}%, ${positionY / for_img1}%)`;
            $form.style.cssText = `transform: translate(${positionX / for_img2}%, ${positionY / for_img2}%)`;
            $img_3.style.cssText = `transform: translate(${positionX / for_img3}%, ${positionY / for_img3}%)`;

            requestAnimationFrame(setMouseParallaxStyle);
        }
        setMouseParallaxStyle();

        $parallax.addEventListener('mousemove', function (e) {
            //получаем ширину и высоту блока
            const parallaxWidth = $parallax.offsetWidth;
            const parallaxHeight = $parallax.offsetHeight;
            // Курсор по середине, нулевое положение
            const coordX = e.pageX - parallaxWidth / 2;
            const coordY = e.pageY - parallaxHeight / 2;
            //получаем проценты
            coordXprocent = coordX / parallaxWidth * 100;
            coordXprocent = coordY / parallaxHeight * 100;


        });

        //Параллакс при скроле
        let thresholdSets = [];
        for( let i = 0; i <= 1.0; i+= 0.005){
            thresholdSets.push(i)
        }
        const callback = function( entries, observer){
            const scrollTopProcent = window.pageYOffset /$parallax.offsetHeight * 100;
            setMouseParallaxItemStyle(scrollTopProcent);
        };
        const observer = new IntersectionObserver ( callback, {
            threshold: thresholdSets
        })
        observer.observe( document.querySelector('.content'));
        function setMouseParallaxItemStyle( scrollTopProcent){
            $content.style.cssText = `transform: translate(0%, -${scrollTopProcent / 9}%)`
            $form.parentElement.style.cssText = `transform: translate(0%, -${scrollTopProcent / 6}%)`
            $img_3.parentElement.style.cssText = `transform: translate(0%, -${scrollTopProcent / 3}%)`
        }
        //setMouseParallaxItemStyle()
    }
}