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
    if (v && typeof eventTimerPause=="function") { //se o evento TimerPause existir, vai chamá-lo!
        eventTimerPause(id);
    };
};
timer.remove= function(id) { //deleta um timer
    delete timer.timers[id];
    if (typeof eventTimerKill=="function") { //se o evento TimerKill existir, vai chamá-lo!
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
/*
    Thanks for downloading this file, let's know some it?
    
    - (Method) timer.new(id, callback, ms [, times, args, paused, last]) => void
    Creates a new timer
    
    Parameters:
        - id (any): the timer id
        - callback (function): the function that must be called when the count ends
        - ms (int): in miliseconds, set when the callback must be called
        - times (int): how many times the callback must be called, 0 for infity (default value: 0)
        - args (array): you can set by default five possible parameters for callback (default value: [])
        - paused (boolean): if the timer must be paused (default value: false)
        - last (boolean): What must happen when the script countdown finishes? If true, the timer will be removed, otherwise it will be paused
        
    - (Method) timer.remove(id) => void
    Kills a timer
    
    Parameters:
        - id (any): the timer id
        
    - (Method) timer.pause(id, pause [, restart]) => void
    Pauses a timer
    
    - parameters:
        - id (any): the timer id
        - pause (boolean): if the timer must be paused or don't
        - restart (boolean): if the control variables must be restarted
        
    - (Method) timer.list() => object
    Returns a array tha contains the timers id
    
    See the events:
        eventTimerPaused(id): it happens when a timer is paused
        eventTimerKill(id): it happens when a timer is removed
        
        Both returns the id
/*
