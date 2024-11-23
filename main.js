import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: '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',
    dangerouslyAllowBrowser: true
});

document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('searchForm');
    const loader = document.getElementById('loader');
    const results = document.getElementById('results');
    const tabs = document.querySelectorAll('.tab');

    async function analyzeQuery(query) {
        try {
            const completion = await openai.chat.completions.create({
                messages: [{
                    role: "system",
                    content: `En tant qu'expert SEO, analysez cette requête: "${query}" et fournissez une analyse détaillée au format JSON avec:
                    - L'intention de recherche principale et secondaire
                    - 30 mots-clés à intégrer avec leur contexte
                    - Des suggestions de mots-clés pertinents avec volume et difficulté`
                }],
                model: "gpt-3.5-turbo",
                temperature: 0.7
            });

            return completion.choices[0].message.content;
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
            alert('Une erreur est survenue lors de l\'analyse');
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

        // Affichage des résultats bruts dans chaque onglet
        intentContent.innerHTML = `<div class="card"><pre>${analysis}</pre></div>`;
        keywordsContent.innerHTML = `<div class="card"><pre>${analysis}</pre></div>`;
        recommendationsContent.innerHTML = `<div class="card"><pre>${analysis}</pre></div>`;
    }
});