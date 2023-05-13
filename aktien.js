const axios = require('axios');
const cheerio = require('cheerio');

async function findLowMarketCapStocks() {
  try {
    const response = await axios.get('https://www.six-group.com/exchanges/shares/security_info_de.html');
    const $ = cheerio.load(response.data);

    $('table.dataTable tr').each((index, element) => {
      if (index !== 0) {
        const columns = $(element).find('td');
        const name = $(columns[1]).text().trim();
        const marketCap = parseFloat($(columns[5]).text().trim().replace(',', ''));

        if (marketCap < 600) {
          console.log(`Aktie: ${name}, Marktkapitalisierung: ${marketCap} Mio.`);
        }
      }
    });
  } catch (error) {
    console.error('Fehler beim Abrufen der Daten:', error);
  }
}

findLowMarketCapStocks();
