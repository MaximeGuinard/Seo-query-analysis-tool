const OPENAI_API_KEY = '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';

document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('searchForm');
    const loader = document.getElementById('loader');
    const results = document.getElementById('results');
    const tabs = document.querySelectorAll('.tab');

    async function analyzeQuery(query) {
        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${OPENAI_API_KEY}`
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: [{
                        role: "system",
                        content: `Analysez la requête SEO suivante: "${query}". Retournez une analyse complète incluant:
                            - L'intention de recherche (informationelle, transactionnelle, etc.)
                            - Les mots-clés suggérés
                            - Les recommandations d'optimisation`
                    }]
                })
            });

            if (!response.ok) throw new Error('Erreur API');
            const data = await response.json();
            return data.choices[0].message.content;
        } catch (error) {
            console.error('Erreur:', error);
            throw new Error('Erreur lors de l\'analyse');
        }
    }

    searchForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const query = document.getElementById('query').value.trim();
        
        if (!query) return;

        loader.classList.remove('hidden');
        results.classList.add('hidden');

        try {
            const analysisResult = await analyzeQuery(query);
            displayResults(analysisResult);
            results.classList.remove('hidden');
        } catch (error) {
            alert(error.message);
        } finally {
            loader.classList.add('hidden');
        }
    });

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.tab;
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            document.querySelectorAll('.tab-pane').forEach(pane => {
                pane.classList.remove('active');
            });
            document.getElementById(`${target}Content`).classList.add('active');
        });
    });

    function displayResults(analysis) {
        const intentContent = document.getElementById('intentContent');
        const keywordsContent = document.getElementById('keywordsContent');
        const recommendationsContent = document.getElementById('recommendationsContent');

        // Affichage simple du texte formaté
        intentContent.innerHTML = `<div class="card">${analysis}</div>`;
        keywordsContent.innerHTML = `<div class="card">${analysis}</div>`;
        recommendationsContent.innerHTML = `<div class="card">${analysis}</div>`;
    }
});