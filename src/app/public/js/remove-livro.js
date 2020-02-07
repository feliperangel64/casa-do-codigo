let tabelaLivros = document.querySelector('#livros');
tabelaLivros.addEventListener('click', (e) => {
    let elementoClicado = e.target;
    
    if (elementoClicado.dataset.type == 'remocao') {
        let livroId = elementoClicado.dataset.ref;
        fetch(`http://localhost:49160/livros/${livroId}`, { method: 'DELETE' })
            .then(res => {
                let tr = elementoClicado.closest(`#livro_${livroId}`);
                tr.remove();
            })
            .catch(erro => console.log(erro))
    }
});