/*
    GEORGE MELNIKOV
    BELARUSIAN STATE ACADEMY OF COMMUNICATIONS

*/

// КОНФИГУРАЦИЯ
const CONFIG = {
    // ДИАПАЗОН ПЕРИОДИЧНОСТИ ОТПРАВКИ ФОРМ В Милисекундах
    DINAMIC_INTERVAL:[
        10000,
        60000,
    ],
    //СПИСОК ИМЕН
    fioList : 'Анрей,Кирилл,Иван,Евгений,Акрадий,Алексей,Артур,Юра,Ирина,Екатерина,Виолета,Вероника,Мария,Наталья,Елизовета',
    //СПИСОК ТЕКСТОВЫХ ЗНАЧЕНИЙ
    textList : 'Установка унитаза,Ремонт смесителя,Установка стиральной машины,замена прокладки,засор,устранить течь,устранить течь',
}

// Генерация случайных значений
GRI = (min, max, count) => {
    let val = ''
    for (let i = 0; i < count; i++) {
        val += Math.round(min - 0.5 + Math.random() * (max - min + 1));
    }
    return val;
}
// Генерация произвольного телефона
genPhone = () => {
    const codeOp = '33,29,44,25'.split(',')
    return '+375' + codeOp[parseInt(GRI(0, codeOp.length - 1, 1), 10)] + ''
        + GRI(100, 999, 1) + ''
        + GRI(10, 99, 1) + ''
        + GRI(10, 99, 1);
}
// Случайное имя
genFio = (names) => {
    const namesArray = names.split(',');
    return namesArray[parseInt(GRI(0, namesArray.length - 1, 1), 10)]
}
// Случайный текст
randText = (texts) => {
    const textsArray = texts.split(',')
    return textsArray[parseInt(GRI(0, textsArray.length - 1, 1), 10)]
}

// Случайная email почта
randEmail = () => {
    const domains = 'mail.ru,cloud.com,gmail.com,inbox.ru,yandex.ru'.split(',');
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    const count = GRI(5, 10, 1);
    let email = '';
    for (let i = 0; i <= count; i++) {
        const item = GRI(0, alphabet.length - 1, 1);
        email = email + alphabet[item];
    }
    return email + '@' + domains[GRI(0, domains.length, 1)];
}

// Проверим видимый ли элемент
function isHidden(el) {
    return (el.offsetParent === null)
}
// ЦИКЛ ОБХОДА ФОРМ
attack = (interval) => {
    setTimeout(() => {
        operation(null);
    }, interval)
}
// ОСНОВНОЙ КЛАСС
operation = () => {
    let formsCollection = document.getElementsByTagName("form");
    if (formsCollection.length > 0) {
        const i = GRI(0,formsCollection.length-1,1);
        // for (let i = 0; i < formsCollection.length; i++) {
        let radioCollection = formsCollection[i].querySelectorAll('[type="radio"]');
        for (let item = 0; item < radioCollection.length; item++) {
            if (!isHidden(radioCollection[item])) {
                radioCollection[item].checked = true
            }
        }
        let emailCollection = formsCollection[i].querySelectorAll('[type="email"]');
        for (let item = 0; item < emailCollection.length; item++) {
            if (!isHidden(emailCollection[item])) {
                console.log('email', randEmail())
                emailCollection[item].value = randEmail();
            }
        }
        let inputCollection = formsCollection[i].querySelectorAll('[type="text"]');
        for (let item = 0; item < inputCollection.length; item++) {
            if (!isHidden(inputCollection[item])) {
                if (
                    (inputCollection[item]?.name && inputCollection[item]?.name.toLowerCase().trim().indexOf('tel') >= 0)
                    || inputCollection[item]?.placeholder && inputCollection[item]?.placeholder.toLowerCase().trim().indexOf('тел') >= 0) {
                    inputCollection[item].value = genPhone()
                } else {
                    inputCollection[item].value = genFio(CONFIG.fioList)
                }
            }
        }
        let telCollection = formsCollection[i].querySelectorAll('[type="tel"]');
        for (let item = 0; item < telCollection.length; item++) {
            if (!isHidden(telCollection[item])) {
                console.log('phone', genPhone())
                telCollection[item].value = genPhone()
            }
        }
        let textAreaCollection = formsCollection[i].getElementsByTagName('textarea');
        for (let item = 0; item < textAreaCollection.length; item++) {
            if (!isHidden(textAreaCollection[item])) {
                console.log('text', randText(textList))
                textAreaCollection[item].value = randText(CONFIG.textList)
            }
        }
        let selectCollection = formsCollection[i].getElementsByTagName('select');
        for (let item = 0; item < selectCollection.length; item++) {
            if (!isHidden(selectCollection[item])) {
                const options = selectCollection[item].getElementsByTagName('option');
                let value = ''
                let values = [];
                for (let item = 0; item < options.length; item++) {
                    if(options[item].value){
                        values.push(options[item].value)
                    }
                }
                selectCollection[item].value = values[GRI(0,values.length-1,1)]
            }
        }

        let submitCollection = formsCollection[i].querySelectorAll('[type="submit"]');
        let buttonCollection = formsCollection[i].getElementsByTagName('button');
        if (submitCollection.length > 0 || buttonCollection.length > 0) {
            for (let i = 0; i < submitCollection.length; i++) {
                submitCollection[i].click()
            }
            for (let i = 0; i < buttonCollection.length; i++) {
                buttonCollection[i].click()
            }
        }
        // }
        attack(GRI(CONFIG.DINAMIC_INTERVAL[0],CONFIG.DINAMIC_INTERVAL[1],1));
    }
}
// ЗАПУСК ЦИКЛА
attack(GRI(CONFIG.DINAMIC_INTERVAL[0],CONFIG.DINAMIC_INTERVAL[1],1));

