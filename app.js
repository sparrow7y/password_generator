const mdpLength = document.querySelector('.mdp-length input');
const btn = document.querySelector('[btn-generate]');
const options = document.querySelectorAll('.options input');
const mdpInputs = document.querySelector('.mdp-groupe input');
const indicators = document.querySelectorAll('.indicator');
const copy = document.querySelector('.copy');

const characteres = {
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+~`|}{[]:;?><,./-='
};

const generateMdp = () => {
    let passwordBase = '',
    passRandom = '',
    exclureRepetition = false,
    passLength = mdpLength.value;

    options.forEach(option => {
        if(option.checked){
            if (option.id !== "repetition" && option.id !== "espaces") {
                passwordBase += characteres[option.id];
            } else if (option.id === "espaces"){
                passwordBase += ' ';
            } else {
                exclureRepetition = true;
            }
        }
    });

    if (passwordBase === '') {
        passwordBase = characteres.lowercase;
    }

    for (let i = 0; i < passLength; i++) {
        let randomLettres = passwordBase[Math.floor(Math.random() * passwordBase.length)];
        if (exclureRepetition) {
            !passRandom.includes(randomLettres) || randomLettres === ' ' ?
                passRandom += randomLettres : i--;
        } else {
            passRandom += randomLettres;
        }
    }

    mdpInputs.value = passRandom;
    functindicator();
};

const functindicator = () => {
    const strength = mdpLength.value <= 8 ? 'petit' : mdpLength.value <= 16 ? 'moyen' : 'long';
    indicators.forEach(indicator => {
        indicator.classList.remove('active');
    });
    document.getElementById(strength).classList.add('active');
};

const updateMdp = () => {
    document.querySelector('.mdp-length span').innerText = mdpLength.value;
    generateMdp();
};

updateMdp();

const funcCopy = () => {
    navigator.clipboard.writeText(mdpInputs.value);
    copy.style.color = 'green';
    copy.innerHTML = '<ion-icon name="checkmark-circle-outline"></ion-icon> Copié !';
    
    setTimeout(() => {
        copy.innerHTML = '<ion-icon name="copy-outline"></ion-icon> Copier';
    }, 2000);
};

copy.addEventListener('click', funcCopy);
btn.addEventListener('click', generateMdp);
mdpLength.addEventListener('input', updateMdp);