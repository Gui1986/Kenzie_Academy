async function handlePDF() {
    const fileInput = document.getElementById('pdfFileInput');
    const outputDiv = document.getElementById('output');
    const file = fileInput.files[0];

    if (!file) {
        outputDiv.innerHTML = 'Nenhum arquivo selecionado.';
        return;
    }

    const typedarray = await file.arrayBuffer();
    const pdfjsLib = window['pdfjs-dist/build/pdf'];

    pdfjsLib.GlobalWorkerOptions.workerSrc = '//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js';

    const pdf = await pdfjsLib.getDocument(typedarray).promise;
    const numPages = pdf.numPages;
    let anyKeywordFound = false;

    outputDiv.innerHTML = '';

    for (let i = 1; i <= numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map(item => item.str).join(' ').toLowerCase(); // Convertendo para minúsculas para comparar
        const keywords = ['jesus', 'igreja', 'associacao', 'cristo', 'bras', 'assoc', 'associacao', 'A.B.I.J.C.S.U.D']; // Palavras-chave corrigidas

        let keywordsFound = false;

        for (let j = 0; j < keywords.length; j++) {
            if (pageText.includes(keywords[j].toLowerCase())) { // Convertendo palavra-chave para minúsculas
                keywordsFound = true;
                break;
            }
        }

        outputDiv.innerHTML += `<p>Guia ${i}: ${keywordsFound ? 'Documento verificado, <strong><span class="correto">correto!</span></strong>' : 'Documento verificado, <strong><span class="incorreto">incorreto, verificar documento!</span></strong>'}</p>`;

        if (keywordsFound) {
            anyKeywordFound = true;
        }
    }

    if (anyKeywordFound) {
        outputDiv.innerHTML += '<p>Pelo menos uma das palavras-chave foi encontrada!</p>';
    } else {
        outputDiv.innerHTML += '<p>Nenhuma das palavras-chave foi encontrada.</p>';
    }
}