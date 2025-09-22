<script lang="ts">
    import { onMount } from "svelte";

    interface Game {
        id: number;
        title: string;
        description: string;
        publisher_name?: string;
        category_name?: string;
    }

    export let games: Game[] = [];
    let loading = true;
    let error: string | null = null;

    const fetchGames = async () => {
        loading = true;
        try {
            const response = await fetch('/api/games');
            if(response.ok) {
                games = await response.json();
            } else {
                error = `Failed to fetch data: ${response.status} ${response.statusText}`;
            }
        } catch (err) {
            error = `Error: ${err instanceof Error ? err.message : String(err)}`;
        } finally {
            loading = false;
        }
    };

    onMount(() => {
        fetchGames();
    });
</script>

<div>
    <!-- Enhanced Section Header -->
    <div class="text-center mb-12">
        <h2 class="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Featured Games
        </h2>
        <p class="text-lg text-slate-400 max-w-2xl mx-auto">
            Discover innovative games created by developers, for developers. Each game brings unique challenges and exciting gameplay.
        </p>
        <div class="mt-6 h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
    </div>
    
    {#if loading}
        <!-- Enhanced loading animation -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {#each Array(6) as _, i}
                <div class="group bg-slate-800/40 backdrop-blur-xl rounded-2xl overflow-hidden shadow-xl border border-slate-700/50 hover:border-blue-500/50 transition-all duration-500 animate-pulse" style="animation-delay: {i * 100}ms;">
                    <div class="p-8">
                        <div class="animate-pulse">
                            <div class="h-8 bg-gradient-to-r from-slate-700 to-slate-600 rounded-lg w-3/4 mb-4"></div>
                            <div class="h-5 bg-gradient-to-r from-slate-700 to-slate-600 rounded w-1/2 mb-6"></div>
                            <div class="space-y-3 mb-6">
                                <div class="h-4 bg-gradient-to-r from-slate-700 to-slate-600 rounded w-full"></div>
                                <div class="h-4 bg-gradient-to-r from-slate-700 to-slate-600 rounded w-5/6"></div>
                                <div class="h-4 bg-gradient-to-r from-slate-700 to-slate-600 rounded w-4/6"></div>
                            </div>
                            <div class="h-12 bg-gradient-to-r from-slate-700 to-slate-600 rounded-lg w-full"></div>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    {:else if error}
        <!-- Enhanced error display -->
        <div class="text-center py-16 bg-gradient-to-br from-red-900/20 to-slate-800/50 backdrop-blur-xl rounded-2xl border border-red-500/30 shadow-xl">
            <div class="mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-red-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
            <h3 class="text-xl font-semibold text-red-300 mb-2">Oops! Something went wrong</h3>
            <p class="text-red-400 text-lg">{error}</p>
            <button class="mt-6 px-6 py-3 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors duration-300" on:click={fetchGames}>
                Try Again
            </button>
        </div>
    {:else if games.length === 0}
        <!-- Enhanced no games found -->
        <div class="text-center py-16 bg-gradient-to-br from-slate-800/50 to-slate-700/30 backdrop-blur-xl rounded-2xl border border-slate-600/50 shadow-xl">
            <div class="mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-20 w-20 text-slate-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
            </div>
            <h3 class="text-2xl font-semibold text-slate-300 mb-3">No Games Available</h3>
            <p class="text-slate-400 text-lg mb-6">We're working on adding some amazing games. Check back soon!</p>
            <button class="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors duration-300" on:click={fetchGames}>
                Refresh
            </button>
        </div>
    {:else}
        <!-- Enhanced game list -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" data-testid="games-grid">
            {#each games as game, index (game.id)}
                <a 
                    href={`/game/${game.id}`} 
                    class="group block bg-slate-800/40 backdrop-blur-xl rounded-2xl overflow-hidden shadow-xl border border-slate-700/50 hover:border-blue-500/50 hover:shadow-blue-500/10 hover:shadow-2xl transition-all duration-500 hover:translate-y-[-8px] transform-gpu"
                    data-testid="game-card"
                    data-game-id={game.id}
                    data-game-title={game.title}
                    style="animation: fadeInUp 0.6s ease-out {index * 100}ms both;"
                >
                    <!-- Card Inner Container -->
                    <div class="p-8 relative h-full flex flex-col">
                        <!-- Gradient overlay that appears on hover -->
                        <div class="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                        
                        <!-- Animated border glow -->
                        <div class="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                        
                        <div class="relative z-10 flex flex-col h-full">
                            <!-- Game Title -->
                            <h3 class="text-2xl font-bold text-slate-100 mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-300 group-hover:to-purple-300 group-hover:bg-clip-text transition-all duration-300" data-testid="game-title">
                                {game.title}
                            </h3>
                            
                            <!-- Category and Publisher Tags -->
                            {#if game.category_name || game.publisher_name}
                                <div class="flex flex-wrap gap-2 mb-4">
                                    {#if game.category_name}
                                        <span class="text-xs font-semibold px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-900/60 to-blue-800/60 text-blue-200 border border-blue-700/50 backdrop-blur-sm" data-testid="game-category">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                            </svg>
                                            {game.category_name}
                                        </span>
                                    {/if}
                                    {#if game.publisher_name}
                                        <span class="text-xs font-semibold px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-900/60 to-purple-800/60 text-purple-200 border border-purple-700/50 backdrop-blur-sm" data-testid="game-publisher">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                            </svg>
                                            {game.publisher_name}
                                        </span>
                                    {/if}
                                </div>
                            {/if}
                            
                            <!-- Game Description -->
                            <p class="text-slate-400 mb-6 text-base leading-relaxed line-clamp-3 flex-grow" data-testid="game-description">
                                {game.description}
                            </p>
                            
                            <!-- Enhanced CTA Button -->
                            <div class="mt-auto">
                                <div class="flex items-center justify-between p-4 bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-xl border border-slate-600/50 group-hover:border-blue-500/50 transition-all duration-300">
                                    <span class="text-blue-400 font-semibold text-sm group-hover:text-blue-300 transition-colors duration-300">
                                        View Details
                                    </span>
                                    <div class="flex items-center space-x-2">
                                        <div class="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-white transform transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                                                <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </a>
            {/each}
        </div>
    {/if}
</div>