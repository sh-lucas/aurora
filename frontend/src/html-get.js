class HtmlGet extends HTMLElement {
  constructor() {
    super();
  }

  async connectedCallback() {
    // 1. Pega o nome do arquivo do template a partir do atributo 'content'.
    const page = this.getAttribute("file");
    if (!page) {
      console.error(
        'O atributo "content" (ex: <html-get content="card">) é obrigatório.'
      );
      return;
    }

    // 2. Captura o HTML que foi escrito DENTRO do componente.
    const contentToInject = this.innerHTML;
    const placeholder = "<swap>"; // Nosso placeholder customizado

    try {
      // 3. Busca o arquivo do template.
      const response = await fetch(`/${page}.html`);
      if (!response.ok) {
        throw new Error(
          `Arquivo não encontrado ou erro de rede: ${response.statusText}`
        );
      }
      let templateHtml = await response.text();

      // 4. Substitui o placeholder no template pelo conteúdo capturado.
      const finalHtml = templateHtml.replace(placeholder, contentToInject);

      // 5. Substitui o componente <html-get> pelo resultado final.
      this.outerHTML = finalHtml;
    } catch (error) {
      console.error(
        `Falha ao carregar e processar o componente "${page}":`,
        error
      );
      // Em caso de erro, exibe uma mensagem no lugar do componente.
      this.outerHTML = `<div style="border: 2px solid red; padding: 1em;">
              <p><strong>Erro ao carregar componente:</strong> ${page}.html</p>
              <p><small>${error.message}</small></p>
          </div>`;
    }
  }
}

// Define o novo elemento customizado para que o navegador o reconheça.
customElements.define("get-html", HtmlGet);
