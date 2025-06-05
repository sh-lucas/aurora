import '@picocss/pico/css/pico.min.css';

class HtmlGet extends HTMLElement {
  constructor() {
      super();
  }

  async connectedCallback() {
      const page = this.getAttribute('content');
      if (!page) {
          console.error('O atributo "content" é obrigatório para <html-get>.');
          return;
      }

      try {
          const response = await fetch(`/components/${page}.html`);
          if (!response.ok) {
              throw new Error(`Erro ao carregar o componente: ${response.statusText}`);
          }
          const html = await response.text();
          this.outerHTML = html;
      } catch (error) {
          console.error('Falha ao buscar o componente HTML:', error);
          this.outerHTML = `<p style="color: red;">Erro ao carregar o conteúdo de "${page}".</p>`;
      }
  }
}

customElements.define('get-html', HtmlGet);
alert("Ok!")