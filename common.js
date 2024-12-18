let lastScrollPosition = window.scrollY || document.documentElement.scrollTop;
const sections = [
    { name: "header", element: document.querySelector('.header') },
    { name: "circleafter", element: document.querySelector('.circleafter') },
    { name: "use1", element: document.querySelector('.use1') },
    { name: "use2", element: document.querySelector('.use2') },
    { name: "use3", element: document.querySelector('.use3') },
    { name: "gift", element: document.querySelector('.gift') },
    { name: "company", element: document.querySelector('.company') },
    { name: "story", element: document.querySelector('.story') }
];

let currentIndex = 0; // 현재 섹션 인덱스
let isScrolling = false; // 섹션 이동 중 상태
let lastScrollY = 0;

const circle1 = document.querySelector('.circle_1');

// 스크롤에 따른 .circle_1 애니메이션
window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY < 800) {
        // 스크롤 위치에 따라 scale 값 동적 조절
        const scaleValue = 1 + currentScrollY / 2000; // 1에서 최대 3까지 증가
        circle1.style.position = "fixed";
        circle1.style.top = "50%";
        circle1.style.left = "50%";
        circle1.style.transform = `translate(-50%, -50%) scale(${Math.min(scaleValue, 10)})`;
        circle1.style.opacity = "1";
    } else if (currentScrollY < 1600) {
        circle1.style.transform = `translate(-50%, -50%) scale(10)`;
        circle1.style.opacity = "1";
    } else {
        circle1.style.opacity = "0";
    }

    if (currentScrollY === 0) {
        // 스크롤 최상단으로 돌아가면 초기 상태 복원
        circle1.style.position = "absolute";
        circle1.style.top = "880px";
        circle1.style.left = "50%";
        circle1.style.transform = "translate(-50%, -50%) scale(1)";
        circle1.style.opacity = "1";
    }

    lastScrollY = currentScrollY; // 스크롤 위치 업데이트
});

// 섹션 이동 및 opacity 변경
window.addEventListener('wheel', function (event) {
    if (isScrolling) return;

    const currentScrollPosition = window.scrollY || document.documentElement.scrollTop;
    let direction;

    if (event.deltaY > 0) {
        direction = 'down';
    } else if (event.deltaY < 0) {
        direction = 'up';
    }

    changeOpacity(direction);

    if (currentIndex === 0 && direction === 'down' && currentScrollPosition < 1400) {
        return; // 특정 스크롤 위치까지는 이동하지 않음
    }

    if (direction === 'down' && currentIndex < sections.length - 1) {
        moveSection('down');
    } else if (direction === 'up' && currentIndex > 0) {
        moveSection('up');
    }

    lastScrollPosition = currentScrollPosition;
});

function moveSection(direction) {
    if (direction === 'down' && currentIndex < sections.length - 1) {
        currentIndex++;
    } else if (direction === 'up' && currentIndex > 0) {
        currentIndex--;
    } else {
        return;
    }

    isScrolling = true;

    sections[currentIndex].element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });

    setTimeout(() => {
        isScrolling = false;
    }, 500);
}

function changeOpacity(direction) {
    const currentSection = sections[currentIndex].element;
    let nextSection;

    if (direction === 'down' && currentIndex < sections.length - 1) {
        nextSection = sections[currentIndex + 1].element;
    } else if (direction === 'up' && currentIndex > 0) {
        nextSection = sections[currentIndex - 1].element;
    }

    if (currentSection.classList.contains('story') || (nextSection && nextSection.classList.contains('story'))) {
        return;
    }


    // 현재 섹션의 opacity를 0으로 설정
    if (direction === 'down') {
        currentSection.style.transition = "opacity 0.5s ease-out";
        currentSection.style.opacity = "0";

        // 다음 섹션의 opacity를 1로 설정
        if (nextSection) {
            nextSection.style.transition = "opacity 0.5s ease-in";
            nextSection.style.opacity = "1";
        }
    } else if (direction === 'up') {
        currentSection.style.transition = "opacity 0.5s ease-out";
        currentSection.style.opacity = "0";

        // 이전 섹션의 opacity를 1로 설정
        if (nextSection) {
            nextSection.style.transition = "opacity 0.5s ease-in";
            nextSection.style.opacity = "1";
        }
    }
}




// 숫자 애니메이션 함수
function animateNumbers() {
    const values = document.querySelectorAll(".value .up span");
    values.forEach((value) => {
        const targetNumber = parseInt(value.textContent, 10);
        let currentNumber = 0;
        const increment = Math.ceil(targetNumber / 100);

        const interval = setInterval(() => {
            currentNumber += increment;
            if (currentNumber >= targetNumber) {
                currentNumber = targetNumber;
                clearInterval(interval);
            }
            value.textContent = currentNumber;
        }, 20);
    });
}

// Intersection Observer 설정
const companySection = document.querySelector('.company');

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            animateNumbers();
        }
    });
}, {
    threshold: 0.5
});

observer.observe(companySection);

  
  // 휠 이벤트
  window.addEventListener('wheel', function (event) {
    if (isScrolling) return;
  
    const direction = event.deltaY > 0 ? 'down' : 'up';
    moveSection(direction);
  });


  document.addEventListener("DOMContentLoaded", () => {
    const posts = document.querySelectorAll(".contents");
    const nextButton = document.getElementById("nextBtn");
    const prevButton = document.getElementById("prv");
    let currentPostIndex = 0;

    function updatePosts(direction) {
        const currentPost = posts[currentPostIndex];
        currentPost.style.display = "none"; // 현재 콘텐츠 숨기기

        currentPostIndex = direction === "next"
            ? (currentPostIndex + 1) % posts.length
            : (currentPostIndex - 1 + posts.length) % posts.length;

        const nextPost = posts[currentPostIndex];
        nextPost.style.display = "flex"; // 다음 콘텐츠 보이기
    }

    nextButton.addEventListener("click", () => {
        updatePosts("next");
    });

    prevButton.addEventListener("click", () => {
        updatePosts("prev");
    });
});


nextButton.addEventListener("click", () => {
    if (!isScrolling) {
      moveSection('down');
    }
  });
  
  prevButton.addEventListener("click", () => {
    if (!isScrolling) {
      moveSection('up');
    }
  });