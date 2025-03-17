/* 로딩에서 화면으로 이동 */
const loadingAreaGrey = document.querySelector('#loading');
const loadingAreaGreen = document.querySelector('#loading-screen');
const loadingText = document.querySelector('#loading p');

window.addEventListener('load', () => {
    loadingAreaGrey.animate({
        opacity: [1, 0],
        visibility: 'hidden',
    },
    {
        duration: 2000,
        delay: 1200,
        easing: 'ease',
        fill: 'forwards',
    });

    loadingAreaGreen.animate({
        // 위치이동: 화면 밑에 숨겨져있다가 중간에 화면을 채웠다가 화면 위로 이동
        translate: ['0 100vh', '0 0', '0 -100vh'],
    },
    {
        duration: 2000,
        delay: 800,
        easing: 'ease',
        fill: 'forwards',
    });

    loadingText.animate([
        // 0초 ~ 1.2초 범위에서 80%까지는 불투명, 100%까지 투명하게 사라지기
        {
            opacity: 1,
            offset: .8,
        },
        {
            opacity: 0,
            offset: 1,
        }
    ],
    {
        duration: 1200,
        easing: 'ease',
        fill: 'forwards',
    })
});

/* 이미지 갤러리 */
const mainImage = document.querySelector('.gallery-image img');
const thumbImages = document.querySelectorAll('.gallery-thumbnails img');

// for(let i = 0; i < thumbImages.length; i++) {
//   thumbImages[i].addEventListener('mouseover', (e) => {
//       mainImage.src = e.target.src;
//       mainImage.animate({opacity: [0, 1]}, 500);
//   });
// }
thumbImages.forEach((thumbImage)=>{
  thumbImage.addEventListener('mouseover', (e) => {
      mainImage.src = e.target.src;
      mainImage.animate({opacity: [0, 1]}, 500);
  });
});

/* 슬라이드 메뉴 */
const menuOpen = document.querySelector('#menu-open');
const menuClose = document.querySelector('#menu-close');
const menuPanel = document.querySelector('#menu-panel');
const menuItems = document.querySelectorAll('#menu-panel li');
const menuOptions = {
  duration: 1200,
  easing: 'ease',
  fill: 'forwards',
};

// 메뉴 열기
menuOpen.addEventListener('click', () => {
    menuPanel.animate({translate: ['100vw', 0]}, menuOptions);

    // 링크를 순서대로 하나씩 표시
    menuItems.forEach((menuItem, index) => {
        menuItem.animate(
            {
                opacity: [0, 1],
                // 2rem 에서 0으로 이동
                translate: ['2rem', 0],
            },
            {
                duration: 2400,
                delay: 300 * index,
                easing: 'ease',
                fill: 'forwards',
            },
        );
    });
});

// 메뉴 닫기
menuClose.addEventListener('click', () => {
    menuPanel.animate({translate: [0, '100vw']}, menuOptions);

    menuItems.forEach((menuItem) => {
        menuItem.animate({opacity: [1, 0]}, menuOptions);
    });
})

/* 스크롤로 요소 표시 */
// 관찰 대상이 범위 안에 들어오면 실행하는 동작
const animateFade = (entries, obs) => {
    entries.forEach((entry) => {
        // isIntersecting는 .fadein요소가 화면밖에 있을 때는 false 화면안에 들어오면 true
        if(entry.isIntersecting) {
            entry.target.animate(
                {
                    opacity: [0, 1],
                    filter: ['blur(.4rem)', 'blur(0)'], 
                    translate: ['0 4rem', 0],
                },
                {
                    duration: 2000,
                    easing: 'ease',
                    fill: 'forwards',
                }
            );
            // 표시되었으면 관찰 중지
            obs.unobserve(entry.target);
        }
    });
};
// 관찰 설정
const fadeObserver = new IntersectionObserver(animateFade);
// .fadein을 관찰하도록 지시
const fadeElements = document.querySelectorAll('.fadein');
fadeElements.forEach((fadeElement) => {
    fadeObserver.observe(fadeElement);
});