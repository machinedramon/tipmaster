import fetch from "node-fetch";
import { writeFileSync } from "fs";

async function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchAllPages(url) {
  console.log("🌐 Iniciando a busca de todas as páginas...");

  // Primeiro fetch para obter o número total de páginas
  const response = await fetch(url);
  const data = await response.json();
  const totalPages = data.total_pages;

  console.log(`🔍 Encontradas ${totalPages} páginas.`);

  let allResults = [];

  // Fetch de todas as páginas
  for (let page = 1; page <= totalPages; page++) {
    console.log(`📄 Buscando dados da página ${page}...`);

    const pageUrl = `${
      url.split("?")[0]
    }?startDate=2024-05-16T00:00:00.000Z&endDate=2024-05-17T23:59:59.999Z&page=${page}`;
    const pageResponse = await fetch(pageUrl);
    const pageData = await pageResponse.json();

    const filteredResults = pageData.records.map((record) => ({
      created_at: record.created_at,
      color: record.color,
    }));

    allResults = allResults.concat(filteredResults);

    // Aguardar um intervalo aleatório entre 200 e 400 ms
    const randomDelay = Math.floor(Math.random() * 200) + 200;
    console.log(`⏳ Aguardando ${randomDelay}ms antes de continuar...`);
    await delay(randomDelay);
  }

  console.log("✅ Todas as páginas foram buscadas com sucesso!");

  // Ordenar os resultados por created_at
  allResults.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  console.log("🗃️ Resultados ordenados!");

  return allResults;
}

const url =
  "http://localhost:3001/api/history?startDate=2024-03-17T00:00:00.000Z&endDate=2024-05-17T23:59:59.999Z&page=1";

fetchAllPages(url)
  .then((allResults) => {
    console.log("💾 Salvando resultados em records.json...");
    writeFileSync("records.json", JSON.stringify(allResults, null, 2));
    console.log("✅ Arquivo records.json salvo com sucesso!");
  })
  .catch((error) => {
    console.error("❌ Ocorreu um erro:", error);
  });
