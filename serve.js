document.addEventListener("DOMContentLoaded", () => {
    const inputs = document.querySelectorAll("input[type='text'], input[type='email'], input[type='radio']");
    const submitButton = document.getElementById("submitButton");

    // 입력 필드 검증 함수
    function validateInputs() {
        let isValid = true;

        inputs.forEach(input => {
            if (input.type === "radio") {
                // 라디오 버튼은 하나라도 선택되어야 함
                const name = input.name;
                const radios = document.querySelectorAll(`input[name="${name}"]`);
                const isChecked = Array.from(radios).some(radio => radio.checked);
                if (!isChecked) isValid = false;
            } else {
                // 텍스트, 이메일 필드는 값이 있어야 함
                if (input.value.trim() === "") isValid = false;
            }
        });

        // 버튼 활성화/비활성화
        submitButton.disabled = !isValid;
    }

    // 입력 필드 변경 시 검증 함수 호출
    inputs.forEach(input => {
        input.addEventListener("input", validateInputs);
        if (input.type === "radio") {
            input.addEventListener("change", validateInputs);
        }
    });

    // 이름과 다른 정보를 로컬 스토리지에 저장하고 페이지 이동
    window.submitForm = function () {
        const nameInput = document.getElementById("nameInput").value;
        if (nameInput.trim() !== "") {
            localStorage.setItem("userName", nameInput); // 이름 저장
            window.location.href = 'serve2.html';    
        }
    };
});



document.addEventListener("DOMContentLoaded", () => {
    const inputField = document.getElementById("input_text");
    const messageDiv = document.getElementById("moneymessage");

    // 금액에 따른 멘트 정의
    const getMessageForAmount = (amount) => {
        if (amount >= 10000 && amount < 50000) {
            return "아이들에게 따뜻한 마음을 전달할 수 있습니다.";
        } else if (amount >= 50000 && amount < 100000) {
            return "큰 도움을 주시는 후원에 감사드립니다.";
        } else if (amount >= 100000) {
            return "희망의 등불이 되어주셔서 감사합니다.";
        } else if (amount > 0 && amount < 10000) {
            return "소중한 후원이 모여 큰 변화를 만듭니다.";
        } else {
            return ""; // 기본 상태
        }
    };

    // 입력 이벤트 핸들러
    inputField.addEventListener("input", (event) => {
        const rawValue = event.target.value.replace(/,/g, ""); // 쉼표 제거
        const amount = parseInt(rawValue, 10); // 숫자로 변환

        if (!isNaN(amount)) {
            const message = getMessageForAmount(amount); // 금액에 맞는 멘트 가져오기
            messageDiv.textContent = message; // 메시지 업데이트
        } else {
            messageDiv.textContent = ""; // 잘못된 입력 시 메시지 비움
        }
    });
});

document.querySelectorAll('.input_num').forEach(input => {
    input.addEventListener('focus', function () {
        let value = String(this.value).replace(/,/g, '');
        if (value === '0') {
            this.value = '';
        } else {
            this.value = value;
        }
    });

    input.addEventListener('blur', function () {
        let valueInt = 0;
        let value = this.value === '-' ? '0' : String(this.value).replace(/,/g, '');
        if (value !== '') {
            valueInt = parseInt(value, 10);
        }
        this.value = valueInt.toLocaleString(); // 쉼표 추가
    });

    input.addEventListener('keyup', function () {
        let value = this.value.replace(/,/g, ''); // 기존 쉼표 제거
        if (!isNaN(value) && value !== '') {
            this.value = parseInt(value, 10).toLocaleString(); // 쉼표 추가
        } else {
            this.value = ''; // 비정상 입력일 경우 초기화
        }
    });
});

const autoHyphen = (target) => {
    target.value = target.value
      .replace(/[^0-9]/g, '')
      .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
   }

   document.addEventListener("DOMContentLoaded", () => {
    const emailInput = document.getElementById("emailInput");
    const emailMessage = document.getElementById("emailMessage");

    emailInput.addEventListener("blur", () => {
        const emailValue = emailInput.value;

        // 이메일에 '@'가 포함되어 있는지 확인
        if (emailValue.includes("@")) {
            emailMessage.textContent = "유효한 이메일 주소입니다.";
            emailMessage.classList.add("valid");
            emailMessage.style.display = "block";
        } else {
            emailMessage.textContent = "이메일 주소에 '@'를 포함해주세요.";
            emailMessage.classList.remove("valid");
            emailMessage.style.display = "block";
        }
    });

    emailInput.addEventListener("focus", () => {
        // 메시지를 숨기기
        emailMessage.style.display = "none";
    });
});

// 이름을 로컬 스토리지에 저장하는 함수
// function submitForm() {
//     // 필요한 로직 추가 후 이동
//     window.location.href = './serve2.html';
// }

// 버튼 활성화 로직 추가
document.getElementById("nameInput").addEventListener("input", () => {
    const submitButton = document.getElementById("submitButton");
    submitButton.disabled = document.getElementById("nameInput").value.trim() === "";
});
