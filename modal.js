let id_modal = null, _funcao_desligar_enventos = () => {};

const geradorIdModal = ()  => {
    let numero_aletorio = Math.floor(Math.random() * (99958 - 1) + 1);
    return `modal-tela${numero_aletorio}`;
};

const ocultar_overflow_html = () => {
    let tag_html = document.getElementsByTagName('html');
    tag_html[0].style.overflow = 'hidden';
};

const exibir_overflow_html = () => {
    let tag_html = document.getElementsByTagName('html');
    tag_html[0].style.overflow = 'auto';
};

const header = (titulo) => {
    let h4 = document.createElement('h3');
    h4.innerHTML = titulo;
    let row = document.createElement('div');
    row.classList.add('row');
    let col = document.createElement('div');
    col.classList.add('col-md-12', 'custom-modal-header');
    col.appendChild(h4);

    let a = document.createElement('a');
    a.href = '#fechar';
    a.innerHTML = `<i class=\"fa fa-times\" aria-hidden=\"true\"></i>`;
    a.classList.add('fechar');
    col.appendChild(a);
    row.appendChild(col);
    return row;
};

const corpo = (html) => {
    let row = document.createElement('div');
    row.classList.add('row');
    let col = document.createElement('div');
    col.classList.add('col-md-12');
    col.insertAdjacentHTML('beforeend', html);
    row.appendChild(col);
    return row;
};

const modalTela = (html, titulo = 'Modal sem Titulo', funcao_desligar_enventos = () => {}) =>
{
    _funcao_desligar_enventos = funcao_desligar_enventos;
    id_modal = geradorIdModal();
    let modal = document.createElement('div');
    modal.classList.add('modal-custom');
    modal.style.opacity = 1;
    modal.style.pointerEvents = 'auto';
    modal.setAttribute('id',id_modal);

    let modal_div = document.createElement('div');
    modal_div.style.width = '99%';
    modal_div.style.height = '99%';
    modal_div.style.margin = "5px";
    modal_div.style.minHeight = '500px';
    modal_div.style.borderRadius = '5px';
    modal_div.style.overflow = 'auto';

    modal_div.appendChild(header(titulo));
    modal_div.appendChild(corpo(html));
    modal.appendChild(modal_div);

    let body = document.getElementsByTagName('body');
    body[0].appendChild(modal);

    ocultar_overflow_html();
    listenerFechar(id_modal);
    return id_modal;
};

const fecharModal = (idModal = null) => {
    if(idModal !== null) {
        id_modal = idModal;
    }
    let modal = document.getElementById(id_modal);
    modal.remove();
    exibir_overflow_html();
};

const listenerFechar = (idModal) =>
{
    let modal = document.getElementById(idModal);
    let botao_fechar = modal.getElementsByClassName('fechar');
    botao_fechar[0].addEventListener('click', (e) => {
        e.preventDefault();
        _funcao_desligar_enventos();
        modal.remove();
        exibir_overflow_html();
    });
};

export {modalTela, fecharModal};
