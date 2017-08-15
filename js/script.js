_.templateSettings = {
    evaluate: /\{\[([\s\S]+?)\]\}/g,
    interpolate: /\{\{([\s\S]+?)\}\}/g
};

var treeParams = {
    questions: {
        1: {
            text: "Вам нужно финансирование для развития действующего бизнеса?",
            type: "question",
            buttons: {
                yes: {
                    id: 3,
                    method: "next"
                },
                no: {
                    id: 2,
                    method: "next"
                }
            }
        },
        2: {
            text: "Новый проект будет развиваться на Дальнем Востоке или в Байкальском регионе?",
            type: "question",
            buttons: {
                yes: {
                    id: 8,
                    method: "end"
                },
                no: {
                    id: 4,
                    method: "next"
                }
            }
        },
        3: {
            text: "Интересующая сумма финансирования превышает 15 млн рублей?",
            type: "question",
            buttons: {
                yes: {
                    id: 5,
                    method: "next"
                },
                no: {
                    id: 12,
                    method: "end"
                }
            }
        },
        4: {
            text: "Ваша компания работает в сфере IT?",
            type: "question",
            buttons: {
                yes: {
                    id: 13,
                    method: "end"
                },
                no: {
                    id: 10,
                    method: "end"
                }
            }
        },
        5: {
            text: "Ваша компания зарегистрирована на Дальнем Востоке или в Байкальском регионе?",
            type: "question",
            buttons: {
                yes: {
                    id: 8,
                    method: "end"
                },
                no: {
                    id: 6,
                    method: "next"
                }
            }
        },
        6: {
            text: "Ваша компания работает в сфере производства?",
            type: "question",
            buttons: {
                yes: {
                    id: 7,
                    method: "next"
                },
                no: {
                    id: 4,
                    method: "next"
                }
            }
        },
        7: {
            text: "Вы согласны передать долю акционерного капитала фонду?",
            type: "question",
            buttons: {
                yes: {
                    id: 10,
                    method: "end"
                },
                no: {
                    id: 11,
                    method: "end"
                }
            }
        },
        8: {
            type: "answer",
            text: "Фонд развития Дальнего Востока и Байкальского региона",
            buttons: null
        },
        9: {
            type: "answer",
            text: "Фонд развития интернет-инициатив",
            buttons: null
        },
        10: {
            type: "answer",
            text: "Российский фонд прямых инвестиций",
            buttons: null
        },
        11: {
            type: "answer",
            text: "Фонд развития промышленности",
            buttons: null
        },
        12: {
            type: "answer",
            text: "Фонд поддержки малого и среднего бизнеса",
            buttons: null
        },
        13: {
            type: "answer",
            text: "Фонд развития интернет-инициатив<br/><br/>Российский фонд прямых инвестиций",
            buttons: null
        }

    }
};

jQuery.fn.questionsTree = function(steps) {
    var $self = $(this),
        cardTmpl = _.template($("#card-tmpl").html());


    function startCard(id) {
        var $card = $(cardTmpl(steps.questions[id])),
            $buttons = $card.find(".card-button");

        $buttons.length && $buttons
            .bind("click.answer", function () {
               var $this = $(this),
                   data = $this.data();

               $this
                   .parent(".card-button_out")
                   .addClass("selected");

               startCard(data.id);

               $buttons.unbind("click.answer");

            });

        $card.appendTo($self);
    }

    function endCard() {

    }

    function clearTree() {
        $self.empty();
        startCard(1);
    }



    return {
        next: function(id) {
            startCard(id);
        },
        reset: function () {
            clearTree()
        }
    };
};


$("#cards-tree").questionsTree(treeParams).next(1);


