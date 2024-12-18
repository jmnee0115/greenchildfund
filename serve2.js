document.addEventListener("DOMContentLoaded", () => {
    // 로컬 스토리지에서 저장된 이름 가져오기
    const userName = localStorage.getItem("userName");
    const userTitle = document.getElementById("userTitle");

    if (userName) {
        // 이름을 타이틀에 반영
        userTitle.textContent = `${userName}님의 후원으로 아이들이 건강해지고 있어요!`;
    }
});
