const timer= {}; //array principal
timer.timers= {}; //local onde os dados dos timers são armazenados
timer.loop= function(id) { //função que atualiza e controla os timers
    if (!timer.timers[id].paused) {
        timer.timers[id].count_ms+= 100;
        if (timer.timers[id].times!= 0) { //verifica se o timer é ou não infinito, o cálculo é diferente para ambas!
            if (timer.timers[id].count_ms>= timer.timers[id].ms) { //se a variável de controle for maior ou igual ao valor estipulado em ms, a callback deverá ser chamada
                let args= timer.timers[id].args;
                timer.timers[id].count_ms= 0;
                timer.timers[id].count_t--;
                timer.timers[id].callback(args[0], args[1], args[2], args[3], args[4]); //passa-se os possíveis argumentos
                if (timer.timers[id].count_t== 0) { //se o timer não infinito chegar ao final, ele deverá ser eliminado ou pausado!
                    if (timer.timers[id].last) {
                        timer.remove(id);
                    } else {
                        timer.pause(id, true);
                    };
                };
            };
        } else { //parte do timer infinito! (pode ser pausado...)
            if (timer.timers[id].count_ms>= timer.timers[id].ms) {
                let args= timer.timers[id].args;
                timer.timers[id].count_ms= 0;
                timer.timers[id].callback(args[0], args[1], args[2], args[3], args[4]);
            };
        };
    };
};
timer.pause= function(id, v, restart= false) { //pausa ou despausa um timer
    if (restart) { //se ele já estiver pausado e você quiser despausar, as variáveis de controle são reiniciadas!
        timer.timers[id].count_t= 0;
        timer.timers[id].count_ms= 0;
    };
    timer.timers[id].paused= v;
    if (v && typeof eventTimerPause=="function") { //se o evento TimerPause existir, vai chamá-lo
        eventTimerPause(id);
    };
};
timer.remove= function(id) { //deleta um timer
    delete timer.timers[id];
    if (typeof eventTimerKill=="function") { //se o evento TimerKill existir, vai chamá-lo
        eventTimerKill(id);
    };
};
timer.list= function() {
    let list= [];
    for (id in timer.timers) {
        list.push(id);
    };
    return list;
};
timer.new= function(id, callback, ms, times= 0, args= [], paused= false, last= false) {
    timer.timers[id]= { //um novo timer é criado
        id: id,
        callback: callback,
        ms: ms,
        times: times,
        args: args,
        count_t: times,
        count_ms: 0,
        paused: paused,
        last: last
    };
    /*
        id: o id do timer
        callback: a função que deverá ser chamada
        ms: a cada quantos milisegundos a função deve ser chamada
        times: quantas vezes deve ser chamada, 0 para infinito (valor padrão: 0)
        args: numa tabela, 5 valores possíveis para serem passadas como parâmetros da função (valor padrão: [])
        paused: se ele deve estar pausado (valor padrão: false)
        last: o que deve acontecer quando o timer não infinito acabar, true para ser eliminado, e false para ser pausado! (valor padrão: false)
    */
};
setInterval(function() { //a cada 100ms chama a função responsável por atualizar os timers
    for (let id in timer.timers) {
        timer.loop(id); //deve-se passar o id
    };
}, 100);