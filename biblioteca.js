
const listaLivros = []; 
const mapaAutores = new Map(); 
const conjuntoGeneros = new Map();


function adicionarLivro(titulo, autor, genero) {
    if (!listaLivros.includes(titulo)) {
        listaLivros.push(titulo);
        mapaAutores.set(titulo, autor);

        
        if (!conjuntoGeneros.has(genero)) {
            conjuntoGeneros.set(genero, []);
        }
        conjuntoGeneros.get(genero).push(titulo);

        console.log(`Livro "${titulo}" adicionado com sucesso!`);
    } else {
        console.log(`O livro "${titulo}" já existe na biblioteca.`);
    }
}


function removerLivro(titulo) {
    const index = listaLivros.indexOf(titulo);
    if (index !== -1) {
        listaLivros.splice(index, 1);
        mapaAutores.delete(titulo);

        
        for (const [genero, livros] of conjuntoGeneros) {
            const generoIndex = livros.indexOf(titulo);
            if (generoIndex !== -1) {
                livros.splice(generoIndex, 1);
                if (livros.length === 0) {
                    conjuntoGeneros.delete(genero); 
                }
                break;
            }
        }

        console.log(`Livro "${titulo}" removido com sucesso!`);
    } else {
        console.log(`O livro "${titulo}" não foi encontrado.`);
    }
}


function listarLivros() {
    if (listaLivros.length === 0) {
        console.log("Nenhum livro na biblioteca.");
    } else {
        console.log("Livros disponíveis:");
        listaLivros.forEach((titulo) => {
            console.log(`- ${titulo} (Autor: ${mapaAutores.get(titulo)})`);
        });
    }
}


function verificarDisponibilidade(titulo) {
    if (listaLivros.includes(titulo)) {
        console.log(`O livro "${titulo}" está disponível.`);
    } else {
        console.log(`O livro "${titulo}" não está disponível.`);
    }
}


function buscarLivrosPorGenero(genero) {
    if (conjuntoGeneros.has(genero)) {
        console.log(`Livros do gênero "${genero}":`);
        conjuntoGeneros.get(genero).forEach((titulo) => console.log(`- ${titulo}`));
    } else {
        console.log(`Nenhum livro encontrado para o gênero "${genero}".`);
    }
}


adicionarLivro("O Segredo da mente milionaria", "T. Harv Eker", "Economia");
adicionarLivro("1984", "George Orwell", "Ficção Científica");
adicionarLivro("O Hobbit", "J.R.R. Tolkien", "Fantasia");

listarLivros();

verificarDisponibilidade("1984");
removerLivro("1984");

verificarDisponibilidade("1984");
buscarLivrosPorGenero("Fantasia");
buscarLivrosPorGenero("Mistério");
