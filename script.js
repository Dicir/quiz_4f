//Initial data
let current_question = 0
let correct_answer = 0

show_question()

//Events
document.querySelector('.scoreArea button').addEventListener('click', resetEvent)

function show_question() {
    if (questions[current_question]) {
        let q = questions[current_question]

        //Calculando a porcentagem para a barra de progresso
        let porcentagem = Math.floor((current_question / questions.length) * 100)
        document.querySelector('.progress--bar').style.width = `${porcentagem}%`

        document.querySelector('.scoreArea').style.display = 'none'
        document.querySelector('.questionArea').style.display = 'block'

        //Exibir as perguntas
        document.querySelector('.question').innerHTML = q.question

        //Inserindo as opções dinamicamente
        //Criando elemento com as opções
        let options_html = ''
        for (let i in q.options) {
            options_html += `<div data-op="${i}" class="option"><span>${parseInt(i)+1}</span>${q.options[i]}</div>`
        }
        //Exibindo as opções - Isso faz com que o elemento seja carregado apenas uma vez!
        document.querySelector('.options').innerHTML = options_html

        //Chamando evento CLICK na opção
        document.querySelectorAll('.options .option').forEach(item => {
            item.addEventListener('click', optionClickEvent)
        })

    } else {
        finish_quiz()
    }
}

//Selecionando e verificando a opção através do evento de click
function optionClickEvent(e) {
    let click_option = parseInt(e.target.getAttribute('data-op'))

    if (questions[current_question].answer === click_option) {
        correct_answer++
    }

    //Muda para a próxima questão e exibe as novas opções
    current_question++
    show_question()
}

function finish_quiz() {
    //Calculando a porcentagem de acertos
    let points = Math.floor((correct_answer / questions.length) * 100)

    if (points < 30) {
        document.querySelector('.scoreText1').innerHTML = 'Precisamos marcar uma call!!!'
        document.querySelector('.scorePct').style.color = '#FF0000'
    } else if (points >= 30 && points <= 70) {
        document.querySelector('.scoreText1').innerHTML = 'Muito bem!'
        document.querySelector('.scorePct').style.color = '#FFFF00'
    } else if (points >= 70) {
        document.querySelector('.scoreText1').innerHTML = 'Parabéns !!!'
        document.querySelector('.scorePct').style.color = '##0D630D'
    }

    //Exibe a porcentagem e a quantidade de acertos
    document.querySelector('.scorePct').innerHTML = `Acertou ${points}%`
    document.querySelector('.scoreText2').innerHTML = `Você respondeu ${questions.length} questões e acertou ${correct_answer}.`



    document.querySelector('.scoreArea').style.display = 'block'
    document.querySelector('.questionArea').style.display = 'none'
    document.querySelector('.progress--bar').style.width = '100%'
}

//restando o quizz
function resetEvent() {
    correct_answer = 0
    current_question = 0
    show_question()
}